import React, {useState} from 'react'
import {TextField, Button, Typography} from "@material-ui/core";
import styled from "styled-components";
import url from "../../../config";
import Axios from "axios";


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

    const handleSubmit = () => {
        if (!chat_id)
            handleChatErr(true);
        else if (!name)
            handleNameErr(true);
        else
            postData()
    }
    // TODO: API is ready => fix this
    const postData = () => {
        props.handleAdd(chat_id, name);
        const endpoint = url + '/chats';
        Axios.post(endpoint, {
            chat_id, name
        }).then(res => {
            console.log(res.data);
        })
    }

    return (
        <Wrapper>
            <Typography component='h2' style={{textAlign: 'center'}}>Добавление нового чата</Typography>
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