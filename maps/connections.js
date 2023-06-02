const connections = {
  "WCOR-1": ["N-320", ],
  "N-320": ["N-321", "WCOR-1",],
  "N-321": ["N-320", "N-322", ],
  "N-322": ["N-321", "N-323", "N-324", ],
  "N-323": ["N-322", "N-324", "N-325", ],
  "N-324": ["N-322", "N-323", "N-325", ],
  "N-325": ["N-323", "N-324", "BATHROOM-EW1", "N-312-EW1"],
  "N-312-EW1":["N-323", "N-324", "BATHROOM-EW1","N-325"],
  "BATHROOM-EW1": ["N-325", "N-326", "MB-NS1"],
  "N-326": ["BATHROOM-EW1", "N-307-EW1", ],
  "N-307-EW1": ["N-326", "N-306A", "N-327", ],
  "N-306A": ["N-307-EW1", "N-327", "N-328", ],
  "N-327": ["N-306A", "N-307-EW1", "N-328", ],
  "N-328": ["N-306A", "N-327", "N-323", "N-304-EW1", "N-329", ],
  "N-304-EW1": ["N-328", "N-329", "N-330", "N-302-EW1", ],
  "N-329": ["N-304-EW1", "N-328", "N-330", "N-302-EW1", ],
  "N-302-EW1": ["N-304-EW1", "N-329", "STAIR-HF"],
  "N-330": ["N-304-EW1", "N-329", "STAIR-HF"],
  "STAIR-HF": ["N-330", "N-302-EW1", "US-LIBRARY-EW1"],
  "STAIR-NB": ["N-301", "N-302-EW2", "US-LIBRARY-EW2"],
  "N-302-EW2": ["STAIR-NB", "N-301", "N-303", "N-304-EW2"],
  "N-301": ["STAIR-NB", "N-302-EW2", "N-303", "N-304-EW2"],
  "N-303": ["N-301", "N-302-EW2", "N-304-EW2", "N-305", "N-306"],
  "N-304-EW2": ["N-301", "N-302-EW2", "N-303", "N-305", "N-306"],
  "N-306": ["N-303", "N-304-EW2", "N-305", "N-307-EW2"],
  "N-307-EW2": ["N-306", "N-305", "N-308"],
  "N-305": ["N-303", "N-304-EW2", "N-306", "N-308"],
  "N-308": ["N-307-EW2", "N-309"],
  "N-309": ["N-308", "BATHROOM-EW2"],
  "BATHROOM-EW2": ["N-309", "WB-NS1", "N-310"],
  "N-310": ["BATHROOM-EW2", "N-311"],
  "N-311": ["N-310", "N-312-EW2", "N-313"],
  "N-312-EW2": ["N-313", "N-310", "N-314"],
  "N-313": ["N-310", "N-312-EW2", "N-314"],
  "N-314": ["N-312-EW2", "N-313", "N-315"],
  "N-315": ["N-314", "N-317", "N-316"],
  "N-317": ["N-316", "N-315", "N-318"],
  "N-316": ["N-317", "N-315", "N-318"],
  "N-318": ["N-317", "N-316", "STAIR-NA"],
  "STAIR-NA": ["N-318", "WCOR-1"],
  "WB-NS1": ["MB-NS1", "BATHROOM-EW2"],
  "MB-NS1": ["WB-NS1", "BATHROOM-EW1"],
  "US-LIBRARY-EW2":["STAIR-NB", "US-LIBRARY-EW1"],
  "US-LIBRARY-EW1":["US-LIBRARY-EW2", "STAIR-HF"],
}

function shortestPath(startNodeID, endNodeID){
  console.time()
  const endNode = document.getElementById(endNodeID)
  const startNode = document.getElementById(startNodeID)
  const endX = endNode.cx.baseVal.value, endY = endNode.cy.baseVal.value
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
  touching.forEach((nodeID)=>{
    existingNeighbors.add(nodeID)
    const node = document.getElementById(nodeID)
    const weight = Math.abs(startNode.cx.baseVal.value-node.cx.baseVal.value) + Math.abs(startNode.cy.baseVal.value-node.cy.baseVal.value)
    const cell_formatted = {
      distance: Math.abs(node.cx.baseVal.value-endX) + Math.abs(node.cy.baseVal.value-endY),
      cost: weight,
      previous: startNodeID,
    }
    node_data[nodeID]= cell_formatted
  })
  touching = touching.sort((nodeID1, nodeID2)=>{
    const n1 = node_data[nodeID1]
    const n2 = node_data[nodeID2]
    return n2.cost+n2.distance - n1.cost - n2.distance
  })
  while (touching.length && !solved){
    
    const currentID = touching.pop()
    existingNeighbors.delete(currentID)
    if(currentID == endNodeID){
      solved = true
      break
    }else{
      existingVisted.add(currentID)
    }
    let oldCost = node_data[currentID].cost
    const currentNode = document.getElementById(currentID)
    let newNeighbors = [...connections[currentID]].filter((neighbor_node)=>{
      return !existingVisted.has(neighbor_node)
    })
    let requireReorder= newNeighbors.filter((neighborID)=>{
      const node = document.getElementById(neighborID)
      const cost = oldCost + Math.abs(currentNode.cx.baseVal.value-node.cx.baseVal.value) + Math.abs(currentNode.cy.baseVal.value-node.cy.baseVal.value)
      if(existingNeighbors.has(neighborID)){   
        if(cost < node_data[neighborID].cost){
          node_data[neighborID].cost = cost
          node_data[neighborID].previous = currentID
          touching.splice(touching.indexOf(neighborID), 1);
          return true
        }
        return false
      }else{
        const distance = Math.abs(node.cx.baseVal.value-endX) + Math.abs(node.cy.baseVal.value-endY)
        node_data[neighborID] = {
          distance: distance,
          cost: cost,
          previous: currentID
        }
        existingNeighbors.add(neighborID)
        return true
      }
    })
    requireReorder.forEach((id)=>{
      insertSorted(touching, id, node_data)
    })
  }
  if(solved){
    let path = []
    let next=endNodeID
    while(next !== startNodeID){
      path.push(next)
      next = node_data[next].previous
    }
    path.push(next)
    console.timeEnd()
    const solution = path.reverse()
    removeAllLines()
    for(let i = 1; i < solution.length; i++) {
      const n1 = document.getElementById(solution[i])
      const n2 = document.getElementById(solution[i-1])
      addLine(n1.cx.baseVal.value, n1.cy.baseVal.value, n2.cx.baseVal.value, n2.cy.baseVal.value)
    }
    return solution
  }else{
    console.timeEnd()
    return "Impossible"
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

console.log(shortestPath("N-330", "N-301"))
console.log(shortestPath("N-327", "STAIR-HF"))
console.log(shortestPath("N-316", "N-304-EW2"))
console.log(shortestPath("N-330", "N-301"))
console.log(shortestPath("US-LIBRARY-EW1", "N-301"))
console.log(shortestPath("US-LIBRARY-EW1","N-329"))
console.log(shortestPath("US-LIBRARY-EW2","N-310"))
console.log("AUTOMATING TEST CASES")
function inf(){
  setTimeout(()=>{
    const n_list = Object.keys(connections)
    const start = n_list[Math.floor(Math.random()*n_list.length)], end = n_list[Math.floor(Math.random()*n_list.length)]
    console.log(`Start: ${start}, End ${end}, Path: ${JSON.stringify(shortestPath(start, end))}`)
    inf()
  }, 500)
}
inf()

function removeAllLines(){
  Array.from(document.getElementsByClassName('path_line')).forEach((el)=>{
    el.remove()
  })
}

function addLine(x1,y1,x2,y2) {
  var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
  newLine.setAttribute('id','line2');
  newLine.setAttribute('x1',x1);
  newLine.setAttribute('y1',y1);
  newLine.setAttribute('x2',x2);
  newLine.setAttribute('y2',y2);
  newLine.classList.add('path_line')
  newLine.setAttribute("stroke", "blue")

  document.getElementById('svg5').append(newLine);
}