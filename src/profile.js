import React from "react";
import ProfilePic from "./profilePic";

export default function Profile(props) {
    console.log("props in Profile: ", props);
    return (
        <div>
            <h1>This is the profile component</h1>

            <ProfilePic
                firstname={props.firstname}
                lastname={props.lastname}
                profilePic={props.profilePic}
                openModal={props.openModal}
                setImage={props.setImage}
            />
        </div>
    );
}
