import {FETCH_PROFILES_SUCCESS, CHANGE_PROFILE_POSITION,
        CHANGE_PROFILE_POSITION_FAILED, CHANGE_PROFILE_POSITION_STARTED,
        CHANGE_PROFILE_POSITION_SUCCESS, DELETE_PROFILES_FAILED,
        DELETE_PROFILES_STARTED, DELETE_PROFILES_SUCCESS,
        FETCH_PROFILES_FAILED, FETCH_PROFILES_STARTED
} from "../Actions/ActionTypes";
import {hardCode, profiles} from "../../components/Profiles/hardcode";

const initialState = {
    profiles: [],
    modalIsOpen: false,
    componentIsLoading: false
}

// todo: для всех FAILED сделать модальное
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
                ...state, componentIsLoading: false
            }
        case DELETE_PROFILES_STARTED:
            return {
                ...state, componentIsLoading: true
            }
        case DELETE_PROFILES_SUCCESS:
            return {
                ...state,
                componentIsLoading: false,
                profiles: state.profiles.filter(item => item.id !== action.id)
            }
        case DELETE_PROFILES_FAILED:
            return {
                ...state, componentIsLoading: false
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
                ...state, componentIsLoading: false
            }
        default:
            return state
    }
}
