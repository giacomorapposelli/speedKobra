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

exports.updatePassword = (email, pass) => {
    return db.query(
        `
        UPDATE users SET password=$2
        WHERE email=$1
        `,
        [email, pass]
    );
};
