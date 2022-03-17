const express = require("express");
const app = express();
app.set("port", process.env.PORT || 3003);
app.get("/", (req, res) => {
    //res.send("<h1>Hello Express</h1>");
    res.sendFile(__dirname + "/index.html");
    console.log("nodemon으로 서버 실행중");
});
app.get("/board", (req, res) => {
    //res.send("<h1>Hello Express</h1>");
    res.sendFile(__dirname + "/board.html");
});
app.get("/user", (req, res) => {
    //res.send("<h1>Hello Express</h1>");
    res.sendFile(__dirname + "/user.html");
});

app.listen(app.get("port"), () => {
    console.log(app.get("port"), "포트에서 서버 실행중");
});
