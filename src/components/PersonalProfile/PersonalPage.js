import React from 'react'
import styled from "styled-components";
import {Typography, Avatar, ListItem, List,
        ListItemText, ListSubheader, ListItemIcon,
        ListItemSecondaryAction, Switch, TextField} from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import {matches, parseDate} from "./utils";
import PersonIcon from '@material-ui/icons/Person';

const Nick = styled.span`
    text-decoration: underline;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
`


// TODO: фунциональность по списку приглашённых ников
export default function(props) {
    const normalizedDate = parseDate(props.date)
    const {rights, nicks, invitations} = props;
    return (
        <Container>
            <header>
                <div>
                    <Avatar>{props.login[0]}</Avatar>
                </div>
                <Typography>
                    Пользователь: <Nick>{props.login}</Nick>
                </Typography>
                <Typography>
                    Дата создания аккаунта: {normalizedDate}
                </Typography>
                <div>
                    <Typography>
                        Максимальное количество людей для приглашения: {invitations}
                    </Typography>
                    {/* todo: рендерить это для админа и главного модера
                    <TextField variant='outlined' label='Количество людей'
                               required value={invitations}/>*/}
                </div>
            </header>
            <section>
             <List subheader={<ListSubheader>Мои права</ListSubheader>}>
                 {Object.entries(matches).map(([key, value]) =>
                     <ListItem key={value}>
                        <ListItemIcon><CreateIcon/></ListItemIcon>
                         <ListItemText>{value}</ListItemText>
                         <ListItemSecondaryAction>
                             <Switch
                                 edge="end"
                                 checked={rights.includes(Number(key))}
                             />
                         </ListItemSecondaryAction>
                     </ListItem>
                 )}
             </List>
             {/*<List style={{width: '60%', margin: '0 auto'}} subheader={<ListSubheader>Пользователи, приглашённые мной</ListSubheader>}>
                 {nicks.map(item => (
                     <ListItem key={item} button>
                         <ListItemText>
                             {item}
                         </ListItemText>
                         <ListItemSecondaryAction>
                             <ListItemIcon>
                                 <PersonIcon/>
                             </ListItemIcon>
                         </ListItemSecondaryAction>
                     </ListItem>
                 ))}
             </List>*/}
            </section>
        </Container>
    )
}