import React from "react";

export default function ProfilePic(props) {
    console.log("props in ProfilePic: ", props);
    return (
        <div>
            <img
                className="avatar"
                src={props.profilePic}
                onClick={props.openModal}
            />
            <p>
                Name: {props.firstname} Last name: {props.lastname}
            </p>
        </div>
    );
}
