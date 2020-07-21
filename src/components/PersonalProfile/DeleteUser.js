import React, {useState} from "react";
import {Typography, Button, List, ListItemIcon, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import TelegramIcon from '@material-ui/icons/Telegram';
import ClearIcon from '@material-ui/icons/Clear';
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export default function(props) {

    const [users, handleUsers] = useState(props.group ? props.group : []);

    const handleDelete = nick => {
        const array = users.filter(item => item !== nick);
        handleUsers(array);
    }

    return (
        <Container>
            <Typography>Удаление приглашённый вами пользователей</Typography>
            {users.length !== 0 &&
                <List>
                    {users.map((item, index) =>
                    <ListItem>
                        <ListItemIcon><TelegramIcon/></ListItemIcon>
                        <ListItemText>{item}</ListItemText>
                        <ListItemSecondaryAction>
                            <ClearIcon onClick={() => handleDelete(item)}/>
                        </ListItemSecondaryAction>
                    </ListItem>
                    )}
                </List>
            }
            <Button variant='contained' color='secondary'>Сохранить изменения</Button>
        </Container>
    )
}