import React from 'react';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { IconButton } from '@material-ui/core';
import {Button} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import './../App.css';
import {useHttp} from './../hooks/htttp.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from "../context/AuthContext";
import { useHistory } from 'react-router';


export const ChangePassWindow = () => {

    const history = useHistory();
    const auth = useContext(AuthContext);
    const [showPassword,setShow] = useState(false);
    const [pass,setPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [repeatPass,setRepeatPass] = useState('');
    const {request,error,cleanError} = useHttp();
    const message = useMessage();

    useEffect(() => {
        message(error);
        cleanError();
      },[error,message,cleanError]);

    const changePassHandler = async () => {
        try{
            const form = {
                login:auth.userLogin,
                pass:pass,
                newPass:newPass,
            }

            const data = await request('/api/auth/changePass','POST',{...form,key:auth.key});
            auth.logout();
            history.push('/');

        } catch(e){

        }

    }

    return(
        <div className='LoginWindow'>
            <h1>{auth.userLogin}: Change Pass</h1>
            <form className='LoginWindow'
            onSubmit={e => {
                e.preventDefault();
                if( newPass === repeatPass)
                {
                    changePassHandler();

                } else {
                    alert('Новые пароли не совпадают');                   
                }
            }}>
                <h4> Enter the old pass</h4>
                <div>
                    <TextField
                        className = 'LoginTextField'
                        label = 'Old password'
                        variant='outlined'
                        margin = 'normal'
                        type={showPassword?"text":"password"}
                        onChange= {e => {setPass(e.target.value);}}
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
                    />
                </div>
                <h4> Enter the new pass</h4>
                <div className='LoginWindow'>
                    <TextField
                        className = 'LoginTextField'
                        label = 'New password'
                        variant='outlined'
                        margin = 'normal'
                        type = 'password'
                        onChange= {e => {setNewPass(e.target.value);}}
                    >
                    </TextField>
                    <TextField
                        className = 'LoginTextField'
                        label = 'Repeat new password'
                        variant='outlined'
                        margin = 'normal'
                        type={"password"}
                        onChange= {e => {setRepeatPass(e.target.value);}}
                    >
                    </TextField>
                </div>
                <div className='button-wrapper'>
                <Button
                  type='submit'
                  className='LoginButton'
                  variant="contained"
                  color="success"
                >Change password</Button>
              </div>
            </form>       
        </div>
    );
}

