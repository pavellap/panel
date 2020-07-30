import React from 'react'
import PageHeader from "../UI/PageHeader";
import AppsIcon from '@material-ui/icons/Apps';
import {Link, Switch, Route} from 'react-router-dom'
import {Tooltip} from "@material-ui/core";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Password from "./Password";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";
import PersonalPage from "./PersonalPage";
import Staff from "./Staff";

const Container = styled.section`
  display: flex;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  background-color: #FAFAFA;
  a {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      
  }
`

const Wrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;
  border-left: 1px solid #DBDBDB;
  border-right: 1px solid #DBDBDB;
  background-color: #fff;
  height: calc(100vh - 50px);
`

const Menu = styled.nav`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  border-right: 1px solid rgb(219, 219, 219);
  div {
      padding-left: 10px;
      width: 100%;
      font-size: 21px;
      height: 50px;
      cursor: pointer;
      display: flex;
      align-items: center;
     
      :hover {
          background-color: rgb(250, 250, 250);
          border-left: 2px solid rgb(219, 219, 219);;
      }
  }
  .active {
      border-left: 2px solid rgb(38, 38, 38);
  }
`

/**
 * Информация о пользователе:
 * Логин
 * Дата создания Аккаунта
 * Список прав
 * Список никнеймов, приглашенных пользователей
 * Максимальное чисто никнеймов, которые можно пригласить
 * Подразделы:
 * Изменение пароля
 * Добавление в телегу по нику
 * Удаление пользоватей, которые ты пригласил
 * Управление персоналом (только для админа)
 */
/*
 * TODO:
 *  1. Моя страница
 *  2. Управление персоналом
 */
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: ['Моя страница', 'Управление персоналом', 'Изменить пароль', 'Добавить пользователя',
            'Удалить приглашённых пользователей'],
            currentSection: 'Моя страница',
            links: ['/settings/', "/settings/stuff", "/settings/password",  "/settings/add_user",
                "/settings/delete_user"]
        }
    }

    switchSection = val => this.setState({currentSection: val})

    render() {
        return (
            <Container>
            <PageHeader title='Настройки профиля'>
                <Tooltip title='Переход на домашнюю страницу'>
                    <Link to='/registration'>
                        <AppsIcon fontSize={'large'} cursor='pointer' color={'#333'}/>
                    </Link>
                </Tooltip>
            </PageHeader>
            <Wrapper>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Menu>
                    {this.state.sections.map((item, index) => <div onClick={() => this.switchSection(item)}
                        className={item === this.state.currentSection ? 'active' : null} key={index}>
                        <Link to={this.state.links[index]}>{item}</Link>
                    </div>)}
                    </Menu>
                </Grid>
                <Grid item xs>
                    <Switch>
                        <Route exact path='/settings' render={() => <PersonalPage name='Admin' date='15.07.20'/>}/>
                        <Route path='/settings/password' component={Password}/>
                        <Route path='/settings/add_user' component={AddUser}/>
                        <Route path='/settings/stuff' component={Staff}/>
                        <Route path='/settings/delete_user' render={() => <DeleteUser group={['trigo', 'pavellap', 'ekatze']}/>}/>
                    </Switch>
                </Grid>
            </Grid>
            </Wrapper>
            </Container>
        )
    }
}