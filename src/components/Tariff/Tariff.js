import React from "react";
import PageHeader from "../UI/PageHeader";
import {List, ListItem, ListItemIcon, ListItemSecondaryAction,
        ListItemText, withStyles} from "@material-ui/core";
import {Close} from "@material-ui/icons";
import ModalAdvanced from "../Modal/ModalAdvanced";
import ReactDOM from 'react-dom'
import ListHeader from "./ListHeader";
import AddChat from "./Modals/AddChat";
import DeleteChat from "./Modals/DeleteChat";
import Settings from "./Modals/Settings";
import Sub from "./Sub";
import {fetchChats, addChat} from "./API/api";

const ChatList = withStyles({
    root: {
        margin: '0 auto',
        border: '1px solid #ccc',
        width: '40%',
        minWidth: '465px'
    }
})(List)


const hardCode = [
    {
        chat_id: 1,
        name: 'Первый чат'
    },
    {
        chat_id: 2,
        name: 'Второй чат'
    },
    {
        chat_id: 3,
        name: 'Третий чат'
    },
    {
        chat_id: 4,
        name: 'Четвёртый чат'
    },
]


export default class Tariff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            isLoading: false,
            chats: hardCode,
            modalComponent: null,
            subIsOpen: false,
        }
    }

    componentDidMount() {
        fetchChats().then(data => this.setState({chats: data.chats}))
    }

    handleAddNewChat = (id, name) => {
        addChat({id, name}).then(data => this.setState({
            modalIsOpen: false,
            chats: data
        }))
    }

    handleDeleteChat = (action, id) => {
        if (action) {
            const array = this.state.chats.filter(item => item.chat_id !== id);
            this.setState({chats: array, modalIsOpen: false})
        }
        else
            this.setState({modalIsOpen: false})
    }

    handleModal = (value, component, chatID) => {
        let render;
        if (component === 'add')
            render = <AddChat handleAdd={this.handleAddNewChat}/>
        else if (component === 'remove') {
            render = <DeleteChat id={chatID} approve={this.handleDeleteChat}/>
        }
        else if (component === 'settings')
            render = <Settings/>
        this.setState({modalIsOpen: value, component: render})
    }


    render() {
        const {chats, modalIsOpen, component, subIsOpen, currChat, currName } = this.state;
        return (
            <React.Fragment>
                {subIsOpen ? <Sub chat={currChat} name={currName} handleSwitchSection={() => this.setState({subIsOpen: false})}/> :
                    <section>
                        <PageHeader title='Тарифы'/>
                        <ChatList subheader={<ListHeader openAdd={this.handleModal} openSettings={this.handleModal}/>}>
                            {chats.map((item, index) => (
                                <ListItem button key={index} onClick={() => this.setState({subIsOpen: true,
                                    currChat: item.id, currName: item.name})}>
                                    <ListItemText primary={`ID: ${item.id}`} secondary={`${item.name}`}/>
                                    <ListItemSecondaryAction>
                                        <ListItemIcon
                                            onClick={() => this.handleModal(true, 'remove', item.id)}>
                                            <Close cursor='pointer'/>
                                        </ListItemIcon>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </ChatList>
                        {modalIsOpen &&
                        ReactDOM.createPortal(
                            <ModalAdvanced toggleModal={() => this.setState({modalIsOpen: false})}>{component}</ModalAdvanced>,
                            document.getElementById('portal'))}
                </section> }
            </React.Fragment>
        )
    }
}
