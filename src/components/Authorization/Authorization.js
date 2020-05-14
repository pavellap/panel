import React from 'react'
import './Authorization.css'
import Axios from "axios";
import Modal from "../Modal/Modal";
import ReactDOM from 'react-dom'
import url from '../config'

// Компонент авторизации
// P.S соре за говнокод, если вы это исправляете то F вам
export default class Authorization extends React.Component {
    constructor(props) {
        super(props);
        this.password = React.createRef();
        this.login = React.createRef();
        this.state = {
            success: null,
            modalIsOpen: false
        }
    }

    // получаем данные
    handleButtonClick(event) {
        event.preventDefault();
        Axios.post(url + '/auth', {
            "login": this.login.current.value,
            "password": this.password.current.value
        }).then(response => {
            if (response.data.success) {
                window.location.href += 'registration';
            }
        }).catch(err => {
            if (err)
                this.setState({modalIsOpen: true})
        });
    }

    handleClick = () => {
        this.setState({modalIsOpen: !this.state.modalIsOpen})
    };

    render() {
        return (
            <div className='Authorization-body'>
                <div className='Authorization-block'>
                    <form>
                        <h2>Добро пожаловать</h2>
                        <div className='Form-wrapper'>
                            <div className='Input-wrapper'>
                                <input type="text" placeholder='E-mail' ref={this.login}/>
                            </div>
                            <div className='Input-wrapper'>
                                <input type="text" placeholder='Password' ref={this.password}/>
                            </div>
                        </div>
                        <div className='Form-wrapper'>
                            <button className='Authorization-button' onClick={(e) =>
                                this.handleButtonClick(e)}>Войти</button>
                        </div>
                    </form>
                </div>
                {ReactDOM.createPortal( this.state.modalIsOpen && <Modal type='error'
                text='На сервере произошла ошибка. Попробуйте позже или перезагрузите страницу'
                handleClick={this.handleClick}/>, document.getElementById('portal'))}
            </div>
        )
    }
}

