const fs = require('fs');

exports.getAllRooms = function() {
    return JSON.parse(fs.readFileSync(__dirname + '/../public/floor_plans/destinations.json'));
}
exports.getAllConnections = function() {
    return JSON.parse(fs.readFileSync(__dirname + '/../public/floor_plans/connections.json'));
}
exports.getMatrix = function() {
    return JSON.parse(fs.readFileSync(__dirname + '/../public/floor_plans/matrix.json'));
}
exports.getAllMultiRooms = function() {
    return JSON.parse(fs.readFileSync(__dirname + '/../public/floor_plans/shared.json'));
}
exports.getFloorInfo = function(floor){
    return fs.readFileSync(__dirname +`/../public/floor_plans/${floor}.json`)
}