const express = require('express');
router = express.Router();
const fs = require('fs');


router.get("/unauth/",(request,response)=>{
    response.status(401);
    response.setHeader('Content-Type', 'text/html')
    response.render("unauth",{
      user:request.user
    }) 
  
  })

router.get('/', function(request, response) {
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("unauth", {
        user: request.user
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