import React from 'react'
import {connect} from 'react-redux'
import {List, Button, ListItem, ListSubheader,
    ListItemText, ListItemSecondaryAction, Tooltip,
    TextField, Typography, Switch} from "@material-ui/core";
import styled from "styled-components";
import FileUploader from "../../UI/FileUploader";
import {
    fetchProfile, saveChanges,
    uploadNewProfile
} from "../../../Redux/Actions/ProfileActions";
import Loader from "../../UI/Loader";
import DeleteModal from "./DeleteModal";


const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 60px;
    position: relative;
    min-height: 80vh;
    min-width: 500px;
    .justify {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            greeting: "",
            configs: [],
            helloFile: null,
            end: "",
            ending_file: null,
            questions: [],
            name: "",
            newQuestionText: '',
            newQuestionType: 'str',
            newQuestionMain: true,
            newQuestionErr: false
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.name === "" && this.props.type === 'edit')
            this.setState({...this.props.profile, key: 'updated'})
    }

    handleConfigs = (id, value) => {
        if (value) {
            const array = this.state.configs.slice();
            array.push(id)
            this.setState({configs: array})
        }
        else {
            this.setState({configs: this.state.configs.filter(item => id !== item)})
        }
    }

    handleAddQuestion = () => {
        const {newQuestionText, newQuestionMain, newQuestionType} = this.state
        if (newQuestionText === "" || newQuestionType === "")
            this.setState({newQuestionErr: true})
        else
            this.setState(() => {
                const array = this.state.questions;
                array.push({
                    id: this.state.questions.length + 1000,
                    text: newQuestionText,
                    main: newQuestionMain,
                    type: newQuestionType
                })
                return {
                    questions: array,
                    newQuestionType: "str",
                    newQuestionText: "",
                    newQuestionMain: true,
                    newQuestionErr: false
                }
            })
    }

    handleAddProfile = (type) => {
        const {disabled, greeting, configs,
            end, questions, name,
        } = this.state;
        if (type === 'edit')
            this.props.saveData({
                disabled,
                configs,
                hello: greeting,
                end,
                questions,
                hello_file: null,
                ending_file: null,
            }, this.props.profile.id)
        else {
            const array = questions.map(item => {
                delete item.id;
                return item
            })
            this.props.addProfile({
                name,
                disabled,
                configs,
                greeting,
                end,
                questions: array,
                greetingFilename: null,
                endFilename: null,
            })
        }

    }

    handleMain = (index, newValue) => {
        const questions = this.state.questions;
        questions[index].main = newValue;
        this.setState({questions})
    }

    render() {
        const {type,
            availableConfigs,
            componentIsLoading,
        } = this.props;

        // todo: Починить файлики
        const {disabled, greeting, configs,
               end,newQuestionErr,
               questions, name, key,
               newQuestionText, newQuestionMain,
               newQuestionType,
        } = this.state;

        console.log("Стейт:", this.state);
        console.log("Пропсы:", this.props);

        return (
            <Wrapper>
                {componentIsLoading ? <Loader/> :
                    (type === 'accept' ? <DeleteModal/> : <React.Fragment>
                        <div className='justify'>
                            {type === 'add' ?
                                <TextField value={name}
                                           variant='outlined'
                                           label='Название анкеты'
                                           onChange={e => this.setState({name: e.currentTarget.value})}
                                /> :
                                <Typography>
                                    Анкета: {name}
                                </Typography>
                            }
                            <Tooltip title='Включение/отключение анкеты' placement='right'>
                                <Switch checked={!disabled} onChange={e => this.setState({disabled: !e.target.checked})}/>
                            </Tooltip>
                        </div>
                        <List subheader={<ListSubheader>Конфигурации данной анкеты</ListSubheader>}>
                            {availableConfigs.length > 0 && availableConfigs.map(item => (
                                <ListItem key={item.id}>
                                    <ListItemText>ID конфигурации: {item.id}</ListItemText>
                                    <ListItemSecondaryAction>
                                        <Switch key={String(item.id) + '-' + String(key)}
                                                onChange={e => this.handleConfigs(item.id, e.target.checked)}
                                                checked={configs && configs.filter(value => value === item.id).length > 0}/>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                        <div className="justify">
                            <TextField label='Приветственное сообщение'
                                       variant='outlined'
                                       value={greeting}
                                       onChange={e => this.setState({greeting: e.currentTarget.value})}
                            />
                            <FileUploader/>
                        </div>
                        <div className="justify">
                            <TextField label='Завершающее сообщение'
                                       variant='outlined'
                                       value={end}
                                       onChange={e => this.setState({end: e.currentTarget.value})}
                            />
                            <FileUploader/>
                        </div>
                        <List subheader={<ListSubheader>Вопросы данной анкеты</ListSubheader>}>
                            {questions && questions.map((item, index) =>
                                <ListItem key={item.id}>
                                    <ListItemText primary={type === 'edit' ? ("ID: " + item.id) : item.text}
                                                  secondary={type === 'edit' ? item.text : null}/>
                                    <ListItemSecondaryAction>
                                        <Switch checked={item.main} onChange={e => this.handleMain(index, e.target.checked)}/>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )}
                        </List>
                        {type === 'add' &&
                        <div>
                            <TextField variant='outlined'
                                       label='Тип ответа' value={newQuestionType}
                                       required error={newQuestionErr}
                                       onChange={e => this.setState({
                                           newQuestionType: e.currentTarget.value
                                       })}

                            />
                            <TextField variant='outlined'
                                       label='Текст вопроса' value={newQuestionText}
                                       required error={newQuestionErr}
                                       onChange={e => this.setState({
                                           newQuestionText: e.currentTarget.value
                                       })}
                            />
                            <Switch checked={newQuestionMain} onChange={e => this.setState({newQuestionMain: e.target.checked})}/>
                            <Button variant='contained' color='primary'
                                    onClick={this.handleAddQuestion}
                            >
                                Добавить вопрос</Button>
                        </div>
                        }
                        {/*TODO: обработчик для сохранялки*/}
                        <Button onClick={() => this.handleAddProfile(type)} variant='contained' color='primary'>
                            {type === 'edit' ? 'Сохранить изменения' : 'Добавить анкету'}
                        </Button>
                    </React.Fragment>)
                }
            </Wrapper>
            )
    }

}

function mapDispatchToProps(dispatch) {
    return {
        fetchProfile: (id) =>
            dispatch(fetchProfile(id)),
        addProfile: data =>
            dispatch(uploadNewProfile(data)),
        saveData: (data, id) =>
            dispatch(saveChanges(data, id))
    }
}

function mapStateToProps(state) {
    return {
        type: state.profile.modalType,
        profile: state.profile.profilesDetailed,
        availableConfigs: state.config.configs,
        componentIsLoading: state.profile.componentIsLoading,
        key: state.profile.key
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
