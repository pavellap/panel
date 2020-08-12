import React from 'react'
import {Tooltip, Checkbox} from "@material-ui/core";
import RulesBlock from "./RulesBlock";
import {groupRules, hardCode} from "../../../template";
import {SubmitButton, Container, Input, UsersContainer} from "./SharedStyledComponents";
import {transformDataForSave} from "../utils";
import {addGroup} from "../API/api";

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

        if (!this.state.groupName)
            this.setState({formError: true})
        else {
            addGroup(transformDataForSave(this.state));
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

    // rule(int)/true(false)/type
    handleRule = (right, newValue, type) => {
        console.log(right, newValue, type)
        const object = {...this.state.rights}
        right = Number(right);
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
                           onChange={e =>
                               this.setState(
                                   {groupName: e.currentTarget.value,
                                       formError: false})
                           }/>
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
                                  onClick={this.postData}>
                        Добавить группу
                    </SubmitButton>
                </Container>
            )
        }
}