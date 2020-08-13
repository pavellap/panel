import React from 'react'
import {Clipboard} from "../../UI/CopyClipboard";
import {Wrapper} from "./DeleteModerator";
import {Close} from "@material-ui/icons";

export default function(props) {
    return (
        <Wrapper>
            <header>
                <Close fontSize='large' cursor='pointer' onClick={props.handleModal}/>
            </header>
            <h3>Пароль для нового модератора</h3>
            <Clipboard password='aT512F7f'/>
        </Wrapper>
    )
}