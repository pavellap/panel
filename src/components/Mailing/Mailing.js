import React from "react";
import './Mailing.css'
import PageHeader from "../UI/PageHeader";
import 'pretty-checkbox'
import Axios from "axios";


// раздел полностью готов
// можно добавить модальное окно об успешной отправке рассылки на сервер
export default class Mailing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        };
        this.textForm = React.createRef();
        this.emailsForm = React.createRef();
        this.checkbox = React.createRef();
    }

    handleChange = () => {
        this.setState({
            counter: this.textForm.current.value.length
        });
    };

    sendData = () => {
        const url = "http://188.32.187.157:5000/mail";
        console.log("Данные для отправки рассылки:", {
            text: this.textForm.current.value,
            emails: this.emailsForm.current.value.split("\n"),
            all: this.checkbox.current.checked
        });
        Axios.post(url, {
            text: this.textForm.current.value,
            emails: this.emailsForm.current.value.split("\n"),
            all: this.checkbox.current.checked
        });
        // добавить тело респонса
    };

    render() {
        return (
            <section>
                <PageHeader title='Настройка рассылки'/>
                <div className='profiles-wrapper'>
                    <form>
                        <div className='mailing-content-wrapper'>
                            <div className='textarea-wrapper'>
                                <h2>Текст рассылки</h2>
                                <textarea ref={this.textForm} onChange={this.handleChange}/>
                                <div className='form-counter'>{this.state.counter} / 600</div>
                            </div>
                            <div className='mailing-emails-wrapper'>
                                <h2>Список E-mail</h2>
                                <textarea className='mailing-emails-list' ref={this.emailsForm}>
                                </textarea>
                                <div className='mailing-checkbox-wrapper'>
                                    <div className="pretty p-switch p-fill">
                                        <input type="checkbox" ref={this.checkbox}/>
                                        <div className="state">
                                            <label>Отправить всем</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mailing-submit-button' onClick={this.sendData}>
                            Отправить
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}