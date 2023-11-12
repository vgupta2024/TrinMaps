const shortestPath = function(startNodeID, endNodeID) {
  console.time()
  const endNode = document.getElementById(endNodeID)
  const startNode = document.getElementById(startNodeID)
  const startX = startNode.cx.baseVal.value,
      startY = startNode.cy.baseVal.value
  const endX = endNode.cx.baseVal.value,
      endY = endNode.cy.baseVal.value
  let node_data = {
      // nodeID : {
      //   distance : // Manhattan distance from endNode
      //   cost : // culmulative costs to reach node from start
      //   previous : // previous node
      // }
  }
  let solved = false
  let existingNeighbors = new Set()
  let existingVisted = new Set()
  existingVisted.add(startNodeID)
  let touching = [...connections[startNodeID]]
  touching.forEach((nodeID) => {
      existingNeighbors.add(nodeID)
      const node = document.getElementById(nodeID)
      const weight = Math.abs(startNode.cx.baseVal.value - node.cx.baseVal.value) + Math.abs(startNode.cy.baseVal.value - node.cy.baseVal.value)
      const cell_formatted = {
          distance: Math.abs(node.cx.baseVal.value - endX) + Math.abs(node.cy.baseVal.value - endY),
          cost: weight,
          previous: startNodeID,
      }
      node_data[nodeID] = cell_formatted
  })
  touching = touching.sort((nodeID1, nodeID2) => {
      const n1 = node_data[nodeID1]
      const n2 = node_data[nodeID2]
      return n2.cost + n2.distance - n1.cost - n2.distance
  })
  while (touching.length && !solved) {

      const currentID = touching.pop()
      existingNeighbors.delete(currentID)
      if (currentID == endNodeID) {
          solved = true
          break
      } else {
          existingVisted.add(currentID)
      }
      let oldCost = node_data[currentID].cost
      const currentNode = document.getElementById(currentID)
      let newNeighbors = [...connections[currentID]].filter((neighbor_node) => {
          return !existingVisted.has(neighbor_node)
      })
      let requireReorder = newNeighbors.filter((neighborID) => {
          const node = document.getElementById(neighborID)
          const stairCost = currentID.split('-')[0] == "STAIR" && neighborID.split('-')[0] == "STAIR" ? 1:0
          const cost = oldCost + Math.abs(currentNode.cx.baseVal.value - node.cx.baseVal.value) + Math.abs(currentNode.cy.baseVal.value - node.cy.baseVal.value)+(stairCost*100)
          if (existingNeighbors.has(neighborID)) {
              if (cost < node_data[neighborID].cost) {
                  node_data[neighborID].cost = cost
                  node_data[neighborID].previous = currentID
                  touching.splice(touching.indexOf(neighborID), 1);
                  return true
              }
              return false
          } else {
              const distance = Math.abs(node.cx.baseVal.value - endX) + Math.abs(node.cy.baseVal.value - endY)
              node_data[neighborID] = {
                  distance: distance,
                  cost: cost,
                  previous: currentID
              }
              existingNeighbors.add(neighborID)
              return true
          }
      })
      requireReorder.forEach((id) => {
          insertSorted(touching, id, node_data)
      })
  }
  if (solved) {
      let path = []
      let next = endNodeID
      while (next !== startNodeID) {
          path.push(next)
          next = node_data[next].previous
      }
      path.push(next)
      console.timeEnd()
      
      return {
        solution: path.reverse(),
        distance: node_data[endNodeID].distance+node_data[endNodeID].cost
      }
  } else {
      console.timeEnd()
      return {
        solution:[],
        distance: Infinity,
      }
  }
}

function showSolution(solution){
  removeAllLines()
  // addYouAreHere(endX, endY, endNode.closest("svg").getAttribute('id'))
  for (let i = 1; i < solution.length; i++) {
      const n1 = document.getElementById(solution[i])
      const n2 = document.getElementById(solution[i - 1])
      if(!(solution[i].split('-')[0] === "STAIR" && solution[i-1].split('-')[0] === "STAIR")){
        addLine(n1.cx.baseVal.value, n1.cy.baseVal.value, n2.cx.baseVal.value, n2.cy.baseVal.value,n1.closest("svg").getAttribute('id'), solution)
      }
  }
}

function insertSorted(mainArray, cellID, cell_data) {
  // Binary search to insert into a sorted array
  let left = 0;
  let right = mainArray.length - 1;
  const small_data = cell_data[cellID];
  const small_weight = small_data.distance + small_data.cost;
  while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const middle_data = cell_data[mainArray[mid]];
      if (middle_data.cost + middle_data.distance > small_weight) {
          left = mid + 1;
      } else {
          right = mid - 1;
      }
  }
  const index = left;
  mainArray.splice(index, 0, cellID);
}

// console.log(shortestPath("N-330", "N-301"))
// console.log(shortestPath("N-327", "STAIR-HF"))
// console.log(shortestPath("N-316", "N-304-EW2"))
// console.log(shortestPath("N-330", "N-301"))
// console.log(shortestPath("US-LIBRARY-EW1", "N-301"))
// console.log(shortestPath("US-LIBRARY-EW1","N-329"))
// console.log(shortestPath("US-LIBRARY-EW2","N-310"))
// console.log("AUTOMATING TEST CASES")
/*function inf(){
setTimeout(()=>{
  const n_list = Object.keys(connections)
  const start = n_list[Math.floor(Math.random()*n_list.length)], end = n_list[Math.floor(Math.random()*n_list.length)]
  console.log(`Start: ${start}, End ${end}, Path: ${JSON.stringify(shortestPath(start, end))}`)
  inf()
}, 500)
}
inf()*/

function removeAllLines() {
  Array.from(document.getElementsByClassName('path_line')).forEach((el) => {
      el.remove()
  })
}

function addYouAreHere(x, y, floor) {
  console.log('called')
  var youAreHereLabel = document.createElementNS('http://www.w3.org/2000/svg', 'image');
  youAreHereLabel.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'here.png');
  youAreHereLabel.setAttribute('x', String(x))
  youAreHereLabel.setAttribute('y', String(y))

  youAreHereLabel.setAttribute('height', '.8rem')
  youAreHereLabel.classList.add('you-here')
      // youAreHereLabel.setAttribute('fill', 'green')

  document.getElementById(floor).append(youAreHereLabel)
}

function clearYouAreHere() {
  Array.from(document.getElementsByClassName('you-here')).forEach((e) => {
      e.remove()
  })
}

function addLine(x1, y1, x2, y2, floor, solution) {
  var newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  newLine.href = toTextBased(solution);
  newLine.setAttribute('id', 'line2');
  newLine.setAttribute('x1', x1);
  newLine.setAttribute('y1', y1);
  newLine.setAttribute('x2', x2);
  newLine.setAttribute('y2', y2);
  newLine.classList.add('path_line')
  document.getElementById(floor).append(newLine);
}

function toTextBased(path) {
  // N = north, S= south, E = east, W = west
  let directions = []
  for (let i = path.length - 1; i > 1; i--) {
      const node1 = document.getElementById(path[i - 2]);
      const node2 = document.getElementById(path[i - 1]);
      const node3 = document.getElementById(path[i]);
      const node4 = document.getElementById(path[i - 3]);
      console.log(node3.id.split("-")[0]);
      if (i == (path.length - 1)) {
          directions.push("You are at " + node3.id);
      }
      if(node2.id.split("-")[0]=="STAIR"){
          if(node1.id.split("-")[0]=="STAIR"){
          if((node3.closest("svg").id.split("-")[2] - node4.closest("svg").id.split("-")[2]) > (0)){
            directions.push("Go down the stairs " + Math.abs(node3.closest("svg").id.split("-")[2] - node4.closest("svg").id.split("-")[2]) + " flight(s)");
          }
          if((node3.closest("svg").id.split("-")[2] - node4.closest("svg").id.split("-")[2]) < (0)){
            directions.push("Go up the stairs " + Math.abs(node3.closest("svg").id.split("-")[2] - node4.closest("svg").id.split("-")[2]) + " flight(s)");
          }
        }
      }else{
      if (((Math.abs(node1.cx.baseVal.value - node2.cx.baseVal.value)) < (Math.abs(node1.cy.baseVal.value - node2.cy.baseVal.value))) && ((Math.abs(node2.cx.baseVal.value - node3.cx.baseVal.value)) > (Math.abs(node2.cy.baseVal.value - node3.cy.baseVal.value)))) {
          if ((node2.cx.baseVal.value > node3.cx.baseVal.value) && (node1.cy.baseVal.value > node2.cy.baseVal.value)) {
              directions.push("Turn right by " + node2.id);
          }
          if ((node2.cx.baseVal.value > node3.cx.baseVal.value) && (node1.cy.baseVal.value < node2.cy.baseVal.value)) {
              directions.push("Turn left by " + node2.id);
          }
      }
      if (((Math.abs(node1.cx.baseVal.value - node2.cx.baseVal.value)) > (Math.abs(node1.cy.baseVal.value - node2.cy.baseVal.value))) && ((Math.abs(node2.cx.baseVal.value - node3.cx.baseVal.value)) < (Math.abs(node2.cy.baseVal.value - node3.cy.baseVal.value)))) {
          if ((node2.cy.baseVal.value > node3.cy.baseVal.value) && (node1.cx.baseVal.value > node2.cx.baseVal.value)) {
              directions.push("Turn left by " + node2.id);
          }
          if ((node2.cy.baseVal.value > node3.cy.baseVal.value) && (node1.cx.baseVal.value < node2.cx.baseVal.value)) {
              directions.push("Turn right by " + node2.id);
          }
      }
      if ((Math.abs(node1.cx.baseVal.value - node2.cx.baseVal.value)) < (Math.abs(node1.cy.baseVal.value - node2.cy.baseVal.value))) {
          if (node1.cy.baseVal.value > node2.cy.baseVal.value) {
              directions.push("Move south past " + node2.id);
          } else if (node1.cy.baseVal.value < node2.cy.baseVal.value) {
              directions.push("Move north past " + node2.id);
          }
      } else if ((Math.abs(node1.cx.baseVal.value - node2.cx.baseVal.value)) > (Math.abs(node1.cy.baseVal.value - node2.cy.baseVal.value))) {
          if (node1.cx.baseVal.value > node2.cx.baseVal.value) {
              directions.push("Move east past " + node2.id);
          } else if (node1.cx.baseVal.value < node2.cx.baseVal.value) {
              directions.push("Move west past " + node2.id);
          }
      }
    }
      if (i == 2) {
          directions.push("You have arrived at " + node1.id)
      }
      
  }
  console.log(directions);
  const textDiv = document.getElementById('text-directions')
  textDiv.innerHTML = ""
  directions.forEach((direction)=>{
      const p_element = document.createElement("p")
      p_element.innerHTML = direction
      p_element.classList.add('text-direction')
      textDiv.appendChild(p_element)
  })
  return directions
}

function generateConnections() {
  let connections = {}
  let x_val = {}
  let y_val = {}
  let nodes = Array.from(document.getElementsByTagName('circle')).map((el) => {
      const x = Math.round(el.cx.baseVal.value)
      const y = Math.round(el.cy.baseVal.value)
      let array = [el.id, x, y]
      if (x in x_val) {
          x_val[x].push(array)
      } else {
          x_val[x] = [array]
      }
      if (y in y_val) {
          y_val[y].push(array)
      } else {
          y_val[y] = [array]
      }
      return array
  })

  Object.keys(x_val).forEach((id) => {
      x_val[id].sort((a, b) => {
          return a[2] - b[2]
      })
  })
  Object.keys(y_val).forEach((id) => {
      y_val[id].sort((a, b) => {
          return a[1] - b[1]
      })
  })
  nodes.forEach((array) => {
      connections[array[0]] = []
  })
  console.log(x_val, y_val)
  nodes.forEach((array) => {

      const id = array[0]
      const x = array[1]
      const y = array[2]

      const x_arr = x_val[x]
      const y_arr = y_val[y]

      const x_ind = x_arr.indexOf(array)
      const y_ind = y_arr.indexOf(array)
      const x_len = x_arr.length
      const y_len = y_arr.length
      for (let i = x_ind + 1; i < x_len; i++) {
          const y_diff = Math.abs(x_arr[i][2] - y)
          if (y_diff < 2) {
              if (connections[id].indexOf(x_arr[i][0]) == -1) {
                  connections[id].push(x_arr[i][0])
              }
          } else {
              connections[id].push(x_arr[i][0])
              break
          }
      }
      for (let i = x_ind - 1; i > -1; i--) {
          const y_diff = Math.abs(x_arr[i][2] - y)
          if (y_diff < 2) {
              if (connections[id].indexOf(x_arr[i][0]) == -1) {
                  connections[id].push(x_arr[i][0])
              }
          } else {
              connections[id].push(x_arr[i][0])
              break
          }
      }
      for (let i = y_ind - 1; i > -1; i--) {
          const y_diff = Math.abs(y_arr[i][1] - x)
          if (y_diff < 2) {
              if (connections[id].indexOf(y_arr[i][0]) == -1) {
                  connections[id].push(y_arr[i][0])
              }
          } else {
              connections[id].push(y_arr[i][0])
              break
          }
      }
      for (let i = y_ind + 1; i > y_len; i++) {
          const y_diff = Math.abs(y_arr[i][1] - x)
          if (y_diff < 2) {
              if (connections[id].indexOf(y_arr[i][0]) == -1) {
                  connections[id].push(y_arr[i][0])
              }
          } else {
              connections[id].push(y_arr[i][0])
              break
          }
      }
  })
  return connections
}
function find() {
  console.log(multi_room)
  let to = document.getElementById("to").value;
  let from = document.getElementById("from").value;
  if(from in multi_room && to in multi_room){
    from = multi_room[from]
    to = multi_room[to]
    const solution = from.map((from)=>{
        return to.map((to)=>shortestPath(to, from))
      }).flat(Infinity).sort((a,b)=>a.distance - b.distance)[0].solution
    showSolution(solution)
    toTextBased(solution)
  }else if(from in multi_room){
    from = multi_room[from]
    const solution = from.map((from)=>{
        return shortestPath(to, from);
      }).sort((a,b)=>a.distance - b.distance)[0].solution
    showSolution(solution)
    toTextBased(solution)
  }else if(to in multi_room){
    to = multi_room[to]
    const solution = to.map((to)=>{
        return shortestPath(to, from);
      }).sort((a,b)=>a.distance - b.distance)[0].solution
    showSolution(solution)
    toTextBased(solution)
    
  }else{
    const solution = shortestPath(to, from).solution
    showSolution(solution)
    toTextBased(solution)
  }
}
function changeFloor(n) {
  const offset = 1;
  const num = n - offset;
  let buttons = Array.from(document.getElementsByClassName("floor-select"));
  const current_button = buttons[num];
  buttons.splice(num, 1);
  let car_items = Array.from(
    document.getElementsByClassName("carousel-item")
  );
  console.log(car_items);
  const current_item = car_items[num];
  car_items.splice(num, 1);

  current_button.classList.toggle("floor-selected", true);
  current_item.classList.toggle("active", true);
  buttons.forEach((but) => {
    but.classList.toggle("floor-selected", false);
  });
  car_items.forEach((item) => {
    item.classList.toggle("active", false);
  });
  const name = {
    1: "1st",
    2: "2nd",
    3: "3rd",
    4: "4th",
  };
  document.getElementById("floor-ind").innerHTML = `${name[n]} Floor`;
}