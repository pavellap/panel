import React from 'react'
import styled from "styled-components";
import {TextField, Button} from "@material-ui/core";
import SubItem from "./SubItem";

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
            subs: hardCode
        }
    }

    handleDeleteSub = id => {
        const array = this.state.subs.filter(item => item.id !== id);
        this.setState({subs: array});
    }


    // TODO: сделать добавление новой группы
    render() {
        const {subs} = this.state;
        return (
            <Container>
                <header>
                    <div>
                        <span style={{marginRight: 40}}>ID чата: {2}</span>
                        <TextField title='Название чата' value={'Чат №1'} variant='outlined'/>
                    </div>
                    <div>
                        <Button style={{marginRight: 40}} color='primary' variant='contained'>Добавить тариф</Button>
                        <Button  color='secondary' variant='contained'
                                 onClick={this.props.handleSwitchSection}>Назад</Button>
                    </div>
                </header>
                {subs.map((item, index) => (
                    <SubItem key={index} data={item} handleDelete={this.handleDeleteSub}/>
                ))}
                <div style={{margin: "20px 0", display: 'flex', justifyContent: 'center'}}>
                    <Button variant='contained' color='primary'>Сохранить изменения</Button>
                </div>

            </Container>
        )
    }
}