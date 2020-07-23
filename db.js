const spicedPg = require("spiced-pg");
const { NamedModulesPlugin } = require("webpack");

let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { dbUser, dbPass } = require("./secrets");
    db = spicedPg(`postgres:${dbUser}:${dbPass}@localhost:5432/speedkobra`);
}

exports.addUser = (
    firstname,
    lastname,
    email,
    address,
    zip,
    city,
    country,
    password
) => {
    if (
        firstname.trim() === "" ||
        lastname.trim() === "" ||
        email.trim() === "" ||
        address.trim() === "" ||
        zip.trim() === "" ||
        city.trim() === "" ||
        country.trim() === "" ||
        password.trim() === ""
    ) {
        return;
    }
    return db.query(
        `INSERT INTO users (first, last, email, address, zip, city, country, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
        [firstname, lastname, email, address, zip, city, country, password]
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

exports.addTshirt1 = (size, userId) => {
    return db.query(
        `INSERT INTO orders (tshirt,size,price,user_id) VALUES ('days',$1,10,$2) RETURNING tshirt,size,price,user_id`,
        [size, userId]
    );
};

exports.addTshirt2 = (size, userId) => {
    return db.query(
        `INSERT INTO orders (tshirt,size,price,user_id) VALUES ('train',$1,10,$2) RETURNING tshirt,size,price,user_id`,
        [size, userId]
    );
};

exports.addVinyl = (size, userId) => {
    return db.query(
        `INSERT INTO orders (vinyl,color,price,user_id) VALUES ('daysofmadness',$1,12,$2) RETURNING vinyl,color,price,user_id`,
        [size, userId]
    );
};
