import url from "../../config";
import Axios from "axios";

/*
* Запрос на изменение пароля
* */
export const changePassword = (oldPass, newPass, login) => {
    const endpoint = url + '/moders/password/' + login;
    Axios.put(endpoint, {
        old_password: oldPass,
        new_password: newPass
    }).catch(err => {
        console.log("Произошла ошибка при смене пароля");
        throw err;
    })
}

/*
* Запрос на получение информации о текущем пользователе панели
* */
export const fetchPersonalInfo = login => {
    const endpoint = url + '/moders/' + login;
    Axios.get(endpoint).then(res => console.log('Получили такие данные о пользователе с логином:', login, '\n', res.data))
        .catch(err => {
            console.log("Произошла ошибка при получении данных о пользователе:");
            throw err;
        })
}
/*
* Запрос добавление нового модера
* */
export const addNewModer = login => {
    const endpoint = url + '/moders';
    Axios.post(endpoint, {login}).then(res =>
        console.log('Данные полученные при добавлении нового модера', res.data))
        .catch(err => {
            console.log('Произошла ошибка при добавлении нового модера');
            throw err;
        })
}

/*
* Запрос на удаление модератора
* */
export const deleteModer = login => {
    const endpoint = url + '/moders/' + login;
    Axios.delete(endpoint).catch(err => {
        console.log("Произошла ошибка при удалении модератора")
        throw err;
    })
}

/*
* Загружаем список модераторов
* */
export const fetchModers = () => {
    const endpoint = url + '/moders/logins';
    Axios.get(endpoint).then(res => console.log("Получили список модераторов:", res.data))
        .catch(err => {
            console.log('Произошла ошибка при загрузке')
            throw err;
        })
}

export const saveNewData = (data, login) => {
    const endpoint = url + '/moders/' + login;
    Axios.put(endpoint, data).catch(err => {
        console.log("Произошла ошибка при сохранении данных о модераторе");
        throw err;
    })
}
