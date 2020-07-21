import React from "react";
import styled from "styled-components";
import PageHeader from "../UI/PageHeader";
import {Typography, Button, List,
    ListItemText, ListSubheader, ListItem,
    ListItemSecondaryAction} from "@material-ui/core";


const Container = styled.section`
    display: flex;
    position: relative;
    width: 70%;
    margin: 0 auto;
    border: 1px solid whitesmoke;
`

const Wrapper = styled.section`
    width: 100%;
    position: relative;
`

const PromoItem = styled.div`
    display: flex;
    width: 60%;
    padding: 22px 24px;
    border: 1px solid rgba(0,0,0,.12);
    justify-content: space-between;
    cursor: pointer;
    color: #a0a0a0;
    span:first-child {
        font-weight: bolder;
        margin-right: 10px;
    };
    span:nth-child(2) {
        font-weight: 400;
    }
`

const codes =  [
    {
        code: '1GD5hS',
        owner: "admin",
        activated: '+79991234567'
    },
    {
        code: '54x3Rg',
        owner: "moder1",
        activated: '+79991234567'
    },
    {
        code: '1sa4GS',
        owner: "moder2",
        activated: null
    }
]


// TODO: загрузка промокодов с сервера
export function Promo(props) {

    const activated = [];
    const active = [];
    codes.forEach(item => {
        item.activated ? activated.push(item) : active.push(item);
    })
    return (
        <Wrapper>
            <PageHeader title='Промокоды'/>
            <Container>
                <div style={{width: "100%"}}>
                    <List subheader={<ListSubheader>Активированные промокоды</ListSubheader>}>
                        {activated.map((item, index) =>
                        <PromoItem key={index}>
                            <div>
                                <span>{item.code}</span>
                                <span>Владелец: {item.owner}</span>
                            </div>
                            <div>Активирован: {item.activated}</div>
                        </PromoItem>)}
                    </List>
                    <List subheader={<ListSubheader>Активные промокоды</ListSubheader>}>
                        {active.map((item, index) =>
                            <PromoItem key={index}>
                                <div>
                                    <span>{item.code}</span>
                                    <span>Владелец: {item.owner}</span>
                                </div>
                            </PromoItem>)}
                    </List>
                </div>
            </Container>
        </Wrapper>
    )
}