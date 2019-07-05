//Archivo inicial
const app = require('../server');
const config = require('../_config');


const server = require('http').Server(app); //http viene en core

const port = config.PORT;

server.listen(port);
console.log(`Server is running on port: ${port}`);