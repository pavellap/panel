import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import {Close} from "@material-ui/icons";

const Container = styled.div`
    padding: 30px;
    header {
        display: flex;
        justify-content: flex-end;
        padding-bottom: 15px;
    }
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
            <header>
                <Close cursor='pointer' onClick={() => props.approveAction(false)}/>
            </header>
            <Typography>Вы действительно хотите удалить группу c id: {props.id}?</Typography>
            <div>
                <Button color='secondary' variant='contained'
                        onClick={() => props.approveAction(true)}>
                    Да
                </Button>
            </div>
        </Container>
    )
}