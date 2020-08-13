import url from "../../../config";
import Axios from "axios";


/*
*   Подрузка списка всех чатов
* */
export const fetchChats = () => {
    const endpoint = url + '/chats';
    Axios.get(endpoint).then(res => {
            console.log("Получили данные при загрузке чатов:", res.data)
    }).catch(err => {
        console.log("Произошла ошибка при загрузке списка чатов")
        throw err;
    });
}
/*
* Создание нового чата
* */
export const addChat = data => {
    const {chat_id, name} = data;
    const endpoint = url + 'chats';
    Axios.post(endpoint, {
        chat_id,
        name
    }).then(res => console.log("Это заглушка для метода для добавления нового чата:", res.data))
        .catch(err => console.log("Произошла ошибка при добавлении нового чата.."))
}
/*
* Загрузка списка подписок по id чата
* */
export const fetchSubs = id => {
    const endpoint = url + 'subs/chat_id=' + id;
    Axios.get(endpoint).then(res => console.log("Получили список подписок чата c id: ", id, '\n', res.data))
        .catch(err => console.log("Ошибка при загрузке списка подписок"))
}

export const addNewSub = id => {
    const endpoint = url + '/subs/chat_id' + id
    Axios.post(endpoint, {
        rights: [],
        name: 'Новый тариф',
        disabled: false,
        prices: [0, 0, 0, 0]
    }).then(res => console.log("Добавили новый тариф в чат с id: ", id, '\n', res.data))
        .catch(err => console.log("Произошла ошибка при добавлении подписки", err))
}

export const deleteChat = id => {
    const endpoint = url + '/chats/' + id;
    Axios.delete(endpoint).catch(err => console.log("Произошла ошибка при удалении чата.."))
}

export const deleteSub = id => {
    const endpoint = url + '/subs/' + id;
    Axios.delete(endpoint).catch(err => console.log("Произошла ошибка при удалении подписки.."))
}

export const editChatName = (id, name) => {
    const endpoint = url + '/chats/' + id;
    Axios.put(endpoint, {name}).catch(err => {
        console.log('Произошла ошибка при сохранении имени чата..')
        throw err;
    })
}

export const fetchSettings = () => {
    const endpoint = url + '/settings';
    Axios.get(endpoint).then(res => console.log("Получили настройки для чатов:", res.data))
        .catch(err => {
        console.log('Произошла ошибка при загрузке настроек для чатов');
        throw err;
    })
}

export const saveSettings = (data) => {
    const endpoint = url + '/settings';
    Axios.put(endpoint, data).catch(err => {
        console.log('Произошла ошибка при сохранении настроек чата');
        throw err;
    })
}

export const editSub = (data) => {
    console.log("Конечные данные:", data)
}