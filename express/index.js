const express = require("express");
const app = express();
app.set("port", process.env.PORT || 3003);

app.use(express.static(__dirname + "/public")); // 정적 파일들 관리

app.get("/", (req, res) => {
    //res.send("<h1>Hello Express</h1>");
    res.sendFile(__dirname + "/index.html");
    //console.log("nodemon으로 서버 실행중");
    /*
    const output = `
    <h1>INDEX</h1>
    <p>Index.html 입니다.</p>
    <ul>
        <li><a href="/">Index</a></li>
        <li><a href="/board">Board</a></li>
        <li><a href="/user">User</a></li>
    </ul>
    <img src = ./node.png />
    `;
    res.send(output);
    */
});
app.get("/board", (req, res) => {
    //res.send("<h1>Hello Express</h1>");
    res.sendFile(__dirname + "/board.html");
});
app.get("/user/:id", (req, res) => {
    //res.send("<h1>Hello Express</h1>");
    //res.sendFile(__dirname + "/user.html");
    console.log(req.params.id);
    console.log(req.url);
    res.send(req.params.id + "님 안녕하세요");
});

app.listen(app.get("port"), () => {
    console.log(app.get("port"), "포트에서 서버 실행중");
});
