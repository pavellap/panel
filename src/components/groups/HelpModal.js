import React from 'react'
import styled from "styled-components";

const Container = styled.div`
    height: 50%;
    width: 50%;
    display: flex;
    background-color: #ccc;
    justify-content: center;
    align-items: center;
    position: absolute;
`


export default function(props) {
    return (
        <Container>
            {props.children}
        </Container>
    )
}