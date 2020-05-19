const express = require("express");
const fs = require("fs");
const serverless = require("serverless-http");

const app = express();
const port = 5000;

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    hello: "hi!",
  });
});

app.use("/.netlify/functions/server", router);

module.exports.handler = serverless(app);

// const jsonObject = JSON.stringify(
//   fs.readFileSync("src/data/try.json", "utf-8")
// );
// // const check = fs.readFileSync("src/data/try.json", "utf-8");
// // const newCheck = JSON.parse(check);

// app.get("/api/geojson", (req, res) => {
//   const geoFile = fs.readFileSync("src/data/dummygeo.json", "utf-8");
//   const geoJSON = JSON.parse(geoFile);

//   res.json(geoJSON);
// });

// app.listen(port, () => console.log(`listening on port: ${port}`));
