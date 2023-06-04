const fs = require('fs');

exports.getAllRooms = function(ID, name, userGroup) {
    let allRooms = JSON.parse(fs.readFileSync(__dirname + '/../maps/ids.json'));
    return allRooms;
}
