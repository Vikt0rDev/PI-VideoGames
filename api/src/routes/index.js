const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const videogame = require("./videogame");
const videogames = require("./videogames");
const genre = require("./genre");
const platform = require("./platform");
//router.use("/videgame", videogame);
//router.use("/videogames", videogames);
//router.use("/genre", genre);
router.use("/platforms", platform);
module.exports = router;
