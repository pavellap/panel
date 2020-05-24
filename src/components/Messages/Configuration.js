import React from 'react'
import './Configuration.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronDown, faPlus} from '@fortawesome/free-solid-svg-icons'
import ConfigurationItem from "./ConfigurationItem";
import Axios from "axios";
import url from "../config";

export default class Configuration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false,
            configurations: this.props.configs,
            currentConfig: this.props.currentConfig
        };
    }

    handleAddConfig = () => {
        let url = "http://188.32.187.157:5000";
        url += '/config/add';
        Axios.get(url + "/" +
            localStorage.getItem('token')).then(response => {
            this.setState({configurations: response.data});
            window.location.reload(false);
        });
        this.setState({menuOpen: false})
    };

    toggleMenu = () => {
        if (this.state.configurations.length >= 0)
            this.setState({menuOpen: !this.state.menuOpen})
    };

    localChange = val => {
        this.setState({currentConfig: val})
    };

    handleDelete = (id) => {
        Axios.get(url + "/config/delete/" + id + "/" +
            localStorage.getItem('token')).then(res => {
            const array = this.state.configurations;
            array.filter(item => item.id !== id);
            this.setState({configurations: array});
            window.location.reload(false);
        })
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
        return (
            <section className='configuration-container'>
                <div className='configuration-container-wrapper'>
                    <span style={{marginRight: 20, marginLeft: 20}}>Текущая конфигурация:&nbsp;&nbsp;{this.state.currentConfig}</span>
                    <FontAwesomeIcon icon={faChevronDown} color='rgb(123, 123, 123)' cursor='pointer'
                    className={iconClass} onClick={this.toggleMenu}/>
                    <div className={containerClass}>
                        {this.state.menuOpen && this.state.configurations.map(item => <ConfigurationItem
                            handleClick={(id) => {this.props.handleConfig(id); this.localChange(id)}}
                            id={item.id} name={item.id} active={item.active} handleDelete={(id) => this.handleDelete(id)}/>)}
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