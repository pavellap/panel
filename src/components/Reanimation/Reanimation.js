import React from 'react'
import './Reanimation.css'
import PageHeader from "../UI/PageHeader";
import EditEntry from "../Messages/EditEntry";
import SubmitButton from "../Messages/SubmitButton";

export default class Reanimation extends React.Component {
    render() {
        return (
            <section className='reanimation-container'>
                <PageHeader title='Сообщения для пользователей, у которых закончилась подписка'/>
                <form>
                    <EditEntry text='Сообщение, которое отправляется пользователю через 1
                       месяц после отключения подписки.' value='Сообщение'/>
                    <EditEntry text='Одна неделя' value='Сообщение'/>
                    <EditEntry text='Одна неделя' value='Сообщение'/>
                    <SubmitButton/>
                </form>
            </section>
        )
    }
}