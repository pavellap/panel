import React from 'react'
import './Authorization.css'
import AuthorizationForm from "./Authorization-form";

export default class Authorization extends React.Component {

    handleButtonClick(event) {
        event.preventDefault();
        console.log(window.location.href);
        window.location.href += 'messages';
    }

    render() {
        return (
            <div className='Authorization-body'>
                <div className='Authorization-block'>
                    <form>
                        <h2>Добро пожаловать</h2>
                        <div className='Form-wrapper'>
                            <AuthorizationForm name='Email'/>
                            <AuthorizationForm name='Password'/>
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

