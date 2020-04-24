import React from 'react'
import './Reanimation.css'
import PageHeader from "../UI/PageHeader";
import EditEntry from "../Messages/EditEntry";
import SubmitButton from "../Messages/SubmitButton";

export default class Reanimation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oneWeek: "",
            oneMonth: "",
            threeMonths: ""
        }
    }
    handleChange = (content, type) => {
        if (type === '1week') {
            this.setState(prevState => {
                return {oneWeek: content}
            })
        }
        else if (type === '1month')
            this.setState(prevState => {
                return {oneMonth: content}
            });
        else if (type === "3months")
            this.setState(prevState => {
                return {threeMonths: content}
            });
    };

    render() {
        return (
            <section className='reanimation-container'>
                <PageHeader title='Сообщения для пользователей, у которых закончилась подписка'/>
                <form>
                    <EditEntry text='Сообщение, которое отправляется пользователю через 1
                       неделю после отключения подписки.' value='Текст сообщения'
                       getCurrentData={(content) => this.handleChange(content, "1week")}/>
                    <EditEntry text='Сообщение, которое отправляется пользователю через 1
                       месяц после отключения подписки.' value='Текст сообщения'
                       getCurrentData={(content) => this.handleChange(content, "1month")}/>
                    <EditEntry text='Сообщение, которое отправляется пользователю через 3
                       месяца после отключения подписки.' value='Текст сообщения'
                       getCurrentData={(content) => this.handleChange(content, "3months")}/>
                    <div className='registration-dialog-save' onClick={() => this.props.sendData(this.state)}>Сохранить данные</div>
                </form>
            </section>
        )
    }
}