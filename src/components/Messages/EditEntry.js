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

    render() {
        let text = null;
        if (this.props.ans_type === 1)
            text = "Нет обратной связи";
        else if (this.props.ans_type === 2)
            text = "Пользователь нажимает кнопку";
        else if (this.props.ans_type === 3)
            text = "Пользователь пишет сообщение";
        else
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
                <div>

                </div>
            </div>
        )
    }
}

