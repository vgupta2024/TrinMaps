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

exports.createUser = function(ID, name, userGroup) {
    let allUsers = JSON.parse(fs.readFileSync(__dirname + '/../data/users.json'));
    if (!allUsers[ID]) {
        let user = {};
        user['name'] = name;
        user['userGroup'] = userGroup;
        allUsers[ID] = user;
        fs.writeFileSync(__dirname + '/../data/users.json', JSON.stringify(allUsers));

        return true; //it was a new user which needed to be created
    } else {
        return false; //it was an old user
    }
}

exports.updateUser = function(ID, name, userGroup) {
    let allUsers = JSON.parse(fs.readFileSync(__dirname + '/../data/users.json'));
    let user = allUsers[ID];
    if (name)
        user['name'] = username;
    if (userGroup)
        user['userGroup'] = userGroup;
    console.log("clubAccess", clubAccess);

    allUsers[ID] = user;
    fs.writeFileSync(__dirname + '/../data/users.json', JSON.stringify(allUsers));
}