import React, {useState, useEffect} from "react";
import {WrapperModal} from "../Styles/SharedStyledComponents";
import {ListItem, ListItemIcon,
    ListItemText, Button, List} from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import {fetchSubs, fetchGroups, fetchUsers} from "../API/api";


export default function(props) {

    useEffect(() => {
        switch (props.type) {
            case 2:
                fetchGroups().then(data => handleItems(data));
                break;
            case 3:
                fetchUsers().then(data => handleItems(data));
                break;
            case 4:
                fetchSubs().then(data => handleItems(data));
        }
    }, [])

    const {type, selectedItems} = props;

    const [selected, handleSelected] = useState(selectedItems)
    const [items, handleItems] = useState([])

    let icon;
    if (type !== 4)
        icon = <AccountBoxIcon/>
    else
        icon = <MonetizationOnIcon/>

    const handleActive = id => {
        if (selected.includes(id))
            handleSelected(array => array.filter(item => item !== id))
        else
            handleSelected(array => [...array, id])

    }

    return (
        <WrapperModal>
            <List>
            {items.length > 0 && items.map(item =>
                <ListItem selected={selected.includes(item.id)} onClick={() => handleActive(item.id)}
                          key={item.id} button>
                    {console.log(selected.includes(item.id))}
                    <ListItemText primary={`ID: ${item.id}`}
                                  secondary={type === 3 ? `Номер телефона: 
                                  ${item.phone}` : `Название: ${item.name}`}/>
                        <ListItemIcon style={{marginLeft: 5}}>
                            {icon}
                        </ListItemIcon>
                </ListItem>)}
            </List>
            <Button variant='contained' color='primary' onClick={() => props.handleSave(selected)}>
                Сохранить изменения
            </Button>
        </WrapperModal>
    )
}
