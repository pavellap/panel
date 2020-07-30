import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import styled, {css} from "styled-components";

const Wrapper = styled.div`
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
        color: #000;
        display: flex;
        flex-direction: column;
        padding-bottom: 10px;
        ${props => css`
        width: ${props.width}%;
        height: ${props.height}
        `}`

export default class extends React.Component {
    render() {
        return (
            <div className="modal">
                    <Wrapper width={this.props.width} height={this.props.height}>
                        {this.props.children}
                    </Wrapper>
                <FontAwesomeIcon icon={faTimes} className="modal__close-button" onClick={() => this.props.toggleModal(false)}
                 size='2x'/>
            </div>
        )
    }
}