import React from 'react'
import NavigationHeader from "./Navigation-header";
import NavigationItem from "./Navigation-item";
import './Navigation.css'
import {
    faCapsules,
    faUsers,
    faDownload,
    faMailBulk,
    faUserCog,
    faUserClock, faMoneyCheckAlt, faUser, faGift, faUserPlus
} from '@fortawesome/free-solid-svg-icons'
import Axios from "axios";
import url from '../config'
/*
Для иконок в навигации используется готовая React-библиотека от FontAwesome
Подробнее здесь: https://fontawesome.com/how-to-use/on-the-web/using-with/react
 */


let config;
Axios.get(url + "/config/current").then(res => {
    config = res.data.id
});

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titles: [ // наименования вкладок
                'Диалог Регистрации', 'Главное меню и оплата', 'Анкета',  'Сообщение перед концом подписки',
                'Отправка подарочных сертификатов ', "Остальное", 'Серия Реанимации', "Анкеты", "Рассылки", "Подписки",
                "Загрузка отчётов"
            ],
            links: [ // ссылки на вкладки
                'registration', 'payment', 'profile', 'expiring', 'present', 'other', 'reanimation', 'profiles',
                'mailing', 'subscription', 'download'
            ],
            icons: [ // соответствующие компоненты иконок
                faUserClock, faMoneyCheckAlt, faUser, faUserClock, faGift, faUserCog, faCapsules, faUsers, faMailBulk,
                faUserPlus, faDownload
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

    parseAddress = address => address.split("").slice(2, address.length).join("");

    render() {
        return(
            <aside className='Menu-container'>
                <NavigationHeader userName={this.state.user} status={this.state.status}/>
                <div className='Menu-description'>Текущая конфигурация: {config}</div>
                    <nav>
                        {this.state.titles.map((item, index) => {
                            let styles = null;
                            if (this.parseAddress(window.location.hash) === this.state.links[index])
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

