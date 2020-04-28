import React from 'react'
import './EditEntry.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";

export default class EditEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: this.props.value,
            status: "info-block-invisible",
        }
    }

    handleChange = (newValue) => {
        this.setState({
            inputValue: newValue
        });

    };

    render() {
        let text = null;
        if (this.props.type === 1)
            text = "Нет обратной связи";
        else if (this.props.type === 2)
            text = "Пользователь нажимает кнопку";
        else if (this.props.type === 3)
            text = "Пользователь пишет сообщение";
        else
            text = "Пользователь вводит данные";

        return (
            <div className='edit-entry'>
                <label>
                    {this.props.text}
                    <div className={this.state.status}>Сообщение</div>
                        <span className='info-icon' help-info={this.props.helpInfo}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                        </span>
                </label>
                <div className='input-wrapper'>
                    <input type="text" value={this.state.inputValue} onChange={(e) =>
                    {this.handleChange(e.currentTarget.value);
                    this.props.getCurrentData(this.state.inputValue)}}/>
                </div>
                {text}
            </div>
        )
    }
}

