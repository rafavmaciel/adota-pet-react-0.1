import { useReducer, createContext, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

let initialState = {
    user: {
        user: "",
        email: "",
        photoUrl: "",
        uid: "",
        provider: "",
        isAuthenticated: false,
        isRegistered: false,
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
            case "LOGOUT":
                auth.signOut();
                return {
                    ...state,
                    user: {
                        user: "",
                        email: "",
                        photoUrl: "",
                        uid: "",
                        provider: "",
                        isAuthenticated: false,
                    },
                };
            case "SET_REGISTEDED":
                return {
                    ...state,
                    user: {
                        ...state.user,
                        isRegistered: action.payload,
                    },
                };
            case "SET_DATA_CAD_USER":
                return {
                    ...state,
                    user: {
                        ...state.user,
                        dataCadUser: action.payload,
                    },
                };
            default:
                return state;
        }
    };
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                let obj = {
                    user: user.displayName,
                    email: user.email,
                    photoUrl: user.photoURL,
                    uid: user.uid,
                    provider: user.provider,
                    isAuthenticated: user.isAuthenticated,
                };
                dispatch({ type: "SET_USER", payload: obj });
                dispatch({ type: "SET_IS_AUTHENTICATED", payload: true });
            } else {
                dispatch({ type: "SET_IS_AUTHENTICATED", payload: false });
            }
        });
        console.log(state.user);
    }, []);

    const [state, dispatch] = useReducer(reducer, initialState);
    return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};

export default UserContext;
