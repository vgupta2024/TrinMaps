const fs= require('fs');

const connections = JSON.parse(fs.readFileSync('connections.json'))
let room_names = Object.keys(connections)
let global_test = null
let matrix = room_names.map((el)=>{
  global_test = el
  return room_names.map((room)=>{
    return connections[global_test].includes(room) ? 1 : 0
  })
})
fs.writeFileSync("matrix.json", JSON.stringify(matrix))