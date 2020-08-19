import React from 'react'
import styled from "styled-components";
import {TextField, Button} from "@material-ui/core";
import SubItem from "./SubItem";
import {fetchSubs} from "./API/api";

const Container = styled.div`
    > header {
        display: flex;
        justify-content: space-between;
        padding: 20px 150px;
        align-items: center;
        background-color: #fafbfc;
        div {
            display: flex;
            align-items: center;
        }
    }
`

const hardCode = [
    {
        id: 1,
        rights: [1, 3, 6],
        name: "Тариф 1",
        disabled: false,
        prices: [1, 4, 6, 8]
    },
    {
        id: 2,
        rights: [2, 4, 6],
        name: "Тариф 2",
        disabled: true,
        prices: [10, 14, 36, 88]
    },
]

export default class Sub extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subs: hardCode,
            chatName: props.name,
            editedSubs: []
        }
    }

    componentDidMount() {
        fetchSubs(this.props.chat).then(data => this.setState({subs: data}))
    }

    handleDeleteSub = id => {
        const array = this.state.subs.filter(item => item.id !== id);
        this.setState({subs: array});
    }

    handleAddNewSub = () => {
        const array = this.state.subs;
        array.push({
            id: Math.round(Math.random() * 90000) + 10000,
            rights: [],
            name: 'Новый тариф',
            disabled: false,
            prices: [0, 0, 0, 0]
        });
        this.setState({subs: array})
    }

    handleEditSub = id => {

    }

    render() {

        const {subs, chatName} = this.state;
        return (
            <Container>
                <header>
                    <div>
                        <span style={{marginRight: 40}}>ID чата: {this.props.chat}</span>
                        <TextField title='Название чата' value={chatName}
                                   onChange={e => this.setState({chatName: e.currentTarget.value})} variant='outlined'/>
                        <Button style={{marginLeft: 20}} variant='contained' color='primary'>Сохранить изменения</Button>
                    </div>
                    <div>
                        <Button style={{marginRight: 40}} color='primary' variant='contained'
                        onClick={this.handleAddNewSub}>Добавить тариф</Button>
                        <Button  color='secondary' variant='contained'
                                 onClick={this.props.handleSwitchSection}>Назад</Button>
                    </div>
                </header>
                {subs.map((item, index) => (
                    <SubItem key={index} handleChange={id => this.handleEditSub(id)} data={item}
                             handleDelete={this.handleDeleteSub}/>
                ))}

            </Container>
        )
    }
}
