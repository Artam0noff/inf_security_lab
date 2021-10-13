import React from "react";
import { useState } from "react";
import { useHttp } from "../hooks/htttp.hook";
import { useEffect } from "react";
import { useCallback } from "react";
import {Table, TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from '@material-ui/core';
import { Checkbox } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Button } from '@material-ui/core';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router";
import './../App.css';


export const UsersPage = () => {

    const history = useHistory(); 
    const auth = useContext(AuthContext);
    const [users,setUsers] = useState([]);
    const {request} = useHttp();
    const [isLimit, setIsLimit] = useState({});
    const [newUser, setNewUser] = useState('');

    const getUsers = useCallback(async () => {
        try {
            const _users = await request('api/adminPanel/getUsersInfo','POST',{key:auth.key});
            setUsers(_users.users);

            const _isLimit = await _users.users.reduce( (prev,user) => {
              const Limit = +user.passLimit <= 1? false:true;
                return {...prev,[user.login]:Limit};
              },{})

              setIsLimit(_isLimit);

        } catch (error) {
            
        }
    }, [request,auth.key]);



    useEffect(() => {
        getUsers();

    },[getUsers]);

    const blockUser = login => {
        let _users = users.map( user => {
            if (user.login === login){
                if(user.blocked === 'false') { 
                    user.blocked = 'true';
                } else {
                    user.blocked = 'false';
                }
            }
            return user;
        })

        setUsers(_users);
    }

    const changePassLimit = (value,login) => {
        if(Number.isInteger(+value) && +value>-1)
        {
            
            let _users = users.map( user => {
              if (user.login === login){
                  user.passLimit = value;
              }
              return user;
            })

            setUsers(_users);
            console.log(users);
        } else {
          alert('Некоректно введены ограничения');
        }
    }

    const changeLimitStatus = (login) => {
        const _isLimit = isLimit;
        _isLimit[login] = !_isLimit[login];
        
        changePassLimit('1',login);
        setIsLimit(_isLimit);

        console.log(isLimit);
        
    }
    const addUserHandler = login => {
      if(login === '') {
        alert('Введите логин пользователя')
      } else {
        const _users = users;
        _users.push({
          login:login,
          passLimit:'1',
          blocked: 'false'
        })
        setUsers(_users);
        setIsLimit({...isLimit,login:false});
        setNewUser('');
      }
    }

    const saveChanges = async () => {
      const isCorrect = users.every(user => { return user.passLimit !== ''})
      console.log('ku');
      if (isCorrect){
        try {

          const data = await request('api/adminPanel/saveChanges','POST',{users,key:auth.key})
          console.log(data);
          alert(data.message);
          
        } catch (error) {
          
        }
      } else {
        alert('Заполните ограничения!');
      }
    }

    const resetData = async () => {
       try {
         const _key = prompt('Введите ключ от базы данных пользователей');

         const data = await request('api/adminPanel/reset','POST',{key:_key})
         if(data.isDone === 'true'){
           alert(data.message);
           auth.logout();
           history.push('/');
         } else {
           alert('Что-то пошло не так')
         }
       } catch (error) {
         
       }
    }
    
   return(
     <div>
          <div className='add-user-wrapper'>
            <p className='parag'>User name:</p>
            <TextField onChange={(e) => {
              setNewUser(e.target.value)
            }}
            value={newUser}
            ></TextField>
            <Button
             onClick={e => {addUserHandler(newUser)}}
            >Add user</Button>
          </div>
         <h1>Users:</h1>
         <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell align="right">Password limit</TableCell>
            <TableCell align="right">isLimit</TableCell>
            <TableCell align="right">Blocked</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.login}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.login}
              </TableCell>
              <TableCell align="right">
                <TextField
                    disabled={!isLimit[user.login]}
                    className='textField-wrapper'
                    value={user.passLimit}
                    onChange={e => {
                      changePassLimit(e.target.value,user.login)
                    }}
                />
              </TableCell>
              <TableCell align="right">
                <Checkbox
                        checked={isLimit[user.login]?true:false}
                        onClick={()=>changeLimitStatus(user.login)}
                ></Checkbox>
              </TableCell>
              <TableCell align="right">
                <Checkbox
                        checked={(user.blocked === 'false')?false:true}
                        onClick={()=>blockUser(user.login)}
                ></Checkbox>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      <div className='margin-wrapper'>
        <Button
        onClick={e => {saveChanges()}}
        >
        Save Changes
        </Button>
        <Button className='reset'
                onClick={()=>{resetData()}}>RESET DATABASE</Button>
      </div>
     </div>
   );
}