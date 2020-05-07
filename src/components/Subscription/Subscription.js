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
            componentIsLoading: true
        }
    }

    componentDidMount() {
        const localURL = url + "/page/get/config_id=" + this.props.id + "&page_id=" + this.state.sectionId;
        Axios.get(localURL).then(response => {
            console.log("Данные в подписках:", response.data);
            const newArray = this.state.subscriptions;
            response.data.list.forEach(item => {
                newArray.push(item);
            }).catch(e => console.log("Ошибочка, сука"));
            this.setState({
                subscriptions: newArray,
                componentIsLoading: false
            })
        })
    }

    render() {
        let content;
        if (this.state.componentIsLoading)
            content = <Loader/>;
        else content = (
            <React.Fragment>
                <div className='registration-dialog-save' onClick={() => this.props.sendData(this.state)}>Сохранить данные</div>
                {this.state.subscriptions.map(item => <SubscriptionEntry name={item.name} id={item.id} can_write={item.can_write}
                cost={item.cost} links={item.links} time={item.time}/>)}
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

/*
<SubscriptionEntry name={'Тест'} chat_id={55} id={3} can_write={true} cost={[2, 5, 1, 55]} links={[2, 4, 1, 4]}
                               time={[2, 3, 4]}/>
*/