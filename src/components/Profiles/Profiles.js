import React  from "react";
import './Profiles.css'
import PageHeader from "../UI/PageHeader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import ProfileEntry from "./ProfileEntry";
import Modal from "../Modal/Modal";
import ReactDOM from 'react-dom'
import Configuration from "../Messages/Configuration";

export default class Profiles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            typeOfModal: null,
            profilesList: [],
            currentId: 444
        }
    }
    // Добавление нового профиля с модального окна
    handleAdd = (newProfile) => {
        // тут айди будет запрашиваться с бека
        newProfile.id = Math.round(Math.random() * 1000);
        this.setState(prevState => {
            const newArray = this.state.profilesList;
            newArray.push(newProfile);
            return {
                modalOpen: false,
                profilesList: newArray,
                currentId: newProfile.id
            }
        });
    };

    handleEdit = (profile) => {
        const newArray = this.state.profilesList;
        newArray.forEach(item => {
            if (item.id === this.state.currentId)
                item = profile;
        });
        this.setState(prevState => {
            return {
                modalOpen: false,
                profilesList: newArray
            }
        });
    };

    findProfile = (id) => {
        let currentProfile;
        this.state.profilesList.forEach(item => {
            if (item.id === id)
                currentProfile = item;
        });
        return currentProfile;
    };

    // показ/скрытие модального окна
    toggleModal = (content) => {
        this.setState({modalOpen: !this.state.modalOpen, typeOfModal: content});
    };

    // переписать этот метод
    deleteEntry = (id) => {
        console.log('Parent has got id:', id);
    };

    handleMove = (id, action) => {
        const newArray = this.state.profilesList;
        let ourProfile = this.findProfile(id);
        console.log("Наш профиль:", ourProfile);
        if (action === "up") {
            for (let i = 0; i < newArray.length; i++) {
                console.log("Профиль в цикле:", newArray[i]);
                if (newArray[i] === ourProfile) {
                    const temp = newArray[i];
                    newArray[i] = newArray[i - 1];
                    newArray[i - 1] = temp;
                    break;
                }
            }
        }
        else {
            console.log("Перемещаем профили вниз");
            for (let i = 0; i < newArray.length; i++) {
                console.log("Профиль в цикле:", newArray[i]);
                if (newArray[i] === ourProfile) {
                    const temp = newArray[i];
                    newArray[i] = newArray[i + 1];
                    newArray[i + 1] = temp;
                    break;
                }
            }
        }
        this.setState(prevState => {
            return {
                profilesList: newArray
            }
        });
    };

    render() {
        return (
            <section>
                <PageHeader title='Окно редактирования анкет'/>
                <Configuration  handleClick={(id) => this.props.handleClick(id)}/>
                <div className='profiles-wrapper'>
                    <div className='profiles-header'>
                        <h4>Доступные анкеты</h4>
                        <div onClick={() => this.toggleModal('add',
                            Math.round(Math.random() * 1000))}>
                            <span>Новая анкета</span>
                            <FontAwesomeIcon icon={faPlus} color='#fff'/>
                        </div>
                    </div>
                    <section className='profiles-content-wrapper'>
                        {this.state.profilesList.map(item =>
                            <ProfileEntry title={item.name} description={item.description}
                             handleDeleteClick={(id) => this.toggleModal('delete', id)
                             } id={item.id} handleEditClick={(id) => this.toggleModal('edit', id)}
                             handleShowClick={(id) => this.toggleModal('show', id)}
                            handleMove={(id, action) => this.handleMove(id, action)}/>)}
                    </section>
                </div>
                {ReactDOM.createPortal(this.state.modalOpen && <Modal handleClick={this.toggleModal}
                                   handleDelete={(id) => this.deleteEntry(id)}  type={this.state.typeOfModal}
                                   profile={this.findProfile(this.state.currentId)}
                                   currentId={this.state.currentId} addNewProfile={(newProfile)=>this.handleAdd(newProfile)}
                editProfile={(newArray) => this.handleEdit(newArray)}/>,
                    document.getElementById('portal'))}
            </section>
        )
    }
}

