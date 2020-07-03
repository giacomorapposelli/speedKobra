const express = require("express");
const app = express();
const compression = require("compression");
const { addUser } = require("./db");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const { hash, compare } = require("./bc.js");

app.use(express.static("./src"));
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

app.use(csurf());

app.use((req, res, next) => {
    res.setHeader("x-frame-option", "deny");
    res.locals.csrfToken = req.csrfToken(); //////for csurf
    next();
});

// app.use(makeCookiesSafe);

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

// app.get("/welcome", (req, res) => {
//     if (req.session.userId) {
//         res.redirect("/");
//     } else {
//         res.sendFile(__dirname + "/index.html");
//     }
// });

app.get("*", function (req, res) {
    // if (!req.session.userId) {
    //     res.redirect("/welcome");
    // }
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
