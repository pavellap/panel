import React from 'react'
import './Navigation-header.css'

export default function NavigationHeader(props) {
    let color;
    if (props.status === 'offline')
        color = {backgroundColor: "red"};
    else
        color = {backgroundColor: "green"};
    return (
        <div className='Navigation-header'>
            <div className='Navigation-header-image-wrapper'>
                <img src={require("../../user.png")} alt="user"/>
            </div>
            <div className={'Navigation-header-content-wrapper'}>
                <h2>{props.userName}</h2>
                <div>
                    <span className='Navigation-header-status' style={color}/>
                    <span>{props.status}</span>
                </div>
            </div>
        </div>
    )
}