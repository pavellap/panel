import React, {useState} from "react";
import {
    Typography, Tooltip, List,
    ListItemIcon, ListItemText, TextField, ListItem, ListItemSecondaryAction,
} from "@material-ui/core";
import styled from "styled-components";
import ReactDOM from "react-dom";
import ModalAdvanced from "../Modal/ModalAdvanced";
import ClearIcon from "@material-ui/icons/Clear";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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

export default function (props) {
    // просматривает изменения в форме для нового пользователя
    const handleChange = (text) => {
        handleError(false);
        handleText("");
        if (text.length === 1 && text !== '@')
            handleForm('@' + text)
        else
            handleForm(text);
    }
    // Добавление нового модера на пробел
    const addNewUser = (keyEvent = null) => {
        console.log(keyEvent);
        if ((keyEvent.key === 'Enter' || keyEvent === 'button') && text.length !== 0) {
            const newArray = usersList;
            newArray.push(text);
            handleList(newArray);
            handleForm('');
        }
        else if (text.length === 0) {
            handleError(true);
            handleText('Поле  ввода не должно быть пустым')
        }
    }
    // Удаление модера
    const removeUser = nick => {
        const array = usersList.filter(item => item !== nick);
        handleList(array);
    }



    const [text, handleForm] = useState('');
    const [error, handleError] = useState(false)
    const [errorText, handleText] = useState(null);
    const [usersList, handleList] = useState(['@trigognight'])
    const [modalIsOpen, handleModal] = useState(false);
    const [userToDelete, handleDeletedUser] = useState(null);

    return (
        <Container onKeyDown={addNewUser}>
            <Typography>Добавление и удаление новых модераторов</Typography>
            <TextField onChange={(e) => handleChange(e.currentTarget.value)}
                       variant='outlined' label='Логин нового модератора' value={text}
                       required error={error} helperText={errorText}/>
            {usersList.length !== 0 &&
            <List>
                {usersList.map((item, key) =>
                    <ListItem key={key}>
                        <ListItemIcon><AccountCircleIcon/></ListItemIcon>
                        <ListItemText>{item}</ListItemText>
                        <ListItemText>Сгенерированный пароль: aT512F7fs</ListItemText>
                        <ListItemSecondaryAction>
                            <ClearIcon onClick={() => {
                                handleDeletedUser(item);
                                handleModal(true);
                            }}/>
                        </ListItemSecondaryAction>
                    </ListItem>
                )}
            </List>
            }
            <Tooltip placement='bottom-start' title='Добавляет нового пользователя к текущему списку приглашенных пользователей'>
                <Button onClick={() => addNewUser('button')} variant='contained' color='primary'>
                    Добавить модератора
                </Button>
            </Tooltip>
            <Button variant='contained' color='primary'>Сохранить изменения</Button>
            {ReactDOM.createPortal( modalIsOpen &&
                <ModalAdvanced width={15} height='150px' toggleModal={() => handleModal(false)}>
                    <Typography>Вы действительно хотите удалить модератора {userToDelete}?</Typography>
                    <div style={{display: 'flex'}}>
                        <Button style={{marginTop: '20px'}}  color='primary' variant='contained' onClick={() => {
                            removeUser(userToDelete);
                            handleModal(false);
                        }}>Да</Button>
                        <Button style={{marginTop: '20px'}} color='secondary' variant='contained' onClick={() => handleModal(false)}>
                            Нет
                        </Button>
                    </div>
                </ModalAdvanced>,
                document.getElementById('portal'))}
        </Container>
    )
}