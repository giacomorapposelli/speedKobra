import React from "react";
import Register from "./register";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";
import ResetPassword from "./reset";

export default function Welcome() {
    return (
        <div id="welcome">
            <h1>Welcome to our social network!</h1>
            <img src="/logo.png" />
            <HashRouter>
                <div>
                    <Route exact path="/" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset" component={ResetPassword} />
                </div>
            </HashRouter>
        </div>
    );
}
