import React, {useState} from 'react'
import {WrapperModal} from "../Styles/SharedStyledComponents";
import {Button, InputLabel,  TextField} from "@material-ui/core";

const isLastChatInteger = val => {
    return val[val.length - 1] >= "0" && val[val.length - 1] <= "9";
}

export default function(props) {
    const [value, handleChange] = useState(props.data)
    const [error, handleError] = useState(false)

    const submit = () => {
        if (value !== "" && value !== "0")
            props.getData(value)
        else
            handleError(true)
    }

    return (
        <WrapperModal>
            <InputLabel>Перидичность рассылки в днях</InputLabel>
            <div style={{marginTop: 15}}>
                <TextField variant='outlined'
                           label='Периодичность рассылки'
                           value={value}
                           required error={error}
                           helperText='Заполните данные'
                           onChange={e => {
                               if (isLastChatInteger(e.currentTarget.value)) {
                                   handleChange(e.currentTarget.value);
                                   handleError(false)
                               }
                               if (e.currentTarget.value.length === 0) {
                                   handleError(false)
                                   handleChange("")
                               }
                           }}
                />
            </div>
            <Button variant='contained'
                    color='primary'
                    onClick={submit}
            >
                Сохранить изменения
            </Button>
        </WrapperModal>
    )
}
