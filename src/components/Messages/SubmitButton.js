import React from "react";
import './SubmitButton.css'

export default class SubmitButton extends React.Component {
    render() {
        return (
            <div style={{display: "flex", justifyContent: "center", paddingTop: "20px"}}>
                <button className='submit-button'>Сохранить</button>
            </div>
        )
    }
}