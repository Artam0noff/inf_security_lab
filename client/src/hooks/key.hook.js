import {useState, useCallback} from 'react';



export const useKey = () => {

    const [_key,setPass] = useState(null);
    const [access,setAccess] = useState(false)

    const setKey = useCallback(_key => {
        
        setPass(_key);
        setAccess(true);
    },[]);

    const deleteKey = useCallback(() => {

        setPass(null);
        setAccess(false);
    },[]);



    return {setKey , deleteKey,  _key, access};
}