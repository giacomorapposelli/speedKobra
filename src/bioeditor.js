import React from "react";
import axios from "./axios";

export default class Bioeditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            driftBio: "",
            bioEditorIsVisible: false,
            error: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.uploadBio = this.uploadBio.bind(this);
        this.editBio = this.editBio.bind(this);
        this.getCurrentDisplay = this.getCurrentDisplay.bind(this);
        this.resetError = this.resetError.bind(this);
        this.hideEditor = this.hideEditor.bind(this);
    }

    handleChange(event) {
        console.log("IMPUT CHANGING: ", this.state);
        this.setState({
            draftBio: event.target.value,
        });
    }

    uploadBio() {
        axios
            .post("/bio", { bio: this.state.draftBio })
            .then((response) => {
                console.log("RESP BIO CHANGE: ", response);
                this.props.setBio(this.state.draftBio);
            })
            .catch((err) => {
                this.setState({
                    error: true,
                });
                console.log("WRONG POST: ", err);
            });

        this.setState({
            bioEditorIsVisible: false,
        });
    }

    editBio() {
        this.setState({
            bioEditorIsVisible: true,
            error: false,
        });
    }

    resetError(event) {
        event.preventDefault();
        this.setState({
            error: false,
        });
    }

    hideEditor(event) {
        event.preventDefault();
        this.setState({
            bioEditorIsVisible: false,
        });
    }

    getCurrentDisplay() {
        if (this.state.bioEditorIsVisible) {
            return (
                <div>
                    <textarea
                        onChange={this.handleChange}
                        onFocus={this.resetError}
                    ></textarea>
                    <button onClick={this.hideEditor}>Cancel</button>
                    <button onClick={this.uploadBio}>Save</button>
                </div>
            );
        } else {
            if (this.props.bio) {
                return (
                    <div>
                        <p>{this.props.bio}</p>
                        <button onClick={this.editBio}>Edit your Bio</button>
                    </div>
                );
            } else {
                return (
                    <div>
                        <p>No bio yet</p>
                        <button onClick={this.editBio}>Add your Bio</button>
                    </div>
                );
            }
        }
    }

    render() {
        return (
            <div>
                {this.getCurrentDisplay()}
                {this.state.error && (
                    <p>Something went wrong,please try again</p>
                )}
            </div>
        );
    }
}
