const express = require("express");
const app = express();
app.set("port", process.env.PORT || 3004);
const PORT = app.get("port");
const requestTime = (req, res, next) => {
    req.requestTime = Date.now();
    next();
};
app.use(requestTime);
app.get("/", (req, res) => {
    const output = `
    나는 문자로 클라이언트에게 응답을 하는 메서드 send()입니다.
    ${req.requestTime}
    `;
    res.send(output);
});

app.listen(PORT, () => {
    console.log(PORT, "번에서 서버 실행중");
});
