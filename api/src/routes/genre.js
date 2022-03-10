const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { Genre } = require("../db");
const { API_KEY } = process.env;

router.get("/", async (req, res) => {
  const checkGenere = await Genre.findOne({ where: { id: 1 } });
  if (checkGenere === null) {
    //cuando la base de datos esta vacia

router.get("/", (req, res) => {
  try {

    axios
      .get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
      .then((response) => {
        const genres = response.data.results.map((e) => {
          return {
            name: e.name,
            id: e.id,
            image_background: e.image_background,
          };
        });
        //response.data.next PENDIENTE DE REVISAR LA PROPIEDAD NEXT QUE TIENE UNA SEGUNDA PAGINA

        Genre.bulkCreate(genres).then((result) => {
          return res.status(200).json(result);
        });
      });
  } else {
    //buscar en la base de datos
    const genre = await Genre.findAll();
    res.json(genre);


        Genre.bulkCreate(genres).then((result) => {
          return res.status(200).json(result);
        });

        //return res.status(200).json(platforms);
      });
  } catch (error) {
    error;

  }
});
module.exports = router;
