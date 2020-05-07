import React from 'react'
import './ShowProfile.css'

export default class ShowProfile extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h4>Текущая анкета: {this.props.profile.id}</h4>
                {console.log("Show Profile has got profile:", this.props.profile)}
                <div className='show-profile-item'>
                    Наименование анкеты: {this.props.profile.name}
                </div>
                <div className='show-profile-item'>
                    Приветственное сообщение : {this.props.profile.hello}
                </div>
                <div className='show-profile-questions'>
                    <h4>Список вопросов</h4>
                    <section>
                        {this.props.profile.questions.map(item => {
                            let type;
                            if (item.type === 'int')
                                type = 'Число';
                            else
                                type = 'Строка';
                            return (
                            <div className='show-profile-question'>
                                <span>{item.text}</span>
                                <span>Тип ответа: {type}</span>
                            </div>
                            )}
                        )}
                    </section>
                </div>
            </React.Fragment>
        )
    }
}