import React from "react";
import SubscriptionEntry from "./SubscriptionEntry";
import PageHeader from "../UI/PageHeader";

export default class Subscription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: []
        }
    }
    render() {
        return (
            <section>
                <PageHeader title='Подписки'/>
                {this.state.entries.map(item => item)}
                <SubscriptionEntry/>
            </section>
        )
    }
}