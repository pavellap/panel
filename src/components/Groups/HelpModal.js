import React from 'react'
import styled, {css} from "styled-components";

const Container = styled.div`
    display: flex;
    background-color: #ccc;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 50%;
    ${props => css`
        width: ${props.width}%;
        height: ${props.height}%;
     `}`


export default function(props) {
    return (
        <Container width={props.width} height={props.height}>
            {props.children}
        </Container>
    )
}