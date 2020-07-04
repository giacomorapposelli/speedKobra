import React from "react";
import axios from "axios";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            error: false,
        };
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
            .post("/register", {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
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
                console.log("ERROR: ", err);
            });
    }

    render() {
        return (
            <div>
                <form>
                    <input
                        type="text"
                        name="firstname"
                        onChange={(event) => this.handleChange(event)}
                        placeholder="First Name"
                        value={this.state.value}
                    />
                    <input
                        type="text"
                        name="lastname"
                        onChange={(event) => this.handleChange(event)}
                        placeholder="Last Name"
                        value={this.state.value}
                    />
                    <input
                        type="email"
                        name="email"
                        onChange={(event) => this.handleChange(event)}
                        placeholder="Email"
                        value={this.state.value}
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={(event) => this.handleChange(event)}
                        placeholder="Password"
                        value={this.state.value}
                    />
                    <button onClick={(event) => this.handleSubmit(event)}>
                        Register
                    </button>
                </form>
                {this.state.error && (
                    <p>Something went wrong,please try again</p>
                )}
            </div>
        );
    }
}
