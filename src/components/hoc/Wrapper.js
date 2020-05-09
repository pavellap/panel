import React from "react";
import Navigation from "../Navigation/Navigation";
import './Wrapper.css'

export default class Wrapper extends React.Component {
    render() {
        return (
            <div className='Wrapper'>
                <Navigation configId={this.props.id}/>
                {this.props.children}
            </div>
        )
    }
}