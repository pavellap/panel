import React from 'react'
import './Download.css'
import PageHeader from "../UI/PageHeader";
import DownloadEntry from "./DownloadEntry";
import url from '../../config'

export default class Download extends React.Component {
    endpoint = url + '/statistics';

    render() {
        return (
            <section>
                <PageHeader title='Загрузка таблиц и отчётов'/>
                    <div className='download-wrapper'>
                        <h4>Доступные файлы</h4>
                        <DownloadEntry title='Отчёт' description={'Загрузить отчёты'}
                        handleClick={() => window.open(this.endpoint, "_blank")}
                                       file='xlsx'/>
                    </div>
            </section>
        )
    }
}