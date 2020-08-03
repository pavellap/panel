import React from "react";
import {Button} from "@material-ui/core";
import styled from "styled-components";

const Wrapper = styled.h1`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #aaa;
`
const Text = styled.span`
    color: #555;
    font-weight: normal;
`

export default function(props) {
    return (
        <Wrapper>
            <Text>Чаты</Text>
            <div>
                <Button style={{marginRight: 30}} variant='contained' color='primary'
                onClick={() => props.openAdd(true, 'add')}>Добавить чат</Button>
                <Button variant='contained' color='secondary'
                onClick={() => props.openSettings(true, 'settings')}>Настройки</Button>
            </div>
        </Wrapper>
    )
}