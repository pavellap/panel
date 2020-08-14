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
import url from "../../config";

const hardCode = {
    "type": "form",
    "id": 5,
    "disabled": false,
    "name":
        "Имя анкеты",
    "hello":
        "Приветственное сообщение",
    "questions":
        [

            {
                "id": 33,
                "text":
                    "Текст вопроса",
                "type": "int",
                "main": true
            },

            {
                "id": 34,
                "text":
                    "Текст вопроса 2",
                "type": "str",
                "main": false
            },

            {
                "id": 35,
                "text":
                    "Текст вопроса 3",
                "type": "str",
                "main": false
            },

            {
                "id": 36,
                "text":
                    "Текст вопроса 4",
                "type": "int",
                "main": false

            }

        ]
}

export default class Profiles extends React.Component {
    constructor(props) {
        console.log("Current cookie:", document.cookie);
        super(props);
        this.state = {
            modalOpen: false,
            typeOfModal: null,
            profilesList: [hardCode],
            currentId: null,
            sectionId: 8,
            fetchingError: false,
            componentIsLoading: false,
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
        Axios.get(url + "/config/get" + "/" +
            localStorage.getItem('token')).then(configsData => { // сначала получаем конфиги
            this.setState({configs: configsData.data});
            Axios.get(url + "/config/current" + "/" +
                localStorage.getItem('token')).then(res => { // получаем текущий конфиг
                this.setState({currentConfig: res.data.id});
                // получаем саму страницу
                Axios.get(url + "/page/get/config_id=" + res.data.id + "&page_id=" + this.state.sectionId + "/" +
                    localStorage.getItem('token')).catch(err => {
                    if (err.response.data.code === 401)
                        window.location= "/"
                    else
                        this.setState({componentIsLoading: false, modalIsOpen: true, typeOfModal: "success",
                            contentModal: err.response.data.error});
                    throw err
                }).then
                (response => {
                    Axios.get(url + "/form/time/get/config_id=" + res.data.id + "/" +
                        localStorage.getItem('token')).then(data => this.setState( // загружаем время
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
          config_id: this.state.currentConfig,
          token: localStorage.getItem('token')
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
            list: array,
            token: localStorage.getItem('token')
        }).catch(err => {
            console.log("Ошибка", err.response.data)
            if (err.response.data.code === 401)
                window.location= "/"
            else
                this.setState({componentIsLoading: false, modalOpen: true, typeOfModal: "success",
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

    handleMove = (action, pos) => {
        const array = this.state.profilesList;
        console.log(`Performing action ${action} on item with pos: ${pos}`)
        if (action === "up" && pos !== 0) {
            const temp = array[pos - 1];
            array[pos - 1] = array[pos];
            array[pos] = temp;
            this.setState({profilesList: array})
        }
        else if (action === "down" && pos !== array.length - 1) {
            const temp = array[pos + 1];
            array[pos + 1] = array[pos];
            array[pos] = temp;
            this.setState({profilesList: array})
        }
    }

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
                    Axios.get(url + "/config/choose/id=" + val + "/" +
                        localStorage.getItem('token')).then(() =>
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
                            disabled={item.disabled} handleSwitch={id => this.handleSwitch(id)} position={index}
                            handleMove={(action, pos) => this.handleMove(action, pos)}/>)}
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

