import React from 'react'
import {Typography, Button} from "@material-ui/core";
import styled from "styled-components";
import {Close} from "@material-ui/icons";

export const Wrapper = styled.div`
    padding: 0 25px;
    border-radius: 6px;
    header {
        display: flex;
        padding-top: 20px;
        justify-content: flex-end;
        margin-bottom: 10px;
    }
`

export default function(props) {
    return (
        <Wrapper>
            <header>
                <Close fontSize='large' cursor='pointer' onClick={props.handleModal}/>
            </header>
            <Typography>Вы действительно хотите удалить модератора {props.user}?</Typography>
            <div style={{display: 'flex'}}>
                <Button style={{margin: '20px auto'}}  color='primary' variant='contained' onClick={() => {
                    props.removeUser();
                    props.handleModal();
                }}>Да</Button>
            </div>
        </Wrapper>
    )
}