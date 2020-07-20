const express = require("express");
const app = express();
const compression = require("compression");
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });
const {
    addUser,
    getEmail,
    checkCode,
    insertCode,
    updatePassword,
    getUser,
    updateImg,
    updateBio,
    findUsers,
    recentUsers,
    getInitialStatus,
    cancelRequest,
    updatingRequest,
    sendFrinedRequest,
    getFriends,
    getLastTenMsgs,
    sendMessage,
    getSendersInfo,
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

// app.use(
//     cookieSession({
//         secret: `I'm always angry.`,
//         maxAge: 1000 * 60 * 60 * 24 * 14,
//     })
// );

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

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

app.get("/users", (req, res) => {
    recentUsers()
        .then((result) => {
            console.log("USERS FOUND: ", result.rows);
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("ERR IN FINDING PEOPLE: ", err);
        });
});

app.get("/results/:search.json", (req, res) => {
    findUsers(req.params.search)
        .then((result) => {
            console.log("SEARCH: ", result.rows);
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("ERR", err);
        });
});

app.get("/get-initial-status/:id", (req, res) => {
    getInitialStatus(req.session.userId, req.params.id)
        .then((result) => {
            console.log("INITIAL STATUS: ", result.rows[0]);
            if (result.rows[0]) {
                if (result.rows[0].accepted) {
                    res.json({ friends: true });
                } else {
                    if (req.session.userId == result.rows[0].receiver_id) {
                        res.json({ accept: true });
                    } else {
                        res.json({ pending: true });
                    }
                }
            } else {
                res.json({ friends: false });
            }
        })
        .catch((err) => {
            console.log("ERROR INITIAL STATUS: ", err);
        });
});

app.get("/friends-wannabes", (req, res) => {
    getFriends(req.session.userId)
        .then((result) => {
            console.log("FRIENDS AND WANNABES: ", result.rows);
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("NO FRIENDS: ", err);
            res.json({ error: true });
        });
});

app.get("/logout", (req, res) => {
    req.session.userId = null;
    res.redirect("/");
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

app.post("/make-friend-request/:id", (req, res) => {
    sendFrinedRequest(req.session.userId, req.params.id)
        .then((result) => {
            console.log("RESULT FRIEND REQ: ", result.rows);
            res.json({ pending: true });
        })
        .catch((err) => {
            res.sendStatus(500);
            console.log("FRIEND REQUEST ERROR: ", err);
        });
});

app.post("/accept-friend-request/:id", (req, res) => {
    updatingRequest(req.params.id, req.session.userId)
        .then((result) => {
            console.log("RESULT FRIEND REQ: ", result.rows[0].accepted);
            res.json({ friends: true });
        })
        .catch((err) => {
            console.log("NO ACCEPT: ", err);
            res.json({ error: true });
            res.sendStatus(500);
        });
});

app.post("/end-friendship/:id", (req, res) => {
    cancelRequest(req.session.userId, req.params.id)
        .then((result) => {
            console.log("RESULT SHOULD BE UNDEFINED: ", result.rows[0]);
            res.json({ friends: false });
        })
        .catch((err) => {
            console.log("UNFRIEND ERROR: ", err);
            res.sendStatus(500);
        });
});

server.listen(8080, function () {
    console.log("I'm listening.");
});

io.on("connection", async (socket) => {
    console.log(`socket with id ${socket.id} just CONNECTED!`);
    const userId = socket.request.session.userId;

    if (!userId) {
        return socket.disconnect(true);
    }

    getLastTenMsgs().then((result) => {
        io.sockets.emit("chatMessages", result.rows);
        console.log("LAST 10 MSGS: ", result.rows);
    });

    socket.on("My amazing chat message", (newMsg) => {
        sendMessage(newMsg, userId).then((result) => {
            console.log("MESSAGE SENT: ", result.rows[0]);
            getSendersInfo(userId).then((result) => {
                console.log("SENDERER: ", result.rows[0]);
                io.sockets.emit("chatMessage", result.rows[0]);
            });
        });
    });
});
