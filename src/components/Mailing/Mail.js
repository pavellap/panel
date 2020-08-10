import React, {Component} from "react";
import PageHeader from "../UI/PageHeader";
import {TextField, Button,
    FormControlLabel, FormControl, MenuItem,
    InputLabel} from "@material-ui/core";
import ProfileContainer from "./ProfileContainer";
import Switch from "@material-ui/core/Switch";
import {Container, Wrapper, StyledSelect} from "./Styles/SharedStyledComponents";
import {createPortal} from 'react-dom'
import ModalAdvanced from "../Modal/ModalAdvanced";
import {profilesHardCode} from "./Templates/Template";
import Time from "./Modals/Time";
import Period from "./Modals/Period";
import ListContainer from './Modals/Container'
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
            type: "text",
            text: "",
            form: null, // это анкета
            time: null,
            period: null,
            groups: [],
            users: [],
            subs: [],
            all: false,
            modalComponent: null,
            modalIsOpen: false
        }
    }

    handleTypeChange = val => {
        if (val === 'text')
            this.setState({type: "text"})
        else
            this.setState({type: "profile"})
    }
    handleNameChange = val => this.setState({name: val})
    handleDescriptionChange = val => this.setState({description: val})
    handleSave = (item, type) => {
        this.setState({modalIsOpen: false})
        if (type === 2)
            this.setState({groups: item})
        else if (type === 3)
            this.setState({users: item})
        else
            this.setState({subs: item});
    }
    handleModalComponent = (index) => {
        let selected;
        if (index === 2)
            selected = this.state.groups;
        else if (index === 3)
            selected = this.state.users;
        else
            selected = this.state.subs;
        console.log('Got index: ', index)
        this.setState({modalIsOpen: true})
        if (index === 0)
            this.setState({modalComponent: <Time handleSubmit={(data) => {
                    this.setState({modalIsOpen: false, time: data})}
                }/>})
        else if (index === 1)
            this.setState({modalComponent: <Period/>})
        else // todo: прокидывать сюда селектеды
            this.setState({modalComponent: <ListContainer selectedItems={selected} type={index}
                                 handleSave={(data) => this.handleSave(data, index)}/> })
    }

    render() {
        console.log('State after change:', this.state)
        const {name, description, type,
            text, modalComponent, modalIsOpen, all, form} = this.state;
        let styles = null;
        if (modalIsOpen)
            styles = 'normalizeHeight'
        return (
            <section className={styles}>
                <PageHeader title='Рассылка'/>
                <Container>
                    <header>
                        <div>
                            <TextField variant='outlined' label='Название рассылки'
                                       style={{marginRight: 30}} value={name}
                                       onChange={e => this.setState({name: e.currentTarget.value})}/>
                            <FormControl>
                                <InputLabel>Тип рассылки</InputLabel>
                                <StyledSelect
                                    onChange={e => this.setState({type: e.target.value})}
                                    value={type}>
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
                        {type === 'text'
                            ?
                            <div>
                                <h3>Текст рассылки</h3>
                                <textarea placeholder='Текст рассылки'/>
                                <br/>
                                <FormControlLabel
                                    control={
                                        <Switch value={all}
                                                onChange={e => this.setState({all: e.target.value})}
                                        />}
                                    label="Отправить всем"
                                />
                            </div>
                            :
                            <ProfileContainer data={profilesHardCode} switchVal={all} active={form}
                                              handleSwitch={e => this.setState({all: e.target.value})}
                                              handleActive={id => this.setState({form: id})}/>}
                    </Wrapper>
                    <footer>
                        {['Установить время', 'Выбрать периодичность', 'Группы', 'Пользователи', 'Тарифы']
                            .map((item, index) =>
                                <Button key={index} variant='contained' color='primary'
                                onClick={() => this.handleModalComponent(index)}>
                                    {item}
                                </Button>)}
                    </footer>
                    <div style={{display: 'flex', justifyContent: 'center', padding: 30}}>
                        <Button variant='contained' color='primary'>Отравить рассылку</Button>
                    </div>
                </Container>
                {createPortal(modalIsOpen &&
                    <ModalAdvanced toggleModal={() => this.setState({modalIsOpen: false})}>
                        {modalComponent}
                    </ModalAdvanced>,
                    document.getElementById('portal'))}
            </section>
        )
    }
}