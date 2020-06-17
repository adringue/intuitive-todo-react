

import React, {useContext} from 'react'
import {userLogin, userAuthenticated, setUserEmail, setUserID, saveStateToServer} from "../redux";
import jwt from 'jsonwebtoken';
import {connect} from "react-redux";
import * as moment from "moment";
// import { gapi } from 'gapi-script';


const {createContext} =React;
const AuthContext=createContext(null);

 const AuthBaseProvider=(props)=>{

   console.log(props.children);
   const checkAuthState=()=>{
     const decodedToken=decodeToken(getToken());
     if(decodedToken && moment().isBefore(getExpiration(decodedToken))){
       props.dispatch(userAuthenticated(decodedToken));

     }

   }
   const isAuthenticated=()=>{
     const decodedToken=decodeToken(getToken());
     return decodedToken && isTokenValid(decodedToken);
   }
   const isTokenValid=(decodedToken)=>{
     return decodeToken && moment().isBefore(getExpiration(decodedToken));
   }
   const getExpiration=(decodedToken)=>{
     return moment.unix(decodedToken.exp);//time in ms
   }
   //////////////////////////
   const getUserId=()=>{
     return decodeToken(getToken()).userId;
   }
 const getToken=()=>{
     return localStorage.getItem('todo_login_token');
 }
 ////////////////////////////////
  const decodeToken=token=>{
    return jwt.decode(token);
  }
  ///////////////////////////////
   const signOut=()=>{
     // saveStateToServer()();
     localStorage.removeItem('todo_login_token');
     if(window.gapi.auth2) {
       const auth2 = window.gapi.auth2.getAuthInstance();
       auth2.signOut().then(() => {
       });
       auth2.disconnect();
     }
     props.dispatch({type:'USER_SIGNED_OUT'})
   }
////////////////////////////////////////
  const signIn = (loginData) => {
    return userLogin(loginData)
      .then(token=>{
        localStorage.setItem('todo_login_token',token)
        const decodedToken=decodeToken(token);
        console.log(decodedToken);
        props.dispatch(userAuthenticated(decodedToken));
        props.dispatch(setUserID(decodedToken));
        return token;
      })
  };
   const setTokenAfterSignInWithGoogle=(token)=>{
     localStorage.setItem('todo_login_token',token)
     const decodedToken=decodeToken(token);
     props.dispatch(userAuthenticated(decodedToken));
     return token;

   }
   ///////////////////////////////
  const authApi={
    signIn,
    checkAuthState,
    signOut,
    isAuthenticated,
    setTokenAfterSignInWithGoogle,
    getUserId
  }
  ///////////////////////
  return (
    <AuthContext.Provider value={authApi}>
      {props.children}
    </AuthContext.Provider>

  )

/// call dans App.js pour provide authApi dans tous les components

}

export const AuthProvider=connect()(AuthBaseProvider);


 ////////////////////////////////////
//// call dans tous les components(functional component) qui veulent acceder au provided object

 export const useAuth=()=>{
   return useContext(AuthContext);
 }



//// call dans tous les components(class component) qui veulent acceder au provided object
export const withAuth=(Component)=>{
   // props is always what parent or high order component is passing to children component
  return  function(props){
    return(
      <AuthContext.Consumer>
        {/*in this case we are passing only authApi, we could have passed multiple function??*/}
        {authApi=><Component {...props} auth={authApi}/>}
      </AuthContext.Consumer>
    )
  }
}
