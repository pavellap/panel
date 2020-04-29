import React from "react";
import PageHeader from "../UI/PageHeader";
import Configuration from "../Messages/Configuration";
import Axios from "axios";
import EditEntry from "../Messages/EditEntry";
import Loader from "../UI/Loader";
export default class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            sectionId: 2,
            configId: this.props.id,
            componentIsLoading: true
        }
    }

    componentDidMount() {
        const url = "http://188.32.187.157:5000/getpage/config_id=" + this.state.configId + '&page_id=' + this.state.sectionId;
        let userData;
        Axios.get(url).then(response => {
            userData = response.data.list;
            console.log("Данные в запросе:", userData);
        }).then(() => {
            userData.forEach(item => {
                this.setState(prevState => {
                    const newArray = this.state.messages;
                    newArray.push(<EditEntry text={item.name} value={item.text} helpInfo={item.description} type={item.ans_type}/>);
                    return {
                        messages: newArray,
                        componentIsLoading: false
                    }
                })
            })
        });
    }

    handleSave = () => {

    };

    render() {
        let content;
        if (this.state.componentIsLoading)
            content = <Loader/>;
        else content = (
            <React.Fragment>
                {this.state.messages.map((item) => item)}
                <div className='registration-dialog-save' onClick={() => this.props.sendData(this.state)}>Сохранить данные</div>
            </React.Fragment>
        );
        return (
            <section style={{position: "relative"}}>
                <PageHeader title='Главное меню и оплата'/>
                <Configuration  handleClick={(id) => this.props.handleClick(id)}
                               configs={this.props.configs}/>
                {content}
            </section>
        )
    }
}
