import React from "react";
import './PageHeader.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";

// добавить выход по нажатию
export default function PageHeader(props) {
    return (
        <h3 className='Page-header'>
            {props.title}
            <FontAwesomeIcon icon={faSignOutAlt} size='2x' color='#a9a9a9' cursor='pointer'/>
        </h3>
    )
}