// import React, { useCallback } from "react";
// import { withRouter } from "react-router";
// import app from "./base";

// const SignUp = ({ history }) => {
//   const handleSignUp = useCallback(async event => {
//     event.preventDefault();
//     const { email, password } = event.target.elements;
//     try {
//       await app
//         .auth()
//         .createUserWithEmailAndPassword(email.value, password.value);
//       history.push("/");
//     } catch (error) {
//       alert(error);
//     }
//   }, [history]);

//   return (
//     <div>
//       <h1>Sign up</h1>
//       <form onSubmit={handleSignUp}>
//         <label>
//           Email
//           <input name="email" type="email" placeholder="Email" />
//         </label>
//         <label>
//           Password
//           <input name="password" type="password" placeholder="Password" />
//         </label>
//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// };

// export default withRouter(SignUp);


import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "./base";
import { RegisterForm } from './components'
import './login.css'

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
