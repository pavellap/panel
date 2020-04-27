import React from "react";
import './Payment.css'
import PageHeader from "../UI/PageHeader";
import Configuration from "../Messages/Configuration";
import Axios from "axios";
import EditEntry from "../Messages/EditEntry";

export default class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            sectionId: 2
        }
    }
    componentDidMount() {
        const url = "http://188.32.187.157:5000/getpage/config_id=" + this.props.id + '&page_id=' + this.state.sectionId;
        let userData;
        Axios.get(url).then(response => {
            userData = response.data.list;
        }).then(() => {
            userData.forEach(item => {
                this.setState(prevState => {
                    const newArray = this.state.messages;
                    newArray.push(<EditEntry text={item.name} value={item.text} helpInfo={item.description}/>);
                    return {
                        messages: newArray
                    }
                })
            })
        });
    }

    handleSave = () => {

    };

    render() {
        console.log("Рендерим Оплату с конфигами:", this.props.configs);
        const url = "http://188.32.187.157:5000/getpage/config_id=" + this.props.id + '/' + this.state.sectionId;
        console.log(url);
        return (
            <section>
                <PageHeader title='Главное меню и оплата'/>
                <Configuration name='Для постоянных' handleClick={(id) => this.props.handleClick(id)}
                configs={this.props.configs}/>
                {this.state.messages.map((item) => item)}
                <div className='registration-dialog-save' onClick={() => this.props.sendData(this.state)}>Сохранить данные</div>
            </section>
        )
    }
}