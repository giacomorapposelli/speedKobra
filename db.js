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
        `INSERT INTO orders (tshirt,size,price,user_id) VALUES ('Harvester of Hate T-shirt',$1,10,$2) RETURNING tshirt,size,price,user_id`,
        [size, userId]
    );
};

exports.addTshirt2 = (size, userId) => {
    return db.query(
        `INSERT INTO orders (tshirt,size,price,user_id) VALUES ('Days Of Madness Longsleeve',$1,10,$2) RETURNING tshirt,size,price,user_id`,
        [size, userId]
    );
};

exports.addVinyl = (color, userId) => {
    return db.query(
        `INSERT INTO orders (vinyl,color,price,user_id) VALUES ('Days Of Madness LP',$1,12,$2) RETURNING vinyl,color,price,user_id`,
        [color, userId]
    );
};

exports.removeTshirt1 = (userId) => {
    return db.query(
        `
        DELETE FROM orders WHERE (tshirt = 'Harvester of Hate T-shirt' AND user_id = $1);
        `,
        [userId]
    );
};

exports.removeTshirt2 = (userId) => {
    return db.query(
        `
        DELETE FROM orders WHERE (tshirt = 'Days Of Madness Longsleeve' AND user_id = $1);
        `,
        [userId]
    );
};

exports.removeVinyl = (userId) => {
    return db.query(
        `
        DELETE FROM orders WHERE (vinyl = 'Days Of Madness LP' AND user_id = $1);
        `,
        [userId]
    );
};
