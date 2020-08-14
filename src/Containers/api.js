import url from "../config";
import Axios from "axios";

/*
* Загрузка данных раздела сообщения
* Params: config id, section id
 */
export const fetchData = (config, section) => {
    const endpoint = url + '/messages/config_id=' + config + '&section=' + section;
    Axios.get(endpoint).then(res => {
        console.log(`Получили данные в разделе ${section} с конфигом ${config} \n ${res.data}`);
    })
        .catch(err => {
            console.log("Произошла ошибка при загрузке сообщений в разделе:", section
            , '\n Конфиг: ', config);
            throw err;
        })
}

export const saveChanges = (data, id) => {
    const endpoint = url + '/messages/' + id;
    Axios.put(endpoint, data).catch(err => {
        console.log("Произошла ошибка при сохранении данных в разделе сообщений");
        throw err;
    })
}