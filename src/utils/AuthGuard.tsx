import React, { ReactNode, useEffect, useState } from "react";
import { audience, clientId, domain } from "../env.js";
import { AuthService } from "../services/AuthService.js";
import { RouterError } from "./Errors.ts";
import { AUTH_EVENTS } from '@bcwdev/auth0provider-client';

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
    if (AuthService.state == AUTH_EVENTS.LOADING) {
      return setTimeout(checkUserToken, 500);
    }
    if (!domain || !audience || !clientId) {
      throw new RouterError('[INVALID AUTH SETTINGS]', 'Please update auth keys in env.js', 400)
    }
    const userToken = AuthService.bearer;
    if (!userToken || userToken === 'undefined') {
      setIsLoggedIn(false);
      return AuthService.loginWithRedirect()
    }
    setIsLoggedIn(true);
  }
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);
  return (
    <React.Fragment>
      {
        isLoggedIn ? children : (<div>Loading...</div>)
      }
    </React.Fragment>
  );
}
export default AuthGuard;