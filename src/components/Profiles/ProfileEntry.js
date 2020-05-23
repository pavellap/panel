import React, {Component} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTrashAlt, faEdit, faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import './ProfileEntry.css'

export default class ProfileEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileID: this.props.id,
            disabled: this.props.disabled
        }
    }

    handleChange = () => {
        this.setState({disabled: !this.state.disabled})
    };

    render() {
        return (
            <div className='profile-entry'>
                <div className='profile-content-wrapper'>
                    <span style={{fontSize: '20px', marginRight: '10px'}}>{this.props.id}</span>
                    <FontAwesomeIcon icon={faEye} style={{cursor: "pointer"}} onClick={() =>
                        this.props.handleShowClick(this.props.id)}/>
                    <div>
                        <div>{this.props.title}</div>
                        <div>{this.props.description}</div>
                    </div>
                </div>
                <div style={{display: "flex", alignItems: "center"}}>
                    <div className="pretty p-switch p-fill" style={{marginRight: 25}}>
                        <input type="checkbox" checked={!this.state.disabled} ref={this.checkbox}
                               onChange={() => {
                                   this.props.handleSwitch(this.props.id);
                                   this.handleChange()
                               }}/>
                        <div className="state">
                            <label/>
                        </div>
                    </div>
                    <FontAwesomeIcon icon={faEdit} size={'2x'} style={{marginRight: '20px', cursor: "pointer"}}
                                     color='#0408e2' onClick={() => this.props.handleEditClick(this.props.id)}/>
                    <FontAwesomeIcon icon={faTrashAlt} size={'2x'} style={{marginRight: '20px', cursor: "pointer"}}
                                     color='rgb(226, 4, 5)' onClick={() => this.props.handleDeleteClick(this.props.id)}/>
                    <FontAwesomeIcon icon={faChevronDown} size={'2x'} style={{marginRight: '20px', cursor: "pointer"}}
                                                      color='rgb(226, 4, 5)'/>
                    <FontAwesomeIcon icon={faChevronUp} size={'2x'} style={{marginRight: '20px', cursor: "pointer"}}
                                     color='rgb(226, 4, 5)'/>
                </div>
            </div>
        )
    }
}
