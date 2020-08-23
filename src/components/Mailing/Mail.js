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
import Time from "./Modals/Time";
import Period from "./Modals/Period";
import ListContainer from './Modals/Container'
import FileUploader from "../UI/FileUploader";
import {addMailing, fetchProfiles} from "./API/api";
import Loader from "../UI/Loader";
import Mailings from "./Modals/Mailings";


export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            type: "text",
            text: "",
            form: null, // это анкета
            time: "2020-04-08 11:43:36",
            period: 1,
            groups: [],
            users: [],
            subs: [],
            all: false,
            modalComponent: null,
            modalIsOpen: false,
            availableForms: [],
            isComponentLoading: false
        }
    }

    sendData = () => {
        let {name, description, type, time, period, all, groups, users, subs, form, text} = this.state;
        if (time === "2020-04-08 11:43:36")
            time = null
        const data = {
            name, description, type, all, time, period, groups, users, subs,
            file: null,
        }
        if (!form)
            data.text = text;
        else
            data.form = form;
        console.log("Data to send: ", data)
        addMailing(data).then(res => console.log("Response: ", res))
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((this.state.type === 'form' && prevState.type === 'text') && !prevState.isComponentLoading) {
            this.setState({isComponentLoading: true});
            fetchProfiles().then(data => this.setState({availableForms: data, isComponentLoading: false}))
        }
    }

    handleTypeChange = val => {
        this.setState({type: val})
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
        this.setState({modalIsOpen: true})
        if (index === 0)
            this.setState({modalComponent: <Time data={this.state.time} handleSubmit={(data) => {
                    this.setState({modalIsOpen: false, time: data})}
                }/>})
        else if (index === 1)
            this.setState({modalComponent: <Period data={this.state.period} getData={data => {
                    this.setState({period: Number(data), modalIsOpen: false})
            }
                }/>})
        else // todo: прокидывать сюда селектеды
            this.setState({modalComponent: <ListContainer selectedItems={selected} type={index}
                                 handleSave={(data) => this.handleSave(data, index)}/> })
    }

    handleShow = () => {
        this.setState({modalIsOpen: true, modalComponent: <Mailings/>})
    }

    render() {
        const {name, type, modalComponent, modalIsOpen, all, form, availableForms, isComponentLoading, description} = this.state;
        let styles = null;
        if (modalIsOpen)
            styles = 'normalizeHeight'
        return (
            <section style={{position: 'relative'}} className={styles}>
                {isComponentLoading ? <Loader/> :
                    <React.Fragment>
                        <PageHeader title='Рассылки'/>
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
                                            <MenuItem value='form'>Анкеты</MenuItem>
                                            <MenuItem value='text'>Текстовая рассылка</MenuItem>
                                        </StyledSelect>
                                    </FormControl>
                                </div>
                                <Button onClick={this.handleShow} variant='contained' color='secondary'>Посмотреть текущие рассылки</Button>
                            </header>
                            <div className='textarea'>
                                <TextField value={description} onChange={e => this.setState({description: e.currentTarget.value})}
                                           variant='outlined' rows={4} multiline label='Краткое описание'/>
                                <FileUploader/>
                            </div>
                            <Wrapper>
                                {type === 'text'
                                    ?
                                    <div>
                                        <h3>Текст рассылки</h3>
                                        <textarea onChange={e => this.setState({text: e.currentTarget.value})}
                                                  placeholder='Текст рассылки'/>
                                        <br/>
                                        <FormControlLabel
                                            control={
                                                <Switch value={all}
                                                        onChange={e => this.setState({all: e.currentTarget.checked})}
                                                />}
                                            label="Отправить всем"
                                        />
                                    </div>
                                    :
                                    <ProfileContainer data={availableForms} switchVal={all} active={form}
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
                                <Button variant='contained' color='primary' onClick={this.sendData}>Отравить рассылку</Button>
                            </div>
                        </Container>
                        {createPortal(modalIsOpen &&
                            <ModalAdvanced toggleModal={() => this.setState({modalIsOpen: false})}>
                                {modalComponent}
                            </ModalAdvanced>,
                            document.getElementById('portal'))}
                    </React.Fragment>
                }
            </section>
        )
    }
}
