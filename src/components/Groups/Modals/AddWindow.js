import React from 'react'
import {Tooltip, Checkbox} from "@material-ui/core";
import RulesBlock from "./RulesBlock";
import Axios from "axios";
import url from "../../config";
import {groupRules, hardCode} from "../../../template";
import {SubmitButton, Container, Input, UsersContainer} from "./SharedStyledComponents";
import {transformDataForSave} from "../utils";

// hardcode - пользователи
// groupRules - права в группе


const transformClients = array => {
    array.forEach(item => {
        item.selected = false
    })
}

transformClients(hardCode)

// props: название группы
// получаем все данные по id группы
// можем редачить:
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: hardCode,
            rights: groupRules,
            isLoading: true,
            groupName: "",
            formError: false
        }
    }
    // подружаем список клиентов
    /*componentDidMount() {
        const endpoint = url + '/clients'
        Axios.get(endpoint).then(res => {
            this.setState({clients: res.data.clients, isLoading: false})
        }).catch(err => console.log("Произошла ошибка при загрузке пользователей бота в разделе групп"))
    }*/

    postData = () => {
        console.log("Data to send:", transformDataForSave(this.state))
        if (!this.state.groupName)
            this.setState({formError: true})
        else {
            // TODO: почистить selected у clients и rights и ещё тип
            console.log("Данные на отправку:", this.state)
            const endpoint = url + "/groups"
            const {clients, rights, groupName} = this.state;
            console.log("Posting data with:", this.state);
            const added_rights = [];
            const deleted_rights = [];
            const clientsList = [];
            Object.entries(rights).map(([key, value]) =>
                value[1] ? added_rights.push(key) : deleted_rights.push(key)
            )
            clients.forEach(item => item.selected ? clientsList.push(item) : null)
            Axios.post(endpoint, {
                name: groupName,
                added_rights,
                deleted_rights,
                users: clientsList
            }).then(res => console.log("Результат добавление новой группы:", res.data))
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
        console.log(`Performing action ${newValue} on rule ${right} of type ${type}`)
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
                    {/*TODO: Валидация формы*/}
                    <Input label="Название группы" variant="outlined" required
                           value={groupName} error={formError} help-info='Имя группы не должно быть пустой строкой'
                           onChange={(e) =>
                               this.setState({groupName: e.currentTarget.value})}/>
                    <div style={{display: 'flex', justifyContent: "space-between"}}>
                        <div>
                            <h4>Добавление пользователей в группу</h4>
                            <UsersContainer>
                                {clients.map((item, index) =>
                                    <div key={index}>
                                        <span style={{marginRight: 20}}>{item.nick}</span>
                                        <span>{item.phone}</span>
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
                                  onClick={() => {
                                      // TODO
                                      //this.props.handleAdd();
                                      this.postData();
                                  }}>
                        Добавить группу
                    </SubmitButton>
                </Container>
            )
        }


}