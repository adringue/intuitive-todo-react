import React from 'react';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import axios from 'axios';
import {Container, Row, Col} from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import {useAuth} from "../../providers/AuthProvider";
import jwt from 'jsonwebtoken';


const GooLog = () => {
  const authService=useAuth();
  const history = useHistory()


  const responseGoogle = (response) => {
    const backend_token= axios.post("/api/todo/users/verify_google_token",
      {'idtoken':response.tokenId}).then(result=>{
        console.log(result);
        console.log(jwt.decode(response.tokenId));
        authService.setTokenAfterSignInWithGoogle(result.data.jwtGoogleLogin);
          history.push('/enter-todo');
    })
      .catch(error=>{
        if(error){
          history.push('/');
          authService.signOut();
        }
      });

  history.push('/time-line');
    // axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${response.tokenId}`)
    //   .then(result=>console.log(result));
  }
 const responseGoogleFailure=()=>{

 }
  return (
    <Container>
      <Row>
        <Col>
          <Row>
            <Col>
              <GoogleLogin
                clientId="602593263206-0aiir53p3gcjgqrd7bfqeici15aouavo.apps.googleusercontent.com"
                buttonText="Login Using Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogleFailure}
                cookiePolicy={'single_host_origin'}
              />

            </Col>
          </Row>
          <Row>
            <Col>
              {/*<GoogleLogout*/}
              {/*  clientId="602593263206-0aiir53p3gcjgqrd7bfqeici15aouavo.apps.googleusercontent.com"*/}
              {/*  buttonText="Logout"*/}
              {/*  onLogoutSuccess={logout}*/}
              {/*/>*/}
            </Col>
          </Row>

        </Col>

      </Row>

    </Container>

  );
}
export default GooLog
