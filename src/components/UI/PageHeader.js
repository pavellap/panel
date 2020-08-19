import React from "react";
import './PageHeader.css'
import Axios from "axios";
import url from '../../config'
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

const Header = styled.h3`
    background-color: #fafbfc;
    padding: 5px 15px 0 25px;
    margin: 0;
    height: 50px;
    border-bottom: 1px solid #e7e8ec;
    border-radius: 4px;
    font-weight: normal;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    a {
        display: block;
        width: 100%;
        height: 100%;
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
        <Header>
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
                <MenuItem onClick={handleClose}><Link to='/settings/stuff'>Управление персоналом</Link></MenuItem>
                <MenuItem onClick={() => {handleClose(); handleClick()}}>Выйти из панели управления</MenuItem>
            </Menu>
        </Header>
    )
}
