import React, {useState} from 'react'
import {WrapperModal, StyledSelect} from "../Styles/SharedStyledComponents";
import {Button, InputLabel, MenuItem} from "@material-ui/core";

export default function(props) {
    const [value, handleChange] = useState('Каждый день')
    const values = ['Каждый день', 'Каждую неделю', 'Каждый месяц', 'Каждый год']
    // todo: доделать после того, как ответит Андрей
    return (
        <WrapperModal>
            <InputLabel>Периодичность рассылки</InputLabel>
            <StyledSelect  onChange={e => handleChange(e.target.value)}
                           value={value}>
                {values.map((item, index) =>
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                )}
            </StyledSelect>
            <Button variant='contained' color='primary'>Сохранить изменения</Button>
        </WrapperModal>
    )
}