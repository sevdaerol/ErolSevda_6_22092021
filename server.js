const http = require('http');  //importer package http natif de node poir creer un serveur

const app = require('./app');

app.set('port', process.env.PORT || 3000);

const server = http.createServer(app);

server.listen(process.env.PORT || 3000); //configurer le serveur pour ecouter soit port par defaut soit 3000
