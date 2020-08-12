import url from "../../config";
import Axios from "axios";

export const fetchChats = () => {
    const endpoint = url + '/chats';
    Axios.get(endpoint).then(res => {
        if (res.status)
            return res.data;
    }).catch(err => {
        throw err;
    });
}

export const saveChats = data => {
    const {chat_id, name} = data;
    const endpoint = url + 'chats';
    Axios.post(endpoint, {
        chat_id,
        name
    }).then(res => console.log("Это заглушка для метода для добавления нового чата:", res.data))
        .catch(err => console.log(err))
}