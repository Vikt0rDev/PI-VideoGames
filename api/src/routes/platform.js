const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { Genre, Videogame, Platform } = require("../db");
router.get("/", (req, res) => {
  try {
    axios
      .get(
        "https://api.rawg.io/api/platforms?key=9cddb52ef8f0483ea0aa77a78e0eb78b"
      )
      .then((response) => {
        const platforms = response.data.results.map((e) => {
          return {
            name: e.name,
            id: e.id,
            image_background: e.image_background,
          };
        });

        return res.status(200).json(platforms);
      });
  } catch (error) {
    error;
  }
});
module.exports = router;
