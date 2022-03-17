const express = require("express");
const path = require("path");
const app = express();
app.set("port", process.env.PORT || 3005);
const PORT = app.get("port");
//app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(__dirname + "/public"));
const myLogger = function (req, res, next) {
    console.log("Test MiddleWare");
    next();
};
app.use(myLogger);

app.get("/", (req, res, next) => {
    res.send("Hello Node");
    next();
});

app.listen(PORT, () => {
    "번 포트에서 서버 실행중";
});
