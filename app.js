const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const axios = require('axios');

const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function startCrawl(url) {
  const { stdout, stderr } = await exec(`./crawl -u ${url}`);
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
}

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// create
app.post('/v1/startcrawl', async (req, res) => {
  console.log(req.body);
  const { startUrl } = req.body;
  await startCrawl(startUrl);
  res.status(200);
});

app.get('/', async (req, res) => {
  console.log('It works!');
});

app.get('/getipinfo/:ip', async (req, res) => {
  const ipinfouri = `https://ipinfo.io/${req.params.ip}`;
  const result = await axios.get(ipinfouri);
  console.log(result);
  res.status(200).send(result);
});

app.listen(PORT, () => console.log(`app is running on port: ${PORT}`));
