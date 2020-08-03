import React from "react";
import styled from "styled-components";
import {Typography, Button} from "@material-ui/core";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 160px;
    padding: 30px 50px;
    align-items: center;
    div {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
`

export default function(props) {
    return (
        <Wrapper>
            <Typography>Вы действительно хотите удалить чат с id: {props.id} и все прикреплённые к нему тарифы?</Typography>
            <div>
                <Button variant='contained' color='primary'
                        onClick={() => props.approve(true, props.id)}>Да</Button>
                <Button variant='contained' color='secondary'
                onClick={() => props.approve(false, null)}>Нет</Button>
            </div>
        </Wrapper>
    )
}