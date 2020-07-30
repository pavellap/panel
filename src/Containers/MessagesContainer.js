import React,  {Component} from "react";
import PageHeader from "../components/UI/PageHeader";
import Configuration from "../components/Messages/Configuration";
import EditEntry from "../components/Messages/EditEntry";
import Axios from "axios";
import Loader from "../components/UI/Loader";
import url from '../components/config'
import ReactDOM from "react-dom";
import Modal from "../components/Modal/Modal";


// в пропсах: название раздела, id раздела
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [], // все поля для ввода сообщений
            sectionId: 6,
            componentIsLoading: true, // статус получения данных с сервера
            configs: [], // доступные конфигурации
            currentConfig: null, // текущая конфигурация
            modalIsOpen: false,
            typeOfModal: null,
            contentModal: null
        }
    }
    // в редаксе будем хранить: все конфиги, текущий конфиг
    // данные по разделу получаем по: sectionId, currentConfig
    componentDidMount() {
        const {id} = this.props;
        let userData;
        Axios.get(url + "/config/get" + "/" +
            localStorage.getItem('token')).then(configsData => { // сначала получаем конфиги
            console.log("В таком виде получили конфиги:", configsData.data);
            this.setState({configs: configsData.data});
            Axios.get(url + "/config/current" + "/" +
                localStorage.getItem('token')).then(res => { // получаем текущий конфиг
                // получаем саму страницу
                this.setState({currentConfig: res.data.id});
                Axios.get(url + "/page/get/config_id=" + res.data.id + "&page_id=" + id + "/" +
                    localStorage.getItem('token')).then(
                    response => {
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
                    userData.forEach(item => {
                        this.setState(() => {
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
        })
    }
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
        }).then(() => this.setState({componentIsLoading: false}))
    };

    handleClick = () => {
        this.setState({modalIsOpen: !this.state.modalIsOpen})
    };

    // сохраняем данные в нужном формате при изменении содержимого форм
    handleChange = (val, id) => {
        let pos;
        // находим позицию нашего элемента в исходном массиве
        this.state.messages.forEach((item, index) => {
            if (item.id === id)
                pos = index;
        });
        this.setState(() => {
            const newArray = this.state.messages;
            newArray[pos].text = val;
            return {
                messages: newArray
            }
        });
    };


    render() {
        const {title} = this.props;
        const {componentIsLoading, configs, currentConfig, messages} = this.state;
        let content;
        // отрисовываем лоадер, если компонент ещё загружается
        if (componentIsLoading)
            content = <Loader/>;
        else content = (
            <React.Fragment>
                <Configuration configs={configs} handleConfig={val => {
                    this.props.handleConfig(val);
                    console.log("Меняем на конфиг:", val);
                    // пофиксить баг с текущим конфигом
                    Axios.get(url + "/config/choose/id=" + val + "/" +
                        localStorage.getItem('token')).then(() => {
                        window.location.reload(false)
                    });
                }} currentConfig={currentConfig}/>
                <form>
                    {messages.map((item) => (
                        <EditEntry ans_type={item.ans_type} name={item.name} description={item.description} text={item.text}
                                   getCurrentData={(val) => this.handleChange(val, item.id)} response={item.response}/>
                    ))}
                    <div className='registration-dialog-save' onClick={this.postData}>Сохранить данные</div>
                </form>
            </React.Fragment>
        );
        return(
            <section style={{position: "relative"}}>
                <PageHeader title={title}/>
                {content}
                {ReactDOM.createPortal( this.state.modalIsOpen && <Modal type={this.state.typeOfModal}
                text={this.state.contentModal} handleClick={this.handleClick}/>,
                document.getElementById('portal'))}
            </section>
        )
    }

}
