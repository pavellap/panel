import React from 'react'
import './ConfigurationItem.css'
import Axios from "axios";
import url from '../../config'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            active: this.props.active
        }
    }

    handleChange = () => {
        Axios.post(url + "/config/change", {
            id: this.state.id,
            active: !this.state.active,
            token: localStorage.getItem('token')
        }).then(res => {
            if (res.status === 200)
                console.log("Успешно сохранил!");
        });
        this.setState({active: !this.state.active});
    };



    render() {
        return (
            <div className='configuration-item'>
                <span onClick={() => this.props.handleClick(this.state.id)}>Конфигурация:&nbsp;&nbsp;
                    {this.props.name}</span>
                <div className="pretty p-switch p-fill" style={{marginLeft: 17}}>
                    <input type="checkbox" checked={this.state.active} ref={this.checkbox} onChange={this.handleChange}/>
                    <div className="state">
                        <label/>
                    </div>
                </div>
                <FontAwesomeIcon icon={faTimes} onClick={() => this.props.handleDelete(this.props.id)}
                                 style={{marginLeft: 8}}/>
            </div>
        )
    }
}