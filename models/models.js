const mongoose = require('mongoose');
const _ = require('underscore');
const config = require('../_config');
module.exports = (wagner) =>{
    mongoose.Promise = global.Promise;
    mongoose.connect(`mongodb://localhost:27017/${config.DB}`,{useNewUrlParser:true, useFindAndModify: false});

    wagner.factory('db',() => mongoose);
    const User = require('./user.model');
    const Brand = require('./brand.model');

    const models = {
        User,
        Brand
    }

    //underscore va a servir para recorrer todo el objeto de User k:nombre de variable,v:contenido
    _.each(models,(v,k) => {
        wagner.factory(k, () => v)
    })
}