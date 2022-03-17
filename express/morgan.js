const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors"); // 같은서버 내에서만 resource 허용 api서버 만들때 많이 사용
const app = express();

// port 성정
app.set("port", process.env.PORT || 3005);
const PORT = app.get("port");

// 미들웨어
app.use(express.static(path.join(__dirname, "/public")));
app.use(morgan("dev")); // 서버 콘솔에 로그 찍기 // combined, tiny, dev, common
app.use(express.json()); // json 으로 데이터 보내주기
//app.use(cors()); // 모든 domain에 허용

app.get("/", (req, res) => {
    res.send("Hello Node");
});
app.get("/parsing", (req, res) => {
    //res.sendFile(path.join(__dirname, "/parsing"));
    res.sendFile(__dirname + "/parsing.html");
});

app.get("/json", (req, res) => {
    res.json([
        { id: "klowon1", age: 33 },
        { id: "aaa", age: 22 },
        { id: "bbb", age: 11 },
        { id: "ccc", age: 19 },
        { id: "ddd", age: 49 },
    ]);
});

app.listen(PORT, () => {
    console.log(PORT, "번에서 서버 실행중");
});
