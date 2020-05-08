import React from 'react'
import EditEntry from "../Messages/EditEntry";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: this.props.profile.questions,
            hello: this.props.profile.hello,
            name: this.props.profile.name,
            type: "form",
            idCounter: 1000,
        };
        this.questionEntry = React.createRef();
        this.dataTypeEntry = React.createRef();
    }


    getEntryData(content, type) {
        if (type === 'name')
            this.setState({name: content});
        else if (type === 'helloMessage')
            this.setState({hello: content});
    }


    handleDelete = (id) => {
        this.setState(prevState => {
            const newArray = this.state.questions.filter(item => item.id !== id);
            return {questions: newArray}
        })
    };

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

    formData = () => {
        const array = [];
        this.state.questions.forEach(item => {
           if (item.id < 999)
               array.push(item);
           else
               array.push({
                   text: item.text,
                   type: item.type
               })
        });
        console.log("Данные на отправку:", {
            questions: array,
            name: this.state.name,
            hello: this.state.hello,
            type: "form",
            id: this.props.profile.id
        });
        return {
            questions: array,
            name: this.state.name,
            hello: this.state.hello,
            type: "form",
            id: this.props.profile.id
        }
    };

    render() {
        return (
            <React.Fragment>
                <h4>Редактирование анкеты</h4>
                <form>
                    <EditEntry text={this.state.hello} name='Приветственное сообщение' getCurrentData={(content) =>
                        this.getEntryData(content, 'helloMessage')}/>
                    <div className='question-entry'>
                        <label>
                            Текст вопроса
                            <input placeholder='Текст вопроса' ref={this.questionEntry}/>
                        </label>
                        <label>
                            Тип ответа
                            <select ref={this.dataTypeEntry}>
                                <option value="string">Строковые данные</option>
                                <option value="number">Числовые данные</option>
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