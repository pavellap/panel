import {
    faCapsules,
    faUsers,
    faDownload,
    faMailBulk,
    faUserCog,
    faAd,
    faUserClock, faMoneyCheckAlt, faUser, faGift, faUserPlus, faMoneyBill
} from '@fortawesome/free-solid-svg-icons'



const titles =
    ["Анкеты", "Рассылки",
        "Загрузка отчётов", 'Группы', 'Промокоды', 'Тарифы'
    ]

const links = [ // ссылки на вкладки
    'profiles',
    'mailing', 'download', 'groups', 'promo', 'tariff'
]



const icons = [ // соответствующие компоненты иконок
    faUsers, faMailBulk,
    faDownload, faUser, faAd, faMoneyBill
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
