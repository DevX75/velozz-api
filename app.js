'use strict'

// Cargar módulos de node para crear el servidor
const swaggerUI = require('swagger-ui-express');



var bodyParser = require('body-parser');
var express = require('express');
const jwt = require('jsonwebtoken');

// Ejecutar expresss (htpp)
var app = express();

global.baseURL ='localhost';

// Cargar ficheros rutas
var appRoutes = require('./routes/app.routes');
var rootRoutes = require('./routes/root.routes');

process.env.ACCESS_TOKEN_SECRET = "xv2pXfdXV&aDs91P";
process.env.ACCESS_TOKEN_LIFE = '1h';
process.env.REFRESH_TOKEN_SECRET = "hw782wujnd99ahmmakhanjkajikhi&aDs91P";
process.env.REFRESH_TOKEN_LIFE = '24h';

// Middlewares

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// Activar CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, x-access-token, Content-Type, Accept, Access-Control-Allow-Request-Method');
res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
global.baseURL = req.hostname +":"+ global.PORT;
//console.log('INFO: Servidor corriendo en: ' + global.baseURL );
next();
});

console.debug('listening on port ' + global.PORT);

app.disable('x-powered-by');

const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'PlusSpeed API',
      description: 'An API Rest for +Speed',
      version: '1.0.0',
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  apis: ['./controllers/*.controller.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(swaggerOptions);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(openapiSpecification,{explorer: true}));

// Añadir prefijos a las rutas / Cargar rutas
app.use('/api', appRoutes);
app.use('/', rootRoutes);



// /* Endpoints */
// require('./src/endpoints')(app);

 
// Exportar módulo (fichero actual)
module.exports = app;
