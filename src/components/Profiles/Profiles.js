import React, {Component}  from "react";
import styled from "styled-components";
import PageHeader from "../UI/PageHeader";
import Configuration from "../Configuration/Configuration";
import {connect} from 'react-redux'
import {
    List, ListItemSecondaryAction, ListItemText, ListItem,
     Tooltip, ListSubheader, Switch, withStyles
} from "@material-ui/core";
import {KeyboardArrowDown, KeyboardArrowUp, Delete} from "@material-ui/icons";
import {changeProfilePosition, fetchProfiles} from "../../Redux/Actions/ProfileActions";
import Loader from "../UI/Loader";
import {createPortal} from 'react-dom'
import ModalAdvanced from "../Modal/ModalAdvanced";
import {fetchConfigs} from "../../Redux/Actions/ConfigActions";


const StyledList = withStyles({
    root: {
        minWidth: 300,
        width: 700,
        maxWidth: '70%'
    }
})(List)

const Wrapper = styled.main`
    position: relative;
`
const ProfilesContainer = styled.div`
    display: flex;
`


class Profiles extends Component {

    componentDidMount() {
        console.log("Отрендерили анкеты")
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Заапдейтили профили...", this.props.config)
    }

    render() {
        console.log("Рендерим анкеты...")
        const {changePosition, profiles,
            componentIsLoading, modalIsOpen, config} = this.props;

        return (
            <Wrapper>
                <PageHeader title='Анкеты'/>
                <Configuration/>
                {componentIsLoading ? <Loader/> :
                    <ProfilesContainer>
                        <StyledList
                            subheader={<ListSubheader>Все доступные анкеты</ListSubheader>}
                        >
                            {profiles.map((item, index) =>
                                <ListItem button key={item.id}>
                                    <ListItemText
                                        primary={'ID: ' + item.id}
                                        secondary={item.name}
                                    />
                                    <ListItemSecondaryAction>
                                        <Tooltip title='Изменяет приоритетность анкеты'
                                                 placement='right-start'>
                                            <KeyboardArrowUp
                                                fontSize='large'
                                                color='action'
                                                cursor='pointer'
                                                onClick={() => changePosition(index, 'up', profiles)}
                                            />
                                        </Tooltip>
                                        <Tooltip title='Изменяет приоритетность анкеты'
                                                 placement='right-start'>
                                            <KeyboardArrowDown
                                                fontSize='large'
                                                color='action'
                                                cursor='pointer'
                                                onClick={() => changePosition(index, 'down', profiles)}
                                            />
                                        </Tooltip>
                                        <Tooltip title='Удаление анкеты'
                                                 placement='right-start'>
                                            <Delete fontSize='large'
                                                    color='action' cursor='pointer'/>
                                        </Tooltip>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )}
                        </StyledList >
                    </ProfilesContainer>}
                {createPortal(modalIsOpen && <ModalAdvanced/>,
                    document.getElementById('portal'))}
            </Wrapper>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changePosition: (index, action, profiles) =>
            dispatch(changeProfilePosition(index, action, profiles)),
        fetchProfiles: () => dispatch(fetchProfiles()),
        fetchConfigs: () => dispatch(fetchConfigs())
    }
}

function mapStateToProps(state) {
    return {
        profiles: state.profile.profiles,
        modalIsOpen: state.profile.modalIsOpen,
        componentIsLoading: state.profile.componentIsLoading,
        config: state.config.currentConfig
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profiles)