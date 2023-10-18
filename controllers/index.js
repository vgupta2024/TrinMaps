const express = require('express');
router = express.Router();
const fs = require('fs');
const Maps = require('../models/maps_model')



router.get('/', function(request, response) {
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    try {
        const u = request.session.passport.user
        let data = Maps.getAllRooms();
        response.render("index", {
            user: request.user,
            data: data,
            logged: true,
        });
    } catch {
        response.render("login", {
            user: request.user,
            logged: false,
        });
    }

});

router.get('/d', (req, res) => {

    console.log('h')
    res.status(200);
    res.setHeader('Content-Type', 'text/html')
    res.render('structure')
})




router.get('/login', function(request, response) {
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("login", {
        user: request.user
    });
});


module.exports = router;