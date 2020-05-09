import React from 'react'
import NavigationHeader from "./Navigation-header";
import NavigationItem from "./Navigation-item";
import './Navigation.css'
import {
    faCapsules,
    faUsers,
    faDownload,
    faMailBulk,
    faEnvelope,
    faUserCog,
    faUserClock
} from '@fortawesome/free-solid-svg-icons'
// eslint-disable-next-line
import Axios from "axios";

/*
Для иконок в навигации используется готовая React-библиотека от FontAwesome
Подробнее здесь: https://fontawesome.com/how-to-use/on-the-web/using-with/react
 */

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titles: [ // наименования вкладок
                'Диалог Регистрации', 'Главное меню и оплата', 'Анкета',  'Сообщение перед концом подписки',
                'Отправка подарочных сертификатов ', 'Остальное', "Анкеты", "Рассылки", "Подписки", "Серия Реанимации",
                "Загрузка отчётов"
            ],
            links: [ // ссылки на вкладки
                'registration', 'payment', 'profile', 'expiring', 'present', 'other', 'profiles',
                'mailing', 'subscription', 'reanimation', 'download'
            ],
            icons: [ // соответствующие компоненты иконок
                faUserClock, faUsers, faCapsules, faDownload, faEnvelope, faUserCog, faMailBulk, faUsers, faCapsules,
                faCapsules, faDownload
            ],
            user: 'admin',
            status: "online",
            active: "Диалог Регистрации"
        }
    }

    handleChangeCurrent = item => {
        console.log("Меняем активный на:", item);
        this.setState({active: item})
    };

    render() {
        let styles = null;
        return(
            <aside className='Menu-container'>
                <NavigationHeader userName={this.state.user} status={this.state.status}/>
                <div className='Menu-description'>Текущая конфигурация: {this.props.configId}</div>
                    <nav>
                        {this.state.titles.map((item, index) => {
                            let styles = null;
                            if (item === this.state.active)
                                styles = {backgroundColor: "#7289da"};
                            return (
                                <NavigationItem content={item} icon={this.state.icons[index]}
                                    link={this.state.links[index]}  key={index} color={styles}
                                handleClick={() => this.handleChangeCurrent(item)}/>
                            )
                        })}
                    </nav>
            </aside>
        )
    }
}

