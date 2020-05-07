import React from 'react'
import './RegistrationDialog.css'
import PageHeader from "../UI/PageHeader";
import Configuration from "../Messages/Configuration";
import EditEntry from "../Messages/EditEntry";
import Axios from "axios";
import Loader from "../UI/Loader";
import url from '../config'

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            greetings: [],
            sectionId: 1,
            messages: [],
            questions: [],
            componentIsLoading: true,
            currentMessageText: ""
        }
    }

    componentDidMount() {
        let userData;
        Axios.get(url + "/config/get").then(configsData => { // сначала получаем конфиги
            this.setState({configs: configsData.data});
            Axios.get(url + "/config/current").then(res => { // получаем текущий конфиг
                // получаем саму страницу
                this.setState({currentConfig: res.data.id});
                let messages;
                let greetings;
                Axios.get(url + "/page/get/config_id=" + res.data.id + "&page_id=" + this.state.sectionId).then(response => {
                    console.log("Структура полученного запроса:", response.data);
                    messages = response.data.list;
                    greetings = response.data.greetings;
                    console.log("Структура приветственного сообщения:", greetings[0])
                }).then(() => {
                    messages.forEach(item => {
                        this.setState(prevState => {
                            const newArray = this.state.messages;
                            newArray.push(item);
                            return {
                                messages: newArray,
                                componentIsLoading: false
                            }
                        })
                    });
                    greetings.forEach(item => {
                        // понять, в каком поле тела лежит текст
                        this.setState(prevState => {
                            const newArray = this.state.greetings;
                            newArray.push(item);
                            return {
                                greetings: newArray
                            }
                        })
                    })
                });
            });
        });
    }

    sendData = () => {
        const localURL = url + "/page/set/config_id=" + this.props.id + "&page_id=" + this.state.sectionId;
        Axios.post(localURL, {
            config_id: this.props.id,
            greetings: this.state.greetings,
            list: this.state.messages,
            page: this.state.sectionId
        });
        console.log("Данные, отправленные на сервер:", {
            config_id: this.props.id,
            greetings: this.state.greetings,
            list: this.state.messages,
            page: this.state.sectionId
        })
    };


    handleChange = (val, id) => {
        let pos;
        // находим позицию нашего элемента в исходном массиве
        this.state.messages.forEach((item, index) => {
            if (item.id === id)
                pos = index;
        });
        this.setState(prevState => {
            const newArray = this.state.messages;
            newArray[pos].text = val;
            return {
                messages: newArray
            }
        });
    };

    // Добавление нового приветственного сообщения
    handleAdd = () => {
        const newArray = this.state.greetings;
        newArray.push(this.state.currentMessageText);
        this.setState(prevState => {
            return {greetings: newArray}
        })
    };

    // Изменение текущего содержимого поля для ввода текста приветственного сообщения
    handleAddMessage = (val) => {
        this.setState({
            currentMessageText: val
        })
    };

    render() {
        let renderContent = null;
        if (this.state.greetings.length > 0) {
            renderContent = (
                <React.Fragment>
                    <h4>Приветственные сообщения</h4>
                    {this.state.greetings.map((item) => (
                        <EditEntry ans_type={item.ans_type} name={item.name} description={item.description} text={item.text}
                                   getCurrentData={(val) => this.handleChange(val, item.id)} response={item.response}/>
                    ))}
                </React.Fragment>
            )
        }
        let content;
        if (this.state.componentIsLoading)
            content = <Loader/>;
        else content = (
            <React.Fragment>
                <Configuration configs={this.state.configs} handleConfig={val => this.props.handleConfig(val)}
                               currentConfig={this.state.currentConfig}/>
                <form>
                    {this.state.messages.map((item) => (
                        <EditEntry ans_type={item.ans_type} name={item.name} description={item.description} text={item.text}
                                   getCurrentData={(val) => this.handleChange(val, item.id)} response={item.response}/>
                    ))}

                    <div className='registration-dialog-messages'>
                        <div className='registration-dialog-messages-entry'>
                            <EditEntry name='Новое сообщение' description='Поле для ввода нового приветственного сообщения'
                            text="" getCurrentData={val => this.handleAddMessage(val)}/>
                        </div>
                        {renderContent}
                    </div>
                </form>
                <div className='buttons-wrapper'>
                    <div className='registration-dialog-messages-button' onClick={this.handleAdd}>Добавить сообщения</div>
                    <div className='registration-dialog-save' onClick={this.sendData}>Сохранить данные</div>
                </div>
            </React.Fragment>
        );
        return (
            <section className='registration-dialog-container'>
                <PageHeader title='Диалог Регистрации'/>
                {content}
            </section>
        )
    }
}