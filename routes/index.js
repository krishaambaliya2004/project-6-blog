const express = require('express')

const routes = express.Router();

const controller = require('../controllers/CrudController')

const fileupload = require('../config/fileupload')

routes.get('/',controller.index);
routes.post('/insertData',fileupload,controller.addData);
routes.get('/deletedata',controller.deletedata);
routes.get('/editdata',controller.editdata);

module.exports = routes;