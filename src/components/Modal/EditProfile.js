import React from 'react'
import EditEntry from "../Messages/EditEntry";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            helloMessage: this.props.profile.helloMessage,
            questionsList: this.props.profile.questionsList,
            currentQuestionId: this.props.profile.currentQuestionId
        };
        this.questionEntry = React.createRef();
        this.dataTypeEntry = React.createRef();
    }
    // получает анкету, меняет её
    getEntryData = (content) => {

    };

    handleDelete = (id) => {
        this.setState(prevState => {
            const newArray = this.state.questionsList.filter(item => item.id.toString() !== id);
            return {questionsList: newArray}
        })
    };

    handleAdd = () => {
        if (!(this.questionEntry.current.value === '')) {
            const newItem = {
                render: (<div className='question'>
                    <span>{this.state.currentQuestionId + 1}</span>
                    <span>{this.questionEntry.current.value}</span>
                    <span>{this.dataTypeEntry.current.value}</span>
                    <FontAwesomeIcon icon={faTimes} id={this.state.currentQuestionId + 1}/>
                </div>),
                id: this.state.currentQuestionId + 1,
                question: this.questionEntry.current.value,
                dataType: this.dataTypeEntry.current.value
            };
            const newArray = this.state.questionsList;
            newArray.push(newItem);
            this.questionEntry.current.value = "";
            this.setState({questionList: newArray});
            // eslint-disable-next-line react/no-direct-mutation-state
            this.state.currentQuestionId += 1;
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
                    {<h4>Список вопросов</h4>}
                    {this.state.questionsList.map(item => item.render
                    )}
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