import React from 'react'
import './ConfigurationItem.css'

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            active: this.props.active
        }
    }

    handleChange = () => {
        {this.setState({active: !this.state.active})}
    };

    render() {
        return (
            <div className='configuration-item'>
                <span onClick={() => this.props.handleClick(this.state.id)}>Конфигурация:&nbsp;&nbsp;
                    {this.props.name}  {/*{this.props.active ? "active" : "disabled"}*/}</span>
                <div className="pretty p-switch p-fill" style={{marginLeft: 17}}>
                    <input type="checkbox" checked={this.state.active} ref={this.checkbox} onChange={this.handleChange}/>
                    <div className="state">
                        <label/>
                    </div>
                </div>
            </div>
        )
    }
}