const express = require('express');
router = express.Router();
const multer = require('multer');
const User = require('../models/user_model');
const Maps = require('../models/maps_model');
const Connections = require('../models/connections');



function loggedIn(request, response, next) {
    if (request.user) {
        next();
    } else {
        response.redirect('/login');
    }
}


router.post('/news', function(request, response) {

});

router.get('/directions', function(request, response) {
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    let data = Maps.getAllRooms();
    console.log(data);
    response.render("index", {
        user: request.user,
        data: data
    });
});

router.post('/directions', function(request, response) {
    let from = request.body.from;
    let to = request.body.to;
    Connections.shortestPath(from,to);
    response.redirect("/index");
});

module.exports=router;