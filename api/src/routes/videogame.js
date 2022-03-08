const { Router } = require("express");
const { Genre, Videogame, Platform } = require("../db");
const router = Router();
router.post("/", async (req, res) => {
  const { name, description, released, rating, idPlatforms, idGenres } =
    req.body;
  try {
    const juegoCreado = await Videogame.Create({
      name,
      description,
      released,
      rating,
    });
    const genresDB = await Genre.findAll({
      where: {
        id: idGenres,
      },
    });
    const platformsDB = await Platform.findAll({
      where: {
        id: idPlatforms,
      },
    });
    juegoCreado.addGenre(genresDB);
    juegoCreado.addPlatform(platformsDB);
    return res.send("juego creadeishon");
  } catch (error) {
    console.log("ALGO FALLO EN EL POST", error);
  }
});
module.exports = router;
