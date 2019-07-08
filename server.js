const  bodyParser = require('body-parser'); // para recuperar lo que venga de body params
const express = require('express');
const morgan = require('morgan'); //para visualizar las peticiones que hacen los clientes al servidor
const wagner = require('wagner-core'); //injector de dependencias, para que ponga todos los modelos disponibles
const path = require('path');

const _config = require('./_config');
const expressJWT = require('express-jwt');

let app = express();

require('./models/models')(wagner);



app.use(morgan('dev'));
app.use(bodyParser.json()); //intercambio de informacion será en json.
app.use(bodyParser.urlencoded({extended:false}));

//permisos
app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*'); //desde donde quiera
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
    res.setHeader('Acess-Control-Allow-Header','Origin,X-Requested-With,Content-Type,Accept,Authorization');
    next();   
});

const urlBase = "/api/v1/";

const jwtOptions = {
path: [
    /^\/api\/v1\/usuarios\/login\/.*/
    ]
};

app.use(expressJWT({ secret: _config.SECRETJWT}).unless(jwtOptions)); //proteger las rutas a traves de una palabra secreta


//controlar los mensajes de no authorizado, si no se pone solo aparece un 404;
app.use(function (err,req,res,next) {
    if(err.name === 'UnauthorizedError'){
        res.status(err.status).send({
            code: err.status,
            message: err.message,
            details: err.code
        });
    }else{
        next();
    }
});

const user = require('./routers/user.router')(wagner);
const brand = require('./routers/brand.router')(wagner);


app.use(urlBase + 'usuarios',user);
app.use(urlBase + 'brands',brand);

module.exports = app;