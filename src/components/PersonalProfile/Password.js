import React, {useState} from "react";
import {TextField, Typography} from "@material-ui/core";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

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

const errors = {
    oldErrors: {
        status: false,
        errorMessage: null
    },
    newErrors: {
        status: false,
        errorMessage: null
    },
    confirmErrors: {
        status: false,
        errorMessage: null
    }
}

export default function(props) {
    const [oldPassword, handleOld] = useState("");
    const [newPassword, handleNew] = useState("");
    const [confirmPassword, handleConfirm] = useState("");
    // TODO настроить валидацию форм и переписать компонент в класс, потому что я ебал эти setState

    const handler = () => {
        if (oldPassword.length === 0) {
            console.log("Ты пидор")
            errors.oldErrors.status = true;
            errors.oldErrors.errorMessage = 'Поле не должно быть пустым!'
        }
    }
    /*
     * TODO
     *  1. Настроить валидацию форм
     *  2. Сделать человеческий дизайн
     *  3.
     */
    return (
        <>
            <Typography display='block' variant='h4' align='center'>Смена пароля</Typography>
            <Container>
                <TextField onChange={(e) => handleOld(e.currentTarget.value)}
                    variant='outlined' label='Старый пароль'
                    required error={errors.oldErrors.status} helperText={errors.oldErrors.errorMessage}/>
                <TextField onChange={(e) => handleNew(e.currentTarget.value)}
                    variant='outlined' label='Новый пароль'
                    required error={errors.newErrors.status} helperText={errors.newErrors.errorMessage}/>
                <TextField onChange={(e) => handleConfirm(e.currentTarget.value)}
                    variant='outlined' label='Подтвердите новый пароль'
                    required error={errors.confirmErrors.status} helperText={errors.confirmErrors.errorMessage}/>
                <Button onClick={handler} variant='contained' color='primary'>Сменить пароль</Button>
            </Container>
        </>
    )
}