const express = require("express");
const app = express();
const compression = require("compression");
const {
    addUser,
    getEmail,
    addTshirt1,
    addTshirt2,
    addVinyl,
    removeTshirt1,
    removeTshirt2,
    removeVinyl,
} = require("./db");
const { hash, compare } = require("./bc.js");
const cookieSession = require("cookie-session");
const csurf = require("csurf");

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

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/register", (req, res) => {
    console.log(req.body);
    hash(req.body.password)
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

app.post("/addthsirt1", (req, res) => {
    console.log("REQ BODY: ", req.body);
    addTshirt1(req.body.size, req.session.userId)
        .then((result) => {
            console.log("TSHIRT1: ", result.rows);
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("TSHIRT NON INSEITA: ", err);
        });
});

app.post("/addthsirt2", (req, res) => {
    console.log("REQ BODY: ", req.body);
    addTshirt2(req.body.size, req.session.userId)
        .then((result) => {
            console.log("TSHIRT2: ", result.rows);
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("TSHIRT NON INSEITA: ", err);
        });
});

app.post("/addvinyl", (req, res) => {
    console.log("REQ BODY: ", req.body);
    addVinyl(req.body.color, req.session.userId)
        .then((result) => {
            console.log("VINYL: ", result.rows);
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("TSHIRT NOT ADDED: ", err);
        });
});

app.post("/removetshirt1", (req, res) => {
    removeTshirt1(req.session.userId)
        .then((result) => {
            console.log("RESULT SHOULD BE EMPTY: ", result.rows);
            res.json();
        })
        .catch((err) => {
            console.log("TSHIRT NOT REMOVED");
        });
});

app.post("/removetshirt2", (req, res) => {
    removeTshirt2(req.session.userId)
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

app.listen(8080, function () {
    console.log("I'm listening.");
});
