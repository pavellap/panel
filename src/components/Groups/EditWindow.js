import React from 'react'
import {groupDetailed} from "../../template";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import DeleteIcon from '@material-ui/icons/Delete';
import {Tooltip} from "@material-ui/core";
import HelpModal from "./HelpModal";
import RulesBlock from "./RulesBlock";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  height: 100%;
  width: 100%;
`

// props: название группы
// получаем все данные по id группы
// можем редачить:
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = groupDetailed[this.props.id - 1];
        this.state.modalIsOpen = false;
        this.state.unusedRules = [];
        this.state.type = null;
    }
    // удаление пользователя из всех других групп
    handleGlobalRemove = (index) => {
        console.log("Has received index", index)
        const array = this.state.users;
        array[index].only_here = false;
        console.log(array, this.state)
        this.setState({users: array})
    }
    // удаление пользователя из текущей группы
    handleDelete = index => {
        const array = this.state.users.filter((item, pos) => index !== pos);
        this.setState({users: array});
    }
    // открытие модального окна для добавления правил
    handleAddRules = type => {
        console.log("Performing event:", type)
        this.setState({modalIsOpen: true,
        type: type});
    }
    // добавление неиспользованных правил
    addRules = (num, type) => {
        const newRules = this.state.unusedRules.filter(item => item !== num);
        if (type === 'added') {
            const array = this.state.added_rules;
            array.push(num);
            this.setState({added_rules: array})
        }
        else {
            const array = this.state.deleted_rules;
            array.push(num);
            this.setState({deleted_rules: array})
        }
        this.setState({unusedRules: newRules})
    }

    // удаление правил
    handleRemoveRules = (index, type) => {
        console.log(`Performing action ${type} on item with index: ${index}`)
        if (type === 'added') {
            const array = this.state.added_rules.filter(item => item !== index);
            const availableRules = this.state.unusedRules;
            availableRules.push(index);
            this.setState({
                unusedRules: availableRules,
                added_rules: array
            }, () => {
                console.log("Available rules:", this.state.unusedRules)
            })
        }
        else {
            const array = this.state.deleted_rules.filter(item => item !== index);
            const availableRules = this.state.unusedRules;
            availableRules.push(index);
            this.setState({
                unusedRules: availableRules,
                deleted_rules: array
            }, () => {
                console.log("Available rules:", this.state.unusedRules)
            })
        }
    }

    render() {
        const {name} = this.state;
        return (
                <Container>
                    <div>
                        <Typography >{name}</Typography>
                        <Button primary>Добавить пользователей</Button>
                        <div>
                            {this.state.users.map((item, index) =>
                                <div key={index}>
                                    <span>{item.nick}</span>
                                    <span>{item.phone}</span>
                                    {!item.only_here &&
                                    <Button
                                        onClick={() => this.handleGlobalRemove(index)}>
                                        Удалить из других групп
                                    </Button>}
                                    <Tooltip title='Удаляет пользователя из текущей группы' placement='top-start'>
                                        <span onClick={() => this.handleDelete(index)}><DeleteIcon/></span>
                                    </Tooltip>
                                </div>)}
                        </div>
                    </div>
                    <div>
                        <RulesBlock title='Добавленные права' type='addedRules' rules={this.state.added_rules}
                        handleRemove={(index) =>this.handleRemoveRules(index, 'added')}
                        handleEvent={() => this.handleAddRules('added')}/>
                        <RulesBlock title='Удалённые права' type='deletedRules' rules={this.state.deleted_rules}
                        handleRemove={(index) =>this.handleRemoveRules(index, 'deleted')}
                        handleEvent={() => this.handleAddRules('deleted')}
                        />
                    </div>
                    {this.state.modalIsOpen &&
                    <HelpModal height={50} width={50}>
                        {this.state.unusedRules.map((item, index) =>
                            <div key={index} onClick={() => this.addRules(item, this.state.type)}>Правило № {item}</div>
                        )}
                    </HelpModal>}
                </Container>
        )
    }
}