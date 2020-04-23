import React from 'react'
import './Authorization-form.css'

export default function AuthorizationForm(props) {
    return (
        <div className='Input-wrapper'>
            <input type="text" placeholder={props.name}/>
        </div>
    )
}