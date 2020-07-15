import React, {useState} from "react";
import './PageHeader.css'
import Axios from "axios";
import url from '../config'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Menu, MenuItem} from "@material-ui/core";
import {Link} from 'react-router-dom'
import styled from "styled-components";
// добавить выход по нажатию

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  span:first-child {
      margin-right: 15px;
  }
  
`


const handleClick = () => {
    console.log("Exiting");
    Axios.get(url + "/exit/" + localStorage.getItem('token')).then(res => console.log(res.status)).catch(err =>
        console.log(err.data)
    )
    window.location = '/'
};



export default function PageHeader(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const toggleMenu = event => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <h3 className='Page-header'>
            <Wrapper>
                <span>{props.children}</span>
                <span>{props.title}</span>
            </Wrapper>
            <AccountCircleIcon fontSize={'large'} cursor='pointer' aria-controls="simple-menu" aria-haspopup="true"
            onClick={toggleMenu}/>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem onClick={handleClose}><Link to='/settings/'>Мой профиль</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to='/registration'>На главную</Link></MenuItem>
                <MenuItem onClick={handleClose}>Управление персоналом</MenuItem>
                <MenuItem onClick={handleClose}>Выйти из панели управления</MenuItem>
            </Menu>
        </h3>
    )
}