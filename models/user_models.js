const fs = require('fs');

exports.getUsers = function() {
    let allUsers = JSON.parse(fs.readFileSync(__dirname + '/../data/users.json'));
    return allUsers;
}

exports.getUser = function(ID) {

    let allUsers = JSON.parse(fs.readFileSync(__dirname + '/../data/users.json'));
    let user = allUsers[ID];
    return user;
}