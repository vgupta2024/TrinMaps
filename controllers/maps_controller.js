const express = require('express');
router = express.Router();
const multer = require('multer');
const User = require('../models/user_model');
const Maps = require('../models/maps_model');



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
});

router.post('/directions', function(request, response) {
    response.status(200);
});

module.exports=router;