import React from 'react'
import './Authorization.css'
import Axios from "axios";

export default class Authorization extends React.Component {
    constructor(props) {
        super(props);
        this.password = React.createRef();
        this.login = React.createRef();
        this.state = {
            success: null
        }
    }


    handleButtonClick(event) {
        let url = "http://188.32.187.157:5000";
        url += '/auth';
        event.preventDefault();
        Axios.post(url, {
            "login": this.login,
            "password": this.password
        }).then(response => {
            if (response.data.success) {
                console.log(window.location.href);
                window.location.href += 'registration';
            }
            else {
                // вставить модальное здесь
            }
            console.log("Ответ на авторизацию:", response)
        });

    }

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
            </div>
        )
    }
}

