import React from 'react'
import './Modal.css'
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AddProfile from "./AddProfile";
import DeleteProfile from "./DeleteProfile";
import ShowProfile from "./ShowProfile";
import EditProfile from "./EditProfile";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileID: this.props.currentId,
        };
    }
    render() {
        console.log("Айди в модале:", this.props.currentId);
        let contentToRender;
        let modalContentClass;
        if (this.props.type === 'delete') {
            modalContentClass = 'modal-content-delete';
            contentToRender = (
                <DeleteProfile handleDelete={() => this.props.handleDelete(this.state.profileID)}/>
            )
        }
        else if (this.props.type === 'edit') {
            modalContentClass = 'modal-content-add';
            contentToRender = (
                <EditProfile profile={this.props.profile} handleAddClick={(newProfile) => this.props.editProfile(newProfile)}/>
            )
        }
        else if (this.props.type === 'add') {
            modalContentClass = 'modal-content-add';
            contentToRender = (
                <AddProfile handleAddClick={(newProfile) => this.props.addNewProfile(newProfile)}/>
            );
        }
        else if (this.props.type === 'show') {
            console.log('Айди в методе шоу:', this.props.profile);
            modalContentClass = 'modal-content-show';
            contentToRender = (
                <ShowProfile profile={this.props.profile}/>
            );
            console.log("Профиль:", this.props.profile);
        }
        return (
            <div className="modal">
                <div className={modalContentClass}>
                    {contentToRender}
                </div>
                <FontAwesomeIcon icon={faTimes} className="modal__close-button" onClick={this.props.handleClick}
                size='2x'/>
            </div>
        )
    }
}