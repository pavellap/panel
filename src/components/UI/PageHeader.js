import React from "react";
import './PageHeader.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import url from '../config'

// добавить выход по нажатию

const handleClick = () => {
    console.log("Exiting");
    Axios.get(url + "/exit/" + localStorage.getItem('token')).then(res => console.log(res.status)).catch(err =>
        console.log(err.data)
    )
    window.location = '/'
};

export default function PageHeader(props) {
    return (
        <h3 className='Page-header'>
            {props.title}
            <FontAwesomeIcon icon={faSignOutAlt} size='2x' color='#a9a9a9' cursor='pointer' onClick={handleClick}/>
        </h3>
    )
}