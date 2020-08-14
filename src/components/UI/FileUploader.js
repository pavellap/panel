import React, {useState} from 'react'
import {ListItem, ListItemText, ListItemIcon,
    ListItemSecondaryAction, List, Tooltip} from "@material-ui/core";
import './FileUploader.scss'
import PostAddIcon from '@material-ui/icons/PostAdd';
import Clear from '@material-ui/icons/Clear'
import styled from "styled-components";


const Container = styled.div`
    display: inline-flex;
    min-width: 460px;
    width: 500px;
    align-items: center;
    justify-content: center;
    padding: 12px;
`

/*
* todo:
*   1. При повтором нажатии на выбор файла при уже выбранном файле билд крашится
*
 */
export default function() {
    const [selectedFile, handleSelected] = useState(null);
    const [size, handleSize] = useState(null);

    console.log(selectedFile)
    return (
        <Container>
            <label className='file-input-label' htmlFor="file-input">Загрузить файл</label>
            <input id='file-input' className='file-input' type="file"
                   onChange={e => {
                       handleSelected(e.target.files[0]);
                       handleSize(String
                       (e.target.files[0].size / 1024 / 1024).slice(0, 4) + ' МБ')
                   }}/>
            {selectedFile &&
            <div style={{minWidth: 260}}>
                <List disablePadding>
                    <ListItem>
                        <ListItemIcon>
                            <PostAddIcon fontSize='large'/>
                        </ListItemIcon>
                        <ListItemText  primary={selectedFile.name.slice(0, 15)} secondary={size}/>
                        <ListItemSecondaryAction style={{marginLeft: 40}}>
                            <Tooltip title='Удаляет выбранный файл' placement='bottom-start'>
                                <Clear fontSize='large' cursor='pointer'/>
                            </Tooltip>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </div>}
        </Container>
    )
}