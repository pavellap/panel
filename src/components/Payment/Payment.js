import React from "react";
import PageHeader from "../UI/PageHeader";
import Configuration from "../Messages/Configuration";
import Axios from "axios";
import EditEntry from "../Messages/EditEntry";
import Loader from "../UI/Loader";
import url from '../config'
import ReactDOM from "react-dom";
import Modal from "../Modal/Modal";

export default class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            sectionId: 2,
            componentIsLoading: true,
            configs: [],
            currentConfig: null,
            modalIsOpen: false,
            typeOfModal: null,
            contentModal: null,
        }
    }

    componentDidMount() {
        let userData;
        Axios.get(url + "/config/get" + "/" +
            localStorage.getItem('token')).then(configsData => { // сначала получаем конфиги
            this.setState({configs: configsData.data});
            Axios.get(url + "/config/current" + "/" +
                localStorage.getItem('token')).then(res => { // получаем текущий конфиг
                // получаем саму страницу
                this.setState({currentConfig: res.data.id});
                Axios.get(url + "/page/get/config_id=" + res.data.id + "&page_id=" + this.state.sectionId + "/" +
                    localStorage.getItem('token')).then
                (response => {
                    userData = response.data.list;
                }).catch(err => {
                    if (err.response.data.code === 401)
                        window.location= "/"
                    else
                        this.setState({componentIsLoading: false, modalOpen: true, typeOfModal: "success",
                            contentModal: err.response.data.error});
                    throw err
                }).then(() => {
                    userData.forEach(item => {
                        this.setState(prevState => {
                            const newArray = this.state.messages;
                            newArray.push(item);
                            return {
                                messages: newArray,
                                componentIsLoading: false
                            }
                        })
                    })
                });
            });
        });
    }

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

    postData = () => {
        const url = "http://188.32.187.157:5000/page/set";
        console.log("Данные на отправку в оплате:", this.state.messages);
        console.log("Текущий конфиг:", this.state.currentConfig);
        this.setState({componentIsLoading: true});
        Axios.post(url, {
            "page": this.state.sectionId,
            "config_id": this.state.currentConfig,
            "list": this.state.messages,
            "token": localStorage.getItem('token')
        }).catch(err => {
            if (err.response.data.code === 401)
                window.location= "/"
            else
                this.setState({componentIsLoading: false, modalIsOpen: true, typeOfModal: "success",
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

    handleClick = () => {
        this.setState({modalIsOpen: !this.state.modalIsOpen})
    };

    render() {
        let content;
        // отрисовываем лоадер, если компонент ещё загружается
        if (this.state.componentIsLoading)
            content = <Loader/>;
        else content = (
            <React.Fragment>
                <Configuration configs={this.state.configs} handleConfig={val => {
                    this.props.handleConfig(val);
                    console.log("Меняем на конфиг:", val);
                    Axios.get(url + "/config/choose/id=" + val + "/" +
                        localStorage.getItem('token')).then(() =>
                        window.location.reload(false));
                }} currentConfig={this.state.currentConfig}/>
                <form>
                    {this.state.messages.map((item) => (
                        <EditEntry ans_type={item.ans_type} name={item.name} description={item.description} text={item.text}
                                   getCurrentData={(val) => this.handleChange(val, item.id)} response={item.response}/>
                    ))}
                    <div className='registration-dialog-save' onClick={this.postData}>Сохранить данные</div>
                </form>
            </React.Fragment>

        );
        return (
            <section style={{position: "relative"}}>
                <PageHeader title='Главное меню и оплата'/>
                {content}
                {ReactDOM.createPortal( this.state.modalIsOpen && <Modal type={this.state.typeOfModal} text={this.state.contentModal}
                handleClick={this.handleClick}/>, document.getElementById('portal'))}
            </section>
        )
    }
}
