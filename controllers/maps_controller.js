const express = require('express');
router = express.Router();
const User = require('../models/users_model')


function loggedIn(request, response, next) {
    if (request.user) {
        next();
    } else {
        response.redirect('/login');
    }
}


router.post('/news', function(request, response) {

});

module.exports=router;