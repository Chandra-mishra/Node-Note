import React from 'react';
import { Redirect } from 'react-router-dom';
import userservice from '../services/userService';

export default  class TopContainer extends React.Component{

    constructor(props) {
        super(props);
        this.state = {};
        this.userv = new userservice();
    }

    render() {
        const signout = window.confirm("Do you really want to Sign Out?");
        if(signout === true){
            this.userv.logout();
            return <Redirect to='/login' />;  
        }
        else if(signout === false){
            return <Redirect to= "/userlist" />; 
        }
    }
}