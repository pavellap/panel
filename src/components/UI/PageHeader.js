import React from "react";
import './PageHeader.css'

export default function PageHeader(props) {
    return (
        <h3 className='Page-header'>
            {props.title}
        </h3>
    )
}