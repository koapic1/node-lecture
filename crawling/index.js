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
app.use(express.static(path.join(__dirname, "/public"))); // 정적파일 서비스 (public 폴더를 사용하겠다.)
const PORT = app.get("port");

app.get("/", (req, res) => {
    res.send("<h1>Hello Node</h1>");
});

app.get("/gmarket/superdeal", (req, res) => {
    const getHtml = async () => {
        try {
            return await axios.get("http://corners.gmarket.co.kr/SuperDeals"); // promise
        } catch (error) {
            console.error(error);
        }
    };
    getHtml().then((html) => {
        let productList = [];
        //console.log(res);
        const $ = cheerio.load(html.data); // cheerio는 외부 html을 긁어다가 데이터 가공을 할 수 있음. 크롤링
        const getNewsList = $("ul.item_list").children("li");
        //console.log(getNewsList);
        // arrow function은 this를 binding 하지 않음
        // this 쓸거면 일반함수 써야 함
        getNewsList.each((idx, item) => {
            //console.log(item);
            productList.push({
                url: $(item).find(".inner").children("a").attr("href").split(",'")[1],
                thumb: $(item).find(".thumb").attr("src"),
                title: $(item).find(".title").text(),
                sale: $(item).find(".sale strong").text(),
                price: $(item).find(".price strong").text(),
                discount: $(item).find(".price del").text(),
                buy: $(item).find(".buy strong").text(),
            });
            console.log(item.url);
        });
        res.json(productList);
    });
});
app.get("/daum/news", (req, res) => {
    //res.send("다음에서 뉴스 크롤링해서 뿌려줄 예정");
    //const getHtml = async function() {}
    const getHtml = async () => {
        try {
            return await axios.get("https://news.daum.net/"); // promise
        } catch (error) {
            console.error(error);
        }
    };
    // promise  then(), catch()
    getHtml().then((html) => {
        let returnNewsList = [];
        //console.log(res);
        const $ = cheerio.load(html.data); // cheerio는 외부 html을 긁어다가 데이터 가공을 할 수 있음. 크롤링
        const getNewsList = $("ul.list_newsissue").children("li");
        //console.log(getNewsList);
        // arrow function은 this를 binding 하지 않음
        // this 쓸거면 일반함수 써야 함
        getNewsList.each((idx, item) => {
            //console.log(item);
            returnNewsList.push({
                news: $(item).find("a").text().replaceAll("\n", "").trim(),
                url: $(item).find("a").attr("href"),
                img: $(item).find("a img").attr("src"),
                company: $(item).find(".logo_cp img").attr("src"),
                category: $(item).find(".txt_category").text(),
            });
        });
        res.json(returnNewsList);
    });
});
app.get("/result/daum_news", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/reult_daum_news.html"));
});
app.get("/result/gmarket", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/result_gmarket.html"));
});

app.listen(PORT, () => {
    console.log(PORT, "번에서 서버 실행중");
});
