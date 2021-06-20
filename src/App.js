import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./Auth";
import { Main } from './main'
import Login from "./login";
import SignUp from "./signUp";
import PrivateRoute from "./PrivateRoute";

const App = () => {
    return (
        <AuthProvider>
        <Router>
            <div>
                <PrivateRoute exact path="/" component={Main} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
            </div>
        </Router>
        </AuthProvider>
    );
};

export default App;