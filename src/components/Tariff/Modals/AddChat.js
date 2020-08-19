import React, {useState} from 'react'
import {TextField, Button, Typography} from "@material-ui/core";
import styled from "styled-components";
import url from "../../../config";
import Axios from "axios";
import {addChat} from "../API/api";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 320px;
    padding: 30px 50px;
    align-items: center;
`

export default function(props) {
    const [chat_id, handleChatID] = useState("");
    const [name, handleName] = useState("");
    const [charErr, handleChatErr] = useState(false);
    const [nameErr, handleNameErr] = useState(false);

    // валидация форм
    const handleSubmit = () => {
        if (!chat_id || isNaN(Number(chat_id)))
            handleChatErr(true);
        else if (!name)
            handleNameErr(true);
        else
            addChat({chat_id, name})
                .then(res => props.handleAdd(res))
    }

    return (
        <Wrapper>
            <Typography component='h2'
                        style={{textAlign: 'center'}}>
                Добавление нового чата
            </Typography>
            <TextField label="ID нового чата" variant="outlined" required error={charErr}
                       value={chat_id} onChange={(e) => {
                handleChatID(e.target.value);
                handleChatErr(false);
            }}/>
            <TextField label="Название нового чата" variant="outlined" required error={nameErr}
                       value={name} onChange={(e) => {
                handleName(e.target.value)
                handleNameErr(false);
            }}/>
            <Button variant='contained' color='primary' onClick={handleSubmit}>Добавить</Button>
        </Wrapper>
    )
}
