import React,  {Component} from "react";
import PageHeader from "../components/UI/PageHeader";
import Configuration from "../components/Configuration/Configuration";
import Loader from "../components/UI/Loader";
import MessageItem from "./MessageItem";
import {List, Button} from "@material-ui/core";
import styled from "styled-components";
import {fetchData} from "./api";
import {connect} from 'react-redux'

const MessagesWrapper = styled.section`
    margin: 0 auto;
    width: 70%;
    min-width: 600px;
    max-width: 850px;
`

// в пропсах: название раздела, id раздела
class MessagesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [], // все поля для ввода сообщений
            componentIsLoading: true, // статус получения данных с сервера
            modalIsOpen: false,
            changedMessages: [],
            changedResponses: []
        }
    }

    componentDidMount() {
        const {config, id} = this.props
        console.log("Замонтировали с конфигами: ", config)

        if (config)
            fetchData(config.id, id).then(res => {
                this.setState({messages: res, componentIsLoading: false})
            })
    }

    postData = () => {
        console.log("Данные на отправку:", this.state)
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Заапдейтили")
        if (prevProps.id !== this.props.id || prevProps.config !== this.props.config) {
            if (!prevState.componentIsLoading)
                this.setState({componentIsLoading: true})
            const {config, id} = this.props
            if (config)
                fetchData(config.id, id).then(res => {
                    this.setState({messages: res, componentIsLoading: false})
                })
        }
    }

    handleChange = (val, id) => {
        let pos;
        this.state.messages.forEach((item, index) => {
            if (item.id === id) {
                pos = index;
                this.setState({})
            }

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
        console.log("Рендерим сообщения...")
        return(
            <section style={{position: "relative"}}>
                <PageHeader title={title}/>
                {componentIsLoading ? <Loader/> :
                    <React.Fragment>
                        <Configuration/>
                        <MessagesWrapper>
                            <List>
                                {messages && messages.map(item => (
                                    <MessageItem key={item.id} name={item.name}
                                                 description={item.description}
                                                 ans_type={item.ans_type} id={item.id}
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
                    <Button variant='contained'
                            color='primary'
                            onClick={this.postData}
                    >
                        Сохранить изменения
                    </Button>
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        config: state.config.currentConfig
    }
}

export default connect(mapStateToProps, null)(MessagesContainer)
