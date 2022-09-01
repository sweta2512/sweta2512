import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import GetuserReducer from "./getuserReducer";


const rootReducer = combineReducers({
    AuthReducer,
    GetuserReducer
})

export default rootReducer;