import React from 'react'
import './RegistrationDialog.css'
import PageHeader from "../UI/PageHeader";
import Configuration from "../Messages/Configuration";
import EditEntry from "../Messages/EditEntry";
import Axios from "axios";
import Loader from "../UI/Loader";
import EditProfile from "../Modal/EditProfile";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            greetings: [],
            sectionId: 1,
            messages: [],
            questions: [],
            componentIsLoading: false,
            currentMessageText: ""
        }
    }

    componentDidMount() {
        let configId = this.props.id;
        const url = "http://188.32.187.157:5000/getpage/config_id=" + configId + '&page_id=' + this.state.sectionId;
        let messages;
        let greetings;
        Axios.get(url).then(response => {
            console.log("Данные:");
            console.log(response);
            messages = response.data.list;
            greetings = response.data.hello_msgs;
            console.log("Greetings:", greetings)
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
                // понять, в каком поле тела лежит текста
                this.setState(prevState => {
                    const newArray = this.state.greetings;
                    newArray.push(item);
                    return {
                        greetings: newArray
                    }
                })
            })
        });
    }

    handleChange = (content) => {
        console.log(content);
        this.setState(prevState => {
            return {currentMessageText: content}
        })
    };

    handleAdd = () => {
        const newArray = this.state.greetings;
        newArray.push(this.state.currentMessageText);
        this.setState(prevState => {
            return {greetings: newArray}
        })
    };

    render() {
        let renderContent = null;
        if (this.state.greetings.length > 0) {
            renderContent = (
                <React.Fragment>
                    <h4>Приветственные сообщения</h4>
                    {this.state.greetings.map(item => (
                        <EditEntry type={item.type} name={item.name} description={item.description} text={item.text}/>
                    ))}
                </React.Fragment>
            )
        }
        let content;
        if (this.state.componentIsLoading)
            content = <Loader/>;
        else content = (
            <React.Fragment>
                <form>

                    {this.state.messages.map((item) => (
                        <EditEntry type={item.type} name={item.name} description={item.description} text={item.text}/>
                    ))}

                    <div className='registration-dialog-messages'>
                        <div className='registration-dialog-messages-entry'>
                            <EditEntry name='Новое сообщение' description='Поле для ввода нового приветственного сообщения'
                            text="" getCurrentData={val => this.handleChange(val)}/>
                        </div>
                        {renderContent}
                    </div>
                </form>
                <div className='buttons-wrapper'>
                    <div className='registration-dialog-messages-button' onClick={this.handleAdd}>Добавить сообщения</div>
                    <div className='registration-dialog-save' onClick={() => this.props.sendData(this.state)}>Сохранить данные</div>
                </div>
            </React.Fragment>
        );
        return (
            <section className='registration-dialog-container'>
                <PageHeader title='Диалог Регистрации'/>
                <Configuration/>
                {content}
                <EditEntry ans_type={2} description='Это тестовое описание назначения сообщения' text='Текст обычного сообщения'
                           name='Название сообщения' response={[
                    {
                        id: 30,
                        text: "Первое поле",
                        description: "Описание"
                    },
                    {
                        id: 31,
                        text: "Второе поле",
                        description: "Описание"
                    },
                    {
                        id: 32,
                        text: "Третье поле",
                        description: "Описание"
                    },
                    {
                        id: 33,
                        text: "Четвёртое поле",
                        description: "Описание"
                    }
                ]}/>
            </section>
        )
    }
}