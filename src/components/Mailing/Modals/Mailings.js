import React, {useEffect, useState} from "react";
import {fetchMailings} from "../API/api";
import styled from "styled-components";
import {Typography, List, ListSubheader, ListItem, ListItemText, ListItemSecondaryAction} from "@material-ui/core";

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    padding: 25px;
    border-radius: 8px;
    background-color: #fff;
    min-width: 690px;
`

const Container = styled.div`
    display: flex;
    justify-content: space-between;
`

export default function(props) {
    const [data, handleData] = useState(null);
    useEffect(() => {
        fetchMailings().then(data => handleData(data));
    }, [])

    console.log("Data in show: ", data)
    return (
        data &&
        <Wrapper>
            <Typography>Название рассылки: {data[1].name}</Typography>
            <Typography>Краткое описание рассылки: {data[1].description}</Typography>
            <Container>
                <List subheader={<ListSubheader>Группы</ListSubheader>}>
                    {data[1].groups.map(item =>
                        <ListItem key={item} button>
                            <ListItemText>Группа №{item}</ListItemText>
                        </ListItem>)}
                </List>
                <List subheader={<ListSubheader>Пользователи</ListSubheader>}>
                    {data[1].users.map(item =>
                        <ListItem key={item} button>
                            <ListItemText>Пользователь №{item}</ListItemText>
                        </ListItem>)}
                </List>
                <List subheader={<ListSubheader>Тарифы</ListSubheader>}>
                    {data[1].subs.map(item =>
                        <ListItem key={item} button>
                            <ListItemText>Тариф № {item}</ListItemText>
                        </ListItem>)}
                </List>
            </Container>
        </Wrapper>
    )
}
