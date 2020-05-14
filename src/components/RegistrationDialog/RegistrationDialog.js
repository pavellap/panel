import React from 'react'
import './RegistrationDialog.css'
import PageHeader from "../UI/PageHeader";
import Configuration from "../Messages/Configuration";
import EditEntry from "../Messages/EditEntry";
import Axios from "axios";
import Loader from "../UI/Loader";
import url from '../config'
import ReactDOM from "react-dom";
import Modal from "../Modal/Modal";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            greetings: [],
            sectionId: 1,
            messages: [],
            questions: [],
            componentIsLoading: true,
            currentMessageText: "",
            idCounter: 1488,
            currentConfig: null,
            modalIsOpen: false,
            typeOfModal: null,
            contentModal: null
        }
    }

    componentDidMount() {
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
                }).catch(err => {
                    if (err.response.data.code === 401)
                        window.location= "/"
                    else
                        this.setState({componentIsLoading: false, modalOpen: true, typeOfModal: "success",
                            contentModal: err.response.data.error});
                    throw err
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
        const localURL = url + "/page/set";
        const greetings = [];
        this.state.greetings.forEach((item) => {
            if (item.id > 1000) {
                greetings.push(
                    {
                        type: "message",
                        description: "Одно из приветственных сообщений",
                        text: item.text,
                        name:  "Приветственное сообщение",
                        response: [
                            {
                                text: item.response[0].text,
                                description: "Согласие"
                            },
                            {
                                text: item.response[1].text,
                                description: "Несогласие"
                            },
                        ],
                        ans_type: 2
                    }
                )
            }
            else
                greetings.push(item)
        });
        this.setState({componentIsLoading: true});
        Axios.post(localURL, {
            config_id: this.state.currentConfig,
            greetings: greetings,
            list: this.state.messages,
            page: this.state.sectionId
        }).catch(err => {
            if (err.response.data.code === 401)
                window.location= "/"
            else
                this.setState({componentIsLoading: false, modalOpen: true, typeOfModal: "success",
                    contentModal: err.response.data.error});
            throw err
        }).then(res => {
            console.log(res);
            if (res.status === 200) {
                this.setState({componentIsLoading: false, modalIsOpen: true, typeOfModal: "success", contentModal:
                        "Данные успешно сохранены"});
            }
            else
                this.setState({componentIsLoading: false, modalIsOpen: true, typeOfModal: "success", contentModal:
                        "Произошла ошибка на сервере. Попробуйте сохранить данные позже"});

        });
        console.log("Данные, отправленные на сервер:", {
            config_id: this.state.currentConfig,
            greetings: greetings,
            list: this.state.messages,
            page: this.state.sectionId
        })
    };


    handleChange = (val, id, type) => {
        let pos;
        if (type === "greeting") {
            this.state.greetings.forEach((item, index) => {
                if (item.id === id)
                    pos = index;
            });
            this.setState(prevState => {
                const newArray = this.state.greetings;
                newArray[pos].text = val;
                return {
                    greetings: newArray
                }
            });
        }
        else {
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
        }
    };

    handleDelete = (id) => {
        let newArray = this.state.greetings;
        newArray = newArray.filter(item => {
            return item.id !== id
        });
        this.setState(prevState => {
            return {greetings: newArray}
        });
    };

    // Добавление нового приветственного сообщения
    handleAdd = () => {
        const newArray = this.state.greetings;
        console.log("Структура добавляемого сообщения", newArray[0]);
        newArray.push({
            type: "message",
            id: this.state.idCounter,
            description: "Одно из приветственных сообщений",
            text: this.state.currentMessageText,
            name:  "Приветственное сообщение",
            response: [
                {
                    id: this.state.idCounter * 2,
                    text: "Да",
                    description: "Согласие"
                },
                {
                    id: this.state.idCounter * 3,
                    text: "Нет",
                    description: "Несогласие"
                },
            ],
            ans_type: 2
        });
        this.setState(prevState => {
            return {greetings: newArray, idCounter: this.state.idCounter + 1}
        })
    };

    // Изменение текущего содержимого поля для ввода текста приветственного сообщения
    handleAddMessage = (val) => {
        this.setState({
            currentMessageText: val
        })
    };

    handleClick = () => {
        this.setState({modalIsOpen: !this.state.modalIsOpen})
    };

    render() {
        let renderContent = null;
        if (this.state.greetings.length > 0) {
            renderContent = (
                <React.Fragment>
                    <h4>Приветственные сообщения</h4>
                    {this.state.greetings.map((item) => (
                        <React.Fragment>
                            <EditEntry ans_type={item.ans_type} name={item.name} description={item.description}
                             text={item.text} getCurrentData={(val) => this.handleChange(val, item.id, "greeting")}
                             response={item.response} key={item.id}/>
                             <div onClick={() => this.handleDelete(item.id)} style={{
                                 backgroundColor: "#f16069",
                                 cursor: "pointer",
                                 padding: "7px 25px",
                                 borderRadius: 8,
                                 color: "#fff",
                                 margin: "25px auto",
                                 textAlign: "center",
                                 width: "370px",
                                 fontWeight: "bolder"
                             }}
                             >Удалить сообщение</div>
                        </React.Fragment>

                    ))}
                </React.Fragment>
            )
        }
        let content;
        if (this.state.componentIsLoading)
            content = <Loader/>;
        else content = (
            <React.Fragment>
                <Configuration configs={this.state.configs} handleConfig={val => {
                    this.props.handleConfig(val);
                    console.log("Меняем на конфиг:", val);
                    Axios.get(url + "/config/choose/id=" + val).then(() =>
                        window.location.reload(false));
                }} currentConfig={this.state.currentConfig}/>
                <form>
                    {this.state.messages.map((item) => (
                        <EditEntry ans_type={item.ans_type} name={item.name} description={item.description} text={item.text}
                                   getCurrentData={(val) => this.handleChange(val, item.id, "message")} response={item.response}/>
                    ))}

                    <div className='registration-dialog-messages'>
                        <div className='registration-dialog-messages-entry'>
                            <EditEntry name='Новое сообщение' description='Поле для ввода нового приветственного сообщения'
                            text="" getCurrentData={val => this.handleAddMessage(val)}/>
                            <div className='registration-dialog-messages-button' onClick={this.handleAdd}>Добавить сообщение</div>
                        </div>
                        {renderContent}
                    </div>
                </form>
                <div className='buttons-wrapper'>
                    <div className='registration-dialog-save' onClick={this.sendData}>Сохранить данные</div>
                </div>
            </React.Fragment>
        );
        return (
            <section className='registration-dialog-container'>
                <PageHeader title='Диалог Регистрации'/>
                {content}
                {ReactDOM.createPortal( this.state.modalIsOpen && <Modal type={this.state.typeOfModal} text={this.state.contentModal}
                handleClick={this.handleClick}/>, document.getElementById('portal'))}
            </section>
        )
    }
}