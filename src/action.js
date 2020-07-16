import axios from "./axios";

export async function receiveFriendsWannabes() {
    const { data } = await axios.get("/friends-wannabes");
    console.log("DATA: ", data);
    return {
        type: "RECEIVE_FRIENDS_WANNABES",
        friends: data,
    };
}

export async function acceptFriendRequest(id) {
    await axios.post(`/accept-friend-request/${id}`);
    return {
        type: "ACCEPT_FRIENDS_REQUEST",
        id,
    };
}

export async function unfriend(id) {
    await axios.post(`/end-friendship/${id}`);
    return {
        type: "UNFRIEND",
        id,
    };
}
