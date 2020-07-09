import React from "react";

export default function ProfilePic(props) {
    console.log("props in ProfilePic: ", props);
    return (
        <div>
            <img
                className="profile-pic"
                src={props.profilePic}
                onClick={props.openModal}
            />
        </div>
    );
}
