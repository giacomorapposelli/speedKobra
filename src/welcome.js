import React from "react";
import Register from "./register";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";
import ResetPassword from "./reset";

export default function Welcome() {
    return (
        <div className="welcome">
            <div className="palm">
                <h1 className="title">Welcome to Palmbook!</h1>
                <img src="palmbook.png" className="main-img" />
            </div>
            <HashRouter>
                <Route exact path="/" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/reset" component={ResetPassword} />
            </HashRouter>
        </div>
    );
}
