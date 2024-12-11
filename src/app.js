import express from "express";
import usersRouter from "../routes/router.js";

/* FUNZIONE BODY
body("birthdaye", "must be valid")
    .optional({values: "falsy"})
    .isISO8601()

birthdate viene contrassegnato come campo facoltativo
a cui viene comunque applicato il formato iso8601 
perchè con {values: "falsy"} i valori che non sono undefined, null, flase o
0 sranno comunque convalidati. 
*/

/* CONCATENAMENTO CONVALIDA
body("name")
    .trim()
    .notEmpty()
    .withMessage("Name can't be empty")
    .isAplha()
    .withMessage("Only letters")
*/

const app = express();

app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/', usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT} port`))