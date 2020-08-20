import React from 'react';
import {Switch, Route} from "react-router-dom";
import Layout from "./components/hoc/Layout";
import Authorization from "./components/Authorization/Authorization";
import Wrapper from "./components/hoc/Wrapper";
import Download from "./components/Download/Download";
import Profiles from "./components/Profiles/Profiles";
import {Promo} from "./components/Promo/Promo";
import MessagesTemplate from "./Containers/MessagesContainer";
import Groups from "./components/Groups/Groups";
import PersonalProfile from "./components/PersonalProfile/PersonalProfile";
import {sections} from "./Constants/AppTemplate";
import Mail from "./components/Mailing/Mail";
import Tariff from "./components/Tariff/Tariff";
import {fetchConfigs} from "./Redux/Actions/ConfigActions";
import {connect} from 'react-redux'

class App extends React.Component {
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
        this.props.fetchConfigs()

    }


    handleAuth = (val) => {
        if (val)
            this.setState({isAuthorized: true}, () => {
                console.log("Status", this.state.isAuthorized)
            });
    }

    render() {
        return (
            <Layout>
                <Switch>
                    <Route exact path='/' render={() => <Authorization
                    handleToken={(val) => this.handleAuth(val)}/>}/>
                    <Route  path='/settings/' render={() => <PersonalProfile/>}/>

                    {sections.map(item =>
                        <Route path={item.path} key={item.id}>
                            <Wrapper id={this.state.currentConfig}
                                     isAuthorized={this.state.isAuthorized}>
                                <MessagesTemplate title={item.title}
                                id={item.id}/>
                            </Wrapper>
                        </Route>
                    )}

                    <Route path='/profiles' render={() => <Wrapper id={this.state.currentConfig}
                                                                        isAuthorized={this.state.isAuthorized}
                    children={<Profiles
                    id={this.state.currentConfig} configs={this.state.configurationsList} token={this.state.token}/>}/>}/>

                    <Route path='/mailing' render={() => <Wrapper isAuthorized={this.state.isAuthorized}
                                                                       id={this.state.currentConfig}
                    children={<Mail/>}/>}/>

                    <Route path='/download' render={() => <Wrapper isAuthorized={this.state.isAuthorized}
                        id={this.state.currentConfig}
                    children={<Download/>}/>}/>

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

function mapStateToProps(state){
    return {
        configs: state.config.configs
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchConfigs: () => dispatch(fetchConfigs())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
