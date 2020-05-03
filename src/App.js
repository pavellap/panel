import React from 'react';
import {Switch, Route} from "react-router-dom";
import Axios from "axios";
import './App.css';
import './normalize.css'
import Layout from "./components/hoc/Layout";
import Authorization from "./components/Authorization/Authorization";
import Wrapper from "./components/hoc/Wrapper";
import Reanimation from "./components/Reanimation/Reanimation";
import Download from "./components/Download/Download";
import Profiles from "./components/Profiles/Profiles";
import Mailing from "./components/Mailing/Mailing";
import Subscription from "./components/Subscription/Subscription";
import RegistrationDialog from "./components/RegistrationDialog/RegistrationDialog";
import Payment from "./components/Payment/Payment";
import Expiring from "./components/Expiring/Expiring";
import Other from "./components/Other/Other";
import Profile from "./components/Profile/Profile";
import Present from "./components/Present/Present";

import Parser from "./Parser";

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentConfig: null,
            configurationsList: []
        }
    }

    changeConfiguration = (newId) => {
        this.setState({currentConfig: newId});
    };

    componentDidMount() {
        const configsUrl = "http://188.32.187.157:5000/";
        Axios.get(configsUrl + "configs").then((response) => {
                console.log("Приложение получило конфигурации:", response.data.configurations);
                this.setState({configurationsList: response.data.configurations,
                    currentConfig: response.data.configurations[0]});
            }
        );
    }

    render() {
        return (
            <Layout>
                <Switch>
                    <Route exact path='/' component={Authorization}/>

                    <Route path='/registration' render={(props) => <Wrapper id={this.state.currentConfig}
                    children={<RegistrationDialog id={this.state.currentConfig} configs={this.state.configurationsList}/>}/>}/>

                    <Route path='/payment' render={(props) => <Wrapper id={this.state.currentConfig}
                    children={<Payment id={this.state.currentConfig} configs={this.state.configurationsList}/>}/>}/>

                    <Route path='/profile' render={(props) => <Wrapper id={this.state.currentConfig}
                    children={<Profile handleClick={(id) => this.changeConfiguration(id)} id={this.state.currentConfig} configs={this.state.configurationsList}/>}/>}/>

                    <Route path='/expiring' render={(props) => <Wrapper id={this.state.currentConfig}
                    children={<Expiring id={this.state.currentConfig} configs={this.state.configurationsList}/>}/>}/>

                    <Route path='/present' render={(props) => <Wrapper id={this.state.currentConfig}
                    children={<Present id={this.state.currentConfig} configs={this.state.configurationsList}/>}/>}/>

                    <Route path='/other' render={(props) => <Wrapper id={this.state.currentConfig}
                    children={<Other id={this.state.currentConfig}/>} configs={this.state.configurationsList}/>}/>

                    <Route path='/profiles' render={(props) => <Wrapper id={this.state.currentConfig}
                    children={<Profiles handleClick={(id) => this.changeConfiguration(id)} id={this.state.currentConfig} configs={this.state.configurationsList}/>}/>}/>

                    <Route path='/mailing' render={(props) => <Wrapper id={this.state.currentConfig}
                     children={<Mailing/>}/>}/>

                    <Route path='/download' render={(props) => <Wrapper id={this.state.currentConfig}
                    children={<Download/>}/>}/>

                    <Route path='/subscription' render={(props) => <Wrapper id={this.state.currentConfig}
                    children={<Subscription id={this.state.currentConfig}/>}/>}/>

                    <Route path='/reanimation' render={(props) => <Wrapper id={this.state.currentConfig}
                    children={<Reanimation handleClick={(id) => this.changeConfiguration(id)}
                    configId={this.state.currentConfig}/>}/>}/>
                </Switch>
            </Layout>
        )
    }
}
