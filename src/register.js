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
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <input
                        type="text"
                        name="firstname"
                        onChange={(event) => this.handleChange(event)}
                        placeholder="First Name"
                        required
                        onFocus={(event) => this.resetError(event)}
                    />
                    <input
                        type="text"
                        name="lastname"
                        onChange={(event) => this.handleChange(event)}
                        placeholder="Last Name"
                        required
                        onFocus={(event) => this.resetError(event)}
                    />
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
                    <button>Register</button>
                </form>
                {this.state.error && (
                    <p>Something went wrong,please try again</p>
                )}
                <p>
                    Already a member?
                    <Link to="/login">Log in</Link>
                </p>
            </div>
        );
    }
}
