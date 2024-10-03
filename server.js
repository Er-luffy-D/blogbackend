const { scrapeArxiv } = require("./index");
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors")
require('dotenv').config()
app.use(cors({
  origin: '*'
}));
const PORT = process.env.PORT;
app.get("/", async (req, res) => {
  const datascrape = await scrapeArxiv();
  res.json(datascrape);
});

app.use((req, res, next, err) => {
  res.status(404).send("404 not found");
});
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
