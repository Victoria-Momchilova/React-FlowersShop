import { createContext, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom'

import * as authService from '../services/authService.js'

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState({});
    const [loginError, setLoginError] = useState('');
    const location = useLocation();
  
    const loginSubmitHandler = async (values) => {
      await authService.login(values)
        .then((result) => {
          setAuth(result);
          setLoginError('');
          if(location.pathname === '/login') {
            navigate('/order');
          }
        })
        .catch(error => setLoginError(error));
    }
  
    const registerSubmitHandler = async (values) => {
      await authService.register(values)
        .then(result=>setAuth(result))
        .catch(error => console.log(error));
      navigate('/');
    }
  
    const logoutSubmitHandler = async () => {
      await authService.logout(auth.accessToken)
        .then(result=>setAuth({}))
        .catch(error => console.log(error));
    }

    const editSubmitHandler = async (values) => {
      await authService.setEditProfile(values, auth.accessToken)
        .then(result=>console.log(result))
        .catch(error=>console.log(error));
    }
  
    const autValues = {
      loginSubmitHandler,
      registerSubmitHandler,
      logoutSubmitHandler,
      editSubmitHandler,
      loginError: loginError,
      user: auth,
      ...auth,
      isAuth: !!auth.email,
    }

    return (
        <AuthContext.Provider value={autValues}>
            {children}
        </AuthContext.Provider>
    );
}

AuthContext.displayName = 'AuthContext';

export default AuthContext;