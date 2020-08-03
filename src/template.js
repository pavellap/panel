const groups = [
    {
        id: 1,
        name: 'first'
    },
    {
        id: 2,
        name: 'second'
    },
    {
        id: 3,
        name: 'third'
    },
    {
        id: 4,
        name: 'fourth'
    },
]
const hardCode = [
    {
        "phone": 89998916861,
        "nick": "pavellap", // может быть nil
        "id": 1
    },
    {
        "phone": 89998916861,
        "nick": "trigo", // может быть nil
        "id": 2
    },
    {
        "phone": 89998916861,
        "nick": "4", // может быть nil
        "id": 4
    },
    {
        "phone": 89998916861,
        "nick": "5", // может быть nil
        "id": 5
    },
    {
        "phone": 89998916861,
        "nick": "6", // может быть nil
        "id": 6
    },
    {
        "phone": 89998916861,
        "nick": "7", // может быть nil
        "id": 7
    },

]
const groupDetailed = [
    {
        id: 1,
        name: 'first',
        added_rights: [1, 2, 3],
        deleted_rights: [4, 5, 6, 7],
        users: [
            {
                phone: '79998916861',
                nick: 'John Deer',
                only_here: true,
                id: 1
            }
        ]
    },
    {
        id: 2,
        name: 'second',
        added_rights: [1, 3, 6, 7],
        deleted_rights: [2, 4, 5],
        users: [
            {
                phone: '79998916861',
                nick: 'Pavel Lapshin',
                only_here: true,
                id: 12
            },
            {
                phone: '71234444411',
                nick: 'Andrew Golubenko',
                only_here: false,
                id: 6
            }
        ]
    },
    {
        id: 3,
        name: 'third',
        added_rights: [1, 2, 3],
        deleted_rights: [4, 5, 6, 7],
        users: [
            {
                phone: '79998916861',
                nick: 'Andrew Golubenko',
                only_here: false
            },
            {
                phone: '79998916861',
                nick: 'Pavel Lapshin',
                only_here: true
            },
        ]
    },
]

const entryData = {
    login: 'admin',
    password: 'qwerty'
}


const groupRules = {
    1: ['Право на нахождение в беседе', false, null],
    2: ['Право писать в беседе', false, null],
    3: ['Право отправлять ссылки', false, null],
    4: ['Право отправлять картинки', false, null],
    5: ['Право отправлять видео', false, null],
    6: ['Право отправлять аудиосообщения', false, null],
    7: ['Право отправлять документы', false, null]
}

const rules = [
    ['Редактировать сообщения', false],
    ['Редактировать анкеты', true],
    ['Добавлять анкеты', true],
    ['Удалять анкеты', true],
    ['Добавлять группы', true],
    ['Удалять группы', false],
    ['Редактировать группы', true],
    ['Рекактировать подписки', false],
    ['Редактировать права других модераторов', false],
    ['Редактировать сообщения', true],
]


export {groups, groupDetailed, groupRules, rules, hardCode,};