import React, {useRef} from 'react'
import {Button} from "@material-ui/core";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    input {
        display: block;
        margin: 0 auto 15px auto;
        outline: none;
        padding: 18.5px 14px;
        border-radius: 4px;
        border: 1px solid rgba(0, 0, 0, 0.23);
        font-size: 18px;
        color: #222
    }
`

export const Clipboard = props => {
    const textRef = useRef(null);

    const copyToClipboard = e => {
        textRef.current.select();
        document.execCommand('copy');
        e.target.focus();
    }
    return (
        <Wrapper>
                <input ref={textRef} value={props.password}/>
            {
                document.queryCommandSupported('copy') &&
                <Button variant='contained' color='primary' onClick={copyToClipboard}>
                    Копировать
                </Button>
            }
        </Wrapper>
    );
}