import Axios from 'axios'
import url from "../../../config";

export const fetchUsers = () => {
    const endpoint = url + '/clients';
    Axios.get(endpoint).then(res => {
        console.log("Получили список пользователей бота:", res.data);
        return res.data;
    }).catch(err => console.log("Произошла ошибка при загрузке списка пользователей"))
}
export const fetchGroups = () => {
    const endpoint = url + '/groups';
    Axios.get(endpoint).then(res => {
        console.log("Fetched groups: ", res.data)
    }).catch(err => console.log("Произошла ошибка при загрузке списка групп"))
}
/*
* Todo: сохранение нового списка групп при получении id добавленной группы
* */
export const addGroup = data => {
    console.log("Сохраняем новую группу с данными:", data)
    const endpoint = url + '/groups';
    Axios.post(endpoint, data).then
    (res => console.log("Ответ на сохранение новой группы: ", res.data)).catch
    (err => console.log("Ошибка при сохранении группы:", err))
}

export const deleteGroup = id => {
    const endpoint = url + '/groups/' + id;
    Axios.delete(endpoint).then(res => {
        if (res.status !== 200)
            console.log("Произошла шибка при удалении группы")
    }).catch(err => console.log("Произошла шибка при удалении группы"))
}

export const changePriority = groups => {
    const IDs = [];
    const endpoint = url + '/groups/priority';
    groups.forEach(item => IDs.push(item.id));
    console.log("Меняем порядок групп с данными:", IDs)
    Axios.put(endpoint, {
        groups: IDs
    }).catch(err => console.log("При сохранении нового порядка групп произошла ошибка:", err))
}

export const fetchGroupDetailed = id => {
    const endpoint = url + '/groups/' + id;
    Axios.get(endpoint).then(res => console.log("Загрузили детальную информацию о группе:", res.data))
        .catch(err => console.log("Ошибка при детальной загрузке информации о группе"))
}

export const saveChanges = data => {
    const endpoint = url + '/groups';
    console.log("Сохраняем изменения в группах", data)
    Axios.put(endpoint, data).catch(err => console.log("При сохранении данных группы произошла ошибка", err))
}










/*
* else {
            // TODO: почистить selected у clients и rights и ещё тип
            console.log("Данные на отправку:", this.state)
            const endpoint = url + "/groups"
            const {clients, rights, groupName} = this.state;
            console.log("Posting data with:", this.state);
            const added_rights = [];
            const deleted_rights = [];
            const clientsList = [];
            Object.entries(rights).map(([key, value]) =>
                value[1] ? added_rights.push(key) : deleted_rights.push(key)
            )
            clients.forEach(item => item.selected ? clientsList.push(item) : null)
            Axios.post(endpoint, {
                name: groupName,
                added_rights,
                deleted_rights,
                users: clientsList
            }).then(res => console.log("Результат добавление новой группы:", res.data))
        }*/