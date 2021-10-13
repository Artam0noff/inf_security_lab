import React from "react";
import {Switch, Route} from 'react-router-dom';
import { AdminPanel } from "./pages/adminMainPage";
import { UserPage } from "./pages/userPage";
import { AuthPage } from "./pages/authPage";
import { ChangePassWindow } from './pages/changePassPage';
import { Redirect } from "react-router";
import { UsersPage } from "./pages/usersControlPage";
import { ChangePassComponent } from "./components/changePass";
import { ChangeKeyComponent } from "./components/changeKey";
import { KeyPage } from "./pages/keyPage";


export const useRoutes = (isAuthenticated, isAdmin,isValidPass,access) => {

    if(isAuthenticated && isAdmin && isValidPass){
        return(
            <Switch>
                <Route path="/adminMainPage" exact>
                    <AdminPanel></AdminPanel>
                </Route>
                <Route path="/users" exact>
                    <UsersPage></UsersPage>
                </Route>
                <Route path='/adminChangePass'>
                    <ChangePassComponent/>
                </Route>
                <Route path='/adminChangeKey'>
                    <ChangeKeyComponent/>
                </Route>
                <Redirect to='/adminMainPage'></Redirect> 
            </Switch>
        )
    } else if (isAuthenticated && isValidPass){
    return( 
            <Switch>
                <Route path="/userPage" exact>
                    <UserPage></UserPage>
                </Route>
                <Route path="/userChangePass" exact>
                    <ChangePassComponent/>
                </Route>
                <Redirect to='/userPage'/>
            </Switch>
           )
    } else if ( isAuthenticated) {
        return( 
            <Switch>
                <Route path="/changePass" exact>
                    <ChangePassWindow/>
                </Route>
                <Redirect to='/changePass'/>
            </Switch>
           )        
    }

    if (access) {
        return (
            <Switch>
                <Route path='/' exact>
                    <AuthPage></AuthPage>
                </Route>
                <Redirect to='/' />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/access' exact>
                <KeyPage></KeyPage>
            </Route>
            <Redirect to='/access' />
        </Switch>
    )
}