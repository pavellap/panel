import React from 'react'
import EditEntry from "../Configuration/EditEntry";


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
                id: this.state.idCounter,
                main: false
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

    handleSwitch = (val , index) => {
        const array = this.state.questions;
        array[index].main = val;
        this.setState({questions: array})
    };

    handleChange = (val, index) => {
        const array = this.state.questions;
        array[index].text = val;
        this.setState({questions: array})
    };

    render() {
        return (
            <React.Fragment>
                <h4>Редактирование анкеты</h4>
                <form>
                    <EditEntry text={this.state.hello} name='Приветственное сообщение' getCurrentData={(content) =>
                        this.getEntryData(content, 'helloMessage')}/>
                    {/*<div className='question-entry'>
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
                    </div>*/}
                    <h4>Список вопросов</h4>
                    {this.state.questions.map((item, index) => (
                        <div className='question' key={index}>
                            <input type='text' onChange={(e) =>
                                this.handleChange(e.currentTarget.value, index)} value={item.text}/>
                            <span>{item.type}</span>
                            <div className="pretty p-switch p-fill">
                                <input type="checkbox" checked={item.main} onChange={(e) =>
                                    this.handleSwitch(e.currentTarget.checked, index)}/>
                                <div className="state">
                                    <label>Главный вопрос</label>
                                </div>
                            </div>
                            {/*<FontAwesomeIcon icon={faTimes} onClick={() => this.handleDelete(item.id)}/>*/}
                        </div>)
                    )
                    }

                    <div className='save-button' onClick={() => this.props.handleAddClick(this.formData())}>Сохранить</div>
                </form>
            </React.Fragment>
        )
    }
}

