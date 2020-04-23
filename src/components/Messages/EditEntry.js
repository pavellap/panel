import React from 'react'
import './EditEntry.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";

export default class EditEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: this.props.value,
            status: "info-block-invisible"
        }
    }

    handleChange = (newValue) => {
        this.setState({
            inputValue: newValue
        });

    };

    render() {

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
                    <input type="text" placeholder={this.state.inputValue} onChange={(e) =>
                    {this.handleChange(e.currentTarget.value);
                    this.props.getCurrentData(this.state.inputValue)}}/>
                </div>
            </div>
        )
    }
}

