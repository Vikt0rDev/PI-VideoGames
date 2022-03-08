const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { Genre, Videogame, Platform } = require("../db");
router.get("/", (req, res) => {
  axios
    .get(
      "https://api.rawg.io/api/platforms?key=9cddb52ef8f0483ea0aa77a78e0eb78b"
    )
    .then((response) => {
      const platform = response.data.results;
      platform.forEach((elem) => {
        let { name, id, image_background } = elem;
        Platform.findOrCreate({
          where: {
            name,
            id,
            image_background,
          },
        });
        return platform.findAll({
          attributes: ["name"],
        });
      });
      return res.status(200).json(platforms);
    });
});
module.exports = router;
