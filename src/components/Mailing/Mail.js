import React, {Component} from "react";
import PageHeader from "../UI/PageHeader";
import {TextField, Typography, Tooltip, Button,
        RadioGroup, Radio, FormControlLabel, FormControl, FormLabel} from "@material-ui/core";
import styled from "styled-components";

const Wrapper = styled.div`
    padding-top: 30px;
    padding-left: 30px;
    header {
        padding-right: 30px;
        display: flex;
        justify-content: space-between;
        div {
            margin-right: 40px;
            display: flex;
        }
    }
`

const Container = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 30px;
`


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
            textValue: ""
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
        const {name, description, typeOfMailing, textValue} = this.state;
        return (
            <section>
                <PageHeader title='Рассылка'/>
                <Wrapper>
                    <header>
                        <div>
                            <div>
                                <TextField onChange={(e) => this.handleNameChange(e.currentTarget.value)}
                                           variant='outlined' label='Название анкеты' value={name}
                                           required /*error={error}*/ /*helperText={errorText}*//>
                            </div>
                            <div>
                                <TextField onChange={(e) => this.handleDescriptionChange(e.currentTarget.value)}
                                           variant='outlined' label='Краткое описание' value={description}
                                           required /*error={error}*/ /*helperText={errorText}*//>
                            </div>
                        </div>
                        <Button size='medium' variant="contained" color="primary">
                            Просмотреть текущие рассылки
                        </Button>
                    </header>
                    <section>
                        <Container>
                            <FormControl>
                                <FormLabel component='legend'>Выберите вид рассылки</FormLabel>
                                <RadioGroup row aria-label="position">
                                    <FormControlLabel
                                        onChange={() => this.handleTypeChange('text')}
                                        control={<Radio color="primary" />}
                                        label="Текст"
                                        labelPlacement="top"
                                        checked={typeOfMailing === 'text'}
                                    />
                                    <FormControlLabel
                                        onChange={() => this.handleTypeChange('profile')}
                                        control={<Radio color="primary" />}
                                        label="Анкета"
                                        labelPlacement="top"
                                        checked={typeOfMailing === 'profile'}
                                    />
                                </RadioGroup>
                            </FormControl>
                            {typeOfMailing === 'text' ?
                                    <textarea value={textValue}/> :
                                null
                            }
                        </Container>
                    </section>
                </Wrapper>
            </section>
        )
    }
}