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
import Loader from "../UI/Loader";
import url from "../config";

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
            componentIsLoading: true,
            configs: [],
            currentProfile: null,
            counterID: 999,
            time: null,
            currentConfig: null,
            contentModal: null
        };
    }

    componentDidMount() {
        let userData;
        Axios.get(url + "/config/get").then(configsData => { // сначала получаем конфиги
            this.setState({configs: configsData.data});
            Axios.get(url + "/config/current").then(res => { // получаем текущий конфиг
                this.setState({currentConfig: res.data.id});
                // получаем саму страницу
                Axios.get(url + "/page/get/config_id=" + res.data.id + "&page_id=" + this.state.sectionId).catch(err => {
                    if (err.response.data.code === 401)
                        window.location= "/"
                    else
                        this.setState({componentIsLoading: false, modalIsOpen: true, typeOfModal: "success",
                            contentModal: err.response.data.error});
                    throw err
                }).then
                (response => {
                    Axios.get(url + "/form/time/get/config_id=" + res.data.id).then(data => this.setState( // загружаем время
                        {time: data.data.time}));
                    userData = response.data.list;
                    this.setState({componentIsLoading: false});
                    userData.forEach(item => {
                        this.setState(prevState => {
                            // записываем профили в стейт
                            const newArray = this.state.profilesList;
                            newArray.push(item);
                            return {
                                profilesList: newArray,
                                currentId: item.id,
                            }
                        })
                    })
                })
            });
        })
    }

    // Добавление нового профиля с модального окна
    handleAdd = (newProfile) => {
        newProfile.id = this.state.counterID;
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
        let pos;
        newArray.forEach((item, index) => {
            if (item.id === profile.id)
                pos = index;
        });
        newArray[pos] = profile;
        this.setState(prevState => {
            return {
                modalOpen: false,
                profilesList: newArray
            }
        });
    };

    findProfile = (id) => {
        this.state.profilesList.forEach(item => {
            if (item.id === id) {
                this.setState({currentProfile: item})
            }

        });
    };

    // показ/скрытие модального окна
    toggleModal = (content, id) => {
        this.findProfile(id);
        this.setState({modalOpen: !this.state.modalOpen, typeOfModal: content, currentId: id, counterID: this.state.counterID + 1});
    };

    // переписать этот метод
    deleteEntry = (id) => {
        this.setState(prevState => {
            const newArray = this.state.profilesList.filter(item => {
                return item.id !== id
            });
            return {profilesList: newArray, modalOpen: false}
        })
    };


    changeTime = () => {
      this.setState({componentIsLoading: true});
      Axios.post(url + "/form/time/set", {
          time: this.state.time,
          config_id: this.state.currentConfig
      }).catch(err => {
          if (err.response.data.code === 401)
              window.location= "/"
          else
              this.setState({componentIsLoading: false, modalOpen: true, typeOfModal: "success",
                  contentModal: err.response.data.error});
          throw err
      }).then(res => {
            if (res.status === 200)
              this.setState({componentIsLoading: false, modalOpen: true, typeOfModal: "success", contentModal:
                      "Данные успешно сохранены"});
            else
                this.setState({componentIsLoading: false, modalOpen: true, typeOfModal: "success", contentModal:
                        res.data.text});
      })
    };

    postData = () => {
        this.setState({componentIsLoading: true});
        const array = [];
        this.state.profilesList.forEach(item => {
           if (item.id > 999)
               array.push({
                   disabled: item.disabled,
                   hello: item.hello,
                   questions: item.questions,
                   type: "form",
                   name: item.name,
               });
           else
               array.push(item);
        });
        Axios.post(url + "/page/set", {
            page: this.state.sectionId,
            config_id: this.state.currentConfig,
            list: array
        }).catch(err => {
            if (err.response.data.code === 401)
                window.location= "/"
            else
                this.setState({componentIsLoading: false, modalOpen: true, typeModal: "success",
                    contentModal: err.response.data.error});
            throw err
        }).then(res => {
            console.log(res);
            if (res.status === 200)
                this.setState({componentIsLoading: false})
        });
    };

    handleTime = val => {
        this.setState({time: val})
    };

    handleSwitch = id => {
      const array = this.state.profilesList;
      let pos;
      array.forEach((item, index) => {
          if (item.id === id)
              pos = index;
      });
        array[pos].disabled = !array[pos].disabled;
      this.setState({profilesList: array})
    };

    render() {
        let content;
        if (this.state.componentIsLoading)
            content = <Loader/>;
        else content = (
            <React.Fragment>
                <Configuration configs={this.state.configs} handleConfig={val => {
                    this.props.handleConfig(val);
                    Axios.get(url + "/config/choose/id=" + val).then(() =>
                        window.location.reload(false));
                }} currentConfig={this.state.currentConfig}/>
                <div className='profiles-wrapper'>
                    <div className='time-wrapper'>
                        <input type="text" value={this.state.time} onChange={e => this.handleTime(e.currentTarget.value)}/>
                        <div className='registration-dialog-save' onClick={this.changeTime}>Промежуток (в днях)</div>
                    </div>
                    <div className='profiles-header'>
                        <h4>Доступные анкеты</h4>
                        <div onClick={() => this.toggleModal('add',
                            Math.round(Math.random() * 1000))}>
                            <span>Новая анкета</span>
                            <FontAwesomeIcon icon={faPlus} color='#fff'/>
                        </div>
                    </div>
                    <section className='profiles-content-wrapper'>
                        {this.state.profilesList.map((item, index) =>
                            <ProfileEntry title={item.name} description={item.description}
                            handleDeleteClick={(id) => this.toggleModal('delete', id)}
                            id={item.id} handleEditClick={(id) => this.toggleModal('edit', id)}
                            key={index} handleShowClick={(id) => this.toggleModal('show', id)}
                            disabled={item.disabled} handleSwitch={id => this.handleSwitch(id)}/>)}
                        <div className='registration-dialog-save' onClick={this.postData}>Сохранить данные</div>
                    </section>
                </div>
            </React.Fragment>
        );
        return (
            <section style={{position: "relative"}}>
                <PageHeader title='Окно редактирования анкет'/>
                {content}
                {ReactDOM.createPortal(this.state.modalOpen && <Modal handleClick={this.toggleModal}
                 text={this.state.contentModal} handleDelete={(id) => this.deleteEntry(id)}  type={this.state.typeOfModal}
                 profile={this.state.currentProfile} currentId={this.state.config_id}
                 addNewProfile={(newProfile)=>this.handleAdd(newProfile)} editProfile={(newArray) => this.handleEdit(newArray)}/>,
                    document.getElementById('portal'))}
            </section>
        )
    }
}

