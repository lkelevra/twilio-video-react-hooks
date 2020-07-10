const config = require('./config');
const express = require('express');
const https = require('https');
const fs = require('fs');

const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const { videoToken } = require('./tokens');
const port =  80;
const options = {
  key: fs.readFileSync('../key.pem'),
  cert: fs.readFileSync('../cert.pem')
};
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

const sendTokenResponse = (token, res) => {
  res.set('Content-Type', 'application/json');
  res.send(
    JSON.stringify({
      token: token.toJwt()
    })
  );
};

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get('/video/token', (req, res) => {
  const identity = req.query.identity;
  const room = req.query.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);

});
app.post('/video/token', (req, res) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});

// app.listen(port, () =>
//   console.log('Express server is running on localhost:3001')
// );
https.createServer(options, app).listen(5000);
