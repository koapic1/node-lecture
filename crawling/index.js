const express = require("express");
const morgan = require("morgan");
const path = require("path");
const axios = require("axios");
const dotenv = require("dotenv");
const cheerio = require("cheerio");

const app = express();
dotenv.config();
app.set("port", process.env.PORT || 3001);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));
const PORT = app.get("port");

app.get("/", (req, res) => {
    res.send("<h1>Hello Node</h1>");
});

app.get("/daum/news", (req, res) => {
    //res.send("다음에서 뉴스 크롤링해서 뿌려줄 예정");
    const getHtml = async () => {
        try {
            return await axios.get("https://news.daum.net/"); // promise
        } catch (error) {
            console.error(error);
        }
    };
    // promise then(), catch()
    getHtml().then((html) => {
        let returnNewsList = [];
        //console.log(res);
        const $ = cheerio.load(html.data);
        const getNewsList = $("ul.list_newsissue").children("li");
        //console.log(getNewsList);

        // arrow function = this 를 binding 하지 않음
        // getNewsList.each(function (idx, item) {
        //     //console.log(item);
        //     returnNewsList.push({
        //         news: $(this).find("a").text(),
        //         url: $(this).find("a").attr("href"),
        //         img: $(this).find("a img").attr("src"),
        //     });
        // });

        getNewsList.each((idx, item) => {
            //console.log(item);
            returnNewsList.push({
                news: $(item).find("a").text().replaceAll("\n", "").trim(),
                url: $(item).find("a").attr("href"),
                img: $(item).find("a img").attr("src"),
            });
        });
        res.json(returnNewsList);
    });
});
app.get("/result/daum_news", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/result_daum_news.html"));
});
app.listen(PORT, () => {
    console.log(PORT, "번에서 서버 실행중");
});
