import React from "react";
import styled from "styled-components";
import {connect} from 'react-redux'
import {closeModal} from "../../../Redux/Actions/ProfileActions";

const Container = styled.div`
    background-color: #fff;
    padding: 30px;
    display: flex;
    flex-direction: column;
    h3 {
        text-align: center;
        font-size: 20px;
        font-weight: normal;
    }
`

function ErrorModal(props) {
    return (
        <Container>
            <h3>Произошла ошибка</h3>
            <p>{props.text}</p>
        </Container>
    )
}


function mapDispatchToProps(dispatch) {
    return {
        closeModal: dispatch => dispatch(closeModal())
    }
}

function mapStateToProps(state) {
    return {
        text: state.profile.errorMessage
    }
}

export default connect(null, mapDispatchToProps)(ErrorModal)