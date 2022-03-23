const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const { Db } = require("mongodb");
const { Console } = require("console");
const mongoClient = require("mongodb").MongoClient;

app.set("port", process.env.PORT || 3001);
app.set("view engine", "ejs"); // template engine (ejs, pug(jade), handlebars)
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const PORT = app.get("port");
let db = null;

//mongodb+srv://klowon1:<abcdABCD1234>@cluster0.8dlh0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoClient.connect("mongodb+srv://klowon1:abcdABCD1234@cluster0.8dlh0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useUnifiedTopology: true }, (err, client) => {
    console.log("DB 연결");
    if (err) {
        console.log(err);
    }
    db = client.db("todo");
    // db.collection("post").insertOne({ name: "김원", age: 30 }, (err, result) => {
    //     console.log("입력성공");
    // });
});

app.get("/", (req, res) => {
    res.render("index", {
        title: "server 에서 넘겨준 Hello EJS",
        desc: "서버에서 넘겨준 내용이 들어갑니다.",
    });
});

app.get("/insert", (req, res) => {
    res.render("insert");
});

app.get("/list", (req, res) => {
    db.collection("post")
        .find()
        .toArray((err, result) => {
            //console.log(result);
            res.render("list", { todoList: result });
        });
});

app.post("/insertProcess", (req, res) => {
    const _title = req.body.title;
    const _date = req.body.date;
    console.log(_title, "===", _date);
    db.collection("counter").findOne({ name: "total" }, (err, result) => {
        const count = result.count;
        console.log("개수는 === " + count);
        db.collection("post").insertOne({ _id: count + 1, title: _title, date: _date }, (err, result) => {
            console.log("입력성공");
            // update operation
            db.collection("counter").updateOne({ name: "total" }, { $inc: { count: 1 } }, (err, result) => {});
            res.redirect("/list");
        });
    });
    //res.end();
});
app.get("/detail/:id", (req, res) => {
    //console.log(req.params.id);
    const id = parseInt(req.params.id);
    db.collection("post").findOne({ _id: id }, (err, result) => {
        if (result) {
            res.render("detail", { id: id, title: result.title, date: result.date });
        }
    });
});
app.delete("/delete", (req, res) => {
    const id = parseInt(req.body.id);
    console.log(id);
    db.collection("post").deleteOne({ _id: id }, (err, result) => {
        console.log(result);
        if (result.deletedCount > 0) {
            //res.redirect("/list");
            res.json({ delete: "ok" });
        }
    });
    //res.end();
});

app.listen(PORT, () => {
    console.log(PORT, "번에서 서버 실행중");
});
