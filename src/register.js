import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            error: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetError = this.resetError.bind(this);
    }

    handleChange(event) {
        const self = this;
        let name = event.target.name;
        let val = event.target.value;
        self.setState({ [name]: val });
        console.log("IMPUTS CHANGING: ", this.state);
    }

    handleSubmit(event) {
        event.preventDefault();

        axios
            .post("/register", this.state)
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
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="firstname"
                        onChange={this.handleChange}
                        placeholder="First Name"
                        required
                        onFocus={this.resetError}
                    />
                    <input
                        type="text"
                        name="lastname"
                        onChange={this.handleChange}
                        placeholder="Last Name"
                        required
                        onFocus={this.resetError}
                    />
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
                    <button>Register</button>
                    <p>
                        Already a member?
                        <Link to="/login">Log in</Link>
                    </p>
                </form>
                {this.state.error && (
                    <p>Something went wrong,please try again</p>
                )}
            </div>
        );
    }
}
