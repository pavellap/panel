import React from "react";
import PageHeader from "../UI/PageHeader";
import Configuration from "../Messages/Configuration";
import Axios from "axios";
import EditEntry from "../Messages/EditEntry";
import Loader from "../UI/Loader";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            sectionId: 3,
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
        console.log("Данные на отправку в анкете:", this.state.messages);
        Axios.post(url, {
            "page": this.state.sectionId,
            "configId": this.props.id,
            "list": this.state.messages
        })
    };

    render() {
        let content;
        // отрисовываем лоадер, если компонент ещё загружается
        if (this.state.componentIsLoading)
            content = <Loader/>;
        else content = (
            <form>
                {this.state.messages.map((item) => (
                    <EditEntry type={item.type} name={item.name} description={item.description} text={item.text}
                               getCurrentData={(val) => this.handleChange(val, item.id)}/>
                ))}
                <div className='registration-dialog-save' onClick={this.postData}>Сохранить данные</div>
            </form>
        );
        return (
            <section style={{position: "relative"}}>
                <PageHeader title='Анкета'/>
                <Configuration configs={this.props.configs} handleConfig={val => this.props.handleConfig(val)}
                               currentConfig={this.props.id}/>
                {content}
            </section>
        )
    }
}