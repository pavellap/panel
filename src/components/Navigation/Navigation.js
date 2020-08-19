import React from 'react'
import {titles, links, icons, messagesContent} from "../../Constants/NavigationTemplate";
import NavigationItem from "./Navigation-item";
import {withStyles, Accordion} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import './Navigation.css'
import Typography from "@material-ui/core/Typography";
import {connect} from 'react-redux'
import {sideNavColor, sideNavColorActive} from "../../config";
import styled from "styled-components";


const Wrapper = styled.aside`
    background-color: ${sideNavColor};
    min-height: 100vh;
    height: 100%;
    color: rgb(191, 203, 217);
    font-weight: lighter;
    header {
        display: flex;
        background-color: ${sideNavColor};
        justify-content: center;
        padding-top: 10px;
        h4 {
            margin: 0;
            padding: 10px 20px;
            text-transform: uppercase;
            font-weight: normal;
            color: #fff;
        }
    }
`

/*
*    Стили для аккордеона
* */
const AccordionSummary = withStyles({
    root: {
        backgroundColor: sideNavColor,
        color: "#fff",
        '&:hover': {
            backgroundColor: sideNavColorActive
        }
    },

})(MuiAccordionSummary)

 class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: "Диалог Регистрации",
            accordIsOpen: false
        }
    }

    handleAccord = () => {
        localStorage.setItem('navMessagesIsOpen',
            localStorage.getItem('navMessagesIsOpen') === 'true' ? 'false' : 'true')
    }

    handleChangeCurrent = item => {
        // TODO: убрать лог после дебагга
        console.log("Меняем активный на:", item);
        this.setState({active: item})
    };

    render() {
        if (typeof localStorage.getItem('navMessagesIsOpen') === undefined) {
            console.log("Ининциализируем localstorage...")
            localStorage.setItem("navMessagesIsOpen", 'false')
        }

        const {config} = this.props
        console.log("Конфиг в header:", config)
        return (
            <Wrapper>
                <header>
                    <h4>Панель управления</h4>
                </header>
                <div className='Menu-description'>Текущая конфигурация: {config ? config.id : null}</div>
                    <nav>
                        <Accordion onChange={this.handleAccord} expanded={localStorage.getItem('navMessagesIsOpen') !== 'true'}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon style={{color: "#fff"}}/>}>
                                <Typography>Раздел сообщений</Typography>
                            </AccordionSummary>
                            {messagesContent.map((item, index) => {
                                let styles = {backgroundColor: sideNavColor};
                                if (window.location.pathname === '/' + item[1])
                                    styles = {backgroundColor: sideNavColorActive};
                                return <NavigationItem key={index} content={item[0]} link={item[1]}
                                                icon={item[2]} color={styles}
                                                handleClick={() => this.handleChangeCurrent(item)}/>
                            })}
                        </Accordion>
                        {titles.map((item, index) => {
                            let styles = {backgroundColor: sideNavColor};
                            if (window.location.pathname ===  "/" + links[index])
                                styles = {backgroundColor: sideNavColorActive};
                            return (
                                <NavigationItem content={item} icon={icons[index]}
                                    link={links[index]}  key={index} color={styles}
                                    handleClick={() => this.handleChangeCurrent(item)}/>
                            )
                        })}
                    </nav>
            </Wrapper>
        )
    }
}

function mapStateToProps(state) {
    return {
        config: state.config.currentConfig,
        configs: state.config.configs
    }
}

export default connect(mapStateToProps, null)(Navigation)
