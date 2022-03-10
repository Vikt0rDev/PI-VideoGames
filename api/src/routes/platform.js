const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { Platform } = require("../db");
const { API_KEY } = process.env;

router.get("/", async (req, res) => {
  let data = {
    url: `https://api.rawg.io/api/platforms?key=${API_KEY}`,
    countData: [],
  };

  function getData(url, platforms = []) {
    //https://api.rawg.io/api/platforms
    try {
      axios.get(url).then((response) => {
        let result = response.data.results.map((e) => {
          return {
            name: e.name,
            id: e.id,
            image_background: e.image_background,
          };
        });
        //platforms.concat(result);
        platforms.push(result);
        //console.log(result);
        if (response.data.next === null) {
          //console.log(platforms);
          return result;
        } else {
          getData(response.data.next, platforms);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  console.log(getData(`https://api.rawg.io/api/platforms?key=${API_KEY}`));
  res.send();
  /*   return getData(`https://api.rawg.io/api/platforms?key=${API_KEY}`).then(
    (result) => {
      res.json(result);
    }
  ); */

  /* return res
    .status(200)
    .json(getData(`https://api.rawg.io/api/platforms?key=${API_KEY}`)); */

  /*   const checkPlatforms = await Platform.findOne({ where: { id: 1 } });
  if (checkPlatforms === null) {
    axios
      .get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
      .then((response) => {
        const platforms = response.data.results.map((e) => {
          return {
            name: e.name,
            id: e.id,
            image_background: e.image_background,
          };
        });
        //response.data.next PENDIENTE DE REVISAR LA PROPIEDAD NEXT QUE TIENE UNA SEGUNDA PAGINA

        Platform.bulkCreate(platforms).then((result) => {
          return res.status(200).json(result);
        });
      });
  } else {
    const platforms = await Platform.findAll();
    res.json(platforms);
  } */
});
module.exports = router;
