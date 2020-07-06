const express = require("express");
const app = express();
const compression = require("compression");
const {
    addUser,
    getEmail,
    checkCode,
    insertCode,
    updatePassword,
} = require("./db");
const cookieSession = require("cookie-session");
const { hash, compare } = require("./bc.js");
const csurf = require("csurf");
const { sendEmail } = require("./ses.js");
const cryptoRandomString = require("crypto-random-string");

app.use(express.static(__dirname + "/public"));
app.use(compression());

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
            compare(req.body.password, result.rows[0].password).then(
                (checked) => {
                    if (checked) {
                        console.log("CHECK PASSED: ", result.rows[0]);
                        req.session.userId = result.rows[0].id;
                        res.json();
                    } else {
                        res.sendStatus(500);
                    }
                }
            );
        })
        .catch((err) => {
            console.log("terror: ", err);
            res.sendStatus(500);
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
            if (result.rows[0]) {
                console.log("CHECK PASSED: ", result.rows[0]);
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
                        console.log("BOIADIO:", err);
                        console.log("???: ", req.body.password);
                    });
            } else {
                res.sendStatus(500);
                console.log("BOIADIO: ", err);
            }
        })
        .catch((err) => {
            res.sendStatus(500);
            console.log("CODE NOT MATCHING: ", err);
        });
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
