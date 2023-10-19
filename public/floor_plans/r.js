const fs= require('fs');

const connections = JSON.parse(fs.readFileSync('input.json'))

let stairs = {}
let shared = {}
let unqiue_destinations = []
let linked;

Object.keys(connections).forEach((name)=>{
  let components = name.split("-")
  if(components.length > 1 && !isNaN(Number(components[components.length - 1]))){
    if((components[0] == "M" || components[0] == "W") && components[1] == "BATHROOM"){
      const index_name = components[0]+"-"+components[1]
      index_name in shared ? shared[index_name].push(name) : shared[index_name] = [name]
    }else if(components[0] == "STAIR"){
      const index_name = components.splice(0,3).join("-")
      index_name in stairs ? stairs[index_name].push(name) : stairs[index_name] = [name]
    }else if(components[0] !== "INT"){
      components.pop()
      const index_name = components.join("-")
      if(index_name.length > 1){
        index_name in shared ? shared[index_name].push(name) : shared[index_name] = [name]
      }else{
        unqiue_destinations.push(name)
      }
    }
  }else if(components[0] == "EXIT"){
    const index_name = "EXIT"
    index_name in shared ? shared[index_name].push(name) : shared[index_name] = [name]
  }else{
    unqiue_destinations.push(name)
  }
})

Object.keys(stairs).forEach((code)=>{
  linked = stairs[code]
  linked.forEach((stair_name)=>{
    linked.forEach((stair_name_2)=>{
      stair_name_2 !== stair_name ? connections[stair_name].push(stair_name_2) : null
    })
  })
})


let result = {}
let temp = Object.keys(connections)
temp.sort()
temp.forEach((name)=>{
  result[name] = connections[name]
})
fs.writeFileSync("connections.json", JSON.stringify(result))
console.log(stairs)
console.log(shared)
unqiue_destinations = unqiue_destinations.concat(Object.keys(shared))
fs.writeFileSync("destinations.json", JSON.stringify(unqiue_destinations.sort()))
fs.writeFileSync("shared.json", JSON.stringify(shared))