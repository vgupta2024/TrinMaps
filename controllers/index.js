const express = require('express');
router = express.Router();
const fs = require('fs');
const Maps = require('../models/maps_model')



router.get('/', function(request, response) {
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("login", {
        user: request.user
    });
});


router.get('/index', function(request, response) {
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    let data = Maps.getAllRooms();
    console.log(data);
    response.render("index", {
        user: request.user,
        data: data
    });
});


router.get('/login', function(request, response) {
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("login", {
        user: request.user
    });
});


module.exports=router;