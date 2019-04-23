const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");

const app = express();

// BodyParser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

// DB Condig
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
    .connect(db,
        { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.log(err));

// Passort middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

//Serve static assests if in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const port = process.env.PORT || 5000; // process.env.port is Heroku's port

app.listen(port, () => console.log(`🌎  running on port ${port} !`));
