import { GET_USER } from "../actioncreator/type"
const initialState = { 
    user:''  ,
}
// console.log(initialState)
//Reducer
const GetuserReducer = (state = initialState, action) => {
    if (action.type === GET_USER) {
        return (
            {
                ...state,
                user:action.payload
            }
        )
    }
    return state;
}
export default GetuserReducer;
