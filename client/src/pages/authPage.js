import React, { useEffect, useContext } from "react";
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { IconButton } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import './../App.css';
import {useHttp} from './../hooks/htttp.hook';
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";
import { KeyContext } from "../context/KeyContext";

export const AuthPage = () => {

  const contx = useContext(KeyContext)
  const auth = useContext(AuthContext);
  const [showPassword,setShow] = useState(false);
  const [pass,setPass] = useState('');
  const [login,setLogin] = useState('');
  const {request,error,cleanError} = useHttp();
  const message = useMessage();


  useEffect(() => {
    message(error);
    cleanError();
  },[error,message,cleanError]);

  const loginHandler = async () => {
    try{
       console.log(contx._key);
      const form = {
        login: login,
        pass: pass,
        key: contx._key
      }
      const data = await request('/api/auth/login','POST',{...form});
      auth.login(data.userLogin,data.isValidPass,data.key);
    } catch (e){

    }
  }

  return(
      <div className='LoginWindow'>
          <h1>Аuthorization</h1>
          <form onSubmit={e => {
            e.preventDefault();
            if( login === '') {
              alert('Введите логин');
            } else {
              loginHandler();
            }
          }}>
              <div>
                  <TextField
                      onChange={e => {
                          setLogin(e.target.value);
                      }}
                      className = 'LoginTextField'
                      label = 'Login'
                      variant='outlined'
                      margin = 'normal'
                  />
              </div>
              <div>
                  <TextField
                      onChange={e => {
                          setPass(e.target.value);
                      }}
                      className = 'LoginTextField'
                      label = 'password'
                      variant='outlined'
                      margin = 'normal'
                      type={showPassword?"text":"password"}
                      InputProps={{ 
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => {
                                    setShow(!showPassword);
                                }}
                              >
                               {showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                  >
                  </TextField>
                  
              </div>
              <div className='button-wrapper'>
                <Button
                  type='submit'
                  className='LoginButton'
                  variant="contained"
                  color="success"
                >log in</Button>
              </div>


          </form>       
      </div>
  );
}