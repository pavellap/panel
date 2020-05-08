import React from "react";
import './AddProfile.css'
import EditEntry from "../Messages/EditEntry";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";



// добавить чекбокс - это мейн
export default class AddProfile extends React.Component {
    constructor(props) {
        super(props);
        // объект в стейте - параметры новой анкеты
        this.state = {
            questions: [],
            name: "Название анкеты",
            hello: "Приветственное сообщение",
            type: "form",
            idCounter: 1000
        };
        this.questionEntry = React.createRef();
        this.dataTypeEntry = React.createRef();
    }

    handleAdd = () => { // добавление нового вопроса
        // проверка на пустое поле
        if (!(this.questionEntry.current.value === '')) {
            const newItem = {
                text: this.questionEntry.current.value,
                type: this.dataTypeEntry.current.value,
                id: this.state.idCounter
            };
            const newArray = this.state.questions;
            newArray.push(newItem);
            this.questionEntry.current.value = "";
            this.setState({questions: newArray, idCounter: this.state.idCounter + 1});
        }
    };

    handleDelete = (id) => {
        this.setState(prevState => {
            const newArray = this.state.questions.filter(item => item.id !== id);
            return {questions: newArray}
        })
    };

    formData = () => {
        const question = this.state.questions;
        // хз, почему не удаляет
        delete question.id;
        return {
            questions: question,
            name: this.state.name,
            hello: this.state.hello,
            type: "form",
            disabled: false
        }
    };

    getEntryData(content, type) {
        if (type === 'name')
            this.setState({name: content});
        else if (type === 'helloMessage')
            this.setState({hello: content});
    }

    render() {
        return (
            <React.Fragment>
                <h4>Добавление новой анкеты</h4>
                <form>
                    <EditEntry text='Название анкеты' value='Шаблон' getCurrentData={(content) =>
                        this.getEntryData(content, 'name')}/>
                    <EditEntry text='Приветственное сообщение' value='Шаблон' getCurrentData={(content) =>
                        this.getEntryData(content, 'helloMessage')}/>
                    <div className='question-entry'>
                        <label>
                            Текст вопроса
                            <input placeholder='Текст вопроса' ref={this.questionEntry}/>
                        </label>
                        <label>
                            Тип ответа
                            <select ref={this.dataTypeEntry}>
                                <option value="str">Строковые данные</option>
                                <option value="int">Числовые данные</option>
                            </select>
                        </label>
                    </div>
                    <h4>Список вопросов</h4>
                    {this.state.questions.map(item => (
                            <div className='question'>
                                <span>{item.text}</span>
                                <span>{item.type}</span>
                                <FontAwesomeIcon icon={faTimes} onClick={() => this.handleDelete(item.id)}/>
                            </div>)
                        )
                    }
                    <div className='add-ques-button' onClick={() => this.handleAdd()}>
                        <span style={{marginRight: 20}}>Добавить вопрос</span>
                        <FontAwesomeIcon icon={faPlus} size='2x'/>
                    </div>
                    <div className='save-button' onClick={() => this.props.handleAddClick(this.formData())}>Сохранить</div>
                </form>
            </React.Fragment>
        )
    }
}