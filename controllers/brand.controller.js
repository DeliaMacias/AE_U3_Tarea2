const http = require('http');
const path = require('path');
const status = require('http-status');

let _brand;

//API completa de cmarcas incluido el actualizar y hacer actualizar de user: lo que se mande es lo unico 
// que se va a actualizar

//incluir endpoint para Login

const createBrand = (req,res) => {
    const brand = req.body;
    _brand.create(brand)
    .then((data) => {
        res.status(200);
        res.json({msg: "Brand creado correctamente", data :data});
    })
    .catch((err) => {
        res.status(400);
        res.json({msg: "Error!", data: err});
    });
}

const findAll = (req,res) =>{
    _brand.find()
    .then((data) => {
        if(data.length == 0){
            res.status(status.NO_CONTENT);
            res.json({msg:"No se encontraron marcas"});   
        }else{
            res.status(status.OK);
            res.json({msg:"Exito!!",data:data});
        }
    })
    .catch((err) => {
        res.status(status.BAD_REQUEST);
        res.json({msg:"Error!!"});
    });
}
const findByID = (req,res) =>{
    const { id } = req.params;
    const params = {
        _id:id
    };
    console.log(id);

    _brand.findById(id)
    .then((data) => {
        res.status(status.OK);
        res.json({msg:"Exito!!",data:data}); 
    })
    .catch((err) => {
        res.status(status.BAD_REQUEST);
        res.json({msg:"Error!!",err:err});
    });
}
const updateByID = (req,res) => {
    const { id } = req.params;
    _brand.findByIdAndUpdate(id,req.body,{new:true})
    .then((data) => {
        res.status(status.OK);
        res.json({msg:"Exito!! actualizado correctamente",data:data});
    })
    .catch((err) => {
        res.status(status.BAD_REQUEST);
        res.json({msg:"Error! no se pudo actualizar",err:err});
    });
}

const deleteByID = (req,res) => {
    const { id } = req.params;

    _brand.findByIdAndRemove(id)
    .then((data) => {
        res.status(status.OK);
        res.json({msg:"EXITO se borró correctamente!",data:data});
    })
    .catch((err) => {
        res.status(status.NOT_FOUND);
        res.json({msg:"Error!!! No se encontró ",err:err});
    });
}
module.exports = (Brand) => {
    _brand = Brand;
    return ({
        createBrand,
        findAll,
        findByID,
        updateByID,
        deleteByID

    });
}