import {Navigate} from 'react-router-dom';
import {useContext} from 'react';
import UserContext from '../redux/UserReducer';

export const RequireAuth = ({children}) => {
    const {state} = useContext(UserContext);
    if(state.user.isAuthenticated == false){
        return <Navigate to='/sign-up' />
    }
    return children;
}