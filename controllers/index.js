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
        let connections = Maps.getAllConnections();
        let multi_room = Maps.getAllMultiRooms();
        response.render("index2", {
            user: request.user,
            data: data,
            connections: connections,
            multi_room:multi_room,
            logged: true,
        });
    } catch {
        response.render("login", {
            user: request.user,
            logged: false,
        });
    }
});

router.get('/d', (req,res)=>{
    // console.log('h')
    res.status(200);
    res.setHeader('Content-Type', 'text/html')
    res.render('structure')
})
router.get('/structure/:id', (req,res)=>{
    
    
    res.status(200);
    console.log(req.params.id)
    // res.setHeader('Content-Type', 'text/html')
    res.send(Maps.getFloorInfo(req.params.id))
    // res.render('structure')
})
router.get('/alg', (req, res) => {

    // console.log('h')
    res.status(200);
    let connections = Maps.getAllConnections();
    let matrix = Maps.getMatrix();
    res.setHeader('Content-Type', 'text/html')
    res.render('algs', {
        connections: connections,
        matrix: matrix
    })
})


router.get('/login', function(request, response) {
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("login", {
        user: request.user
    });
});

module.exports = router;