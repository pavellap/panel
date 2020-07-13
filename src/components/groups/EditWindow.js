import React from 'react'
import {groupDetailed} from "../../template";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import DeleteIcon from '@material-ui/icons/Delete';
import {Tooltip} from "@material-ui/core";
import HelpModal from "./HelpModal";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  height: 100%;
  width: 100%;
`

// props: название группы
// получаем все данные по id группы
// можем редачить:
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = groupDetailed[this.props.id - 1];
        this.state.modalIsOpen = true;
    }

    handleGlobalRemove = (index) => {
        console.log("Has received index", index)
        const array = this.state.users;
        array[index].only_here = false;
        console.log(array, this.state)
        this.setState({users: array})
    }

    handleDelete = index => {
        const array = this.state.users.filter((item, pos) => index !== pos);
        this.setState({users: array});
    }
    render() {
        const {name} = this.state;
        return (
                <Container>
                    <div>
                        <Typography>{name}</Typography>
                        <Button primary>Добавить пользователей</Button>
                        <div>
                            {this.state.users.map((item, index) =>
                                <div key={index}>
                                    <span>{item.nick}</span>
                                    <span>{item.phone}</span>
                                    {!item.only_here &&
                                    <Button
                                        onClick={() => this.handleGlobalRemove(index)}>
                                        Удалить из других групп
                                    </Button>}
                                    <Tooltip title='Удаляет пользователя из текущей группы' placement='top-start'>
                                        <span onClick={() => this.handleDelete(index)}><DeleteIcon/></span>
                                    </Tooltip>
                                </div>)}
                        </div>
                    </div>
                    {this.state.modalIsOpen && <HelpModal/>}
                </Container>
        )
    }
}