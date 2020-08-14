import React from 'react'
import PageHeader from "../UI/PageHeader";
import styled from "styled-components";
import Item from './GroupItem'
import ReactDOM from "react-dom";
import ModalAdvanced from "../Modal/ModalAdvanced";
import {groupBase} from "../../template";
import Button from "@material-ui/core/Button";
import DeleteWindow from "./Modals/DeleteWindow";
import EditWindow from "./Modals/EditWindow";
import AddWindow from "./Modals/AddWindow";
import './scrollbar.scss'
import {changePriority, fetchGroups, deleteGroup as removeGroup} from "./API/api";
import {List} from "@material-ui/core";

const MainWrapper = styled.section`
  position: relative;
`

const Wrapper = styled.section`
  width: 60%;
  margin: 0 auto;
`

const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  padding: 20px 50px;
`

export default class Groups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            groups: groupBase,
            modalComponent: null,
        }
    }

    componentDidMount() {
        fetchGroups();
    }

    handleModal = (status, content, id = null) => {
        if (content === 'delete')
            this.setState({modalComponent: <DeleteWindow id={id}
                                 approveAction={(status) => {
                                     this.handleModal(false);
                                     status && this.deleteGroup(id);
                                 }
                }/>, widthModal: '150px', heightModal: 'auto'})
        else if (content === 'edit') {
            this.setState({modalComponent:
                    <EditWindow id={id} handleSave={() => this.setState({modalIsOpen: false})}/>})
        }
        else if (content === 'add') {
            this.setState({
                modalComponent: <AddWindow handleModal={() =>
                    this.setState({modalIsOpen: false})}
                />,
            })
        }
        this.setState({modalIsOpen: status})
    }
    // удаляем группу
    deleteGroup = (id) => {
        const array = this.state.groups.filter(item => item.id !== id);
        this.setState({groups: array});
        // delete-запрос на удаление группы
        removeGroup(id);
    }
    // перемещаем профили
    handleMove = (id, action) => {
        const array = this.state.groups;
        let pos = null;
        array.forEach((item, index) => {
            if (item.id === id) {
                pos = index;
            }
        })
        if (action === "up" && pos !== 0) {
            const temp = array[pos - 1];
            array[pos - 1] = array[pos];
            array[pos] = temp;
            this.setState({groups: array})
        }
        else if (action === "down" && pos !== array.length - 1) {
            const temp = array[pos + 1];
            array[pos + 1] = array[pos];
            array[pos] = temp;
            this.setState({groups: array})
        }
        changePriority(this.state.groups);
    }

    // TODO кнопку для сохранения изменений ???
    render() {
        return (
            <MainWrapper>
                <PageHeader title='Группы'/>
                <Header>
                    <Button color='primary' variant='contained'
                    onClick={() => this.handleModal(true, 'add')}>
                        Добавить группу
                    </Button>
                </Header>
                <Wrapper>
                    <List>
                        {this.state.groups.map((item, index) =>
                            <Item name={item.name} id={item.id} key={index}
                                  toggleModal={(val, value, id) => this.handleModal(val, value, id)}
                                  handleDelete={(id) => this.deleteGroup(id)}
                                  handleMove={(id, action) => this.handleMove(id, action)}
                            />)}
                    </List>
                </Wrapper>
                {ReactDOM.createPortal( this.state.modalIsOpen &&
                <ModalAdvanced
                    toggleModal={(status, content) => this.handleModal(status, content)}
                    approveAction={(status, id) => status ?
                        this.deleteGroup(id) : this.handleModal(false)}>
                    {this.state.modalComponent}
                </ModalAdvanced>,
                document.getElementById('portal'))}
            </MainWrapper>
        )
    }
}