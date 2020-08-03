import React from 'react'
import {createPortal} from "react-dom";
import styled from "styled-components";
import {TextField, Checkbox, List, ListItem, ListItemText,
    ListItemSecondaryAction, ListSubheader, Switch, Button} from "@material-ui/core";
import {groupRules} from "../../template";
import ModalAdvanced from "../Modal/ModalAdvanced";
import DeleteSub from "./Modals/DeleteSub";

const titles = ['Цена без скидки', 'Цена при 1-й скидке', 'Цена при 2-й скидке', 'Цена при 3-й скидке'];

const Container = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #333;
    width: 70%;
    margin: 20px auto;
    padding: 25px;
    min-width: 730px;
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        div {
            display: flex;
            margin-right: 30px;
            align-items: center;
        }
    }
    section {
        display: flex;
        justify-content: space-between;
    }
`

// принимает data с всеми свойствами
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props.data, modalIsOpen: false, deleteID: null}
    }

    handleRule = (rule, val) => {
        let array = this.state.rights
        if (val)
            array.push(Number(rule))
        else
            array = array.filter(item => item !== Number(rule))
        this.setState({rights: array})
    }

    handleSale = (val, pos) => {
        const prices = this.state.prices;
        prices[pos] = val;
        this.setState({prices})
    }

    handleModal = id => {
        window.scrollTo(0,0);
        this.setState({modalIsOpen: true, deleteID: id})
    }

    handleDelete = (status, id) => {
        if (status)
            this.props.handleDelete(id)
        this.setState({modalIsOpen: false})
    }

    render() {
        const {id, rights, name, disabled, prices} = this.state;
        return (
            <Container>
                <header>
                    <div>
                        <div>ID тарифа: {id}</div>
                        <TextField label='Название тарифа' required variant='outlined' value={name}
                        onChange={e => this.setState({name: e.target.value})}/>
                    </div>
                    <span>
                        Тариф активен:
                        <Checkbox checked={disabled}
                                  onChange={(e) => this.setState({disabled: e.target.checked})}/>
                        <Button style={{marginLeft: 30}} variant='contained' color='secondary'
                        onClick={() => this.handleModal(id)}>Удалить тариф</Button>
                    </span>
                </header>
                <section>
                    <List subheader={<ListSubheader>Список прав</ListSubheader>}>
                        {Object.entries(groupRules).map(([key, value]) =>
                            <ListItem alignItems='flex-start'>
                                <ListItemText>{value[0]}</ListItemText>
                                <ListItemSecondaryAction>
                                    <Switch checked={rights.includes(Number(key))}
                                            onChange={(e) => this.handleRule(key, e.target.checked)}/>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )}
                    </List>
                    <List subheader={<ListSubheader>Скидки</ListSubheader>}>
                        {titles.map((item, index) => (
                            <ListItem key={index}>
                                <ListItemText>{item}
                                <div style={{marginRight: 90}}>
                                    <TextField value={prices[index]} variant='outlined' required
                                    onChange={(e) => this.handleSale(e.currentTarget.value, index)}/>
                                </div>
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </section>
                {createPortal(this.state.modalIsOpen && <ModalAdvanced>
                                    <DeleteSub approve={this.handleDelete} id={this.state.deleteID}/>
                              </ModalAdvanced>,
                    document.getElementById('portal'))}
            </Container>
        )
    }
}