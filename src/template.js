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

const matches = {
    1: 'Право на нахождение в беседе',
    2: 'Право писать в беседе',
    3: 'Право отправлять ссылки',
    4: 'Право отправлять картинки',
    5: 'Право отправлять видео',
    6: 'Право отправлять аудиосообщения',
    7: 'Право отправлять документы'
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



export {groups, groupDetailed, matches, rules};