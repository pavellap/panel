import React from 'react'
import {ListItemText, ListItem,
    ListItemSecondaryAction, TextField} from "@material-ui/core";
import styled from "styled-components";
import FileUploader from "../components/UI/FileUploader";

const VerticalOrientation = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    padding-top: 12px;
    padding-bottom: 15px;
    border-bottom: 1px solid #ccc;
    > div {
        margin-left: 20px;
        margin-top: 15px;
    }
`


export default function (props) {
    const {name, description, ans_type, text, response, id} = props;
    const responseVisible = ans_type === 2 || ans_type === 3;
    return  (
        <React.Fragment>
            <ListItem divider={!responseVisible}>
                <ListItemText primary={name} secondary={description}/>
                <ListItemSecondaryAction>
                    <TextField variant='outlined' label='Текст сообщения' value={text}
                               onChange={e => props.handleChange(e.currentTarget.value)}
                    />
                </ListItemSecondaryAction>
            </ListItem>
            {!responseVisible && <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <FileUploader id={id}/>
            </div>}
            {(responseVisible) &&
                <VerticalOrientation>
                    <FileUploader id={id}/>
                    {response.map(item =>
                        <TextField variant='outlined' key={item.id}
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