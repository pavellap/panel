import React from 'react'
import {titles, links, icons, messagesContent} from "../../Constants/NavigationTemplate";
import NavigationHeader from "./Navigation-header";
import NavigationItem from "./Navigation-item";
import {withStyles, Accordion} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import './Navigation.css'
import Typography from "@material-ui/core/Typography";
import {connect} from 'react-redux'


/*
*    Стили для аккордеона
* */
const AccordionSummary = withStyles({
    root: {
        backgroundColor: "#26262b",
        color: "#fff",
        '&:hover': {
            backgroundColor: "#656568"
        }
    },

})(MuiAccordionSummary)

 class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: 'admin', // TODO эта хуйня потом через редакс будет прокидываться
            status: "online",
            active: "Диалог Регистрации",
            accordIsOpen: false
        }
    }

    handleAccord = () => this.setState({accordIsOpen: !this.state.accordIsOpen})

    handleChangeCurrent = item => {
        // TODO: убрать лог после дебагга
        console.log("Меняем активный на:", item);
        this.setState({active: item})
    };

    render() {
        const {config} = this.props
        console.log("Конфиг в header:", config)
        return (
            <aside className='Menu-container'>
                <NavigationHeader userName={this.state.user} status={this.state.status}/>
                <div className='Menu-description'>Текущая конфигурация: {config ? config.id : null}</div>
                    <nav>
                        <Accordion expanded={this.state.accordIsOpen} onChange={this.handleAccord}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon style={{color: "#fff"}}/>}>
                                <Typography>Раздел сообщений</Typography>
                            </AccordionSummary>
                            {messagesContent.map((item, index) => {
                                let styles;
                                if (window.location.pathname === '/' + item[1])
                                    styles = {backgroundColor: "#7289da"};
                                return <NavigationItem key={index} content={item[0]} link={item[1]}
                                                icon={item[2]} color={styles}
                                                handleClick={() => this.handleChangeCurrent(item)}/>
                            })}
                        </Accordion>
                        {titles.map((item, index) => {
                            let styles = null;
                            if (window.location.pathname ===  "/" + links[index])
                                styles = {backgroundColor: "#7289da"};
                            return (
                                <NavigationItem content={item} icon={icons[index]}
                                    link={links[index]}  key={index} color={styles}
                                    handleClick={() => this.handleChangeCurrent(item)}/>
                            )
                        })}
                    </nav>
            </aside>
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