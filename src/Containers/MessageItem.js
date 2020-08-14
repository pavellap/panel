import React from 'react'
import {ListItemText, ListItem,
    ListItemSecondaryAction, TextField, List} from "@material-ui/core";
import styled from "styled-components";
import FileUploader from "../components/UI/FileUploader";

const VerticalOrientation = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    padding-top: 12px;
    padding-bottom: 15px;
    > div {
        margin-left: 20px;
        margin-top: 15px;
    }
`

export default function (props) {
    const {name, description, ans_type, text, response} = props;

    return  (
        <React.Fragment>
            <ListItem>
                <ListItemText primary={name} secondary={description}/>
                <ListItemSecondaryAction>
                    <TextField variant='outlined' label='Текст сообщения' value={text}
                               onChange={e => props.handleChange(e.currentTarget.value)}
                    />
                </ListItemSecondaryAction>
            </ListItem>
            {(ans_type === 2 || ans_type === 3) &&
                <VerticalOrientation>
                    <FileUploader/>
                    {response.map(item =>
                        <TextField variant='outlined'
                                   label='Текст обратной связи'
                                   value={item.text}
                                   onChange={e => props.handleResponse(e.currentTarget.value, item.id)}
                        />

                    )}
                </VerticalOrientation>
            }
        </React.Fragment>
    )
}