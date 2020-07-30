import {
    faCapsules,
    faUsers,
    faDownload,
    faMailBulk,
    faUserCog,
    faAd,
    faUserClock, faMoneyCheckAlt, faUser, faGift, faUserPlus
} from '@fortawesome/free-solid-svg-icons'
// наименования вкладок
const titles =
    ["Анкеты", "Рассылки", "Подписки",
        "Загрузка отчётов", 'Группы', 'Промокоды'
    ]


const links = [ // ссылки на вкладки
    'profiles',
    'mailing', 'subscription', 'download', 'groups', 'promo'
]

const icons = [ // соответствующие компоненты иконок
    faUsers, faMailBulk,
    faUserPlus, faDownload, faUser, faAd
]

const messagesContent = [
    ['Диалог Регистрации', 'registration', faUserClock],
    ['Главное меню и оплата', 'payment', faMoneyCheckAlt],
    ['Анкета', 'profile',  faUser],
    ['Сообщение перед концом подписки', 'expiring', faUserClock],
    ['Отправка подарочных сертификатов ','present', faGift],
    ["Остальное",  'other', faUserCog],
    ["Серия Реанимации", 'reanimation', faCapsules]
]

export {titles, links, icons, messagesContent}