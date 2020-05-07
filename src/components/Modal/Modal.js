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
        console.log("Рисуем модальное");
        super(props);
        this.state = {
            profileID: this.props.currentId,
        };
    }

    render() {
        console.log("Модальное окно получило профиль:", this.props.profile);
        let contentToRender;
        let modalContentClass;
        if (this.props.type === 'delete') {
            modalContentClass = 'modal-content-delete';
            contentToRender = (
                <DeleteProfile handleDelete={() => this.props.handleDelete(this.props.profile.id)}/>
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
        else if (this.props.type === 'error') {
            contentToRender = (
                <React.Fragment>
                    <h4>{this.props.text}</h4>
                    <div onClick={this.props.handleClick}>ОК</div>
                </React.Fragment>
            );
            modalContentClass = 'modal-content-delete';
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