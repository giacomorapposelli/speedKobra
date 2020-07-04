const express = require("express");
const app = express();
const compression = require("compression");
const { addUser } = require("./db");
const cookieSession = require("cookie-session");
const { hash, compare } = require("./bc.js");

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
    if (
        req.body.password != "" &&
        req.body.firstname != "" &&
        req.body.lastname != "" &&
        req.body.email != ""
    ) {
        return hash(req.body.password)
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
                        res.json();
                        console.log("TERROR: ", err);
                    });
            })
            .catch((err) => {
                console.log("CHE SUCCEDE? :", err);
            });
    } else {
        res.json(err);
    }
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
