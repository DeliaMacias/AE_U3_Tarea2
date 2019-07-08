const router = require('express').Router();

module.exports = (wagner) => {
    //recuperarlo invoke     mostrarlo:factory
    const userCtrl = wagner.invoke((User) => require('../controllers/user.controller')(User));

    router.post('/',(req,res) => 
    userCtrl.createUser(req, res));

        //localhost:3000/api/v1/usuarios

    router.get('/',(req,res) => 
    userCtrl.findAll(req, res));

    router.get('/:id',(req,res) => 
    userCtrl.findByID(req, res));

    router.put('/:id',(req,res) => 
    userCtrl.updateByID(req, res));

    router.delete('/:id',(req,res) => 
    userCtrl.deleteByID(req, res));
    
    router.get('/login/:email/:password',(req,res) => 
    userCtrl.login(req,res));

    router.post('/csv/insert',(req,res) => 
    userCtrl.readWriteCSV(req, res));

    return router;
}