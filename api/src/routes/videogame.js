const { Router } = require("express");
const { Genre, Videogame, Platform } = require("../db");
const router = Router();
router.post("/", async (req, res) => {
  const {
    name,
    description,
    released,
    rating,
    idPlatforms,
    idGenres, //[1,2,3,5]
    background_image,
  } = req.body;
  try {
    const juegoCreado = await Videogame.create({
      name,
      description,
      released,
      rating,
      background_image,
    }).then((result) => {
      console.log(result.dataValues.id);
      return res.json(result.addGenre(idGenres));
    });
  } catch (error) {
    console.log("ALGO FALLO EN EL POST", error);
  }
});
module.exports = router;
