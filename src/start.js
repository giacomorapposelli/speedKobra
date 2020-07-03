import React from "react";
import ReactDOM from "react-dom";
// import Welcome from "./welcome";

let elem;
if (location.pathname === "/welcome") {
    // runs if user is NOT logged in
    elem = <Welcome />;
} else {
    // runs if the user IS logged in
    elem = <img src="/my-logo.jpg" />;
}

function Welcome(props) {
    return <h1>Welcome to our social network</h1>;
}

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Kitty",
        };
    }
    handleChange(e) {
        this.setState({
            name: e.target.value,
        });
    }
    render() {
        return (
            <div
                className="awesome"
                style={{
                    color: "tomato",
                    textDecoration: "underline",
                }}
            >
                Hello, <Greetee name={this.state.name} />!
                <p>Today is {this.props.day}</p>
                <input name="name" onChange={(e) => this.handleChange(e)} />
                <small>{this.state.name}</small>
            </div>
        );
    }
}

ReactDOM.render(elem, document.querySelector("main"));
