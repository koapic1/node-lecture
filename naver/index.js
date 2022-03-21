const express = require("express");
const morgan = require("morgan");
const path = require("path");
const axios = require("axios");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
app.set("port", process.env.PORT || 3000);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public"))); // 정적 파일

const PORT = app.get("port");
const clientID = process.env.clientID;
const clientSecret = process.env.clientSecret;

console.log(clientID);
console.log(clientSecret);

app.get("/", (req, res) => {
  //send 문자로 리턴하기.
  //sendFile 파일로 리턴하기
  //json은 json으로 리턴하기
  //render 는 템플릿 엔진(view page로 리턴하기)
  res.send("<h1>Hello Node</h1>");
});
app.get("/result/news", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/html/result_news.html"));
});
app.get("/result/movie", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/html/result_movie.html"));
});
app.get("/result/images", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/html/result_images.html"));
});

app.get("/naver/news", async (req, res) => {
  const start = req.query.start || 1;
  const searchWord = req.query.searchWord || "코로나";
  //console.log(searchWord);

  const url = "https://openapi.naver.com/v1/search/news.json?query=" + encodeURI(searchWord) + "&start=" + start;
  const headers = { "X-Naver-Client-Id": clientID, "X-Naver-Client-Secret": clientSecret };
  const result = await axios.get(url, { headers });
  console.log(result.data);
  //res.json({ news: result.data.items });
  res.json(result.data.items);
});

app.get("/naver/movie", async (req, res) => {
  const start = req.query.start || 1;
  const searchWord = req.query.searchWord || "밀정";
  //console.log(searchWord);

  const url = "https://openapi.naver.com/v1/search/movie.json?query=" + encodeURI(searchWord) + "&start=" + start;
  const headers = { "X-Naver-Client-Id": clientID, "X-Naver-Client-Secret": clientSecret };
  const result = await axios.get(url, { headers });
  console.log(result.data);
  //res.json({ news: result.data.items });
  //res.json({ total: result.data.total, items: result.data.items });
  res.json(result.data);
});
app.get("/naver/images", async (req, res) => {
  const start = req.query.start || 1;
  const searchWord = req.query.searchWord || "전지현";
  //console.log(searchWord);

  const url = "https://openapi.naver.com/v1/search/image.json?query=" + encodeURI(searchWord) + "&start=" + start + "&display=50";
  const headers = { "X-Naver-Client-Id": clientID, "X-Naver-Client-Secret": clientSecret };
  const result = await axios.get(url, { headers });
  console.log(result.data);
  //res.json({ news: result.data.items });
  //res.json({ total: result.data.total, items: result.data.items });
  res.json(result.data);
});

app.listen(PORT, () => {
  console.log(PORT, "번에서 서버 실행중");
});
