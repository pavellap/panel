import React from "react";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import DeleteIcon from '@material-ui/icons/Delete';
import {ListItem, ListItemSecondaryAction,
    ListItemText, Tooltip} from "@material-ui/core";


export default function(props) {
    const {id, name} = props;
    return (
        <>
        <ListItem divider button onClick={() => props.toggleModal(true, 'edit', id)}>
            <ListItemText primary={'ID: ' + id} secondary={name}/>
            <ListItemSecondaryAction>
                <Tooltip title='Изменяет приоритетность группы' placement='right-start'>
                    <span onClick={() => props.handleMove(id, 'up')}>
                        <KeyboardArrowUpIcon
                            cursor='pointer' color='action'
                            fontSize='large'/>
                    </span>
                </Tooltip>
                <Tooltip title='Изменяет приоритетность группы' placement='right-start'>
                    <span onClick={() => props.handleMove(id, 'down')}>
                        <KeyboardArrowDownIcon cursor='pointer' color='action'
                                               fontSize='large'/>
                    </span>

                </Tooltip>
                <Tooltip title='Удалить группу' placement='right-start'>
                    <span style={{marginRight: 30}}
                          onClick={() => props.toggleModal(true, 'delete', id)}>
                    <DeleteIcon cursor='pointer' color='action'
                                fontSize='large'/>
                    </span>
                </Tooltip>
            </ListItemSecondaryAction>
        </ListItem>

       </>
    )
}