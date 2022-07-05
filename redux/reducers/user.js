import { SET_USER } from "../actions/user";

const user = (state="notLoaded", action) => {
    switch (action.type) {
        case SET_USER:
            return (
                // [
                // ...state,
                action.payload
            // ]
            )
    
        default:
            return state
    }
}

export default user;