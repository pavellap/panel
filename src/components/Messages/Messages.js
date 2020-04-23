import React from 'react'
import './Messages.css'
import PageHeader from "../UI/PageHeader";
import EditEntry from "./EditEntry";
import SubmitButton from "./SubmitButton";
import Configuration from "./Configuration";



export default class Messages extends React.Component {

    render() {
        return (
            <section className='Messages'>
                <PageHeader title='Настройка содержимого сообщений'/>
                <Configuration name='Для постоянных' handleClick={(id) => this.props.handleClick(id)}/>
                <form>
                    <EditEntry text='Приветственное сообщение' value='Привет, чо каво?' helpInfo='Всплывающая подсказка'/>
                    <EditEntry text='Приветственное сообщение' value='Привет, чо каво?' helpInfo='Всплывающая подсказка'/>
                    <EditEntry text='Приветственное сообщение' value='Привет, чо каво?' helpInfo='Всплывающая подсказка'/>
                    <EditEntry text='Приветственное сообщение' value='Привет, чо каво?' helpInfo='Всплывающая подсказка'/>
                    <EditEntry text='Приветственное сообщение' value='Привет, чо каво?' helpInfo='Всплывающая подсказка'/>
                    <EditEntry text='Приветственное сообщение' value='Привет, чо каво?' helpInfo='Всплывающая подсказка'/>
                    <SubmitButton/>
                </form>
            </section>
        )
    }
}