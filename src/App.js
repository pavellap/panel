import React from 'react';
import {Switch, Route} from "react-router-dom";
import Axios from "axios";
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
import {Promo} from "./components/Promo/Promo";
import Present from "./components/Present/Present";
import url from './components/config'
import MessagesSection from "./Containers/MessagesSection";
import Groups from "./components/groups/groups";
import PersonalProfile from "./components/PersonalProfile/PersonalProfile";


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
    *
     */
    render() {
        return (
            <Layout>
                <Switch>
                    <Route exact path='/' render={() => <Authorization
                    handleToken={(val) => this.handleAuth(val)}/>}/>

                    <Route  path='/settings/' render={() => <PersonalProfile/>}/>

                    <Route path='/registration' render={(props) => <Wrapper id={this.state.currentConfig}
                    isAuthorized={this.state.isAuthorized}
                    children={<RegistrationDialog handleConfig={val => this.changeConfiguration(val)}
                    id={this.state.currentConfig} configs={this.state.configurationsList}/>}/>}/>

                    <Route path='/payment' render={(props) => <Wrapper id={this.state.currentConfig}
                    isAuthorized={this.state.isAuthorized}
                    children={<Payment handleConfig={val => this.changeConfiguration(val)}
                    id={this.state.currentConfig} configs={this.state.configurationsList}/>}/>}/>

                    <Route path='/profile' render={(props) => <Wrapper id={this.state.currentConfig}
                                                                       isAuthorized={this.state.isAuthorized}
                    children={<Profile handleConfig={val => this.changeConfiguration(val)}
                    id={this.state.currentConfig} configs={this.state.configurationsList}/>}/>}/>

                    <Route path='/expiring' render={(props) => <Wrapper id={this.state.currentConfig}
                                                                        isAuthorized={this.state.isAuthorized}
                    children={<Expiring handleConfig={val => this.changeConfiguration(val)}
                    id={this.state.currentConfig} configs={this.state.configurationsList}/>}/>}/>

                    <Route path='/present' render={(props) => <Wrapper id={this.state.currentConfig}
                                                                       isAuthorized={this.state.isAuthorized}
                    children={<Present handleConfig={val => this.changeConfiguration(val)}
                    id={this.state.currentConfig} configs={this.state.configurationsList}/>}/>}/>

                    <Route path='/other' render={(props) => <Wrapper id={this.state.currentConfig}
                                                                     isAuthorized={this.state.isAuthorized}
                    children={<Other  handleConfig={val => this.changeConfiguration(val)}
                    id={this.state.currentConfig} configs={this.state.configurationsList}/>}/>}/>

                    <Route path='/profiles' render={(props) => <Wrapper id={this.state.currentConfig}
                                                                        isAuthorized={this.state.isAuthorized}
                    children={<Profiles  handleConfig={val => this.changeConfiguration(val)}
                    id={this.state.currentConfig} configs={this.state.configurationsList} token={this.state.token}/>}/>}/>

                    <Route path='/mailing' render={(props) => <Wrapper isAuthorized={this.state.isAuthorized}
                                                                       id={this.state.currentConfig}
                    children={<Mailing/>}/>}/>

                    <Route path='/download' render={(props) => <Wrapper isAuthorized={this.state.isAuthorized}
                        id={this.state.currentConfig}
                    children={<Download/>}/>}/>

                    <Route path='/subscription' render={(props) => <Wrapper id={this.state.currentConfig}
                                                                            isAuthorized={this.state.isAuthorized}
                    children={<Subscription id={this.state.currentConfig}/>}/>}/>

                    <Route path='/reanimation' render={(props) => <Wrapper id={this.state.currentConfig}
                                                                           isAuthorized={this.state.isAuthorized}
                    children={<Reanimation handleConfig={val => this.changeConfiguration(val)}
                    configId={this.state.currentConfig}/>}/>}/>

                    <Route path='/messages' render={() => <Wrapper Wrapper id={this.state.currentConfig}
                                                                   isAuthorized={this.state.isAuthorized}
                    children={<MessagesSection/>}/>}/>

                    <Route path='/groups' render={() => <Wrapper isAuthorized={this.state.isAuthorized}
                                                                 id={this.state.currentConfig} children={
                        <Groups/>
                    }/>}/>
                    <Route path='/promo' render={() => <Wrapper isAuthorized={this.state.isAuthorized}
                     id={this.state.currentConfig} children={<Promo/>}/>}/>
                </Switch>
            </Layout>
        )
    }
}

