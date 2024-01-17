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
exports.writeFloorSVG = (floor, data) =>{
    fs.writeFileSync(__dirname +`/../public/floor_plans/floor_${floor}.svg`, data)
    return true
}
exports.writeConnections = (data)=>{
    fs.writeFileSync(__dirname +`/../public/floor_plans/connections.json`, data)
    return true
}
exports.writeShared = (data)=>{
    fs.writeFileSync(__dirname +`/../public/floor_plans/shared.json`, data)
    return true
}
exports.writeDestinations = (data)=>{
    fs.writeFileSync(__dirname +`/../public/floor_plans/destinations.json`, data)
    return true
}
exports.writeMatrix = (data)=>{
    fs.writeFileSync(__dirname +`/../public/floor_plans/matrix.json`, data)
    return true
}
exports.writeFloorInfo = (floor, data)=>{
    fs.writeFileSync(__dirname +`/../public/floor_plans/floor-${floor}.json`, data)
    return true
}
exports.getFloorConnectionsInfo = ()=>{
    return [fs.readFileSync(__dirname +`/../public/floor_plans/connections-1.json`), fs.readFileSync(__dirname +`/../public/floor_plans/connections-2.json`), fs.readFileSync(__dirname +`/../public/floor_plans/connections-3.json`), fs.readFileSync(__dirname +`/../public/floor_plans/connections-4.json`)]
}
exports.writeFloorConnections = (floor, data)=>{
    fs.writeFileSync(__dirname +`/../public/floor_plans/connections-${floor}.json`, data)
    return true
}