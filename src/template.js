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
        added_rules: [1, 2, 3],
        deleted_rules: [4, 5],
        users: [
            {
                phone: '79998916861',
                nick: 'John Deer',
                only_here: true
            }
        ]
    },
    {
        id: 2,
        name: 'second',
        added_rules: [1, 3, 6, 7],
        deleted_rules: [2, 4, 5],
        users: [
            {
                phone: '79998916861',
                nick: 'Pavel Lapshin',
                only_here: true
            },
            {
                phone: '71234444411',
                nick: 'Andrew Golubenko',
                only_here: false
            }
        ]
    },
    {
        id: 3,
        name: 'third',
        added_rules: [1, 2, 3],
        deleted_rules: [4, 5],
        users: [
            {
                phone: '79998916861',
                nick: 'Andrew Golubenko',
                only_here: false
            }
        ]
    },
]

const entryData = {
    login: 'admin',
    password: 'qwerty'
}

const groupRules = {
    1: ['Право на нахождение в беседе', false],
    2: ['Право писать в беседе', false],
    3: ['Право отправлять ссылки', false],
    4: ['Право отправлять картинки', false],
    5: ['Право отправлять видео', false],
    6: ['Право отправлять аудиосообщения', false],
    7: ['Право отправлять документы', false]
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