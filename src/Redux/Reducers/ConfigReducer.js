import {
    FETCH_CONFIG_SUCCESS, FETCH_CONFIG_FAILED,
    CREATE_CONFIG_FAILED, CREATE_CONFIG_SUCCESS,
    DELETE_CONFIG_FAILED, DELETE_CONFIG_SUCCESS, CHOOSE_CONFIG,
    CHANGE_CONFIG_FAILED, CHANGE_CONFIG_SUCCESS, DELETE_CONFIG_STARTED, CREATE_CONFIG_STARTED
} from "../Actions/ActionTypes";

const initialState = {
    configs: [],
    currentConfig: null,
    handlingQuery: false
}

export function configReducer(state=initialState, action) {
    switch (action.type) {
        case FETCH_CONFIG_SUCCESS:
            return {
                configs: action.data,
                currentConfig: action.data[0]
            }
        case FETCH_CONFIG_FAILED:
            return {
                configs: null,
                currentConfig: null
            }
        case CHOOSE_CONFIG:
            return {
                ...state, currentConfig: action.value
            }
        case CREATE_CONFIG_STARTED:
            return {
                ...state, handlingQuery: true
            }
        case CREATE_CONFIG_SUCCESS:
            const array = state.configs;
            array.push({
                id: action.data.id,
                active: action.data.isActive,
                form_time: action.data.time
            })
            console.log("Новый массив конфигов:", array)
            return {
                ...state, configs: array, handlingQuery: false
            }
        case DELETE_CONFIG_STARTED:
            return {
                ...state, handlingQuery: true
            }
        case DELETE_CONFIG_SUCCESS:
            const newArray = state.configs.filter(item => item.id !== action.id)
            return {
                ...state, configs: newArray, handlingQuery: false
            }
        default:
            return state
    }
}