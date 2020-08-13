import React from 'react';
import {Switch, Route} from "react-router-dom";
import Axios from "axios";
import Layout from "./components/hoc/Layout";
import Authorization from "./components/Authorization/Authorization";
import Wrapper from "./components/hoc/Wrapper";
import Download from "./components/Download/Download";
import Profiles from "./components/Profiles/Profiles";
import Subscription from "./components/Subscription/Subscription";
import {Promo} from "./components/Promo/Promo";
import url from './config'
import MessagesTemplate from "./Containers/MessagesContainer";
import Groups from "./components/Groups/Groups";
import PersonalProfile from "./components/PersonalProfile/PersonalProfile";
import {sections} from "./Constants/AppTemplate";
import Mail from "./components/Mailing/Mail";
import Tariff from "./components/Tariff/Tariff";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentConfig: null,
            configurationsList: [],
            token: null,
            isAuthorized: false,
        };
    }

    componentDidMount() {
        const localURL = url + "/config/get";
        Axios.get(localURL + "/" +
            localStorage.getItem('token')).then((response) => {
                this.setState({configurationsList: response.data,
                    currentConfig: response.data[0].id});
            }
        );
    }

    changeConfiguration = (newId) => {
        Axios.get(url + "/config/choose/id=" + newId + "/" +
            localStorage.getItem('token'));
        this.setState({currentConfig: newId});
    };

    handleAuth = (val) => {
        if (val)
            this.setState({isAuthorized: true}, () => {
                console.log("Status", this.state.isAuthorized)
            });
    }
    /*
    * TODO:
    *  1. Роли прокидывать в редакс, чтобы не ебаться с кучей пропсов
    *  2. Нормально доделать структуру App.js
    *
     */
    render() {
        return (
            <Layout>
                <Switch>
                    <Route exact path='/' render={() => <Authorization
                    handleToken={(val) => this.handleAuth(val)}/>}/>
                    <Route  path='/settings/' render={() => <PersonalProfile/>}/>

                    {sections.map(item =>
                        <Route path={item.path}>
                            <Wrapper id={this.state.currentConfig}
                                     isAuthorized={this.state.isAuthorized}>
                                <MessagesTemplate title={item.title} handleConfig={val => this.changeConfiguration(val)}
                                id={item.id} configs={this.state.configurationsList}/>
                            </Wrapper>
                        </Route>
                    )}

                    <Route path='/profiles' render={() => <Wrapper id={this.state.currentConfig}
                                                                        isAuthorized={this.state.isAuthorized}
                    children={<Profiles  handleConfig={val => this.changeConfiguration(val)}
                    id={this.state.currentConfig} configs={this.state.configurationsList} token={this.state.token}/>}/>}/>

                    <Route path='/mailing' render={() => <Wrapper isAuthorized={this.state.isAuthorized}
                                                                       id={this.state.currentConfig}
                    children={<Mail/>}/>}/>

                    <Route path='/download' render={() => <Wrapper isAuthorized={this.state.isAuthorized}
                        id={this.state.currentConfig}
                    children={<Download/>}/>}/>

                    <Route path='/subscription' render={() => <Wrapper id={this.state.currentConfig}
                                                                            isAuthorized={this.state.isAuthorized}
                    children={<Subscription id={this.state.currentConfig}/>}/>}/>

                    <Route path='/groups' render={() => <Wrapper isAuthorized={this.state.isAuthorized}
                                                                 id={this.state.currentConfig} children={
                        <Groups/>
                    }/>}/>
                    <Route path='/promo' render={() => <Wrapper isAuthorized={this.state.isAuthorized}
                     id={this.state.currentConfig} children={<Promo/>}/>}/>
                     <Route path='/tariff' render={() => <Wrapper isAuthorized={this.state.isAuthorized}
                       id={this.state.currentConfig} children={<Tariff/>}/>}/>
                </Switch>
            </Layout>
        )
    }
}

