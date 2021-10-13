import React from 'react';
import './App.css';
import { useRoutes } from './routes';
import {BrowserRouter as Router} from 'react-router-dom';
import {useAuth} from './hooks/auth.hook';
import {AuthContext} from './context/AuthContext';
import { KeyContext } from './context/KeyContext';
import ButtonAppBar from "./components/adminNavBar";
import UserAppBar from "./components/userNavBar"
import { useKey } from './hooks/key.hook';

function App() {


  const {login, logout, userLogin,key, isAdmin,isValidPass} = useAuth();
  const {setKey,deleteKey,_key,access} = useKey();
  const isAuthenticated = !!userLogin;
  const routes = useRoutes(isAuthenticated,isAdmin,isValidPass,access);
  return (
    <KeyContext.Provider value ={{_key,access,setKey,deleteKey}}>
      <AuthContext.Provider value={{userLogin,key,isAdmin,isValidPass,login,logout,isAuthenticated}}>
        <Router>
            {isAuthenticated && isValidPass && isAdmin && <ButtonAppBar/>}
            {isAuthenticated && isValidPass && !isAdmin && <UserAppBar/>}
            <div >
              {routes}
          </div>
        </Router>
      </AuthContext.Provider>
    </KeyContext.Provider>


  );
}

export default App;
