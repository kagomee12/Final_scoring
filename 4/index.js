const express = require('express')
const app = express()
const { Sequelize, QueryTypes } = require("sequelize");
const config = require("./config/config.json");
const path = require("path");
const { Console } = require('console');
const upload = require('./src/middleware/uploadfile');
const { type } = require('os');
const sequelize = new Sequelize(config.development);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));
app.use("/assests", express.static(path.join(__dirname, "src/assests")));
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));

app.get('/', async function (req, res) {

  const datatype = await sequelize.query(`SELECT "type_tbs".name_type, "heroes_tbs".* FROM "type_tbs" RIGHT JOIN "heroes_tbs" ON "type_tbs".id = "heroes_tbs".type_id ORDER by "heroes_tbs".id DESC`, { type: QueryTypes.SELECT })
  res.render('index',{data: datatype})
})

app.get("/addhero", async function (req,res) {
    const datatype = await sequelize.query(`SELECT id, name_type, "createdAt", "updatedAt"
        FROM public.type_tbs`, { type: QueryTypes.SELECT })
    console.log(datatype);
    res.render("addhero",{types: datatype})
})

app.get("/addtype", function (req,res) {
    res.render("addtype")
})

app.post("/addtype_id",async function (req,res) {

    const {name_type} = req.body;

    const now = new Date();

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dayOfWeek = daysOfWeek[now.getDay()];
    const month = monthsOfYear[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();

    const formattedDate = `${dayOfWeek} ${month} ${day} ${year}`;

    const datatype = await sequelize.query(
        `INSERT INTO public.type_tbs ("name_type","createdAt", "updatedAt") VALUES ('${name_type}', '${formattedDate}', '${formattedDate}')`, { type: QueryTypes.INSERT })
    
        res.redirect("/")

})

app.post("/addhero", upload.single("photo"), async function (req, res) {
    const {name, type_id} = req.body
    const inputimage = req.file ? req.file.filename : "";

    const now = new Date();

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dayOfWeek = daysOfWeek[now.getDay()];
    const month = monthsOfYear[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();

    const formattedDate = `${dayOfWeek} ${month} ${day} ${year}`;

    const datatype = await sequelize.query(
        `INSERT INTO public.heroes_tbs ("name","type_id","photo","createdAt", "updatedAt") 
        VALUES ('${name}', '${type_id}', '${inputimage}' ,'${formattedDate}', '${formattedDate}')`, { type: QueryTypes.INSERT })
    
        res.redirect("/")
})

app.get("/detailheroes/:id", async function (req, res) {
  const {id} = req.params
  const datatype = await sequelize.query(`SELECT "type_tbs".name_type, "heroes_tbs".* FROM "type_tbs" RIGHT JOIN "heroes_tbs" ON "type_tbs".id = "heroes_tbs".type_id WHERE "heroes_tbs".id = ${id}`, { type: QueryTypes.SELECT })

  res.render("detail",{data: datatype})
})

app.get("/editheroes/:id", async function (req, res) {
  const {id} = req.params
  const dataheroes = await sequelize.query(`SELECT * FROM public.heroes_tbs WHERE id = ${id}`, { type: QueryTypes.SELECT })

  const datatype = await sequelize.query(`SELECT id, name_type, "createdAt", "updatedAt"
    FROM public.type_tbs`, { type: QueryTypes.SELECT })

  console.log(dataheroes);
  console.log(datatype);

  res.render("edithero",{data: dataheroes[0], types: datatype})
})

app.post("/updateheroes/:id", upload.single("photo"), async function (req, res) {
  const { id } = req.params
  const {name, type_id} = req.body
    const inputimage = req.file ? req.file.filename : "";

    const now = new Date();

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dayOfWeek = daysOfWeek[now.getDay()];
    const month = monthsOfYear[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();

    const formattedDate = `${dayOfWeek} ${month} ${day} ${year}`;

    const datatype = await sequelize.query(
      `UPDATE public.heroes_tbs
      SET name='${name}', type_id='${type_id}', photo='${inputimage}', "createdAt"='${formattedDate}', "updatedAt"='${formattedDate}'
      WHERE id= ${id}`, { type: QueryTypes.UPDATE })
    
        res.redirect("/")
})

app.post("/delete/:id", async function  (req, res) {
  const { id } = req.params;
  await sequelize.query(`DELETE FROM public."heroes_tbs" WHERE id = ${id}`, {type: QueryTypes.DELETE, });

  res.redirect("/");
})





app.listen(5000)