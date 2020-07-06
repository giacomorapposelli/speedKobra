import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        let name = event.target.name;
        let val = event.target.value;
        this.setState({ [name]: val });
        console.log("IMPUTS CHANGING: ", this.state);
    }

    handleSubmit(event) {
        event.preventDefault();
        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password,
            })
            .then((response) => {
                location.replace("/");
            })
            .catch((err) => {
                this.setState({
                    error: true,
                });
                console.log("error: ", err);
            });
    }
    resetError(event) {
        event.preventDefault();
        this.setState({
            error: false,
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <input
                        type="email"
                        name="email"
                        onChange={(event) => this.handleChange(event)}
                        placeholder="Email"
                        required
                        onFocus={(event) => this.resetError(event)}
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={(event) => this.handleChange(event)}
                        placeholder="Password"
                        required
                        onFocus={(event) => this.resetError(event)}
                    />
                    <button>Log in</button>
                </form>
                {this.state.error && <p>Email or Password aren't correct</p>}
                <Link to="/reset">Forgot password?</Link>
            </div>
        );
    }
}
