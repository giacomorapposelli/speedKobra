export default function (state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS_WANNABES") {
        state = Object.assign({}, state, {
            friends: action.friends,
        });
    }
    if (action.type == "ACCEPT_FRIENDS_REQUEST") {
        let newFriends = [];
        state.friends.map((each) => {
            if (each.id == action.id) {
                each.accepted = true;
            }
            newFriends.push(each);
        });
        state = Object.assign({}, state, {
            friends: newFriends,
        });
    }
    if (action.type == "UNFRIEND") {
        state = Object.assign({}, state, {
            friends: state.friends.filter((each) => {
                return each.id != action.id;
            }),
        });
    }

    return state;
}
