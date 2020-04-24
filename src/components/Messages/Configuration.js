import React from 'react'
import './Configuration.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronDown, faPlus} from '@fortawesome/free-solid-svg-icons'
import ConfigurationItem from "./ConfigurationItem";

export default class Configuration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false,
            configurations: [

            ]
        };
    }

    handleAddConfig = () => {
        const newArray = this.state.configurations;
        const newId = Math.round(Math.random() * 1000); // заменить на фетч
        newArray.push({
            id: newId,
            render: <ConfigurationItem handleClick={(id) => this.props.handleClick(id)}
            id={newId} name={newId}/>
        });
        this.setState({configurations: newArray})
    };

    toggleMenu = () => {
        if (this.state.configurations.length > 0)
            this.setState({menuOpen: !this.state.menuOpen})
    };

    render() {
        let iconClass;
        let containerClass;
        if (this.state.menuOpen) {
            iconClass = 'icon-menu-open';
            containerClass = 'configuration-item-container-open';
        }
        else {
            iconClass = 'icon-menu-close';
            containerClass = 'configuration-item-container-close'
        }
        console.log("Current class: ", containerClass);
        return (
            <section className='configuration-container'>
                <div className='configuration-container-wrapper'>
                    <span style={{marginRight: 20, marginLeft: 20}}>Текущая конфигурация:&nbsp;&nbsp;1</span>
                    <FontAwesomeIcon icon={faChevronDown} color='rgb(123, 123, 123)' cursor='pointer'
                    className={iconClass} onClick={this.toggleMenu}/>
                    <div className={containerClass}>
                        {this.state.menuOpen && this.state.configurations.map(item => item.render)}
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: "space-between"}}>
                    <div className='add-configuration-button' onClick={this.handleAddConfig}>
                        <span>Добавить конфигурацию</span>
                        <FontAwesomeIcon icon={faPlus} size={'2x'}/>
                    </div>
                </div>
            </section>
        )
    }
}