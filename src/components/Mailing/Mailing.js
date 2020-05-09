import React from "react";
import './Mailing.css'
import PageHeader from "../UI/PageHeader";
import 'pretty-checkbox'
import Axios from "axios";
import url from '../config'
import ReactDOM from "react-dom";
import Modal from "../Modal/Modal";


export default class Mailing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            modalIsOpen: false,
            typeOfModal: null,
            contentModal: null
        };
        this.textForm = React.createRef();
        this.emailsForm = React.createRef();
        this.checkbox = React.createRef();
    }

    handleClick = () => {
        this.setState({modalIsOpen: !this.state.modalIsOpen})
    };

    handleChange = () => {
        this.setState({
            counter: this.textForm.current.value.length
        });
    };

    sendData = () => {
        Axios.post(url + "/mail", {
            text: this.textForm.current.value,
            emails: this.emailsForm.current.value.split("\n"),
            all: this.checkbox.current.checked
        }).then(res => {
            console.log("Ответ в рассылках:", res);
            if (res.status === 200) {
                this.textForm.current.value = "";
                this.emailsForm.current.value = "";
                this.checkbox.current.checked = false;
                this.setState({componentIsLoading: false, modalIsOpen: true, typeOfModal: "success", contentModal:
                        "Сервер успешно получил данные!"});
            }

            else
                this.setState({componentIsLoading: false, modalIsOpen: true, typeOfModal: "success", contentModal:
                        "Произошла ошибка на сервере. Повторите попытку позже!"});
        });
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
                {ReactDOM.createPortal( this.state.modalIsOpen && <Modal type={this.state.typeOfModal}
                text={this.state.contentModal} handleClick={this.handleClick}/>,
                document.getElementById('portal'))}
            </section>
        )
    }
}
