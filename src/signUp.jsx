import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "./base";
import { RegisterForm } from './components'
import './pages/login/login.css'

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <main className="content">
      <h1 style={{fontSize: 70}}>Hamburgueria do Guto</h1>
      <h2 className="login-text">Realize seu cadastro</h2>
      <RegisterForm onSubmit={handleSignUp} />
    </main>
  );
};

export default withRouter(SignUp);
