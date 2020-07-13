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
        added_rules: [1, 3],
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

export {groups, groupDetailed};