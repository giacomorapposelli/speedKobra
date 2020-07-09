import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            error: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.uploadImg = this.uploadImg.bind(this);
        this.resetError = this.resetError.bind(this);
    }

    handleChange(event) {
        this.setState({
            file: event.target.files[0],
        });
    }

    resetError(event) {
        this.setState({
            error: false,
        });
    }

    uploadImg(event) {
        event.preventDefault();
        var formData = new FormData();
        formData.append("file", this.state.file);

        axios
            .post("/upload", formData)
            .then((result) => {
                console.log("UPLOADING: ", result);
                this.props.setImage(result.data.imgurl);
                this.props.closeModal();
            })
            .catch((err) => {
                this.setState({
                    error: true,
                });
            });
    }

    render() {
        return (
            <div className="modal">
                <h2 className="modal-title">Update your Profile picture!</h2>
                <a id="x-modal" onClick={this.props.closeModal}>
                    X
                </a>
                <form onSubmit={this.uploadImg}>
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={this.handleChange}
                        onFocus={this.resetError}
                    />

                    <button>Submit</button>
                </form>
                {this.state.error && <p>You must insert a picture</p>}
            </div>
        );
    }
}
