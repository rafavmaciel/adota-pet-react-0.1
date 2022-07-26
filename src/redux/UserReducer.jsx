import { useReducer, createContext } from "react";

let initialState = {
    user: {
        user: "",
        email: "",
        photoUrl: "",
        uid: "",
        provider: "",
        isAuthenticated: false,
    },
};

const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
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
    };
    const [state, dispatch] = useReducer(reducer, initialState);
    return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};

export default UserContext;