import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Navigation-item.css'
import {NavLink} from "react-router-dom";

export default function NavigationItem(props) {
    return (
        <div className='Navigation-item'>
            {<FontAwesomeIcon icon={props.icon}/>}
            <NavLink to={props.link}>{props.content}</NavLink>
        </div>
    )
}