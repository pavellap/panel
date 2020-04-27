import React from 'react'
import './RegistrationDialog.css'
import PageHeader from "../UI/PageHeader";
import Configuration from "../Messages/Configuration";
import EditEntry from "../Messages/EditEntry";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstMessage: "",
            nameMessage: "",
            successMessage: "",
            helloMessages: [],
            currentMessageText: "",
            sectionId: 1
        }
    }

    handleChange = (content, type) => {
        if (type === 'current') {
            this.setState(prevState => {
                return {currentMessageText: content}
            })
        }
        console.log(content);
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
                    <EditEntry text='Первое сообщение, которое видит пользователь, начав знакомство с ботом'
                    inputValue='Текст сообщения'/>
                    <EditEntry text='Текст запроса на ввод имени'
                               inputValue='Текст сообщения'/>
                    <EditEntry text='Текст сообщения при успешной регистрации'
                               inputValue='Текст сообщения'/>
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