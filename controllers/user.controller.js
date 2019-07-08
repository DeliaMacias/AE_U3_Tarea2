const htto = require('http');
const path = require('path');
const status = require('http-status');
const jwt = require('jsonwebtoken');
const _config = require('../_config');
const fs = require('fs');
const csv = require('csv-parser');  

let _user;

const createUser = (req, res) => {
    const user = req.body;
    _user.create(user)
    .then((data) => {
        res.status(200);
        res.json({msg: "Usuario creado correctamente", data :data});
    })
    .catch((err) => {
        res.status(400);
        res.json({msg: "Error!", err: err});
    });
}
const readWriteCSV = (req,res) => {
    //var arInfo = req.body;
    fs.createReadStream('archivo.csv')  
    .pipe(csv())
    .on('data', (row) => {
        console.log(row); // crear
        _user.create(row)
        .then((data) => {
            console.log(data);
            res.status(200);
            res.json({msg:" Archivo CSV insertado correctamente"});
        })
        .catch((err) => {
            res.status(400);
            res.json({msg:"Error!!",err:err});
        });
    })
    .on('end',() => {
        console.log('CSV file successfully processed');
    });
}

const findAll = (req,res) => {
    _user.find()
    .then((data) => {
        if(data.length == 0){
            res.status(status.NO_CONTENT);
            res.json({msg:"No se encontraron usuarios"});
        }else{
            res.status(status.OK);
            res.json({msg:" Exito!!",data: data});
        }
    })
    .catch((err) => {
        res.status(status.BAD_REQUEST);
        res.json({msg:"Error!!!"});
    });
} 
const findByID = (req,res) =>{
    const { id } = req.params;
    
    console.log(id);

    _user.findById(id)
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
    _user.findByIdAndUpdate(id,req.body,{new:true})
    .then((data) => {
        res.status(status.OK);
        res.json({msg:"Exito!! Usuario actualizado correctamente",data:data})
    })
    .catch((err) => {
        res.status(status.BAD_REQUEST);
        res.json({msg:"Error! no se puede actualizar", err:err})
    });
} 
const deleteByID = (req,res) =>{
    const { id } = req.params;
    //const id = req.params.id;

    const params = {
        _id:id
    };
    _user.findByIdAndRemove(id)
    .then((data) => {
            res.status(status.OK);
            res.json({msg:"eXITO !",data:data});
    })
    .catch((err) => {
        res.status(status.NOT_FOUND);
        res.json({msg:"Error!!! No se encontró ",err:err});
    });
}
const login = (req,res) => {
    const  {email, password} = req.params;
    let query = {email: email, password:password};

    _user.findOne(query, "-password")
    .then((user) => {
        if(user){
            const token = jwt.sign({email:email}, _config.SECRETJWT);
            res.status(status.OK);
            res.json({
                msg:"Acceso exitoso",
                data:{
                    user:user,
                    token:token
                }
            });
        }else{
            res.status(status.NOT_FOUND);
            res.json({msg:"Error!!! No se encontró"});
        }
    })
    .catch((err) => {
        res.status(status.NOT_FOUND);
        res.json({msg:"Error! no se encontró",err:err});
    });
}


module.exports = (User) => {
    _user = User;
    return ({
        
        createUser,
        findAll,
        findByID,
        updateByID,
        deleteByID,
        login,
        readWriteCSV
    });
}