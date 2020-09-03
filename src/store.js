import React, { useState, useEffect } from "react";
import Items from "./items";
import Register from "./register";
import Login from "./login";
import Edit from "./edit";
import ResetPassword from "./reset";
import { HashRouter, Route } from "react-router-dom";

export default function Store() {
    const [counter, setCounter] = useState(0);

    const setRegister = () => {
        setCounter(0);
    };
    const setLogin = () => {
        setCounter(1);
    };

    const setReset = () => {
        setCounter(2);
    };
    const setItems = () => {
        setCounter(3);
    };
    const setEdit = () => {
        setCounter(4);
        console.log(counter);
    };

    return (
        <div className="store" id="store">
            <h1 className="headlines">OUR MERCHSTORE</h1>
            <div className="store-container">
                {counter == 0 && <Register setLogin={setLogin} />}
                {counter == 1 && (
                    <Login
                        setRegister={setRegister}
                        setReset={setReset}
                        setItems={setItems}
                    />
                )}
                {counter == 2 && <ResetPassword setLogin={setLogin} />}
                {counter == 3 && <Items setEdit={setEdit} />}
                {counter == 4 && <Edit />}
            </div>
        </div>
    );
}
