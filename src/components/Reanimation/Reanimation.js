import React from 'react'
import PageHeader from "../UI/PageHeader";
import EditEntry from "../Messages/EditEntry";
import Axios from "axios";
import url from '../config'

export default class Reanimation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionId: 7
        }
    }
    componentDidMount() {
        Axios.get(url + '/page/get')
    }

    render() {
        return (
            <section>
                <PageHeader title='Сообщения для пользователей, у которых закончилась подписка'/>
                <form style={{paddingLeft: 20}}>
                    <div className='registration-dialog-save' onClick={() => this.props.sendData(this.state)}>Сохранить данные</div>
                </form>
            </section>
        )
    }
}