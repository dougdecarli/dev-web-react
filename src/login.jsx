import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./base.js";
import { AuthContext } from "./Auth.js";
import { LoginForm } from './components'
import './login.css'

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <main className="content">
      <h1 style={{fontSize: 70}}>Hamburgueria do Guto</h1>
      <h2 className="login-text">Realize seu login</h2>
      <LoginForm onSubmit={handleLogin} />
    </main>
  );
};

export default withRouter(Login);
