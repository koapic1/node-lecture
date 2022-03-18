const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
const path = require("path");
const cors = require("cors");
const app = express();
app.set("port", process.env.PORT || 3005);

app.use(morgan("combined"));
app.use(express.json()); // json 리턴
//app.get(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));
const PORT = app.get("port");
app.get("/", (req, res) => {
    res.send("Hello Node");
});
app.get("/result", (req, res) => {
    res.sendFile(__dirname + "/public/html/result.html");
});
app.get("/air", async (req, res) => {
    const city = req.query.city;
    const serviceKey = "eU6AD%2FtbNaHzRst4TWhRt8tTjjVJLaPGVZkIoBRc5pKA1zKLPp%2F3IF05gyeb6plqczg0KHQTZYllJPDpuZ3POA%3D%3D";
    const airUrl = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty";
    let queryParams = "?" + encodeURIComponent("serviceKey") + "=" + serviceKey; /* Service Key*/
    queryParams += "&" + encodeURIComponent("returnType") + "=" + encodeURIComponent("json"); /* */
    queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("100"); /* */
    queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /* */
    queryParams += "&" + encodeURIComponent("sidoName") + "=" + encodeURIComponent(city); /* */
    queryParams += "&" + encodeURIComponent("ver") + "=" + encodeURIComponent("1.0"); /* */
    const url = airUrl + queryParams;
    const result = await axios.get(url);
    console.log(result.data.response.body);
    //res.send("데이터 파싱");
    res.json(result.data.response.body);
});
/*
app.post("/air", async (req, res) => {
    const city = req.body.city;
    const serviceKey = "eU6AD%2FtbNaHzRst4TWhRt8tTjjVJLaPGVZkIoBRc5pKA1zKLPp%2F3IF05gyeb6plqczg0KHQTZYllJPDpuZ3POA%3D%3D";
    const airUrl = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty";
    let queryParams = "?" + encodeURIComponent("serviceKey") + "=" + serviceKey; 
    queryParams += "&" + encodeURIComponent("returnType") + "=" + encodeURIComponent("json");
    queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("100"); 
    queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); 
    queryParams += "&" + encodeURIComponent("sidoName") + "=" + encodeURIComponent("서울"); 
    queryParams += "&" + encodeURIComponent("ver") + "=" + encodeURIComponent("1.0"); 
    const url = airUrl + queryParams;
    const result = await axios.get(url);
    console.log(result.data.response.body);
    //res.send("데이터 파싱");
    res.json(result.data.response.body);
});
*/
app.listen(PORT, () => {
    console.log(PORT, "번에서 서버 실행중");
});
