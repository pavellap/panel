import React from "react";
import PageHeader from "../UI/PageHeader";
import Configuration from "../Messages/Configuration";
import EditEntry from "../Messages/EditEntry";
import Axios from "axios";
import Loader from "../UI/Loader";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            sectionId: 4,
            componentIsLoading: true
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
                    newArray.push(item);
                    return {
                        messages: newArray,
                        componentIsLoading: false
                    }
                })
            })
        });
    }



    render() {
        let content;
        if (this.state.componentIsLoading)
            content = <Loader/>;
        else content = (
            <form>
                {this.state.messages.map((item) => (
                    <EditEntry type={item.type} name={item.name} description={item.description} text={item.text}/>
                ))}
                <div className='registration-dialog-save' onClick={() => this.props.sendData(this.state)}>Сохранить данные</div>
            </form>
        );
        return (
            <section style={{position: "relative"}}>
                <PageHeader title='Сообщения перед концом подписки'/>
                <Configuration name='Для постоянных' handleClick={(id) => this.props.handleClick(id)}/>
                {content}
            </section>
        )
    }
}