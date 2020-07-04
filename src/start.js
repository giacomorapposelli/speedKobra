import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";

let elem;
if (location.pathname === "/welcome") {
    // runs if user is NOT logged in
    elem = <Welcome />;
} else {
    // runs if the user IS logged in
    elem = <img src="/my-logo.jpg" />;
}

ReactDOM.render(elem, document.querySelector("main"));
