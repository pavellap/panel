import React from 'react'
import {Tooltip, Checkbox, Button} from "@material-ui/core";
import RulesBlock from "./RulesBlock";
import {groupDetailed, hardCode} from "../../../template";
import {SubmitButton, Container, Input, UsersContainer} from "./SharedStyledComponents";
import {transformDataForSave, transformRights} from "../utils";
import {fetchGroupDetailed, fetchUsers, saveChanges} from "../API/api";


// hardcode - пользователи
// groupRules - права в группе


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
            users: groupDetailed[1].users,
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
        console.log("Данные на сохранение в группах", transformDataForSave(this.state))
        if (!this.state.groupName)
            this.setState({formError: true})
        else {
            saveChanges(transformDataForSave(this.state))
        }
    }

    handleSelect = (event, id) =>  {
        const array = this.state.users;
        let index = null;
        array.forEach((item, i) => {
            if (item.id === id) {
                index = i;
                return null
            }
        })
        array[index].selected = event.target.checked;
        this.setState({users: array})
    }

    handleRule = (right, newValue, type) => {
        const object = {...this.state.rights}
        object[right][1] = newValue;
        !newValue ? object[right][2] = null : object[right][2] = type;
        this.setState({rights: object})
    }
    render() {
        const {users, rights, groupName, formError} = this.state;
        return (
            <Container>
                <h2>Добавление пользователей и их прав в новую группу</h2>
                <Input label="Название группы" variant="outlined" required
                       value={groupName} error={formError} help-info='Имя группы не должно быть пустой строкой'
                       onChange={(e) =>
                           this.setState({groupName: e.currentTarget.value})}/>
                <div style={{display: 'flex', justifyContent: "space-between"}}>
                    <div>
                        <h4>Добавление пользователей в группу</h4>
                        <UsersContainer>
                            {users.map((item, index) =>
                                <div key={index}>
                                    <span style={{marginRight: 20}}>{item.nick}</span>
                                    <span>{item.phone}</span>
                                    <Button variant='contained' color='primary'>Удалить из других групп</Button>
                                    <Tooltip title='Удаление/добавление пользователя' placement='top-start'>
                                        <Checkbox checked={item.selected} onChange={(e) =>
                                            this.handleSelect(e, item.id)}/>
                                    </Tooltip>
                                </div>)}
                        </UsersContainer>
                    </div>
                    <div style={{display: 'flex'}}>
                        <RulesBlock title='Добавленные права новой группы' type='add' rights={rights}
                                    handleMove={this.handleRule}/>
                        <RulesBlock title='Удалённые права новой группы' type='remove' rights={rights}
                                    handleMove={this.handleRule}/>
                    </div>
                </div>
                <SubmitButton variant='contained' color='primary'
                              onClick={this.postData}>
                    Добавить группу
                </SubmitButton>
            </Container>
        )
    }


}