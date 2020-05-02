import React  from "react";
import './Profiles.css'
import PageHeader from "../UI/PageHeader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import ProfileEntry from "./ProfileEntry";
import Modal from "../Modal/Modal";
import ReactDOM from 'react-dom'
import Configuration from "../Messages/Configuration";
import Axios from "axios";
import EditEntry from "../Messages/EditEntry";
import Loader from "../UI/Loader";

export default class Profiles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            typeOfModal: null,
            profilesList: [],
            currentId: null,
            sectionId: 8,
            fetchingError: false,
            componentIsLoading: true
        }
    }

    componentDidMount() {
        const url = "http://188.32.187.157:5000/getpage/config_id=" + this.props.id + '&page_id=' + this.state.sectionId;
        let userData;
        console.log(url);
        Axios.get(url).then(response => {
            userData = response.data.list;
            console.log("Данные в профилях:", userData)
        }).then(() => {
            userData.forEach(item => {
                this.setState(prevState => {
                    const newArray = this.state.profilesList;
                    newArray.push({
                        name: item.name,
                        helloMessage: item.hello,
                        currentQuestionId: 0,
                        questionsList: item.questions,
                        id: item.id
                    });
                    return {
                        profilesList: newArray,
                        currentId: item.id,
                        componentIsLoading: false
                    }
                })
            })
        })
    }

    // Добавление нового профиля с модального окна
    handleAdd = (newProfile) => {
        console.log("В таком формате получаем новый профиль:", newProfile);
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
        console.log("Ищем профиль с id:", id);
        let currentProfile;
        this.state.profilesList.forEach(item => {
            if (item.id === id)
                currentProfile = item;
        });
        return currentProfile;
    };

    // показ/скрытие модального окна
    toggleModal = (content, id) => {
        this.setState({modalOpen: !this.state.modalOpen, typeOfModal: content, currentId: id});
    };

    // переписать этот метод
    deleteEntry = (id) => {
        console.log('Parent has got id:', id);
    };

    render() {
        let content;
        if (this.state.componentIsLoading)
            content = <Loader/>;
        else content = (
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
        );
        return (
            <section style={{position: "relative"}}>
                <PageHeader title='Окно редактирования анкет'/>
                <Configuration  handleClick={(id) => this.props.handleClick(id)}/>
                {content}
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

