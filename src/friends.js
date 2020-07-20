import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    receiveFriendsWannabes,
    acceptFriendRequest,
    unfriend,
} from "./action";
export default function Friends() {
    const dispatch = useDispatch();
    const friends = useSelector(
        (state) =>
            state.friends &&
            state.friends.filter((each) => each.accepted == true)
    );
    const wannabes = useSelector(
        (state) =>
            state.friends &&
            state.friends.filter((each) => each.accepted == false)
    );

    useEffect(() => {
        dispatch(receiveFriendsWannabes());
    }, []);

    if (!friends || !wannabes) {
        return null;
    }

    return (
        <div className="container">
            <h2 className="heading">
                These people are currently your friends:
            </h2>
            <div className="friends">
                {(friends &&
                    friends.length > 0 &&
                    friends.map((each) => (
                        <div key={each.id} className="user">
                            <Link to={`/user/${each.id}`}>
                                <img
                                    src={each.imgurl || "/notyet.png"}
                                    className="friend-avatar"
                                />
                            </Link>
                            <Link to={`/user/${each.id}`}>
                                <p className="name">
                                    {each.first} {each.last}
                                </p>
                            </Link>
                            <button
                                className="red friend-btn"
                                onClick={() => dispatch(unfriend(each.id))}
                            >
                                End Friendship
                            </button>
                        </div>
                    ))) ||
                    (friends && !friends.length && (
                        <h3 className="friends-error">
                            You have fo friends, you should make some requests!
                        </h3>
                    ))}
            </div>
            <h2 className="heading">These people want to be your friends:</h2>
            <div className="wannabes">
                {(wannabes &&
                    wannabes.length > 0 &&
                    wannabes.map((each) => (
                        <div key={each.id} className="user">
                            <Link to={`/user/${each.id}`}>
                                <img
                                    src={each.imgurl || "/notyet.png"}
                                    className="friend-avatar"
                                />
                            </Link>
                            <Link to={`/user/${each.id}`}>
                                <p className="name">
                                    {each.first} {each.last}
                                </p>
                            </Link>
                            <button
                                className="green friend-btn"
                                onClick={() =>
                                    dispatch(acceptFriendRequest(each.id))
                                }
                            >
                                Accept Friend Request
                            </button>
                        </div>
                    ))) ||
                    (wannabes && !wannabes.length && (
                        <h3 className="friends-error">
                            You have no friend requests
                        </h3>
                    ))}
            </div>
        </div>
    );
}
