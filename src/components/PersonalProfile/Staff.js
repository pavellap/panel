import React, {useState, useEffect} from "react";
import {
    Typography, Tooltip, List,
    ListItemIcon, ListItemText, TextField, ListItem, ListItemSecondaryAction,
} from "@material-ui/core";
import styled from "styled-components";
import ReactDOM from "react-dom";
import ModalAdvanced from "../Modal/ModalAdvanced";
import ClearIcon from "@material-ui/icons/Clear";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {addNewModer, deleteModer, fetchModers, fetchPersonalInfo} from "./API/api";
import Loader from "../UI/Loader";
import DeleteModerator from "./Modals/DeleteModerator";
import PasswordModal from "./Modals/PasswordModal";
import PersonalPage from "./PersonalPage";

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

const logins = ['@trigognight', '@admin', '@durov', '@putin']

export default function (props) {
    /*
    * TODO:
    *  Нормальная валидация
    *  Замечание Андрея
    * */
    useEffect(() => {
        fetchModers();
    }, [])

    // просматривает изменения в форме для нового пользователя
    const handleChange = (text) => {
        handleError(false);
        handleText("");
        if (text.length === 1 && text !== '@')
            handleForm('@' + text)
        else
            handleForm(text);
    }

    const addNewUser = (keyEvent) => {
        if ((keyEvent.key === 'Enter' || keyEvent === 'button') && text.length !== 0) {
            const newArray = usersList;
            newArray.push(text);
            handleList(newArray);
            handleModal(true);
            handleModalComponent(
                <PasswordModal
                    handleModal={() => handleModal(false)}
                />
            )
            handleForm('');
            addNewModer(text.slice(1)); // пропускаем первый символ @
        }
        else if (text.length === 0) {
            handleError(true);
            handleText('Поле  ввода не должно быть пустым')
        }
    }

    const handleOpenUser = user => {
        // todo: это заглушка
        fetchPersonalInfo(user);
        handleModal(true);
        handleModalComponent(
            <PersonalPage login={'pavellap'} date={'2016-02-02'} isSuperUser={true}
                          invitations={10} nicks={['trigo', 'gmail']} rights={[1, 3, 10]}
                          handleModal={() => handleModal(false)}/>
        )
    }

    const removeUser = nick => {
        const array = usersList.filter(item => item !== nick);
        handleList(array);
        deleteModer(nick);
    }

    const [text, handleForm] = useState('');
    const [error, handleError] = useState(false)
    const [errorText, handleText] = useState(null);
    const [usersList, handleList] = useState(logins)
    const [modalIsOpen, handleModal] = useState(false);
    const [userToDelete, handleDeletedUser] = useState(null);
    const [componentIsLoading, handleLoading] = useState(false)
    const [modalType, handleModalType] = useState(null);
    const [modalComponent, handleModalComponent] = useState(null)

    console.log('Modal Type: ', modalType)
    return (
        componentIsLoading ? <Loader/> :
            <Container onKeyDown={addNewUser}>
                <Typography>Добавление и удаление новых модераторов</Typography>
                <TextField onChange={(e) => handleChange(e.currentTarget.value)}
                           variant='outlined' label='Логин нового модератора' value={text}
                           required error={error} helperText={errorText}/>
                {usersList.length !== 0 &&
                <List>
                    {usersList.map(item =>
                        <ListItem key={item} button onClick={() => handleOpenUser(item)}>
                            <ListItemIcon><AccountCircleIcon/></ListItemIcon>
                            <ListItemText primary={item}>
                                {item}
                            </ListItemText>
                            <ListItemSecondaryAction>
                                <ClearIcon cursor='pointer' onClick={() => {
                                    handleDeletedUser(item);
                                    handleModalComponent(
                                        <DeleteModerator
                                               removeUser={() => removeUser(userToDelete)}
                                               handleModal={() => handleModal(false)}
                                               user={userToDelete}
                                        />
                                    )
                                    handleModal(true);
                                }}/>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )}
                </List>
                }
                <Tooltip placement='bottom-start'
                         title='Добавляет нового пользователя к текущему списку приглашенных пользователей'>
                    <Button onClick={() => addNewUser('button')} variant='contained' color='primary'>
                        Добавить модератора
                    </Button>
                </Tooltip>
                <Button variant='contained' color='primary'>Сохранить изменения</Button>
                {ReactDOM.createPortal( modalIsOpen &&
                    <ModalAdvanced toggleModal={() => handleModal(false)}>
                        {modalComponent}
                    </ModalAdvanced>,
                    document.getElementById('portal'))}
            </Container>
    )

}