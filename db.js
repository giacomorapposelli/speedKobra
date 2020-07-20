const spicedPg = require("spiced-pg");
const { NamedModulesPlugin } = require("webpack");

let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { dbUser, dbPass } = require("./secrets");
    db = spicedPg(`postgres:${dbUser}:${dbPass}@localhost:5432/social`);
}

exports.addUser = (firstname, lastname, email, password) => {
    if (
        firstname.trim() === "" ||
        lastname.trim() === "" ||
        email.trim() === "" ||
        password.trim() === "'"
    ) {
        return;
    }
    return db.query(
        `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id`,
        [firstname, lastname, email, password]
    );
};

exports.getEmail = (email) => {
    return db.query(
        `
        SELECT * FROM users
        WHERE email = $1
        `,
        [email]
    );
};

exports.insertCode = (email, code) => {
    return db.query(
        `
        INSERT INTO reset_codes (email, code) VALUES ($1, $2) 
        `,
        [email, code]
    );
};

exports.checkCode = (email) => {
    return db.query(
        `
        SELECT * FROM reset_codes
        WHERE email=$1 AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
        `,
        [email]
    );
};

exports.updatePassword = (email, password) => {
    return db.query(
        `
        UPDATE users SET password=$2
        WHERE email=$1
        `,
        [email, password]
    );
};

exports.getUser = (id) => {
    return db.query(
        `
        SELECT * FROM users
        WHERE id=$1
        `,
        [id]
    );
};

exports.updateImg = (id, imgurl) => {
    return db.query(
        `
        UPDATE users 
        SET imgurl=$2
        WHERE id=$1
        RETURNING imgurl
        `,
        [id, imgurl]
    );
};

exports.updateBio = (id, bio) => {
    return db.query(
        `
        UPDATE users
        SET bio=$2
        WHERE id=$1
        RETURNING bio
        `,
        [id, bio]
    );
};

exports.recentUsers = () => {
    return db.query(
        `
        SELECT * FROM users ORDER BY id DESC LIMIT 3
        `
    );
};

exports.findUsers = (val) => {
    return db.query(
        `
        SELECT * FROM users 
        WHERE first ILIKE $1
        OR last ILIKE $1;
        `,
        [val + "%"]
    );
};

exports.getInitialStatus = (myId, otherId) => {
    return db.query(
        `
         SELECT * FROM friendships
         WHERE (receiver_id = $1 AND sender_id = $2)
         OR (receiver_id = $2 AND sender_id = $1);
         `,
        [myId, otherId]
    );
};

exports.sendFrinedRequest = (myId, otherId) => {
    return db.query(
        `
        INSERT INTO friendships
        (sender_id, receiver_id) VALUES ($1, $2)
        RETURNING *
    `,
        [myId, otherId]
    );
};

exports.updatingRequest = (myId, otherId) => {
    return db.query(
        `UPDATE friendships SET accepted=true WHERE receiver_id=$1 AND sender_id=$2 RETURNING *`,
        [otherId, myId]
    );
};

exports.cancelRequest = (myId, otherId) => {
    return db.query(
        `DELETE FROM friendships 
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1);
        `,
        [myId, otherId]
    );
};

exports.getFriends = (myId) => {
    return db.query(
        `
        SELECT users.id, first, last, imgurl, accepted
        FROM friendships
        JOIN users
        ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)
        `,
        [myId]
    );
};

exports.getLastTenMsgs = () => {
    return db.query(
        `
        SELECT users.id, chat.id AS message_id, first, last, imgurl, message, chat.created_at
        FROM chat
        JOIN users ON (sender_id = users.id)
        ORDER BY chat.created_at DESC
        LIMIT 10
        `
    );
};

exports.sendMessage = (msg, myId) => {
    return db.query(
        `
        INSERT INTO chat (message,sender_id) VALUES ($1, $2) RETURNING *
        `,
        [msg, myId]
    );
};

exports.getSendersInfo = (id) => {
    return db.query(
        `
        SELECT users.id, chat.id AS message_id, first, last, imgurl, message, chat.created_at
        FROM chat
        JOIN users on (sender_id = users.id AND sender_id = $1)
        ORDER BY chat.created_at DESC
        `,
        [id]
    );
};

exports.deleteChatHistory = (id) => {
    return db.query(
        `
        DELETE FROM chat WHERE (sender_id = $1);
        `,
        [id]
    );
};

exports.deleteFriendsList = (id) => {
    return db.query(
        `
        DELETE FROM friendships WHERE (sender_id = $1);
        `,
        [id]
    );
};

exports.deleteAccount = (id) => {
    return db.query(
        `
        DELETE FROM users WHERE (id = $1);
        `,
        [id]
    );
};
