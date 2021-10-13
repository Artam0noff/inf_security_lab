import { useState, useCallback } from "react"

export const useHttp = () => {
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);



    const request = useCallback( async (url,method = 'GET', body = null, headers = {}) => {
        
        setLoading(true);
        try {

            if (body){
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
               // headers['Accept'] =  'application/json' ;
            } else {
                headers['Content-Type'] = 'application/json';
                headers['Accept'] =  'application/json' ;
            }

            const response = await fetch(url,{method, body, headers});
            const data = await response.json();

            if(!response.ok){
                
                throw new Error(data.message || 'something wrong');
            }
            
            setLoading(false);

            return data;
        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    },[])

    const cleanError = useCallback(() => setError(null),[]);

    return {loading , request, error, cleanError };

}