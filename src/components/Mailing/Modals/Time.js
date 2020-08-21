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

const dateParser = date => {
    // example date to parse: 2022-4-10 23:6:00.000000
    return [date.slice(0, 4), date.slice(5, 7), date.slice(8, 10), date.slice(11, 13), date.slice(14, 16)]
}

export default function(props) {
    const date = dateParser(props.data);
    const [currentMonth, handleMonth] = useState(Number(date[1]) - 1);
    const [currentDay, handleCurrentDay] = useState(Number(date[2]) - 1);
    const [currentYear, handleCurrentYear] = useState(Number(date[0]));
    const [currentHour, handleCurrentHour] = useState(Number(date[3]) - 1);
    const [currentMinute, handleCurrentMinute] = useState(String(date[4]));
    const [minuteError, handleError] = useState(false)


    console.log(dateParser("2016-04-08 11:43:36.309721"));
    const submit = () => {
        if (!(currentMinute >= 0 && currentMinute <= 59))
            handleError(true)
        else {
            const minuteHelper = currentMinute < 10 ? '0' + String(currentMinute) : currentMinute
            const monthHelper = currentMonth < 9 ? '0' + String(currentMonth + 1) : currentMonth + 1
            const dateHelper = currentDay < 9 ? '0' + String(currentDay + 1) : currentDay + 1
            const hourHelper = currentHour < 9 ? '0' + String(currentHour + 1) : currentHour + 1
            const data = `${currentYear}-${monthHelper}-${dateHelper} 
            ${currentHour + 1}:${minuteHelper}:00.000000`
            console.log("Data to send:", data);
            props.handleSubmit(data);
        }
    }

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
                    <TextField variant='outlined' label='Минуты' value={currentMinute}
                               onChange={e => handleCurrentMinute(e.currentTarget.value)}
                               error={minuteError}/>
                </div>
                <div>
                    <Button variant='contained' color='primary'
                    onClick={submit}>Сохранить изменения</Button>
                </div>
        </WrapperModal>
    )
}
