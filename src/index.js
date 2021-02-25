'use strict';

const http = require('http');
const expressApp = require('./app');
const { HOST_PORT } = require('./util/settings');


async function startServer() {
  const app = await expressApp();
  http.createServer(app).listen(process.env.PORT || HOST_PORT, () => {
    console.log("App running at http://localhost:" + HOST_PORT);
    console.log("________________________________________________________________");
    console.log('API docs (Swagger UI) available on http://localhost:' + HOST_PORT + '/docs');
    console.log("________________________________________________________________");
  });
}

startServer();
