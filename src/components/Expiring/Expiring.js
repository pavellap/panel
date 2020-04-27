import React from "react";
import PageHeader from "../UI/PageHeader";
import Configuration from "../Messages/Configuration";
import EditEntry from "../Messages/EditEntry";
import Axios from "axios";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            sectionId: 4,
            /*tenDays: "",
            threeDays: "",
            oneDay: ""*/
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

    /*handleChange = (content, type) => {
        if (type === "10days")
            this.setState({tenDays: content});
        else if (type === "3days")
            this.setState({threeDays: content});
        else
            this.setState({oneDay: content})
    };*/

    render() {
        return (
            <section>
                <PageHeader title='Сообщения перед концом подписки'/>
                <Configuration name='Для постоянных' handleClick={(id) => this.props.handleClick(id)}/>
                <form>
                    {this.state.messages.map(item => item)}
                    {/*<EditEntry text='Сообщение, отправляемое за 10 дней до окончания подписки' inputValue='Текст сообщения'
                               getCurrentData={(content) => this.handleChange(content, "10days")}/>
                    <EditEntry text='Сообщение, отправляемое за 3 дня до окончания подписки' inputValue='Текст сообщения'
                               getCurrentData={(content) => this.handleChange(content, "3days")}/>
                    <EditEntry text='Сообщение, отправляемое за день до окончания подписки' inputValue='Текст сообщения'
                               getCurrentData={(content) => this.handleChange(content, "1day")}/>*/}
                    <div className='registration-dialog-save' onClick={() => this.props.sendData(this.state)}>Сохранить данные</div>
                </form>
            </section>
        )
    }
}