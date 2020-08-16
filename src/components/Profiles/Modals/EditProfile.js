import React from 'react'
import {connect} from 'react-redux'
import {List, Button, ListItem, ListSubheader,
    ListItemText, ListItemSecondaryAction, Tooltip,
    TextField, Typography, Switch} from "@material-ui/core";
import styled from "styled-components";
import FileUploader from "../../UI/FileUploader";


const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 60px;
    .justify {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`

function EditProfile(props) {
    const {type} = props;
    const {disabled, configs, hello,
        helloFile, ending, ending_file,
        questions, name, availableConfigs
    } = props.profile
    return (
        <Wrapper>
            <div className='justify'>
                {type === 'add' ?
                    <TextField value={name}
                               variant='outlined'
                               label='Название анкеты'
                    /> :
                    <Typography>
                        Название анкеты: {name}
                    </Typography>
                }
                <Tooltip title='Включение/отключение анкеты' placement='right'>
                    <Switch checked={!disabled}/>
                </Tooltip>
            </div>
            <List subheader={<ListSubheader>Конфигурации данной анкеты</ListSubheader>}>
                {availableConfigs && availableConfigs.map(item => (
                    <ListItem key={item.id}>
                        <ListItemText>ID: {item.id}</ListItemText>
                        <ListItemSecondaryAction>
                            <Switch checked={configs.map(conf => conf === item.id).length > 0}/>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <div className="justify">
                <TextField label='Приветственное сообщение'
                           variant='outlined'
                           value={hello}
                />
                <FileUploader/>
            </div>
            <div className="justify">
                <TextField label='Завершающее сообщение'
                           variant='outlined'
                           value={ending}
                />
                <FileUploader/>
            </div>
            <List>
                {questions.map(item =>
                    <ListItem key={item.id}>
                        <ListItemText primary={"ID: " + item.id} secondary={item.text}/>
                        <ListItemSecondaryAction>
                            <Switch checked={item.main}/>
                        </ListItemSecondaryAction>
                    </ListItem>
                )}
            </List>
        </Wrapper>
    )
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

function mapStateToProps(state) {
    return {
        type: state.profile.modalType,
        profile: state.profile.profilesDetailed,
        availableConfigs: state.config.configs
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)