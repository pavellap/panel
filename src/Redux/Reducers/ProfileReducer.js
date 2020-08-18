import {
    FETCH_PROFILES_SUCCESS, CHANGE_PROFILE_POSITION,
    CHANGE_PROFILE_POSITION_FAILED, CHANGE_PROFILE_POSITION_STARTED,
    CHANGE_PROFILE_POSITION_SUCCESS, DELETE_PROFILES_FAILED,
    DELETE_PROFILES_STARTED, DELETE_PROFILES_SUCCESS,
    FETCH_PROFILES_FAILED, FETCH_PROFILES_STARTED, CLOSE_PROFILE_MODAL,
    FETCH_PROFILE_FAILED, FETCH_PROFILE_STARTED,
    FETCH_PROFILE_SUCCESS, ADD_NEW_PROFILE_FAILED, ADD_NEW_PROFILE_STARTED,
    ADD_NEW_PROFILE_SUCCESS, ADD_NEW_PROFILE, UPDATE_PROFILE_FAILED,
    UPDATE_PROFILE_STARTED, UPDATE_PROFILE_SUCCESS, DELETE_PROFILE,
} from "../Actions/ActionTypes";


const template = {
    configs: [1],
    disabled: false,
    end: "До свидания",
    endFilename: null,
    greeting: "Здравствуйте!",
    greetingFilename: null,
    id: 1,
    name: "Название 1",
    questions: [
        {id: 1, main: false, text: "Вопрос 1", type: "int"},
        {id: 2, main: false, text: "Вопрос 2", type: "str"},
        {id: 3, main: true, text: "Вопрос 3", type: "ггггггг"},
        {id: 4, main: false, text: "Вопрос 4", type: "int"},
    ]
}

const initialState = {
    profiles: [],
    profilesDetailed: template,
    modalIsOpen: false,
    modalType: "",
    componentIsLoading: false,
    errorMessage: "",
    key: null
}

export function profileReducer(state=initialState, action) {
    switch (action.type) {
        case FETCH_PROFILES_STARTED:
            return {
                ...state, componentIsLoading: true
            }
        case CHANGE_PROFILE_POSITION:
            return {
                ...state, profiles: action.data
            }
        case FETCH_PROFILES_SUCCESS:
            return {
                ...state, componentIsLoading: false, profiles: action.data
            }
        case FETCH_PROFILES_FAILED:
            return {
                ...state, componentIsLoading: false,
                modalIsOpen: true,
                errorMessage: "Произошла ошибка при загрузке профилей. " +
                    "Попробуйте перезагрузить страницу или вернуться к панели " +
                    "управления позже"
            }
        case DELETE_PROFILES_STARTED:
            return {
                ...state, componentIsLoading: true
            }
        case DELETE_PROFILES_SUCCESS:
            /*state.profiles.filter(item => item.id !== action.id)*/
            return {
                ...state,
                componentIsLoading: false,
                profiles: action.data,
                modalIsOpen: false
            }
        case DELETE_PROFILES_FAILED:
            return {
                ...state, componentIsLoading: false,
                modalIsOpen: true, errorMessage: "Произошла ошибка при удалении " +
                    "профилей. Попробуйте перезагрузить страницу или " +
                    "вернуться к панели управления позже"
            }
        case DELETE_PROFILE:
            return {
                ...state, modalIsOpen: true, modalType: 'accept', currentProfile: action.currentProfile
            }
        case CHANGE_PROFILE_POSITION_STARTED:
            return {
                ...state, componentIsLoading: true
            }
        case CHANGE_PROFILE_POSITION_SUCCESS:
            return {
                ...state, componentIsLoading: false
            }
        case CHANGE_PROFILE_POSITION_FAILED:
            return {
                ...state, componentIsLoading: false,
                modalIsOpen: true, errorMessage: "Произошла ошибка при " +
                    "сохранении данных на сервере. Попробуйте перезагрузить " +
                    "страницу или вернуться к панели управления позже"
            }
        case CLOSE_PROFILE_MODAL:
            return {
                ...state, modalIsOpen: false, componentIsLoading: false
            }
        case FETCH_PROFILE_STARTED:
            return {
                ...state, modalIsOpen: true, componentIsLoading: true
            }
        case FETCH_PROFILE_SUCCESS:
            return {
                ...state, componentIsLoading: false,
                profilesDetailed: action.data, modalType: 'edit'
            }
        case FETCH_PROFILE_FAILED:
            return {
                ...state, errorMessage: 'Произошла ошибка при загрузке профиля.' +
                    ' Попробуйте перезагрузить страницу или вернуться ' +
                    'к панели управления позже'
            }
        case ADD_NEW_PROFILE_STARTED:
            return {
                ...state, componentIsLoading: true,
            }
        case ADD_NEW_PROFILE_FAILED:
            return {
                ...state, modalIsOpen: true, componentIsLoading: false,
                errorMessage: 'Произошла ошибка при добавлении профиля.' +
                    ' Попробуйте перезагрузить страницу или вернуться ' +
                    'к панели управления позже'
            }
        case ADD_NEW_PROFILE_SUCCESS:
            const array = state.profiles;
            array.push(action.data.form);

            return {
                ...state, profiles: array, componentIsLoading: false, modalIsOpen: false
            }
        case ADD_NEW_PROFILE:
            return {
                ...state, modalIsOpen: true, modalType: 'add'
            }
        default:
            return state
    }
}
