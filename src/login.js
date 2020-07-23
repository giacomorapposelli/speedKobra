import React from "react";
import axios from "./axios";

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
        this.resetError = this.resetError.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        console.log("IMPUTS CHANGING: ", this.state);
    }

    handleSubmit(event) {
        event.preventDefault();
        axios
            .post("/login", this.state)
            .then((response) => {
                location.replace("/#/cart");
                // this.setState({ success: true });
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
                <h2>Log in:</h2>
                <form onSubmit={this.handleSubmit} className="input-fields">
                    <input
                        type="email"
                        name="email"
                        onChange={this.handleChange}
                        placeholder="Email"
                        required
                        onFocus={this.resetError}
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={this.handleChange}
                        placeholder="Password"
                        required
                        onFocus={this.resetError}
                    />
                    <button>Log in</button>
                </form>

                {this.state.error && (
                    <p className="error">Email or Password aren't correct</p>
                )}
                {this.state.success && <p className="success">LOGIN SUCCES</p>}
            </div>
        );
    }
}
