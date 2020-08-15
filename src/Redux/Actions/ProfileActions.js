import {FETCH_PROFILES_SUCCESS, CHANGE_PROFILE_POSITION,
    CHANGE_PROFILE_POSITION_FAILED, CHANGE_PROFILE_POSITION_STARTED,
    CHANGE_PROFILE_POSITION_SUCCESS, DELETE_PROFILES_FAILED,
    DELETE_PROFILES_STARTED, DELETE_PROFILES_SUCCESS,
    FETCH_PROFILES_FAILED, FETCH_PROFILES_STARTED
} from "./ActionTypes";
import url from "../../config";
import Axios from "axios";

export const fetchProfiles = (config) => {
    const endpoint = url + '/forms/config/' + config ;
    return async dispatch => {
        try {
            dispatch({
                type: FETCH_PROFILES_STARTED
            })
            const response = await Axios.get(endpoint);
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

export const deleteProfile = id => {
    return async dispatch => {
        dispatch({
            type: DELETE_PROFILES_STARTED
        })
        const endpoint = url + '/forms/' + id;
        try {
            await Axios.delete(endpoint);
            dispatch({
                type: DELETE_PROFILES_SUCCESS,
                id
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

export const saveData = () => {

}
