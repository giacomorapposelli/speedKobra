const express = require("express");
const app = express();
const compression = require("compression");
const {
    addUser,
    getEmail,
    checkCode,
    insertCode,
    updatePassword,
    getUser,
    updateImg,
    updateBio,
} = require("./db");
const cookieSession = require("cookie-session");
const { hash, compare } = require("./bc.js");
const csurf = require("csurf");
const { sendEmail } = require("./ses.js");
const cryptoRandomString = require("crypto-random-string");

app.use(express.static(__dirname + "/public"));
app.use(compression());

/////BOILERPLATE //////////
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3");
const { s3Url } = require("./config.json");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

/////////////////////////////

app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(express.json());

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("/user", (req, res) => {
    getUser(req.session.userId)
        .then((result) => {
            console.log("RISULTATO: ", result);
            res.json({
                firstname: result.rows[0].first,
                lastname: result.rows[0].last,
                profilePic: result.rows[0].imgurl,
                draftBio: result.rows[0].bio,
                id: result.rows[0].id,
            });
        })
        .catch((err) => {
            res.sendStatus(500);
            console.log("BIG PROBLEMA: ", err);
        });
});

app.get("/user/:id.json", (req, res) => {
    if (req.session.userId == req.params.id) {
        res.json({ match: true });
    }
    getUser(req.params.id)
        .then((result) => {
            console.log("RISULTATO: ", result);
            res.json({
                firstname: result.rows[0].first,
                lastname: result.rows[0].last,
                profilePic: result.rows[0].imgurl,
                draftBio: result.rows[0].bio,
                id: result.rows[0].id,
            });
        })
        .catch((err) => {
            res.sendStatus(500);
            console.log("BIG PROBLEMA: ", err);
        });
});

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {
    hash(req.body.password)
        .then((hashedPw) => {
            addUser(
                req.body.firstname,
                req.body.lastname,
                req.body.email,
                hashedPw
            )
                .then((result) => {
                    console.log("RESULT: ", result);
                    req.session.userId = result.rows[0].id;
                    res.json();
                })
                .catch((err) => {
                    res.sendStatus(500);
                    console.log("TERROR: ", err);
                });
        })
        .catch((err) => {
            res.sendStatus(500);
            console.log("CHE SUCCEDE? :", err);
        });
});

app.post("/login", (req, res) => {
    getEmail(req.body.email)
        .then((result) => {
            compare(req.body.password, result.rows[0].password)
                .then((checked) => {
                    if (checked) {
                        console.log("CHECK PASSED: ", result.rows[0]);
                        req.session.userId = result.rows[0].id;
                        res.json();
                    } else {
                        res.sendStatus(500);
                    }
                })
                .catch((err) => {
                    res.sendStatus(500);
                    console.log("NO PW MATCH: ", err);
                });
        })
        .catch((err) => {
            res.sendStatus(500);
            console.log("terror: ", err);
        });
});

app.post("/password/reset/start", (req, res) => {
    getEmail(req.body.email)
        .then((result) => {
            if (result.rows[0]) {
                const secretCode = cryptoRandomString({
                    length: 6,
                });
                insertCode(req.body.email, secretCode)
                    .then(() => {
                        sendEmail(
                            req.body.email,
                            "Password Reset",
                            `Here's the code that allows you to reset your password: ${secretCode}`
                        );
                        res.json();
                    })
                    .catch((err) => {
                        res.sendStatus(500);
                        console.log("NO CODE: ", err);
                    });
            } else {
                res.sendStatus(500);
            }
        })
        .catch((err) => {
            res.sendStatus(500);
            console.log("NOT FOUND: ", err);
        });
});

app.post("/password/reset/verify", (req, res) => {
    checkCode(req.body.email)
        .then((result) => {
            console.log("CODE: ", req.body.code);
            console.log("ROW: ", result.rows[0]);
            if (req.body.code === result.rows[result.rows.length - 1].code) {
                hash(req.body.newPassword)
                    .then((hashedPw) => {
                        updatePassword(req.body.email, hashedPw)
                            .then(() => {
                                res.json();
                            })
                            .catch((err) => {
                                res.sendStatus(500);
                                console.log("UPDATING HORROR:", err);
                            });
                    })
                    .catch((err) => {
                        res.sendStatus(500);
                        console.log("???:", err);
                    });
            } else {
                res.sendStatus(500);
                console.log("NO CODE MATCH: ", err);
            }
        })
        .catch((err) => {
            res.sendStatus(500);
            console.log("EMAIL NOT MATCHING: ", err);
        });
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    console.log("FILE:", req.file);
    const imageUrl = `${s3Url}${req.file.filename}`;
    console.log("IMG_URL: ", imageUrl);
    updateImg(req.session.userId, imageUrl)
        .then((result) => {
            console.log("RESULT: ", result);
            res.json(result.rows[0]);
        })
        .catch((err) => {
            res.sendStatus(500);
            console.log("IMG ERROR: ", err);
        });
});

app.post("/bio", (req, res) => {
    if (req.body.bio.trim() == "") {
        res.sendStatus(500);
    }
    updateBio(req.session.userId, req.body.bio)
        .then((result) => {
            console.log("UPDATED BIO: ", result);
            res.json(result.rows[0]);
        })
        .catch((err) => console.log("ERROR IN UPDATE BIO: ", err));
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
