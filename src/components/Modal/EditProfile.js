import React from 'react'
import EditEntry from "../Messages/EditEntry";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: this.props.profile
        };
        this.questionEntry = React.createRef();
        this.dataTypeEntry = React.createRef();
    }


    getEntryData = (content) => {
        this.setState({helloMessage: content})
    };

    // пока нет айди, поправить позже
    handleDelete = (id) => {
        this.setState(prevState => {
            const newArray = this.state.questionsList.filter(item => item.id.toString() !== id);
            return {questionsList: newArray}
        })
    };

    handleAdd = () => {
        if (!(this.questionEntry.current.value === '')) {
            const newItem = {
                text: this.questionEntry.current.value,
                type: this.dataTypeEntry.current.value
            };
            const newArray = this.state.questionsList;
            newArray.push(newItem);
            this.questionEntry.current.value = "";
            this.setState({questionsList: newArray});
        }
    };

    render() {
        return (
            <React.Fragment>
                <h4>Редактирование анкеты</h4>
                <form>
                    <EditEntry text='Приветственное сообщение' value={this.state.helloMessage} getCurrentData={(content) =>
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
                    {this.state.questionsList.map(item => (
                        <div className='question'>
                            <span>{item.text}</span>
                            <span>{item.type}</span>
                            <FontAwesomeIcon icon={faTimes} onClick={(e) =>
                                this.handleDelete(e.currentTarget.id)} id={this.state.currentQuestionId + 1}/>
                        </div>)
                    )
                    }
                    <div className='add-ques-button' onClick={this.handleAdd}>
                        <span style={{marginRight: 20}}>Добавить вопрос</span>
                        <FontAwesomeIcon icon={faPlus} size='2x'/>
                    </div>
                    <div className='save-button' onClick={() => this.props.handleAddClick(this.state)}>Сохранить</div>
                </form>
            </React.Fragment>
        )
    }
}