import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Discovery } from "aws-sdk";

export default function Button(props) {
    // console.log("ID: ", props.id);

    const [buttonText, setButtonText] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        axios
            .get("/get-initial-status/" + props.id)
            .then((response) => {
                console.log("RESP: ", response.data);
                if (response.data.friends) {
                    setButtonText("End Friendship");
                } else if (response.data.accept) {
                    setButtonText("Accept Friend Request");
                } else if (response.data.pending) {
                    setButtonText("Cancel Friend Request");
                } else {
                    setButtonText("Make Friend Request");
                }
            })
            .catch((err) => {
                console.log("INITIAL STATUS ERROR: ", err);
            });
    }, []);

    const handleClick = (event) => {
        event.preventDefault();
        if (buttonText == "Make Friend Request") {
            axios
                .post("/make-friend-request/" + props.id)
                .then((response) => {
                    setButtonText("Cancel Friend Request");
                    console.log("FRIEND REQ: ", response.data);
                })
                .catch((err) => {
                    console.log("ERROR", err);
                });
        } else if (
            buttonText == "Cancel Friend Request" ||
            buttonText == "End Friendship"
        ) {
            axios
                .post("/end-friendship/" + props.id)
                .then((response) => {
                    console.log("DELETED: ", response.data);
                    setButtonText("Make Friend Request");
                })
                .catch((err) => console.log("FAILED TO CANCEL: ", err));
        } else {
            axios
                .post("/accept-friend-request/" + props.id)
                .then((response) => {
                    console.log("FRIEND REQUEST ACCEPTED: ", response.data);
                    if (response.data.error) {
                        setError("Something went wrong,please try again");
                    }
                    setButtonText("End Friendship");
                })
                .catch((err) => console.log("ERRORE: ", err));
        }
    };

    return (
        <div>
            <button onClick={handleClick}>{buttonText}</button>
            <p className="error">{error}</p>
        </div>
    );
}
