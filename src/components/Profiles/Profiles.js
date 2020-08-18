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
    acceptDeleteProfile,
    addNewProfile, changeProfilePosition, closeModal, deleteProfile,
    fetchProfile, fetchProfiles, saveData
} from "../../Redux/Actions/ProfileActions";
import Loader from "../UI/Loader";
import {createPortal} from 'react-dom'
import ModalAdvanced from "../Modal/ModalAdvanced";
import {fetchConfigs} from "../../Redux/Actions/ConfigActions";
import {StyledList, ProfilesContainer, Wrapper} from "./SharedStyledComponents";
import EditProfile from "./Modals/EditProfile";
import DeleteModal from "./Modals/DeleteModal";


class Profiles extends Component {

    componentDidMount() {
        if (this.props.config)
            this.props.getProfiles(this.props.config.id)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.config && !prevProps.config && this.props.profiles.length === 0)
            this.props.getProfiles(this.props.config.id)
    }

    render() {
        const {changePosition, profiles,
            componentIsLoading, modalIsOpen,
            config, fetchProfile, closeModal,
            addProfile, acceptDelete, type, saveData} = this.props;
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
                                                    color='action'
                                                    cursor='pointer'
                                                    onClick={() => acceptDelete(item.id, config)}
                                            />
                                        </Tooltip>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )}
                        </StyledList >
                    </ProfilesContainer>}
                {createPortal(modalIsOpen &&
                    <ModalAdvanced toggleModal={closeModal}>
                        {type === 'accept' ? <DeleteModal/> : <EditProfile/>}
                    </ModalAdvanced>,
                    document.getElementById('portal'))}
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Button onClick={() => saveData(profiles, config)}
                            variant='contained'
                            color='primary' >
                            Сохранить порядок анкет
                        </Button>
                    </div>
            </Wrapper>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changePosition: (index, action, profiles) =>
            dispatch(changeProfilePosition(index, action, profiles)),
        getProfiles: config => dispatch(fetchProfiles(config)),
        closeModal: () => dispatch(closeModal()),
        addProfile: () => dispatch(addNewProfile()),
        fetchProfile: (id) => dispatch(fetchProfile(id)),
        acceptDelete: (id, config) => dispatch(acceptDeleteProfile(id, config)),
        saveData: (profiles, config) => dispatch(saveData(profiles, config))
    }
}

function mapStateToProps(state) {
    return {
        profiles: state.profile.profiles,
        modalIsOpen: state.profile.modalIsOpen,
        componentIsLoading: state.profile.componentIsLoading,
        config: state.config.currentConfig,
        type: state.profile.modalType
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profiles)
