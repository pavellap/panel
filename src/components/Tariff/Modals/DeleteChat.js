import React from "react";
import styled from "styled-components";
import {Typography, Button} from "@material-ui/core";
import {Close} from "@material-ui/icons";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 160px;
    padding: 15px 25px;
    align-items: center;
    header {
        width: 100%;
        padding-bottom: 20px;
        display: flex;
        justify-content: flex-end;
        padding-right: 10px;
    }
    div {
        padding-top: 20px;
        padding-bottom: 20px;
        width: 100%;
        display: flex;
        justify-content: center;
    }
`

export default function(props) {
    return (
        <Wrapper>
            <header>
                <Close onClick={() => props.approve(false, null)}
                       fontSize='large'
                       color='action'
                       cursor='pointer'/>
            </header>
            <Typography>Вы действительно хотите удалить чат с id: {props.id} и все прикреплённые к нему тарифы?</Typography>
            <div>
                <Button variant='contained' color='secondary'
                        onClick={() => props.approve(true, props.id)}>Да</Button>
            </div>
        </Wrapper>
    )
}
