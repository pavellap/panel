import React from 'react'
import './RegistrationDialog.css'
import PageHeader from "../UI/PageHeader";
import Configuration from "../Messages/Configuration";
import EditEntry from "../Messages/EditEntry";
import Axios from "axios";

export default class extends React.Component {
    constructor(props) {
        console.log("Получаем пропсы");
        super(props);
        this.state = {
            helloMessages: [],
            sectionId: 1,
            messages: [],
            questions: []
        }
    }

    componentDidMount() {
        let configId = this.props.id;
        const url = "http://188.32.187.157:5000/getpage/config_id=" + configId + '&page_id=' + this.state.sectionId;
        let userData;
        Axios.get(url).then(response => {
            console.log("Данные:");
            console.log(response);
            userData = response.data.list;
        }).then(() => {
            userData.forEach(item => {
                this.setState(prevState => {
                    const newArray = this.state.messages;
                    newArray.push(<EditEntry text={item.name} value={item.text} helpInfo={item.description}/>);
                    return {
                        messages: newArray
                    }
                })
            })
        });
    }

    handleChange = (content, type) => {
        if (type === 'current') {
            this.setState(prevState => {
                return {currentMessageText: content}
            })
        }
    };

    handleAdd = () => {
        const newArray = this.state.helloMessages;
        const newId = Math.round(Math.random() * 100);
        newArray.push({
            render: (<div style={{}}>
                <span style={{marginRight: 25}}>{newId}</span>
                <span>{this.state.currentMessageText}</span>
            </div>),
            id: newId
        });
        this.setState(prevState => {
            return {helloMessages: newArray}
        })
    };

    render() {
        console.log("Рендерим Регистрацию с конфигами:", this.props.configs);
        let renderContent = null;
        if (this.state.helloMessages.length > 0) {
            renderContent = (
                <React.Fragment>
                    <h4>Приветственные сообщения</h4>
                    {this.state.helloMessages.map((item, index) =>  item.render)}
                </React.Fragment>
            )
        }
        return (
            <section className='registration-dialog-container'>
                <PageHeader title='Диалог Регистрации'/>
                <Configuration/>
                <form>
                    {this.state.messages.map((item) => item)}
                    <div className='registration-dialog-messages'>
                        <div className='registration-dialog-messages-entry'>
                            <EditEntry text='Текст нового приветственного сообщения'
                            inputValue='Текст сообщения' getCurrentData={(content) => this.handleChange(content, "current")} />
                        </div>
                        {renderContent}
                    </div>
                </form>
                <div className='buttons-wrapper'>
                    <div className='registration-dialog-messages-button' onClick={this.handleAdd}>Добавить сообщения</div>
                    <div className='registration-dialog-save' onClick={() => this.props.sendData(this.state)}>Сохранить данные</div>
                </div>
            </section>
        )
    }
}