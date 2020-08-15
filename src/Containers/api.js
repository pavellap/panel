import url from "../config";
import Axios from "axios";

/*
* Загрузка данных раздела сообщения
* Params: config id, section id
 */
export const fetchData = (config, section) => {
    return new Promise((resolve, reject) => {
        const endpoint = url + '/messages/config_id=' + config + '&section=' + section;
        let data = null;
        Axios.get(endpoint).then(res => {
            data = res.data.messages;
            resolve(data)
        })
            .catch(err => {
                console.log("Произошла ошибка при загрузке сообщений в разделе:", section
                    , '\n Конфиг: ', config);
                reject(null)
                throw err;
            })
    });
}


export const saveChanges = (data, id) => {
    const endpoint = url + '/messages/' + id;
    Axios.put(endpoint, data).catch(err => {
        console.log("Произошла ошибка при сохранении данных в разделе сообщений");
        throw err;
    })
}