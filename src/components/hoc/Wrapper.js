import React from "react";
import Navigation from "../Navigation/Navigation";
import './Wrapper.css'
//import {Redirect} from "react-router";

export default class Wrapper extends React.Component {
    // TODO: remove comment block
    render() {
        return (
            <div className='Wrapper'>
                <Navigation configId={this.props.id}/>
                {/*{!this.props.isAuthorized && <Redirect to='/'/>}*/}
                {this.props.children}
            </div>
        )
    }
}