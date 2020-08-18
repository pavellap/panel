import React from 'react'
import {connect} from 'react-redux'
import {closeModal, deleteProfile} from "../../../Redux/Actions/ProfileActions";
import styled from "styled-components";
import {Button, Typography} from "@material-ui/core";
import {Close} from "@material-ui/icons";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 30px;
    align-items: center;
    header {
        display: flex;
        width: 100%;
        justify-content: flex-end;
        padding-bottom: 15px;
    }
`

function Delete(props) {
    const {id, config, close, deleteProfile} = props;
    return (
        <Wrapper>
            <header>
                <Close cursor='pointer' color='action' fontSize='large' onClick={close}/>
            </header>
            <Typography>Вы действительно хотите удалить данный профиль?</Typography>
            <Button style={{marginTop: 17}} variant='contained' color='secondary'
                    onClick={() => deleteProfile(id, config.id)}>
                Да
            </Button>
        </Wrapper>
    )
}

function mapStateToProps(state) {
    return {
        id: state.profile.currentProfile.id,
        config: state.profile.currentProfile.config
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteProfile: (id, config) => dispatch(deleteProfile(id, config)),
        close: () => dispatch(closeModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Delete)
