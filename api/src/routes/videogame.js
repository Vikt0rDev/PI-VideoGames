const { Router } = require("express");
const { Genre, Videogame, Platform } = require("../db");
const router = Router();
router.post("/", async (req, res) => {
  const {
    name,
    description,
    released,
    rating,
    idPlatforms, //[1,2,3]
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
      //console.log(result.dataValues.id);
      //generos
      //1 action
      //2 rpg
      //videosgames_genr
      //idjuegos  id de generos
      //  1           2
      //  1           1
      //  1           3
      //videos
      //1 tibia
      //return res.json(result.addGenre(idGenres));
      result.addGenre(idGenres);
      return res.json(result.addPlatform(idPlatforms));
    });
    /* .then((result) => {
        return res.json(result.addPlatform(idPlatforms));
      }) */
  } catch (error) {
    console.log("ALGO FALLO EN EL POST", error);
  }
});
module.exports = router;
