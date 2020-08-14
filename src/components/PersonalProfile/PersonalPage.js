import React from 'react'
import styled from "styled-components";
import {Typography, Avatar, ListItem, List,
        ListItemText, ListSubheader, ListItemIcon,
        ListItemSecondaryAction, Switch, TextField,
        Button} from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import {matches, parseDate} from "./Utils/utils";
import TelegramIcon from "@material-ui/icons/Telegram";
import ClearIcon from "@material-ui/icons/Clear";
import {deleteModer, saveNewData} from "./API/api";


const Nick = styled.span`
    text-decoration: underline;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
`


// TODO: фунциональность по списку приглашённых ников
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }

    handleRightChange = (right, newValue) => {
        console.log("Values:", right, newValue)
        if (newValue) {
            const array = this.state.rights;
            array.push(Number(right));
            this.setState({rights: array})
        }
        else
            this.setState({
                rights: this.state.rights.filter(item => item !== Number(right))
            })
    }

    removeUser = nick => {
        this.setState({nicks: this.state.nicks.filter(item => item !== nick)})
        //deleteModer(nick);
    }

    handleSave = () => {
        this.props.handleModal();
        const {rights, nicks, invitations, login} = this.state;
        saveNewData({
            rights,
            nicks,
            invitations
        }, login);
    }

    render() {
        console.log("Стейт:", this.state)
        const normalizedDate = parseDate(this.props.date)
        const {rights, nicks, invitations, isSuperUser, login} = this.state;
        return (
            <Container>
                <header>
                    <div>
                        <Avatar>{login[0]}</Avatar>
                    </div>
                    <Typography>
                        Пользователь: <Nick>{login}</Nick>
                    </Typography>
                    <Typography>
                        Дата создания аккаунта: {normalizedDate}
                    </Typography>
                    <div>
                        {isSuperUser ?
                            <TextField variant='outlined' label='Количество людей'
                                       required value={invitations}
                                       onChange={e => this.setState({invitations: e.currentTarget.value})}
                            />
                            :
                            <Typography>
                                Максимальное количество людей для приглашения: {invitations}
                            </Typography>
                        }
                    </div>
                </header>
                <section>
                    <List subheader={<ListSubheader>Мои права</ListSubheader>}>
                        {Object.entries(matches).map(([key, value]) =>
                            <ListItem key={value}>
                                <ListItemIcon><CreateIcon/></ListItemIcon>
                                <ListItemText>{value}</ListItemText>
                                <ListItemSecondaryAction>
                                    <Switch
                                        edge="end"
                                        checked={rights.includes(Number(key))}
                                        onChange={e => this.handleRightChange(key, e.currentTarget.checked)}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        )}
                    </List>
                </section>
                {isSuperUser &&
                    <List subheader={<ListSubheader>Права пользователя {login}</ListSubheader>}>
                        {nicks.map(item => (
                            <ListItem button>
                                    <ListItemIcon><TelegramIcon/></ListItemIcon>
                                    <ListItemText>{item}</ListItemText>
                                    <ListItemSecondaryAction>
                                        <ClearIcon cursor='pointer' onClick={() => this.removeUser(item)}/>
                                    </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                }
                {isSuperUser &&
                <Button variant='contained' color='primary' onClick={this.handleSave}>
                    Сохранить изменения
                </Button>}
            </Container>
        )
    }
}