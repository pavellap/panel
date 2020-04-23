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
    }

    handleChange = (newValue) => {
        this.setState({
            currentText: newValue
        });
    };

    handlePressKey = (event) => {
        if (event.key === 'Enter') {
            this.textForm.current.value = "";
            this.setState(prevState => {
                const newList = this.state.emails;
                newList.push(this.state.currentText);
                return {emails: newList}
            });
            event.preventDefault();
        }
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
                                <div className='mailing-emails-list'>
                                    {this.state.emails.map(item => {
                                        return (
                                            <div>{item}</div>
                                        )
                                    })}
                                    <input type="text" onChange={(e) =>
                                    {this.handleChange(e.currentTarget.value)}} onKeyPress={this.handlePressKey}
                                    ref={this.textForm}/>
                                </div>
                                <input type='checkbox'/>
                                <span>Отправить всем</span>
                            </div>
                        </div>
                        <div className='mailing-submit-button'>
                            Отправить
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}