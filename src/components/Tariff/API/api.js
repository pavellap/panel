import url from "../../../config";
import Axios from "axios";


/*
*   Подрузка списка всех чатов
* */
export async function fetchChats() {
    const endpoint = url + '/chats';
    try {
        const response = await Axios.get(endpoint,{
            onDownloadProgress: progressEvent => console.log("Процесс загрузки: ", progressEvent.loaded)
        });
        return response.data
    }
    catch (err) {
        console.log("Произошла ошибка при загрузке списка чатов")
        throw err;
    }
}
/*
* Создание нового чата
* */
export async function addChat(data) {
    const {chat_id, name} = data;
    const endpoint = url + '/chats';
    try {
        await Axios.post(endpoint, {
            chat_id,
            name
        })
        let newChats = null;
        await fetchChats().then(res => {
            newChats = res.chats
        });
        return newChats
    }
    catch (err) {
        console.log("Произошла ошибка при добавлении нового чата..");
        throw err;
    }
}
/*
* Загрузка списка подписок по id чата
* */
export async function fetchSubs(id) {
    const endpoint = url + '/subs/chat_id=' + id;
    try {
        const response = await Axios.get(endpoint);
        console.log("Fetched detailed data: ", response.data)
        return response.data
    }
    catch (err) {
        console.log("Ошибка при загрузке списка подписок");
        throw err
    }
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

export async function deleteChat(id) {
    try {
        const endpoint = url + '/chats/' + id;
        await Axios.delete((endpoint));
        let newChats = null;
        await fetchChats().then(res => {
            newChats = res.chats
        });
        return newChats
    }
    catch(err) {
        console.log("Произошла ошибка при удалении чата..")
    }
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

export async function fetchSettings() {
    const endpoint = url + '/settings';
    try {
        const response = await Axios.get(endpoint);
        console.log("Fetched settings: ", response.data)
        return response.data
    }
    catch (err) {
        console.log('Произошла ошибка при загрузке настроек для чатов');
        throw err;
    }
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
