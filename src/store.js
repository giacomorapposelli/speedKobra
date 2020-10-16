import React, { useState, useEffect } from "react";
import Items from "./items";
import Register from "./register";
import Login from "./login";
import Edit from "./edit";
import ResetPassword from "./reset";
import axios from "./axios";

export default function Store(props) {
    const [counter, setCounter] = useState(0);
    let userId = false;

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

    useEffect(() => {
        if (userId) setCounter(3);
    });

    return (
        <div className="store" id="store" onMouseOver={props.onMouseOver}>
            <h1 className="headlines" id="store-headline">
                OUR MERCHSTORE
            </h1>
            <div className="store-container">
                {counter == 0 && (
                    <Register setLogin={setLogin} setItems={setItems} />
                )}
                {counter == 1 && (
                    <Login
                        userId={userId}
                        setCounter={setCounter}
                        setRegister={setRegister}
                        setReset={setReset}
                        setItems={setItems}
                    />
                )}
                {counter == 2 && <ResetPassword setLogin={setLogin} />}
                {counter == 3 && <Items setEdit={setEdit} />}
                {counter == 4 && <Edit setItems={setItems} />}
            </div>
        </div>
    );
}
