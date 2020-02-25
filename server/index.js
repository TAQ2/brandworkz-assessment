const express = require("express");
const axios = require("axios");
const app = express();

const port = 4000;

const DARKSKY_SECRET_KEY = "410667091d1b2326afda6630b53649d8";
const url = "https://api.darksky.net/forecast/" + DARKSKY_SECRET_KEY + "/";

app.get("/darksky", (req, res) => {
  const coordinates = req.query.lat + "," + req.query.lng;

  axios
    .get(url + coordinates)
    .then(response => {
      res.send(response.data);
    })
    .catch(e =>
      res.status(500).json({
        message: "Error occurred when requesting Dark Sky API",
        error: e
      })
    );
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
