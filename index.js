const express = require("express"); //importando o express
const app = express(); //instanciando o express
const bodyParser = require("body-parser"); //importando o body-parser
const connection = require("./database/database.js");
const questionModel = require("./database/Questions.js");
const answerModel = require("./database/Answers");

connection.authenticate().then(() => {
    console.log("Conexão realizada!");
}).catch((msgError) => {
    console.log(msgError);
});

app.set("view engine", "ejs"); //Usar o EJS como view engine
app.use(express.static("public")); //Utilizar os arquivos estáticos que estão na pasta public

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/",(req,res) => {
    questionModel.findAll({ raw: true, order: [
        ["id","DESC"]
    ]}).then(questions => {
        res.render("index.ejs", {
            questions: questions
        });
    });
});

app.get("/ask", (req, res) => {
    res.render("ask.ejs");
});

app.post("/save_Question", (req,res) => {
    questionModel.create({
        title: req.body.title,
        description: req.body.question
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/question/:id", (req, res) => {
    questionModel.findOne({
        where: {id: req.params.id}
    }).then(question => {
        if(questionModel != undefined){
            answerModel.findAll({
                where: {questionId: question.id},
                order: [["id", "DESC"]]
            }).then(answers => { 
                res.render("question.ejs", {
                    question: question,
                    answers: answers
                });
            });
        }
        else{
            res.redirect("/");
        }
    });
});

app.post("/answer", (req,res) => {
    var body = req.body.body;
    var questionId = req.body.id;
    answerModel.create({
        body: body,
        questionId: questionId
    }).then(() => {
        res.redirect("/question/" + questionId);
    });
});

app.listen(8080, () => {
    console.log("Server on!");
});