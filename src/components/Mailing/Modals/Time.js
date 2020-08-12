import React, {useState} from 'react'
import {StyledSelect} from "../Styles/SharedStyledComponents";
import {MenuItem, InputLabel, TextField, Button} from "@material-ui/core";
import {WrapperModal} from "../Styles/SharedStyledComponents";

const formArray = num => [...Array(num).keys()]


/*
* Content: year-month-date hour-minute
*
*/
const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ]
const limits = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029]

const month = []
months.forEach((item, index) => {
    month.push({item: limits[index]})
})

export default function(props) {
    const [currentMonth, handleMonth] = useState(0);
    const [currentDay, handleCurrentDay] = useState(0);
    const [currentYear, handleCurrentYear] = useState(2020);
    const [currentHour, handleCurrentHour] = useState(0);
    const [currentMinute, handleCurrentMinute] = useState(0);
    const [minuteError, handleError] = useState(false)
    const submit = () => {
        if (!(currentMinute >= 0 && currentMinute <= 59))
            handleError(true)
        else {
            const data = `${currentYear}-${currentMonth + 1}-${currentDay + 1} 
            ${currentHour + 1}:${currentMinute + 1}:00.000000`
            console.log("Data to send:", data);
            props.handleSubmit(data);
        }
    }
    // TODO: самбит для минут нормальный
    return (
        <WrapperModal>
                <div>
                    <InputLabel>Месяц</InputLabel>
                    <StyledSelect  onChange={e => handleMonth(e.target.value)}
                                  value={currentMonth}>
                        {months.map((item, index) =>
                            <MenuItem value={index}>{item}</MenuItem>
                        )}
                    </StyledSelect>
                </div>
                <div>
                    <InputLabel>Год</InputLabel>
                    <StyledSelect onChange={e => handleCurrentYear(e.target.value)}
                                  value={currentYear}>
                        {years.map((item) =>
                            <MenuItem value={item}>{item}</MenuItem>
                        )}
                    </StyledSelect>
                </div>
                <div>
                    <InputLabel>День</InputLabel>
                    <StyledSelect onChange={e => handleCurrentDay(e.target.value)}
                                  value={currentDay}>
                        {formArray(limits[currentMonth]).map(item => <MenuItem value={item}>{item + 1}</MenuItem>)}
                    </StyledSelect>
                </div>
                <div>
                    <InputLabel>Час</InputLabel>
                    <StyledSelect onChange={e => handleCurrentHour(e.target.value)}
                                  value={currentHour}>
                        {formArray(24).map(item => <MenuItem value={item}>{item + 1}</MenuItem>)}
                    </StyledSelect>
                </div>
                <div>
                    <TextField variant='outlined' label='Минуты' value={currentMinute + 1}
                               onChange={e => handleCurrentMinute(Number(e.currentTarget.value))}
                               error={minuteError}/>
                </div>
                <div>
                    <Button variant='contained' color='primary'
                    onClick={submit}>Сохранить изменения</Button>
                </div>
        </WrapperModal>
    )
}