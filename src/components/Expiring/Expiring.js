import React from "react";
import './Expiring.css'
import PageHeader from "../UI/PageHeader";
import Configuration from "../Messages/Configuration";
import EditEntry from "../Messages/EditEntry";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tenDays: "",
            threeDays: "",
            oneDay: ""
        }
    }

    handleChange = (content, type) => {
        if (type === "10days")
            this.setState({tenDays: content});
        else if (type === "3days")
            this.setState({threeDays: content});
        else
            this.setState({oneDay: content})
    };

    render() {
        return (
            <section>
                <PageHeader title='Сообщения перед концом подписки'/>
                <Configuration name='Для постоянных' handleClick={(id) => this.props.handleClick(id)}/>
                <form>
                    <EditEntry text='Сообщение, отправляемое за 10 дней до окончания подписки' inputValue='Текст сообщения'
                               getCurrentData={(content) => this.handleChange(content, "10days")}/>
                    <EditEntry text='Сообщение, отправляемое за 3 дня до окончания подписки' inputValue='Текст сообщения'
                               getCurrentData={(content) => this.handleChange(content, "3days")}/>
                    <EditEntry text='Сообщение, отправляемое за день до окончания подписки' inputValue='Текст сообщения'
                               getCurrentData={(content) => this.handleChange(content, "1day")}/>
                    <div className='registration-dialog-save' onClick={() => this.props.sendData(this.state)}>Сохранить данные</div>
                </form>
            </section>
        )
    }
}