import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Navigation-item.scss'
import {NavLink} from "react-router-dom";



export default function NavigationItem(props) {
    return (
        <React.Fragment>
            <NavLink to={props.link} className='Navigation-item' style={props.color} onClick={props.handleClick}>
                <FontAwesomeIcon icon={props.icon} color={'rgb(191, 203, 217)'}/>
                <span style={{color: 'rgb(191, 203, 217)'}}>{props.content}</span>
            </NavLink>
        </React.Fragment>
    )
}
