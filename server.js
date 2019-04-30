const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const logger = require("morgan");
const passport = require("passport");
const path = require("path");

// const users = require("./routes/api/users");
const routes = require("./routes");

const app = express();


// Use morger logger to track logging requests
app.use(logger("dev"));

// parsing middleware
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// DB Config
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
app.use(routes); 

//Serve static assests if in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
};

const port = process.env.PORT || 5000; // process.env.port is Heroku's port

app.listen(port, () => console.log(`🌎  running on port ${port} !`));
