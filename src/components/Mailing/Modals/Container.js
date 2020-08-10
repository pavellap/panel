import React, {useState} from "react";
import {WrapperModal} from "../Styles/SharedStyledComponents";
import {ListItem, ListItemIcon, ListItemSecondaryAction,
    ListItemText, Button, List} from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import {groupsHardcode} from "../Templates/Template";



export default function(props) {
    const {type, selectedItems} = props;
    console.log("Selected in props:", selectedItems)
    const [selected, handleSelected] = useState(selectedItems)
    let icon;
    if (type !== 4)
        icon = <AccountBoxIcon/>
    else
        icon = <MonetizationOnIcon/>
    const handleActive = id => {
        console.log('Got id:', id)
        if (selected.includes(id))
            handleSelected(array => array.filter(item => item !== id))
        else
            handleSelected(array => [...array, id])

    }
    console.log("Rendering container...")
    return (
        <WrapperModal>
            <List>
            {groupsHardcode.map((item, index) =>
                <ListItem selected={selected.includes(item.id)} onClick={() => handleActive(item.id)}
                          key={item.id} button>
                    {console.log(selected.includes(item.id))}
                    <ListItemText primary={`ID: ${item.id}`} secondary={`Название: ${item.name}`}/>
                        <ListItemIcon style={{marginLeft: 5}}>
                            {icon}
                        </ListItemIcon>
                </ListItem>)}
            </List>
            <Button variant='contained' color='primary' onClick={() => props.handleSave(selected)}>Сохранить изменения</Button>
        </WrapperModal>
    )
}