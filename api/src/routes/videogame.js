const { default: axios } = require("axios");
const { Router, response } = require("express");
const { Genre, Videogame, Platform } = require("../db");
const router = Router();
const { API_KEY } = process.env;
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

router.get("/:videogameId", async (req, res) => {
  const { videogameId } = req.params;
  //  if( videogameId >)
  //console.log(videogameId.length);
  const formatter = new Intl.ListFormat("es", {
    style: "long",
    type: "conjunction",
  });

  if (videogameId.length < 6) {
    const videogame = await axios.get(
      `https://api.rawg.io/api/games/${videogameId}?key=${API_KEY}`
    );
    let {
      name,
      description,
      background_image,
      rating,
      released,
      genres,
      platforms,
    } = videogame.data;

    const gameDetails = {
      videogameId,
      name,
      description: description.replace(/(<([^>]+)>)/gi, " "),
      background_image,
      rating,
      released,
      genre: formatter.format(genres.map((e) => e.name)),
      platforms: formatter.format(platforms.map((e) => e.platform.name)),
    };
    res.send(gameDetails);
  } else {
    let videogame = await Videogame.findByPk(videogameId, {
      include: [
        {
          model: Genre,
          through: { attributes: [name] },
        },
        {
          model: Platform,
          through: { attributes: [] },
        },
      ],
    });

    /*     let videogame = await Videogame.findOne({
      where: {
        id: videogameId,
      },
      include: Genre,
      attributes: [Genre.name],
    }); */
    res.status(200).json(videogame);
  }
});
module.exports = router;
