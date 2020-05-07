import React from "react";
import SubscriptionEntry from "./SubscriptionEntry";
import PageHeader from "../UI/PageHeader";
import Axios from "axios";
import Loader from "../UI/Loader";
import url from "../config";

export default class Subscription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionId: 10,
            subscriptions: [],
            componentIsLoading: true,
            currentConfig: null
        }
    }

    sendData = () => {
        console.log("Данные на отправку:", {
                page: 10,
                config_id: 1, // по дефу пусть стоит 1
                list: this.state.subscriptions
            }
        );
        Axios.post(url + "/page/set",
            {
                page: 10,
                config_id: 1, // по дефу пусть стоит 1
                list: this.state.subscriptions
            });
    };

    saveChange = (item, index) => {
        const newArray = this.state.subscriptions;
        newArray[index] = item;
        this.setState({subscriptions: newArray})
    };

    componentDidMount() {
        let userData;
        Axios.get(url + "/config/get").then(configsData => { // сначала получаем конфиги
            this.setState({configs: configsData.data});
            Axios.get(url + "/config/current").then(res => { // получаем текущий конфиг
                // получаем саму страницу
                this.setState({currentConfig: res.data.id});
                Axios.get(url + "/page/get/config_id=" + res.data.id + "&page_id=" + this.state.sectionId).then
                (response => {
                    console.log("Данные в разделе подписок:", response.data);
                    userData = response.data.list;
                }).then(() => {
                    userData.forEach(item => {
                        this.setState(prevState => {
                            const newArray = this.state.subscriptions;
                            newArray.push(item);
                            return {
                                subscriptions: newArray,
                                componentIsLoading: false
                            }
                        })
                    })
                });
            });
        });
    }

    render() {
        let content;
        if (this.state.componentIsLoading)
            content = <Loader/>;
        else content = (
            <React.Fragment>
                {this.state.subscriptions.map((item, index) => <SubscriptionEntry name={item.name} id={item.id} can_write={item.can_write}
                cost={item.cost} links={item.links} time={item.time} chat_id={item.chat_id} saveChange={item => this.saveChange(item, index)}/>)}
                <div className='registration-dialog-save' onClick={this.sendData}>Сохранить данные</div>
            </React.Fragment>
        );
        return (
            <section style={{position: "relative"}}>
                <PageHeader title='Подписки'/>
                {content}
            </section>
        )
    }
}

