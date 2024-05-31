import express from 'express';
import fs from 'node:fs';

const app = express();
const port = 3421;

app.use(express.static("."));

app.get("/", (req, res) => {
  req.headers['content-type'] = "text/html";

  const stream = fs.readFileSync('./src/test/index.html', { encoding: 'utf-8' });

  res.send(stream);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
