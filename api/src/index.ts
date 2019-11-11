import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
//rotas publicas e privadas
import * as admin from "firebase-admin";
import moment = require('moment');
import router from "./routes/rotasEmpresas";
import rotasCliente from "./routes/rotasClientes";

require("dotenv").config();
var cors = require('cors')

var app = express();
moment.locale('pt-BR');


app.use(cors())
app.options('*', cors())

app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false); // biblioteca depreciada
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("🚀 Mongo DB inicializado com sucesso as", moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
  });

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});



app.options("*", function (req, res, next) {
  if (req.method == "OPTIONS")
    // res.status(200);
    res.sendStatus(200);
});
// app.use("") //static
app.use("/public", rotasCliente); //clientes
app.use("/api", router); //rotas empresa

app.use(function (req, res, next) {
  let err: any;
  err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err.status, err.message);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong. Please try again",
    status: err.status || 500
  });
});

if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

var port = process.env.PORT || 1337;

try {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: `https://oficina2utfpr.firebaseio.com`
  });
  console.log("🚀 Server app firebase iniciado");
} catch (e) {
  console.log("🚀 Server app firebase falhou : ", e);
}
app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}/api`);
});
