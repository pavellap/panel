import React, {useEffect, useState} from "react";
import styled from "styled-components";
import PageHeader from "../UI/PageHeader";
import { List, ListSubheader, ListItem, ListItemText, ListItemSecondaryAction} from "@material-ui/core";
import Loader from "../UI/Loader";
import {fetchPromos} from "./api";

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


export function Promo() {
    const [isLoading, handleLoading] = useState(true) // заменить на true
    const [activated, handleActivated] = useState([])
    const [active, handleActive] = useState([])

    useEffect(() => {
        fetchPromos().then(data => {
            handleActivated(data.filter(item => item.activated ? item : false))
            handleActive(data.filter(item => item.activated ? false : item))
            handleLoading(false)
        });
    }, [])

    return (
        <Wrapper>
            <PageHeader title='Промокоды'/>
            {isLoading ? <Loader/> :
                <Container>
                <div style={{width: "100%"}}>
                    <List subheader={<ListSubheader>Активированные промокоды</ListSubheader>}>
                        {activated.map((item, index) =>
                            <ListItem button key={index}>
                                <ListItemText primary={'Владелец: ' + item.owner}
                                              secondary={'Код: ' + item.code}
                                />
                                <ListItemSecondaryAction>
                                    Активирован: {item.activated}
                                </ListItemSecondaryAction>
                            </ListItem>)}
                    </List>
                    <List subheader={<ListSubheader>Активные промокоды</ListSubheader>}>
                        {active.map((item, index) =>
                            <ListItem button key={index}>
                                <ListItemText primary={'Владелец: ' + item.owner}
                                              secondary={'Код: ' + item.code}
                                />
                            </ListItem>)}
                    </List>
                </div>
            </Container>}
        </Wrapper>
    )
}