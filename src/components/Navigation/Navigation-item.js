import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Navigation-item.css'
import {NavLink} from "react-router-dom";

export default function NavigationItem(props) {
    return (
        <React.Fragment>
            <NavLink to={props.link} className='Navigation-item'>
                <FontAwesomeIcon icon={props.icon}/>
                <span>{props.content}</span>
            </NavLink>
        </React.Fragment>
    )
}