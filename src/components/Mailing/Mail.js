import React, {Component} from "react";
import PageHeader from "../UI/PageHeader";
import {TextField, Typography, Tooltip, Button,
        RadioGroup, Radio, FormControlLabel,
    FormControl, FormLabel, Select, MenuItem, InputLabel, withStyles} from "@material-ui/core";
import ProfileContainer from "./ProfileContainer";
import Switch from "@material-ui/core/Switch";
import {Container, Wrapper, StyledSelect} from "../Groups/SharedStyledComponents";
import {createPortal} from 'react-dom'
import ModalAdvanced from "../Modal/ModalAdvanced";
import {profilesHardCode} from "../Groups/Templates/Template";
/*
    * Установка времени отправки анкеты
    * Установка переодичности отправки анкеты: каждый день/неделю/месяц/год
    *
*/


export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            typeOfMailing: "text",
            textValue: "",
            modalComponent: null,
            modalIsOpen: false
        }
    }

    handleTypeChange = val => {
        if (val === 'text')
            this.setState({typeOfMailing: "text"})
        else
            this.setState({typeOfMailing: "profile"})
    }

    handleNameChange = val => this.setState({name: val})
    handleDescriptionChange = val => this.setState({description: val})

    render() {
        const {name, description, typeOfMailing,
            textValue, modalComponent, modalIsOpen} = this.state;
        return (
            <section>
                <PageHeader title='Рассылка'/>
                <Container>
                    <header>
                        <div>
                            <TextField variant='outlined' label='Название рассылки'
                                       style={{marginRight: 30}}/>
                            <FormControl>
                                <InputLabel>Тип рассылки</InputLabel>
                                <StyledSelect
                                    onChange={e => this.setState({typeOfMailing: e.target.value})}
                                    value={typeOfMailing}>
                                }}
                                    <MenuItem value='profile'>Анкеты</MenuItem>
                                    <MenuItem value='text'>Текстовая рассылка</MenuItem>
                                </StyledSelect>
                            </FormControl>
                        </div>
                        <Button variant='contained' color='secondary'>Посмотреть текущие рассылки</Button>
                    </header>
                    <div className='textarea'>
                        <TextField variant='outlined' rows={4} multiline label='Краткое описание'/>
                    </div>
                    <Wrapper>
                        {typeOfMailing === 'text'
                            ?
                            <div>
                                <h3>Текст рассылки</h3>
                                <textarea placeholder='Текст рассылки'/>
                                <br/>
                                <FormControlLabel
                                    control={<Switch />}
                                    label="Отправить всем"
                                />
                            </div>
                            :
                            <ProfileContainer data={profilesHardCode}/>}
                    </Wrapper>
                    <footer>
                        {['Установить время', 'Выбрать периодичность', 'Группы', 'Пользователи', 'Тарифы']
                            .map((item, index) =>
                                <Button key={index} variant='contained' color='primary'>{item}</Button>)}
                    </footer>
                    <div style={{display: 'flex', justifyContent: 'center', padding: 30}}>
                        <Button variant='contained' color='primary'>Отравить рассылку</Button>
                    </div>
                </Container>
                {createPortal(modalIsOpen &&
                    <ModalAdvanced>
                        {modalComponent}
                    </ModalAdvanced>,
                    document.getElementById('portal'))}
            </section>
        )
    }
}