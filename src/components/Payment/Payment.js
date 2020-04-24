import React from "react";
import './Payment.css'
import PageHeader from "../UI/PageHeader";
import Configuration from "../Messages/Configuration";

export default class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <section>
                <PageHeader title='Главное меню и оплата'/>
                <Configuration name='Для постоянных' handleClick={(id) => this.props.handleClick(id)}/>
            </section>
        )
    }
}