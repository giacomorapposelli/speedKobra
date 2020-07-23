import React from "react";
import Items from "./items";
import Register from "./register";
import Login from "./login";
// import Cart from "./cart";
import { HashRouter, Route } from "react-router-dom";

export default function Store() {
    return (
        <div className="store" id="store">
            <h1 className="headlines">OUR MERCHANDISE</h1>
            <div className="store-container">
                <HashRouter>
                    <div className="form-container">
                        <Route path="/store" component={Register} />
                        <Route path="/log" component={Login} />
                        <Route path="/cart" component={Items} />
                    </div>
                </HashRouter>
            </div>
        </div>
    );
}

// import React from "react";
// import ReactDOM from "react-dom";
// import Welcome from "./welcome";
// import App from "./app";
// import { init } from "./socket";
// import { createStore, applyMiddleware } from "redux";
// import { Provider } from "react-redux";
// import reduxPromise from "redux-promise";
// import { composeWithDevTools } from "redux-devtools-extension";
// import reducer from "./reducer";

// const store = createStore(
//     reducer,
//     composeWithDevTools(applyMiddleware(reduxPromise))
// );

// let elem;
// const userIsLoggedIn = location.pathname != "/welcome";

// if (userIsLoggedIn) {
//     init(store);
//     elem = (
//         <Provider store={store}>
//             <App />
//         </Provider>
//     );
// } else {
//     elem = <Welcome />;
// }

// ReactDOM.render(elem, document.querySelector("main"));
