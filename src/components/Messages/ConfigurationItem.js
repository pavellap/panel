import React from 'react'
import './ConfigurationItem.css'

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id
        }
    }



    render() {
        return (
            <div className='configuration-item' onClick={() => this.props.handleClick(this.state.id)}>
                Конфигурация:  {this.props.name}  {this.props.active ? "active" : "disabled"}</div>
        )
    }
}