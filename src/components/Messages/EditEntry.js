import React from 'react'
import './EditEntry.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";

export default class EditEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,
            text: this.props.text,
            description: this.props.description,
            name: this.props.name,
            ans_type: this.props.ans_type,
            id: this.props.id,
            response: this.props.response
        };
        this.form = React.createRef();
    }

    handleChange = (value) => {
        this.setState({text: this.form.current.value});
    };

    handleResponse = (val, id) => {
        console.log("Меняем респонс с id:", id);
        console.log("Контент:", val);
        let pos;
        this.state.response.forEach((item, index) => {
            if (item.id === id)
                pos = index;
        });
        this.setState(prevState => {
            const newArray = this.state.response;
            newArray[pos].text = val;
            return {
                response: newArray
            }
        });
};

    render() {
        console.log("Получили форму обратной связи с id:", this.props.id);
        console.log("Тип сообщения:", this.props.ans_type);
        let text;
        let render;
        if (this.props.ans_type === 0) //  не отрисовывем поля для ввода
            text = "Нет обратной связи";
        else if (this.props.ans_type === 1) {
            text = "Пользователь нажимает кнопку";
            render = (
                <div className='response-entry'>
                    <h4>Обратная связь</h4>
                    <div>
                        {this.state.response.map(item =>
                            <div>
                                <label>{item.description}</label>
                                <input type="text" value={item.text} onChange={e => this.handleResponse(e.currentTarget.value, item.id)}/>
                            </div>
                        )}
                    </div>
                </div>
            )
        }
        else if (this.props.ans_type === 2) {
            text = "Пользователь пишет сообщение";
            render = (
                <div className='response-entry'>
                    <h4>Обратная связь</h4>
                    <div>
                        {this.state.response.map(item =>
                            <div>
                                <label>{item.description}</label>
                                <input type="text" value={item.text} onChange={e => this.handleResponse(e.currentTarget.value, item.id)}/>
                            </div>
                            )}
                    </div>
                </div>
            )
        }
        else //  не отрисовывем поля для ввода
            text = "Пользователь вводит данные";

        return (
            <div className='edit-entry'>
                <label>
                    {this.props.name}
                        <span className='info-icon' help-info={this.props.description}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                        </span>
                </label>
                <div className='input-wrapper' >
                    <input type="text" ref={this.form} value={this.state.text} onChange={(e) =>
                    {this.handleChange(e.currentTarget.value); this.props.getCurrentData(this.form.current.value)}}/>
                </div>
                {render}
                <div>

                </div>
            </div>
        )
    }
}

