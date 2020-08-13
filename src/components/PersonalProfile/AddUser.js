import React, {useState} from 'react'
import styled from "styled-components";
import {TextField, Typography,
         List, ListItem, ListItemIcon,
        ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import TelegramIcon from '@material-ui/icons/Telegram';
import ClearIcon from '@material-ui/icons/Clear';
import './Styles/Animation.scss'

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const Button = styled.div`
  background-color: #3f51b5;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  padding: 12px 22px;
  font-size: 0.875rem;
  min-width: 180px;
  font-weight: 500;
  line-height: 1.75;
  border-radius: 4px;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,0.2), 
  0px 2px 2px 0px rgba(0,0,0,0.14), 
  0px 1px 5px 0px rgba(0,0,0,0.12);
`
const Error = styled.div`
    width: 100%;
    padding: 20px;
    position: absolute;
    top: -250px;
    left: 0;
    background-color: #ccc;
    animation: errorBlockMove 8s ease-in-out;
`

export default function(props) {
    const users = props.users.map(item => item[0] === '@' ? item : '@' + item);

    const handleChange = (text) => {
        handleError(false);
        handleText("");
        if (text.length === 1 && text !== '@')
            handleForm('@' + text)
        else
            handleForm(text);
    }

    const addNewUser = (keyEvent) => {
        console.log(usersList.includes(text));
        if (usersList.length > props.limit) {
            handleHelperText('Вы исчерпали свой лимит на добавление пользователей');
            return
        }
        else
            handleHelperText(null);

        if (usersList.includes(text)) {
            handleError(true)
            handleText('Данный пользователь уже в списке')

        }
        else if ((keyEvent.key === 'Enter' || keyEvent === 'button') && text.length !== 0) {
            const newArray = usersList;
            newArray.push(text);
            handleList(newArray);
            handleForm('');
        }
        else if (text.length === 0) {
            handleError(true);
            handleText('Поле  ввода не должно быть пустым')
        }

        else if (text.length === 1 && text[0] === '@')
            handleHelperText('Введите полное имя пользователя')
    }

    const removeUser = nick => {
        const array = usersList.filter(item => item !== nick);
        handleList(array);
    }

    const [text, handleForm] = useState('');
    const [error, handleError] = useState(false);
    const [errorText, handleText] = useState(null);
    const [usersList, handleList] = useState(users);
    const [helperText, handleHelperText] = useState(null);


    return (
        <Container onKeyDown={addNewUser}>
            <Typography>Добавление пользователя</Typography>
            <TextField onChange={(e) => handleChange(e.currentTarget.value)}
               variant='outlined' label='Ник в телеграмме' value={text}
               required error={error} helperText={errorText}/>
            {usersList.length !== 0 &&
                <List style={{width: '60%', margin: '0 auto'}}>
                    {usersList.map((item, key) =>
                        <ListItem key={key} button>
                            <ListItemIcon><TelegramIcon/></ListItemIcon>
                            <ListItemText>{item}</ListItemText>
                            <ListItemSecondaryAction>
                                <ClearIcon cursor='pointer' onClick={() => removeUser(item)}/>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )}
                </List>
            }
            {helperText && <Error>{helperText}</Error>}
            <Button onClick={() => props.saveChanges(usersList)} variant='contained' color='primary'>Сохранить изменения</Button>
        </Container>
    )
}