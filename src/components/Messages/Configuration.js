import React from 'react'
import './Configuration.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronDown, faPlus} from '@fortawesome/free-solid-svg-icons'
import ConfigurationItem from "./ConfigurationItem";
import Axios from "axios";

export default class Configuration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false,
            configurations: this.props.configs
        };
    }

    handleAddConfig = () => {
        let url = "http://188.32.187.157:5000";
        url += '/config/get';
        Axios.get(url).then(response => {
            console.log("Новые конфигурации:", response.data);
            this.setState({configurations: response.data.configurations})
        });
        //this.setState({configurations: newArray})
    };

    toggleMenu = () => {
        if (this.state.configurations.length > 0)
            this.setState({menuOpen: !this.state.menuOpen})
    };

    handleClick = (id) => {
        console.log("Вы нажали на конфиг с id:", id)
    };

    render() {
        console.log("Конфигурации в своём компоненте:", this.state.configurations);
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
        return (
            <section className='configuration-container'>
                <div className='configuration-container-wrapper'>
                    <span style={{marginRight: 20, marginLeft: 20}}>Текущая конфигурация:&nbsp;&nbsp;{this.props.currentConfig}</span>
                    <FontAwesomeIcon icon={faChevronDown} color='rgb(123, 123, 123)' cursor='pointer'
                    className={iconClass} onClick={this.toggleMenu}/>
                    <div className={containerClass}>
                        {this.state.menuOpen && this.state.configurations.map(item => <ConfigurationItem
                            handleClick={(id) => this.props.handleConfig(id)}  id={item} name={item} active={this.props.active}/>)}
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