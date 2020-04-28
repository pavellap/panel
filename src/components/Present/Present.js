import React from 'react'
import PageHeader from "../UI/PageHeader";
import Configuration from "../Messages/Configuration";
import Axios from "axios";
import EditEntry from "../Messages/EditEntry";

export default class Present extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            sectionId: 5
        };
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

    render() {
        return (
            <section>
                <PageHeader title='Отправка подарочных сертификатов'/>
                <Configuration handleClick={(id) => this.props.handleClick(id)}/>
                {this.state.messages.map(item => item)}
            </section>
        )
    }
}