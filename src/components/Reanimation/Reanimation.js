import React from 'react'
import PageHeader from "../UI/PageHeader";
import EditEntry from "../Messages/EditEntry";
import Axios from "axios";
import url from '../config'
import ReactDOM from "react-dom";
import Modal from "../Modal/Modal";
import Loader from "../UI/Loader";
import Configuration from "../Messages/Configuration";
import './Reanimation.css'


export default class Reanimation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionId: 7,
            currentConfig: null,
            messages: [],
            profiles: [],
            componentIsLoading: true,
            modalIsOpen: false
        }
    }
    componentDidMount() {
        let userData;
        Axios.get(url + "/config/get").then(configsData => { // сначала получаем конфиги
            this.setState({configs: configsData.data});
            Axios.get(url + "/config/current").then(res => { // получаем текущий конфиг
                // получаем саму страницу
                this.setState({currentConfig: res.data.id});
                Axios.get(url + "/page/get/config_id=" + res.data.id + "&page_id=" + this.state.sectionId).then
                (response => {
                    userData = response.data.list;
                }).catch(err => {
                    if (err.response.data.code === 401)
                        window.location= "/"
                    else
                        this.setState({componentIsLoading: false, modalIsOpen: true, typeOfModal: "success",
                            contentModal: err.response.data.error});
                    console.log("Error in fetch:", err.response)
                    throw err
                }).then(() => {
                    const messages = [];
                    const profiles = [];
                    userData.forEach(item => {
                        if (item.type === "message") {
                            messages.push(item);
                            console.log("Match!");
                        }
                        else
                            profiles.push(item);
                    });
                    this.setState(prevState => {
                        return {
                            messages: messages,
                            componentIsLoading: false,
                            profiles: profiles
                        }
                    })
                });
            });
        });
    }

    handleChangeProfile = (val, id) => {
        const array = this.state.profiles;
        array.forEach((item, index) => {
            if (index === id)
                item.value = val
        });
        this.setState({profiles: array})
    };

    handleChange = (val, id) => {
        let pos;
        // находим позицию нашего элемента в исходном массиве
        this.state.messages.forEach((item, index) => {
            if (item.id === id)
                pos = index;
        });
        this.setState(prevState => {
            const newArray = this.state.messages;
            newArray[pos].text = val;
            return {
                messages: newArray
            }
        });
    };

    handleClick = () => {
        this.setState({modalIsOpen: !this.state.modalIsOpen})
    };

    postData = () => {
        const list = [];
        /*this.state.messages.forEach(item => list.push(item));
        this.state.profiles.forEach(item => list.push(item));*/
        list.push(this.state.profiles[0], this.state.messages[0], this.state.profiles[1]);
        console.log("Данные на отправку", {
            list: list,
            page: this.state.sectionId,
            "config_id": this.state.currentConfig
        });
        Axios.post("http://188.32.187.157:5000/page/set", {
            "page": this.state.sectionId,
            "config_id": this.state.currentConfig,
            "list": list,
        }).catch(err => {
            if (err.response.data.code === 401)
                window.location= "/"
            else
                this.setState({componentIsLoading: false, modalOpen: true, typeOfModal: "success",
                    contentModal: err.response.data.error});
            throw err
        }).then(res => {
            if (res.status === 200) {
                this.setState({componentIsLoading: false, modalIsOpen: true, typeOfModal: "success", contentModal:
                        "Данные успешно сохранены"});
            }
            else
                this.setState({componentIsLoading: false, modalIsOpen: true, typeOfModal: "success", contentModal:
                        "Произошла ошибка на сервере. Попробуйте сохранить данные позже"});
        })
    };

    render() {
        console.log("Messages to render:", this.state.messages);
        let content;
        // отрисовываем лоадер, если компонент ещё загружается
        if (this.state.componentIsLoading)
            content = <Loader/>;
        else content = (
            <React.Fragment>
                <Configuration configs={this.state.configs} handleConfig={val => this.props.handleConfig(val)}
                               currentConfig={this.state.currentConfig}/>
                <form>
                    {this.state.messages.map((item) => (
                        <EditEntry ans_type={item.ans_type} name={item.name} description={item.description} text={item.text}
                                   getCurrentData={(val) => this.handleChange(val, item.id)} response={item.response}/>
                    ))}
                    {this.state.profiles.map((item, index) => (
                        <div className='reanimation-profile'>
                            <h4>{item.name}</h4>
                            <div>
                                <label>ID анкеты:</label>
                                <input type="text" value={item.value} onChange={e => this.handleChangeProfile(e.currentTarget.value, index)}/>
                            </div>
                        </div>
                    ))}
                    <div className='registration-dialog-save' onClick={this.postData}>Сохранить данные</div>
                </form>
            </React.Fragment>

        );
        return (
            <section style={{position: "relative"}}>
                <PageHeader title='Сообщения для пользователей, у которых закончилась подписка'/>
                {content}
                {ReactDOM.createPortal( this.state.modalIsOpen && <Modal type={this.state.typeOfModal} text={this.state.contentModal}
                handleClick={this.handleClick}/>, document.getElementById('portal'))}
            </section>
        )
    }
}

