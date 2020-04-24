import React from 'react'
import PageHeader from "../UI/PageHeader";
import Configuration from "../Messages/Configuration";
import EditEntry from "../Messages/EditEntry";

export default class Other extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trash: "",
            successMessage: ""
        }
    }

    handleChange = (content, type) => {
        if (type === 'trash') {
            this.setState(prevState => {
                return {trash: content}
            })
        }
        else
            this.setState(prevState => {
                return {successMessage: content}
            })
    };

    render() {
        return(
            <section>
                <PageHeader title='Другое'/>
                <Configuration/>
                <form>
                    <EditEntry text='Ввод непонятной информации' inputValue='Текст сообщения'
                               getCurrentData={(content) => this.handleChange(content, "trash")}/>
                    <EditEntry text='Успешное прохождение анкеты' inputValue='Текст сообщения'
                               getCurrentData={(content) => this.handleChange(content, "success")}/>
                    <div className='registration-dialog-save' onClick={() => this.props.sendData(this.state)}>Сохранить данные</div>
                </form>
            </section>
        )
    }
}