import React,  {Component} from "react";
import PageHeader from "../components/UI/PageHeader";
import Configuration from "../components/Messages/Configuration";
import Axios from "axios";
import Loader from "../components/UI/Loader";
import url from '../config'
import MessageItem from "./MessageItem";
import {List, Button} from "@material-ui/core";
import styled from "styled-components";
import {fetchData} from "./api";

const MessagesWrapper = styled.section`
    margin: 0 auto;
    width: 70%;
    min-width: 600px;
    max-width: 850px;
`

const hardCode = [
    {
	    id: 1,
	    name: 'Первое сообщение',
	    description: 'Описание к первому сообщению',
	    text: 'Текст сообщения',
	    ans_type: 0,
        file: 'attachment.json',
    },
    {
        id: 2,
        name: 'Второе сообщение',
        description: 'Описание ко второму сообщению',
        text: 'Текст сообщения',
        ans_type: 2,
        response: [{
                id: 2,
                text: 'Текст обратной связи',
                description: 'Описание обратной связи'
            },
            {
                id: 3,
                text: 'Шаблон',
                description: 'Шаблон'
            },
        ],
        file: 'attachment.json',
    },
    {
        id: 3,
        name: 'Третье сообщение',
        description: 'Описание к первому сообщению',
        text: 'Текст сообщения',
        ans_type: 0,
        file: 'attachment.json',
    },

]

// в пропсах: название раздела, id раздела
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: hardCode, // все поля для ввода сообщений
            sectionId: props.id,
            componentIsLoading: false, // статус получения данных с сервера
            modalIsOpen: false,
        }
    }
    // в редаксе будем хранить: все конфиги, текущий конфиг
    // данные по разделу получаем по: sectionId, currentConfig
    componentDidMount() {
        const {currentConfig, sectionId} = this.state;
        fetchData(currentConfig, sectionId)
    }
    postData = () => {

    };



    handleChange = (val, id) => {
        let pos;
        this.state.messages.forEach((item, index) => {
            if (item.id === id)
                pos = index;
        });
        this.setState(() => {
            const newArray = this.state.messages;
            newArray[pos].text = val;
            return {
                messages: newArray
            }
        });
    };

    handleResponse = (value, id) => {
        let position;
        this.state.response.forEach((item, index) => {
            if (item.id === id)
                position = index;
        })
        this.state(() => {
            const array = this.state.response;
            array[position] = value;
            return {
                response: array
            }
        })
    }

    render() {

        const {title} = this.props;
        const {componentIsLoading, configs, currentConfig, messages} = this.state;
        return(
            <section style={{position: "relative"}}>
                <PageHeader title={title}/>
                {componentIsLoading ? <Loader/> :
                    <React.Fragment>
                        <Configuration configs={configs} handleConfig={val => {
                            this.props.handleConfig(val);
                            console.log("Меняем на конфиг:", val);
                            // пофиксить баг с текущим конфигом
                            Axios.get(url + "/config/choose/id=" + val + "/" +
                                localStorage.getItem('token')).then(() => {
                                window.location.reload(false)
                            });
                        }} currentConfig={currentConfig}/>
                        <MessagesWrapper>
                            <List>
                                {messages.map(item => (
                                    <MessageItem key={item.id} name={item.name}
                                                 description={item.description}
                                                 ans_type={item.ans_type}
                                                 text={item.text} response={item.response}
                                                 handleChange={val => this.handleChange(val, item.id)}
                                                 handleResponse={this.handleResponse}
                                    />
                                ))}
                            </List>
                        </MessagesWrapper>
                    </React.Fragment>
                }

                <div style={{display: 'flex', justifyContent: 'center', paddingTop: 20}}>
                    <Button variant='contained' color='primary'>Сохранить изменения</Button>
                </div>
            </section>
        )
    }

}
