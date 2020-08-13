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
import {fetchPersonalInfo, saveNewData} from "./API/api";

const Container = styled.section`
  display: flex;
  min-height: 100vh;
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
  min-height: calc(100vh - 50px);
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
          border-left: 2px solid rgb(219, 219, 219);
      }
  }
  .active {
      border-left: 2px solid rgb(38, 38, 38);
  }
`
const hardCode = {
    login: 'pavellap',
    date: '2016-04-08 11:43:36.309721',
    invitations: 10,
    nicks: ['putin', 'batka', 'FBI'],
    rights: [1, 3, 5, 7]
}

const sections = ['Моя страница', 'Управление персоналом', 'Изменить пароль', 'Добавленные пользователи',
    /*'Удалить приглашённых пользователей'*/];
const links = ['/settings/', "/settings/stuff", "/settings/password",  "/settings/add_user",
    "/settings/delete_user"]


// todo: спросить насчёт удалённого роута с удалением пользователей
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSection: 'Моя страница',
            personalData: hardCode
        }
    }

    componentDidMount() {
        // todo: здесь прокидывать логин из редакса
        fetchPersonalInfo('admin');
        this.setState({personalData: hardCode})
    }

    handleChanges = newUsers => {
        const data = this.state.personalData;
        data.nicks = newUsers;
        this.setState({personalData: data}, () => {
            saveNewData(this.state.personalData.login, {
                invitations: this.state.personalData.invitations,
                nicks: this.state.personalData.nicks,
                rights: this.state.personalData.rights
            })
        });
    }

    switchSection = val => this.setState({currentSection: val})

    render() {

        const {login, date, invitations, nicks, rights} = this.state.personalData;
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
                    {sections.map((item, index) => <div onClick={() => this.switchSection(item)}
                        className={item === this.state.currentSection ? 'active' : null} key={index}>
                        <Link to={links[index]}>{item}</Link>
                    </div>)}
                    </Menu>
                </Grid>
                <Grid item xs style={{position: 'relative'}}>
                    <Switch>
                        <Route exact path='/settings' render={() =>
                            <PersonalPage login={login} date={date}
                            invitations={invitations} nicks={nicks} rights={rights}/>
                        }
                        />
                        <Route path='/settings/password' component={Password}/>
                        <Route path='/settings/add_user' render={() => <AddUser users={nicks} limit={invitations}
                        saveChanges={this.handleChanges}/>}/>
                        <Route path='/settings/stuff' component={Staff}/>
                        <Route path='/settings/delete_user'>
                            <DeleteUser group={['trigo', 'pavellap', 'ekatze']}/>
                        </Route>
                    </Switch>
                </Grid>
            </Grid>
            </Wrapper>
            </Container>
        )
    }
}