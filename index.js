const express = require("express");
const app = express();
const compression = require("compression");
const {
    addUser,
    getEmail,
    addTshirt,
    addLongsleeve,
    addVinyl,
    removeItem,
    submitOrder,
    insertCode,
    checkCode,
    updatePassword,
} = require("./db");
const { hash, compare } = require("./bc.js");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const { sendEmail } = require("./ses.js");
const { ElastiCache } = require("aws-sdk");
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

app.get("/#/store", (req, res) => {
    if (req.session.userId) {
        res.redirect("/#/cart");
    } else {
        res.redirect("/#/store");
    }
});

app.get("/order", (req, res) => {
    submitOrder(req.session.userId)
        .then((result) => {
            let items = [];
            result.rows.map((each) => {
                if (!each.vinyl) {
                    delete each.vinyl;
                }
                if (!each.color) {
                    delete each.color;
                }
                if (!each.tshirt) {
                    delete each.tshirt;
                }
                if (!each.size) {
                    delete each.size;
                }
                items.push(each.vinyl);
                items.push(each.color);
                items.push(each.tshirt);
                items.push(each.size);
                items.push(each.price + "€  ");
                return items;
            });

            sendEmail(
                "rapposelli.giacomo@gmail.com",
                "We have a new Order!",
                ` 
                Order Code: ${orderCode}
                ${result.rows[0].email}

                ${items.join(" ")}                    
                Ship to:
                ${result.rows[0].first} ${
                    result.rows[0].last
                }                                       
                ${result.rows[0].address}
                ${result.rows[0].zip},${result.rows[0].city}
                ${result.rows[0].country}`
            );

            console.log("ORDER: ", result.rows);
            res.json(result.rows);
        })
        .catch((err) => console.log("ERR IN ORDER: ", err));
});

const orderCode = cryptoRandomString({
    length: 6,
});

app.get("/code", (req, res) => {
    console.log("ORDER CODE: ", orderCode);
    res.json({ orderCode });
});

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/register", (req, res) => {
    if (req.body.password1 == req.body.password2) {
        hash(req.body.password1)
            .then((hashedPw) => {
                addUser(
                    req.body.firstname,
                    req.body.lastname,
                    req.body.email,
                    req.body.address,
                    req.body.zip,
                    req.body.city,
                    req.body.country,
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
    } else {
        res.json({ noMatch: true });
    }
});

app.post("/login", (req, res) => {
    getEmail(req.body.email)
        .then((result) => {
            compare(req.body.password, result.rows[0].password)
                .then((checked) => {
                    if (checked) {
                        console.log("CHECK PASSED: ", result.rows[0]);
                        req.session.userId = result.rows[0].id;
                        console.log("USER ID: ", req.session.userId);
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

app.post("/addthsirt", (req, res) => {
    console.log("REQ BODY: ", req.body);
    addTshirt(req.body.size, req.session.userId)
        .then((result) => {
            res.json(result.rows[0]);
            console.log("TSHIRT: ", result.rows);
        })
        .catch((err) => {
            console.log("TSHIRT NON INSEITA: ", err);
        });
});

app.post("/addlongsleeve", (req, res) => {
    console.log("REQ BODY: ", req.body);
    addLongsleeve(req.body.size, req.session.userId)
        .then((result) => {
            console.log("LONGSLEEVE: ", result.rows);
            res.json(result.rows[0]);
        })
        .catch((err) => {
            console.log("TSHIRT NON INSEITA: ", err);
        });
});

app.post("/addvinyl", (req, res) => {
    console.log("REQ BODY: ", req.body);
    if (req.body.color == "Red") {
        req.body.imgurl = "vinyl-red.jpg";
    } else if (req.body.color == "Green") {
        req.body.imgurl = "vinyl-green.jpg";
    } else if (req.body.color == "Blue") {
        req.body.imgurl = "vinyl-blue.jpg";
    } else {
        req.body.imgurl = "vinyl-light.jpg";
    }
    addVinyl(req.body.color, req.body.imgurl, req.session.userId)
        .then((result) => {
            console.log("VINYL: ", result.rows);
            res.json(result.rows[0]);
        })
        .catch((err) => {
            console.log("TSHIRT NOT ADDED: ", err);
        });
});

app.post("/removeitem", (req, res) => {
    console.log("IDDDDD: ", req.body.itemId);
    removeItem(req.body.itemId)
        .then((result) => {
            console.log("RESULT SHOULD BE EMPTY: ", result.rows);
            res.json();
        })
        .catch((err) => {
            console.log("TSHIRT NOT REMOVED");
        });
});

app.post("/removelongsleeve", (req, res) => {
    removeLongsleeve(req.session.userId)
        .then((result) => {
            console.log("RESULT SHOULD BE EMPTY: ", result.rows);
            res.json();
        })
        .catch((err) => {
            console.log("TSHIRT NOT REMOVED");
        });
});

app.post("/removevinyl", (req, res) => {
    removeVinyl(req.session.userId)
        .then((result) => {
            console.log("RESULT SHOULD BE EMPTY: ", result.rows);
            res.json();
        })
        .catch((err) => {
            console.log("VINYL NOT REMOVED");
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
            if (req.body.code === result.rows[result.rows.length - 1].code) {
                if (req.body.newPassword === req.body.newPassword2) {
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
                            console.log("???:", err);
                        });
                } else {
                    res.json({ noMatch: true });
                }
            } else {
                res.sendStatus(500);
                console.log("NO CODE MATCH: ");
            }
        })
        .catch((err) => {
            res.sendStatus(500);
            console.log("EMAIL NOT MATCHING: ", err);
        });
});

app.listen(process.env.PORT || 8080, () => console.log("server listening"));
