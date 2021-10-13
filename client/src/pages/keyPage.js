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
import { KeyContext } from "../context/KeyContext";


export const KeyPage = () => {
  const contx = useContext(KeyContext);
  const [showPassword,setShow] = useState(false);
  const [pass,setPass] = useState('');
  const {request,error,cleanError} = useHttp();
  const message = useMessage();


  useEffect(() => {
    message(error);
    cleanError();
  },[error,message,cleanError]);

  const keyHandler = async () => {
    try{
      console.log('here1');
      const form = {
        key: pass
      }
      const data = await request('/api/auth/key','POST',{...form});
      contx.setKey(data.key);
      console.log('here2');
    } catch (e){

    }
  }

  return(
      <div className='LoginWindow'>
          <h1>Enter the key</h1>
          <form onSubmit={e => {
            e.preventDefault();
            if(pass !== ''){
              keyHandler();
            } else {
              alert('Введите парольную фразу');
            }

          }}>
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
                >Send</Button>
              </div>


          </form>       
      </div>
  );
}