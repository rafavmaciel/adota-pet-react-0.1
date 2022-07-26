import { useReducer } from "react";

let initialState = {
    user: {
        user: "",
        email: "",
        photoUrl: "",
        uid: "",
        provider: "",
        isAuthenticated: "false",
    },
};

let reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
            };
        case "SET_IS_AUTHENTICATED":
            return {
                ...state,
                user: {
                    ...state.user,
                    isAuthenticated: action.payload,
                },
            };
        default:
            return state;
    }
}

export { initialState, reducer };