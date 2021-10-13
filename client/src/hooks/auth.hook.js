import {useState, useCallback, useEffect} from 'react';

const storageName = 'userData'

export const useAuth = () => {
    const [userLogin,setUserLogin] = useState(null);
    const [isAdmin,setIsAdmin] = useState(false);
    const [isValidPass,setIsValidPass] = useState(false);
    const [key,setKey] = useState('');

    const login = useCallback((login,isValid,_key) => {
        setUserLogin(login);
        setIsValidPass(isValid);
        setKey(_key)
        if(login === 'ADMIN') { setIsAdmin(true)};
        localStorage.setItem(storageName,JSON.stringify({userLogin:login,
                                                         isAdmin:(login === 'ADMIN'),
                                                         isValidPass:isValid,
                                                         key:_key}))

    },[]);

    const logout = useCallback(() => {
        setUserLogin(null);
        setIsAdmin(false);
        setIsValidPass(false);
        setKey('')
        localStorage.removeItem(storageName);
    },[]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));
        if(data && data.userLogin && data.isValidPass){
            login(data.userLogin,data.isValidPass,data.key);
        }
    },[login]);

    return {login , logout, userLogin, key, isAdmin,isValidPass};
}