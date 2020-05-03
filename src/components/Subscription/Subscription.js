import React from "react";
import SubscriptionEntry from "./SubscriptionEntry";
import PageHeader from "../UI/PageHeader";
import Axios from "axios";
import Loader from "../UI/Loader";
import EditEntry from "../Messages/EditEntry";

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
        const url = "http://188.32.187.157:5000/getpage/config_id=" + this.props.id + '&page_id=' + this.state.sectionId;
        console.log(url, " в подписках");
        Axios.get(url).then(response => {
            console.log(response);
            const newArray = this.state.subscriptions;
            response.data.list.forEach(item => {
                newArray.push(item);
            });
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
            <SubscriptionEntry name={'Тест'} chat_id={55} id={3} can_write={true} cost={[2, 5, 1, 55]} links={[2, 4, 1, 4]}
                               time={[2, 3, 4]}/>
            <div className='registration-dialog-save' onClick={() => this.props.sendData(this.state)}>Сохранить данные</div>
            </React.Fragment>
            /*{this.state.subscriptions.map(item => <SubscriptionEntry name={item.name} id={item.id} can_write={item.can_write}
                cost={item.cost} links={item.links} time={item.time}/>)}*/
        );
        return (
            <section style={{position: "relative"}}>
                <PageHeader title='Подписки'/>
                {content}
            </section>
        )
    }
}