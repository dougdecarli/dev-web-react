import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./Auth";
import { Main } from './main'
import Login from "./pages/login/login";
import SignUp from "./signUp";
import PrivateRoute from "./PrivateRoute";
import { AppProvider } from './providers'
import { SliderModal } from './components'

const App = () => {
    return (
        <AppProvider>
            <SliderModal />
        <AuthProvider>
        <Router>
            <div>
                <PrivateRoute exact path="/" component={Main} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
            </div>
        </Router>
        </AuthProvider>
        </AppProvider>
    );
};

export default App;