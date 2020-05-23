import React from 'react'
import './Authorization.css'
import Axios from "axios";
import Modal from "../Modal/Modal";
import ReactDOM from 'react-dom'
import url from '../config'
import Cookies from 'universal-cookie'

// Компонент авторизации
// P.S соре за говнокод, если вы это исправляете то F вам
export default class Authorization extends React.Component {
    constructor(props) {
        console.log("Initial cookie:", document.cookie)
        super(props);
        this.password = React.createRef();
        this.login = React.createRef();
        this.state = {
            success: null,
            modalIsOpen: false,
            contentModal: null
        }
    }



    // получаем данные
    handleButtonClick(event) {
        let token;
        event.preventDefault();
        Axios.post(url + '/auth', {
            "login": this.login.current.value,
            "password": this.password.current.value
        }).then(response => {
            console.log("Ответ в авторизации:", response.data)
            if (response.data.success) {
                document.cookie = "name=Panel; value=" + response.data.token;
                window.location.href += 'registration';
                token = response.data.token;
            }
            else if (!response.data.success) {
                this.setState({modalIsOpen: true, typeOfModal: "success",
                    contentModal: "Неправильный логин или пароль"});
            }
            else
                this.setState({modalIsOpen: true, typeOfModal: "success",
                    contentModal: "Неправильный логин или пароль"});
        }).then(() => {
            //const cookies = new Cookies();
            //cookies.set('panel', token);
            console.log("Cookie via React:")
            //console.log(cookies.get('panel')); // Pacman
            document.cookie = 'panel=' + token + " ";
            // { path: '/' }
            /*this.props.handleToken(token);
            document.cookie = 'panel=' + token;
            console.log("Ебашим токен")*/
        }).catch(err => {
            if (err)
                this.setState({modalIsOpen: true, contentModal: "Ошибка на сервере, попробуйте позже!"})
        });
        console.log("Received token:", token);
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
                text={this.state.contentModal}
                handleClick={this.handleClick}/>, document.getElementById('portal'))}
            </div>
        )
    }
}

