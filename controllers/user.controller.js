const htto = require('http');
const path = require('path');
const status = require('http-status');

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
        res.json({msg: "Error!", data: err});
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

const Login = (req,res) => {
    const  email  = req.body.email;
    const password = req.body.password;
    
    _user.findOne({email:email})
    .then((data) => {
        if(data.length == 0 || password != data.password){
            res.status(status.NOT_FOUND);
            res.json({msg:"No existe ningun usuario con el email",data:data});
        }else{
            res.status(status.OK);
            res.json({msg:"El usuario si existe", data:data});
        }
    })
    .catch((err) => {
        res.status(status.NOT_FOUND);
        res.json({msg:"Error! no se encontró el usuario con esos datos",err:err});
    });
}

module.exports = (User) => {
    _user = User;
    return ({
        Login,
        createUser,
        findAll,
        findByID,
        updateByID,
        deleteByID
    });
}