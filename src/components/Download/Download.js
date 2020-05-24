import React from 'react'
import './Download.css'
import PageHeader from "../UI/PageHeader";
import DownloadEntry from "./DownloadEntry";
import Axios from "axios";
import url from '../config'

export default class Download extends React.Component {
    render() {
        return (
            <section>
                <PageHeader title='Загрузка таблиц и отчётов'/>
                    <div className='download-wrapper'>
                        <h4>Доступные файлы</h4>
                        <DownloadEntry title='Отчёт' description={'Загрузить отчёты'}
                        handleClick={() => window.open(url + "/statistics" + "/" +
                            localStorage.getItem('token'), "_blank")}
                                       file='csv'/>
                    </div>
            </section>
        )
    }
}