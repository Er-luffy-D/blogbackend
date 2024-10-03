const { scrapeArxiv } = require("./index");
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors")
app.use(cors({
  origin: '*'
}));

app.get("/", async (req, res) => {
  const datascrape = await scrapeArxiv();
  res.json(datascrape);
});

app.use((req, res, next, err) => {
  res.status(404).send("404 not found");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
