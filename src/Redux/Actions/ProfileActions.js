import {
    FETCH_PROFILES_SUCCESS, CHANGE_PROFILE_POSITION,
    CHANGE_PROFILE_POSITION_FAILED, CHANGE_PROFILE_POSITION_STARTED,
    CHANGE_PROFILE_POSITION_SUCCESS, DELETE_PROFILES_FAILED,
    DELETE_PROFILES_STARTED, DELETE_PROFILES_SUCCESS,
    FETCH_PROFILES_FAILED, FETCH_PROFILES_STARTED, CLOSE_PROFILE_MODAL,
    FETCH_PROFILE_FAILED, FETCH_PROFILE_STARTED,
    FETCH_PROFILE_SUCCESS, ADD_NEW_PROFILE_FAILED, ADD_NEW_PROFILE_STARTED,
    ADD_NEW_PROFILE_SUCCESS, ADD_NEW_PROFILE, UPDATE_PROFILE_FAILED,
    UPDATE_PROFILE_STARTED, UPDATE_PROFILE_SUCCESS, DELETE_PROFILE
} from "./ActionTypes";
import url from "../../config";
import Axios from "axios";

export const fetchProfiles = (config) => {
    console.log("Грузим профили...", config)
    const endpoint = url + '/forms/config/' + config ;
    return async dispatch => {
        try {
            dispatch({
                type: FETCH_PROFILES_STARTED
            })
            const response = await Axios.get(endpoint);
            console.log("Получили данные профилей:", response)
            dispatch({
                type: FETCH_PROFILES_SUCCESS,
                data: response.data.forms
            })
        }
        catch (e) {
            dispatch({
                type: FETCH_PROFILES_FAILED,
            })
        }
    }
}

export const changeProfilePosition = (index, action, profiles) => {
    return dispatch => {
        const array = profiles.slice();
        if (action === 'up' && index !== 0) {
            const temp = array[index - 1];
            array[index - 1] = array[index];
            array[index] = temp;
            dispatch({
                type: CHANGE_PROFILE_POSITION,
                data: array
            })
        }
        else if (action === "down" && index !== array.length - 1) {
            const temp = array[index + 1];
            array[index + 1] = array[index];
            array[index] = temp;
            dispatch({
                type: CHANGE_PROFILE_POSITION,
                data: array
            })
        }
    }
}

export const acceptDeleteProfile = (id, config) => dispatch => {
    console.log("Deletim with:", id, config)
    return dispatch({
        type: DELETE_PROFILE,
        currentProfile: {
            id, config
        }
    })
}

export const deleteProfile = (id, config) => {
    return async dispatch => {
        dispatch({
            type: DELETE_PROFILES_STARTED
        })
        const endpoint = url + '/forms/' + id;
        const getEndpoint = url + '/forms/config/' + config
        try {
            await Axios.delete(endpoint);
            const response = await Axios.get(getEndpoint)
            dispatch({
                type: DELETE_PROFILES_SUCCESS,
                data: response.data.forms
            })
        }
        catch (e) {
            console.log("Произошла ошибка при удалении анкеты..");
            dispatch({
                type: DELETE_PROFILES_FAILED
            })
        }
    }
}

export const saveData = (profiles, config) => {
    return async dispatch => {
        dispatch({
            type: CHANGE_PROFILE_POSITION_STARTED
        })
        try {
            const endpoint = url + '/forms/order/' + config.id
            console.log("Отправляем новый порядок:", profiles.map(item => item.id))
            await Axios.put(endpoint, {
                order: profiles.map(item => item.id)
            })
            dispatch({
                type: CHANGE_PROFILE_POSITION_SUCCESS
            })
        }
        catch (e) {
            console.log("Произошла ошибка при сохранении порядка в анкетах")
            dispatch({
                type: CHANGE_PROFILE_POSITION_FAILED
            })
        }
    }
}

export const fetchProfile = profile => {
    return async dispatch => {
        dispatch({
            type: FETCH_PROFILE_STARTED
        });
        try {
            const endpoint = url + '/forms/' + profile
            const response = await Axios.get(endpoint);
            dispatch({
                type: FETCH_PROFILE_SUCCESS,
                data: response.data
            })
        }
        catch (e) {
            console.log("Произошла ошибка при загрузке профиля..");
            dispatch({
                type: FETCH_PROFILE_FAILED
            })
            throw e
        }
    }
}

export const saveChanges = (data, id) => {
    console.log("Data to save: ", data)
    return async dispatch => {
        dispatch({
            type: UPDATE_PROFILE_STARTED
        })
        try {
            const endpoint = url + "/forms/" + id;
            await Axios.put(endpoint, data);
            dispatch({
                type: UPDATE_PROFILE_SUCCESS
            })
        }
        catch (e) {
            dispatch({
                type: UPDATE_PROFILE_FAILED
            });
            console.log("Произошла ошибка при изменении данных в анкете...");
            throw e;
        }
    }
}

export const uploadNewProfile = data => {
    console.log("Загрузка нового профиля профиля с данными:", data)
    return async dispatch => {
        dispatch({
            type: ADD_NEW_PROFILE_STARTED
        })
        try {
            const endpoint = url + '/forms';

            const response = await Axios.post(endpoint, data);
            console.log("Ответ на добавление нового профиля: ", response.data)
            dispatch({
                type: ADD_NEW_PROFILE_SUCCESS,
                data: response.data
            })
        }
        catch (e) {
            console.log("Произошла ошибка при добавлении новой анкеты.");
            dispatch({
                type: ADD_NEW_PROFILE_FAILED
            })
        }
    }
}

export const addNewProfile = () => dispatch => dispatch({type: ADD_NEW_PROFILE})

export const closeModal = () => dispatch => dispatch({type: CLOSE_PROFILE_MODAL})




