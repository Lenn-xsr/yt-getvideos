require('dotenv').config();

const express = require('express'),
      app = express(),
      PORT = process.env.PORT || 9000;

const actionsRoute = require('./routes/Actions');

app.use(express.json());

app.use('/', actionsRoute);

app.listen(PORT, () => {
  console.log('[APP] Aberto na porta ' + PORT);
});
