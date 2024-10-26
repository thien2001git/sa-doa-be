import BuildConfig from "./src/config/BuildConfig";
import userRouter from "./src/presentation/router/UserRouter";

const express = require("express");
const app = express();
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors');

app.use(
    cors(
        {
            origin: ['*'],
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true
        }
    )
)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", (req, res) => res.send("okok"));
app.use("/user", userRouter)
app.listen(6000, () => console.log("Server ready on port 3000."));

module.exports = app;