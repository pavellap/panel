import React from 'react'
import './Modal.css'
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AddProfile from "./AddProfile";
import DeleteProfile from "./DeleteProfile";
import ShowProfile from "./ShowProfile";
import EditProfile from "./EditProfile";


// передаём айди профиля, над которым работаем
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileID: this.props.currentId,
        };
    }
    render() {
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
        // работает, поправить id-вопросов
        else if (this.props.type === 'add') {
            modalContentClass = 'modal-content-add';
            contentToRender = (
                <AddProfile handleAddClick={(newProfile) => this.props.addNewProfile(newProfile)}/>
            );
        }
        // работает, поправить id-вопросов
        else if (this.props.type === 'show') {
            modalContentClass = 'modal-content-show';
            contentToRender = (
                <ShowProfile profile={this.props.profile}/>
            );
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