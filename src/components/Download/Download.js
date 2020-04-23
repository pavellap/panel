import React from 'react'
import './Download.css'
import PageHeader from "../UI/PageHeader";
import DownloadEntry from "./DownloadEntry";

export default class Download extends React.Component {
    render() {
        return (
            <section>
                <PageHeader title='Загрузка таблиц и отчётов'/>
                    <div className='download-wrapper'>
                        <h4>Доступные файлы</h4>
                        <DownloadEntry title='Отчёт' description='Отчёт по продажам' file='pdf'/>
                        <DownloadEntry title='Отчёт' description='Отчёт по продажам' file='csv'/>
                        <DownloadEntry title='Отчёт' description='Отчёт по продажам' file='xlsx'/>
                        <DownloadEntry title='Отчёт' description='Отчёт по продажам' file='mp4'/>
                        <DownloadEntry title='Отчёт' description='Отчёт по продажам' file='pdf'/>
                        <DownloadEntry title='Отчёт' description='Отчёт по продажам' file='csv'/>
                        <DownloadEntry title='Отчёт' description='Отчёт по продажам' file='xlsx'/>
                        <DownloadEntry title='Отчёт' description='Отчёт по продажам' file='pdf'/>
                        <DownloadEntry title='Отчёт' description='Отчёт по продажам' file='csv'/>
                        <DownloadEntry title='Отчёт' description='Отчёт по продажам' file='xlsx'/>
                    </div>
            </section>
        )
    }
}