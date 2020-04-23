import React from 'react';
import {Switch, Route} from "react-router-dom";
import './App.css';
import Layout from "./components/hoc/Layout";
import Authorization from "./components/Authorization/Authorization";
import Wrapper from "./components/hoc/Wrapper";
import Messages from "./components/Messages/Messages";
import Reanimation from "./components/Reanimation/Reanimation";
import Download from "./components/Download/Download";
import Profiles from "./components/Profiles/Profiles";
import Mailing from "./components/Mailing/Mailing";
import Subscription from "./components/Subscription/Subscription";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentConfig: 1
        }
    }

    changeConfiguration = (newId) => {
        this.setState({currentConfig: newId});
        console.log("Айди нового конфига:", newId);
    };

    render() {
        return (
            <Layout>
                <Switch>
                    <Route exact path='/' component={Authorization}/>
                    <Route path='/messages' render={(props) => <Wrapper id={this.state.currentConfig} children={<Messages handleClick={(id) => this.changeConfiguration(id)}
                    configId={this.state.currentConfig}/>}/>}/>
                    <Route path='/profiles' render={(props) => <Wrapper id={this.state.currentConfig}  children={<Profiles
                        handleClick={(id) => this.changeConfiguration(id)}
                        configId={this.state.currentConfig}/>}/>}/>
                    <Route path='/reanimation' render={(props) => <Wrapper id={this.state.currentConfig}  children={<Reanimation
                        handleClick={(id) => this.changeConfiguration(id)}
                        configId={this.state.currentConfig}/>}/>}/>
                    <Route path='/download' render={(props) => <Wrapper id={this.state.currentConfig}  children={<Download/>}/>}/>
                    <Route path='/mailing' render={(props) => <Wrapper id={this.state.currentConfig}  children={<Mailing/>}/>}/>
                    <Route path='/subscription' render={(props) => <Wrapper id={this.state.currentConfig}  children={<Subscription/>}/>}/>
                </Switch>
            </Layout>
        )
    }
}


