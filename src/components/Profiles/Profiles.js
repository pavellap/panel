import React, {Component}  from "react";
import PageHeader from "../UI/PageHeader";
import Configuration from "../Configuration/Configuration";
import {connect} from 'react-redux'
import {
    ListItemSecondaryAction, ListItemText, ListItem,
     Tooltip, ListSubheader, Button
} from "@material-ui/core";
import {KeyboardArrowDown, KeyboardArrowUp, Delete} from "@material-ui/icons";
import {
    addNewProfile, changeProfilePosition, closeModal,
    fetchProfile, fetchProfiles
} from "../../Redux/Actions/ProfileActions";
import Loader from "../UI/Loader";
import {createPortal} from 'react-dom'
import ModalAdvanced from "../Modal/ModalAdvanced";
import {fetchConfigs} from "../../Redux/Actions/ConfigActions";
import {StyledList, ProfilesContainer, Wrapper} from "./SharedStyledComponents";
import EditProfile from "./Modals/EditProfile";


class Profiles extends Component {

    componentDidMount() {
        //this.props.fetchProfiles()
    }

    render() {
        console.log("Рендерим анкеты...")
        const {changePosition, profiles,
            componentIsLoading, modalIsOpen,
            config, fetchProfile, closeModal, addProfile} = this.props;


        return (
            <Wrapper>
                <PageHeader title='Анкеты'/>
                <Configuration/>
                <header>
                    <Button variant='contained'
                            color='primary'
                            onClick={addProfile}
                    >
                        Добавить новую анкету
                    </Button>
                </header>
                {componentIsLoading ? <Loader/> :
                    <ProfilesContainer>
                        <StyledList
                            subheader={<ListSubheader>Все доступные анкеты</ListSubheader>}
                        >
                            {profiles.map((item, index) =>
                                <ListItem button
                                          key={item.id}
                                          onClick={() => fetchProfile(item.id)}
                                >
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
                {createPortal(modalIsOpen &&
                    <ModalAdvanced toggleModal={closeModal}>
                        <EditProfile/>
                    </ModalAdvanced>,
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
        fetchConfigs: () => dispatch(fetchConfigs()),
        fetchProfile: () => dispatch(fetchProfile()),
        closeModal: () => dispatch(closeModal()),
        addProfile: () => dispatch(addNewProfile())
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