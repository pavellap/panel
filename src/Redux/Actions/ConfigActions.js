import Axios from "axios";
import url from "../../config";
import {
    CHOOSE_CONFIG, CREATE_CONFIG_FAILED, CREATE_CONFIG_SUCCESS,
    DELETE_CONFIG_FAILED,
    DELETE_CONFIG_SUCCESS,
    FETCH_CONFIG_FAILED,
    FETCH_CONFIG_SUCCESS, DELETE_CONFIG_STARTED, CREATE_CONFIG_STARTED, CHANGE_CONFIG_SUCCESS, CHANGE_CONFIG_FAILED, CHANGE_CONFIG_STARTED
} from "./ActionTypes";

export function fetchConfigs() {
    const endpoint = url + '/configs';
    return async dispatch => {
        try {
            const data = (await Axios.get(endpoint)).data.configs;
            console.log("Получили конфиги:", data)
            dispatch({
                type: FETCH_CONFIG_SUCCESS,
                data
            })
        }
        catch (e) {
            console.log('Произошла ошибка при загрузке конфигов', e);
            dispatch({
                type: FETCH_CONFIG_FAILED,
                data: null
            })
        }
    }
}

export const chooseConfig = config => dispatch => dispatch({
    type: CHOOSE_CONFIG,
    value: config
})

export const deleteConfig = config => {
    return async dispatch => {
        try {
            const endpoint = url + '/configs/' + config;
            dispatch({
                type: DELETE_CONFIG_STARTED
            })
            await Axios.delete(endpoint);
            dispatch({
                type: DELETE_CONFIG_SUCCESS,
                id: config
            })
        } catch (e) {
            console.log("Произошла ошибка при удалении конфига");
            dispatch({
                type: DELETE_CONFIG_FAILED,
            })
        }
    }
}

export const addConfig = () => {
    return async dispatch => {
        try {
            dispatch({
                type: CREATE_CONFIG_STARTED
            })
            const endpoint = url + '/configs'
            const data = (await Axios.post(endpoint, {active: true, form_time: 1})).data.new_config
            console.log("Получили данные при добавлении конфигурации", data)
            dispatch({
                type: CREATE_CONFIG_SUCCESS,
                data
            })
        } catch (e) {
            console.log("Произошла ошибка при добавлении нового конфига...");
            dispatch({
                type: CREATE_CONFIG_FAILED
            })
        }
    }
}


export const changeConfig = (id, active=null, form_time) => {
    return async dispatch => {
        dispatch({
            type: CHANGE_CONFIG_STARTED
        })
    }
}
