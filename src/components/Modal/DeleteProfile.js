import React from 'react'
import './DeleteProfile.css'

export default function DeleteProfile(props) {
    return (
        <React.Fragment>
            <h5>Вы действительно хотите удалить эту анкету?</h5>
            <div onClick={props.handleDelete}>Удалить анкету</div>
        </React.Fragment>
    )
}