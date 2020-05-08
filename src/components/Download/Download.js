import React from 'react'
import './Download.css'
import PageHeader from "../UI/PageHeader";
import DownloadEntry from "./DownloadEntry";
import Axios from "axios";
import url from '../config'

export default class Download extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            configs: []
        }
    }


    componentDidMount() {
        Axios.get(url + "/config/get").then(res => {
            this.setState({configs: res.data})
        })
    }


    render() {
        return (
            <section>
                <PageHeader title='Загрузка таблиц и отчётов'/>
                    <div className='download-wrapper'>
                        <h4>Доступные файлы</h4>
                        {this.state.configs.map(item => (
                            <DownloadEntry title='Отчёт' description={'Отчёт в конфигурации ' + item.id}
                             handleClick={() => window.open(url + "/statistics/config_id=" + item.id, "_blank")} file='csv'/>
                        ))}
                    </div>
            </section>
        )
    }
}