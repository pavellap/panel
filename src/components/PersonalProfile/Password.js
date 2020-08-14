import React, {useState} from "react";
import {TextField, Typography} from "@material-ui/core";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import {changePassword} from "./API/api";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    padding-left: 15px;
    div {
        margin-top: 10px;
        margin-bottom: 10px;
    }
`

export default function(props) {
    const [oldPassword, handleOld] = useState("");
    const [newPassword, handleNew] = useState("");
    const [confirmPassword, handleConfirm] = useState("");
    const [oldError, handleOldError] = useState(false);
    const [newError, handleNewError] = useState(false);
    const [confirmError, handleConfirmError] = useState(false);
    const [errorText, handleErrorText] = useState("")

    // todo: Текст при успешном запросе
    // todo: сделать человеческую валидацию
    // todo: Значок визабитили, если будет время
    const validation = () => {
        if (oldPassword.length === 0) {
            handleOldError(false)
            handleErrorText('Поле не должно быть пустым!');
        }
        else if (newPassword.length === 0) {
            handleNewError(false)
            handleErrorText('Поле не должно быть пустым!');
        }
        else if (confirmPassword.length === 0) {
            handleConfirmError(false)
            handleErrorText('Поле не должно быть пустым!');
        }
        else if (newPassword !== confirmPassword) {
            handleConfirmError(true);
            handleErrorText('Значение не совпадает со значением в поле с новым паролем');
        }
        else {
            // todo: Прокидывать здесь логин из редакса
            changePassword(oldPassword, newPassword, 'admin')
        }
    }

    return (
        <>
            <Typography display='block' variant='h4' align='center'>Смена пароля</Typography>
            <Container>
                <TextField onChange={(e) => {
                    handleOld(e.currentTarget.value);
                    handleNewError(false);
                }}
                    variant='outlined' label='Старый пароль'
                    required error={oldError} helperText={errorText}/>
                <TextField onChange={(e) => {
                    handleNew(e.currentTarget.value);
                    handleNewError(false);
                }}
                    variant='outlined' label='Новый пароль'
                    required error={newError} helperText={errorText}/>
                <TextField onChange={(e) => {
                    handleConfirm(e.currentTarget.value);
                    handleConfirmError(false);
                }}
                    variant='outlined' label='Подтвердите новый пароль'
                    required error={confirmError} helperText={errorText}/>
                <Button onClick={validation} variant='contained' color='primary'>Сменить пароль</Button>
            </Container>
        </>
    )
}