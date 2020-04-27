import React from 'react'
import PageHeader from "../UI/PageHeader";
import Configuration from "../Messages/Configuration";
import EditEntry from "../Messages/EditEntry";
import Axios from "axios";

export default class Other extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /*trash: "",
            successMessage: ""*/
            messages: [],
            sectionId: 6
        }
    }

    /*handleChange = (content, type) => {
        if (type === 'trash') {
            this.setState(prevState => {
                return {trash: content}
            })
        }
        else
            this.setState(prevState => {
                return {successMessage: content}
            })
    };*/

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

    render() {
        return(
            <section>
                <PageHeader title='Другое'/>
                <Configuration/>
                <form>
                    {this.state.messages.map(item => item)}
                    {/*<EditEntry text='Ввод непонятной информации' inputValue='Текст сообщения'
                               getCurrentData={(content) => this.handleChange(content, "trash")}/>
                    <EditEntry text='Успешное прохождение анкеты' inputValue='Текст сообщения'
                               getCurrentData={(content) => this.handleChange(content, "success")}/>*/}
                    <div className='registration-dialog-save' onClick={() => this.props.sendData(this.state)}>Сохранить данные</div>
                </form>
            </section>
        )
    }
}