import React from 'react'
import {
    Tooltip,
    Checkbox,
    List,
    ListSubheader,
    ListItem,
    ListItemText,
    ListItemSecondaryAction
} from "@material-ui/core";
import RulesBlock from "./RulesBlock";
import {groupDetailed, hardCode} from "../../../template";
import {SubmitButton, Container, Input} from "./SharedStyledComponents";
import {transformDataForSave, transformRights} from "../utils";
import {fetchGroupDetailed, fetchUsers, saveChanges} from "../API/api";
import {userListStyles} from "./AddWindow";


const transformClients = array => {
    array.forEach(item => {
        item.selected = false
    })
}
// TODO: полный список пользователей + добавить удаление из других групп тоже
transformClients(hardCode)

/*
* TODO: отлавливать список добавленных/удалённых прав по сравнению с теми, что были в самом начале
* */
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: groupDetailed[1].users,
            rights: transformRights(groupDetailed[1].added_rights, groupDetailed[1].deleted_rights),
            isLoading: true,
            groupName: groupDetailed[1].name,
            formError: false
        }
    }
    // подружаем список клиентов
    componentDidMount() {
        fetchUsers();
        fetchGroupDetailed(this.props.id);
    }

    postData = () => {
        if (!this.state.groupName)
            this.setState({formError: true})
        else {
            this.props.handleSave();
            saveChanges(transformDataForSave(this.state))
        }
    }

    handleSelect = (event, id) =>  {
        const array = this.state.clients;
        let index = null;
        array.forEach((item, i) => {
            if (item.id === id) {
                index = i;
                return null
            }
        })
        array[index].selected = event.target.checked;
        this.setState({clients: array})
    }

    handleRule = (right, newValue, type) => {
        const object = {...this.state.rights}
        object[right][1] = newValue;
        !newValue ? object[right][2] = null : object[right][2] = type;
        this.setState({rights: object})
    }
    render() {
        const {clients, rights, groupName, formError} = this.state;
        return (
            <Container>
                <h2>Добавление пользователей и их прав в новую группу</h2>
                <Input label="Название группы" variant="outlined" required
                       value={groupName} error={formError} help-info='Имя группы не должно быть пустой строкой'
                       onChange={(e) =>
                           this.setState({groupName: e.currentTarget.value})}/>
                <div style={{display: 'flex', justifyContent: "space-between", flexDirection: 'column'}}>
                    <List style={userListStyles} subheader={
                        <ListSubheader>
                            Добавление пользователей  в текущую группу
                        </ListSubheader>}>
                        {clients.map(item =>
                            <ListItem button divider>
                                <ListItemText primary={item.nick} secondary={item.phone}/>
                                <ListItemSecondaryAction>
                                    <Tooltip title='Удаление/добавление пользователя' placement='top-start'>
                                        <Checkbox checked={item.selected} onChange={(e) =>
                                            this.handleSelect(e, item.id)}/>
                                    </Tooltip>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )}
                    </List>
                    <div style={{display: 'flex'}}>
                        <RulesBlock title='Добавленные права новой группы' type='add' rights={rights}
                                    handleMove={this.handleRule}/>
                        <RulesBlock title='Удалённые права новой группы' type='remove' rights={rights}
                                    handleMove={this.handleRule}/>
                    </div>
                </div>
                <SubmitButton variant='contained' color='primary'
                              onClick={this.postData}>
                    Сохранить изменения
                </SubmitButton>
            </Container>
        )
    }
}