import React from "react";
import axios from "./axios.js";
import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            code: "",
            newPassword: "",
            error: false,
            count: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitEmail = this.handleSubmitEmail.bind(this);
        this.handleSubmitCode = this.handleSubmitCode.bind(this);
    }

    handleChange(event) {
        let name = event.target.name;
        let val = event.target.value;
        this.setState({ [name]: val });
        console.log("IMPUTS CHANGING: ", this.state);
    }

    resetError(event) {
        event.preventDefault();
        this.setState({
            error: false,
        });
    }

    handleSubmitEmail(event) {
        event.preventDefault();
        axios
            .post("/password/reset/start", { email: this.state.email })
            .then((response) => {
                this.setState({
                    count: 1,
                });
            })
            .catch((err) => {
                this.setState({
                    error: true,
                });
            });
    }

    handleSubmitCode(event) {
        event.preventDefault();
        axios
            .post("/password/reset/verify", this.state)
            .then((response) => {
                this.setState({
                    count: 2,
                });
            })
            .catch((err) => {
                this.setState({
                    error: true,
                });
            });
    }

    getCurrentDisplay() {
        if (this.state.count === 0) {
            return (
                <div>
                    <h3>Enter your Email</h3>
                    <form onSubmit={(event) => this.handleSubmitEmail(event)}>
                        <input
                            type="email"
                            name="email"
                            onChange={(event) => this.handleChange(event)}
                            placeholder="Email"
                            required
                            onFocus={(event) => this.resetError(event)}
                        />
                        <button>Submit</button>
                    </form>
                    {this.state.error && <p>Email does not exist</p>}
                </div>
            );
        } else if (this.state.count === 1) {
            return (
                <div>
                    <h1>Enter the code and reset your Password</h1>
                    <form onSubmit={(event) => this.handleSubmitCode(event)}>
                        <input
                            type="text"
                            name="code"
                            value={this.state.code}
                            onChange={(event) => this.handleChange(event)}
                            placeholder="Your Code"
                            required
                            onFocus={(event) => this.resetError(event)}
                        />
                        <input
                            type="password"
                            name="newPassword"
                            onChange={(event) => this.handleChange(event)}
                            placeholder="Your New Password"
                            required
                            onFocus={(event) => this.resetError(event)}
                        />
                        <button>Submit</button>
                        {this.state.error && <p>Wrong Code</p>}
                    </form>
                </div>
            );
        } else {
            return (
                <div>
                    <h3>Success!</h3>
                    <p>
                        you can now <Link to="/login">Log in </Link>with your
                        new password
                    </p>
                </div>
            );
        }
    }

    render() {
        return <div>{this.getCurrentDisplay(this.state.count)}</div>;
    }
}
