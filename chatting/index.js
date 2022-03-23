const express = require("express");
const path = require("path");
const http = require("http");
const moment = require("moment");
const app = express();
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server);

app.set("port", process.env.PORT || 3000);
const PORT = app.get("port");

io.on("connection", (socket) => {
    console.log("connected");
    socket.on("chatting", (data) => {
        console.log(data);
        //io.emit("chatting", { name: "나는 서버", msg: "나는 서버에서 보내는 메세지" });
        io.emit("chatting", { name: data.name, msg: data.msg, time: moment(new Date()).format("A hh:mm") });
    });
});

app.get("/", (req, res) => {
    res.send("<h1>Hello Node</h1>");
});
app.get("/chatting/chatting", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/chatting.html"));
});
app.use(express.static(path.join(__dirname, "/public")));

server.listen(PORT, () => {
    console.log(PORT, "번에서 서버 실행중");
});
