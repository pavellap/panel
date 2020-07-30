import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import styled from "styled-components";

const Container = styled.div`
    padding: 30px;
    div {
        display: flex;
        justify-content: center;
        padding-top: 20px;
        button {
            margin-right: 30px;
        }
    }
`

export default function(props) {
    return (
        <Container>
            <Typography>Вы действительно хотите удалить группу c id: {props.id}?</Typography>
            <div>
                <Button color='primary' variant='contained' onClick={() => props.approveAction(true)}>Да</Button>
                <Button color='secondary' variant='contained' onClick={() => props.approveAction(false)}>Нет</Button>
            </div>
        </Container>
    )
}