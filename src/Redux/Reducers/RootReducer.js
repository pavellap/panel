import {combineReducers} from "redux";
import {configReducer} from "./ConfigReducer";
import {profileReducer} from "./ProfileReducer";

export default combineReducers({
    config: configReducer,
    profile: profileReducer
})