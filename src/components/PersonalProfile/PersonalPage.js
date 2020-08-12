import React from 'react'
import styled from "styled-components";
import {Typography, Avatar, ListItem, List,
        ListItemText, ListSubheader, ListItemIcon,
        ListItemSecondaryAction, Switch, TextField} from "@material-ui/core";
import {rules} from "../../template";
import CreateIcon from '@material-ui/icons/Create';

const Container = styled.div`
    display: flex;
    flex-direction: column;
`


// TODO: фунциональность по списку приглашённых ников
export default function(props) {
    return (
        <Container>
            <header>
                <div>
                    <Avatar>{props.name[0]}</Avatar>
                </div>
                <Typography>
                    {props.name}
                </Typography>
                <Typography>
                    Дата создания аккаунта: {props.date}
                </Typography>
                {/*// TODO: сюда прикрепить основную логику*/}
                <div>
                    <Typography>
                        Максимальное количество людей для приглашения
                    </Typography>
                    <TextField variant='outlined' label='Количество людей'
                               required/>
                </div>
            </header>
            <section>
             <List subheader={<ListSubheader>Мои права</ListSubheader>}>
                 {rules.map((item, key) =>
                     <ListItem>
                        <ListItemIcon><CreateIcon/></ListItemIcon>
                         <ListItemText>{item[0]}</ListItemText>
                         <ListItemSecondaryAction>
                             <Switch
                                 edge="end"
                                 checked={item[1]}
                             />
                         </ListItemSecondaryAction>
                     </ListItem>
                 )}
             </List>

            </section>
        </Container>
    )
}