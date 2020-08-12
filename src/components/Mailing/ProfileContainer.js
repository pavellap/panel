import React from 'react'
import {List, ListItem, ListItemText, ListItemSecondaryAction, ListItemIcon, FormControlLabel} from "@material-ui/core";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import styled from "styled-components";
import Switch from "@material-ui/core/Switch";

const Container = styled.section`
    border: 1px solid #ccc;
    height: 300px;
    width: 600px;
    padding: 20px;
    overflow-y: scroll;
    h3 {
        text-align: center;
        font-size: 24px;
        font-weight: normal;
    }
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 424px;
`


export default function (props) {
    return (
        <Wrapper>
            <h3>Выберите нужную анкету</h3>
            <Container>
                <List>
                    {props.data.map(item =>
                        <ListItem selected={item.id === props.active} onClick={() => props.handleActive(item.id)}
                                  key={item.id} button>
                            <ListItemText primary={`ID: ${item.id}`} secondary={`Название: ${item.name}`}/>
                            <ListItemSecondaryAction>
                                <ListItemIcon>
                                    <AccountBoxIcon/>
                                </ListItemIcon>
                            </ListItemSecondaryAction>
                        </ListItem>)}
                </List>
            </Container>
            <FormControlLabel
                control={<Switch />}
                label="Отправить всем"
                value={props.all}
                onChange={props.handleSwitch}
            />
        </Wrapper>
    )
}