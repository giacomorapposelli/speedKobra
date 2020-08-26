import React from "react";
import Items from "./items";
import Register from "./register";
import Login from "./login";
import Edit from "./edit";
import ResetPassword from "./reset";
import { HashRouter, Route } from "react-router-dom";

export default function Store() {
    return (
        <div className="store" id="store">
            <h1 className="headlines">OUR MERCHSTORE</h1>
            <div className="store-container">
                <HashRouter>
                    <Route path="/log" component={Login} />
                    <Route path="/store" component={Register} />
                    <Route path="/cart" component={Items} />
                    <Route path="/reset" component={ResetPassword} />
                    <Route path="/edit" component={Edit} />
                </HashRouter>
            </div>
        </div>
    );
}
