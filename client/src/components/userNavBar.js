import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AuthContext } from '../context/AuthContext';
import {useContext} from 'react';
import {NavLink,useHistory} from 'react-router-dom';

export default function UserAppBar() {

    const auth = useContext(AuthContext);
    const history = useHistory();

    const logoutHandler = e => {
        e.preventDefault();
        auth.logout();
        history.push('/');
    }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {auth.userLogin}
          </Typography>
          <Button color="inherit"><NavLink  to="/userPage">Main</NavLink></Button>
          <Button color="inherit"><NavLink  to="/userChangePass">Change pass</NavLink></Button>
          <Button color="inherit"><a href="/" onClick={logoutHandler}>Logout</a></Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}