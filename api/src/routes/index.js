const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const app = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const videogame = require("./videogame");
const videogames = require("./videogames");
const genre = require("/genre");
app.use("/videgame", videogame);
app.use("/videogames", videogames);
app.use("/genre", genre);
module.exports = app;
