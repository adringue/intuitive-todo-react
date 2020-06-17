import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {useAuth} from "../../providers/AuthProvider";



const AuthRoute=({children, ...rest})=>{

  const authService=useAuth();
   const onlyChild=React.Children.only(children);   // should generated a warning if we are trying to pass more than on child
  return(
   <Route {...rest} render={(props)=>authService.isAuthenticated()?
     React.cloneElement(onlyChild,{...rest,...props}):
   <Redirect to={{pathname: "/"}}/>}/>)
}
export default AuthRoute
