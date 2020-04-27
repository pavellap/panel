import React from "react";
import './Mailing.css'
import PageHeader from "../UI/PageHeader";

export default class Mailing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentText: "",
            emails: []
        };
        this.textForm = React.createRef();
        this.emailsForm = React.createRef();
    }

    handleChange = (newValue) => {
        this.setState({
            currentText: newValue,
            emails: this.emailsForm.current.value.split("\n")
        });
    };

    render() {
        return (
            <section>
                <PageHeader title='Настройка рассылки'/>
                <div className='profiles-wrapper' style={{height: '80vh'}}>
                    <form>
                        <div className='mailing-content-wrapper'>
                            <div className='textarea-wrapper'>
                                <h4>Текст рассылки</h4>
                                <textarea/>
                            </div>
                            <div className='mailing-emails-wrapper'>
                                <h4>Список E-mail</h4>
                                <textarea className='mailing-emails-list' ref={this.emailsForm}>

                                </textarea>
                                <div className='mailing-checkbox-wrapper'>
                                    <input type='checkbox'/>
                                </div>
                            </div>
                        </div>
                        <div className='mailing-submit-button' onClick={this.handleChange}>
                            Отправить
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}