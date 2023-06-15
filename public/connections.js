
const floor = {
    "U-218A":2,
    "STAIR-HB2":2,
    "CORRIDOR-B3":2,
    "U-228":2,
    "U-216":2,
    "U-214-2":2,
    "U-215":2,
    "U-200":2,
    "U-204":2,
    "U-202":2,
    "U-203":2,
    "U-201":2,
    "N-200-0-5-15":2,
    "U-205":2,
    "N-200-0-5-49":2,
    "U-229":2,
    "U-227":2,
    "U-226":2,
    "U-223":2,
    "U-222":2,
    "N-200-0-5-83":2,
    "STAIR-HH2":2,
    "U-220":2,
    "U-219":2,
    "STAIR-HD2":2,
    "N-200-0-5-6":2,
    "U-213":2,
    "U-214-1":2,
    "U-212":2,
    "U-210":2,
    "U-209":2,
    "U-208":2,
    "U-211":2,
    "U-207":2,
    "U-206":2,
    "N-200-9":2,
    "BATHROOM-S":2,
    "N-14":2,
    "N-211-9":2,
    "N-211":2,
    "N-210":2,
    "BATHROOM-SB":2,
    "STAIR-NA2":2,
    "N-215":2,
    "N-208":2,
    "N-200":2,
    "N-206":2,
    "path555885-4":2,
    "N-201":2,
    "N-202":2,
    "N-204":2,
    "BATHROOM-ST":2,
    "N-205":2,
    "N-203":2,
    "N-200D":2,
    "circle950":2,
    "STAIR-HE2":2,
    "CORRIDOR2-GNB":2,
    "U-217":2,
    "U-224":2,
    "U-225":2,
    "BATHROOM-EW2":3,
    "WCOR-1":3,
    "US-LIBRARY-EW2":3,
    "US-LIBRARY-EW1":3,
    "MB-NS1":3,
    "WB-NS1":3,
    "N-303":3,
    "N-304-EW2":3,
    "N-301":3,
    "N-302-EW2":3,
    "STAIR-NB":3,
    "N-314":3,
    "N-313":3,
    "N-312-EW2":3,
    "N-311":3,
    "N-310":3,
    "N-309":3,
    "N-308":3,
    "N-305":3,
    "N-307-EW2":3,
    "N-306":3,
    "N-315":3,
    "N-316":3,
    "N-317":3,
    "N-318":3,
    "N-312-EW1":3,
    "STAIR-HF":3,
    "N-330":3,
    "N-302-EW1":3,
    "N-329":3,
    "N-304-EW1":3,
    "N-328":3,
    "N-327":3,
    "N-306A":3,
    "N-307-EW1":3,
    "N-326":3,
    "BATHROOM-EW1":3,
    "N-325":3,
    "N-324":3,
    "N-323":3,
    "N-322":3,
    "N-321":3,
    "N-320":3,
    "STAIR-NA":3,
}

const stair = {
    "STAIR-NA":2,
    "STAIR-HB2":2,
    "STAIR-HH2":2,
    "STAIR-NA2":2,
    "STAIR-HE2":2,
    "STAIR-NB":3,
    "STAIR-HF":3,
}

const connections = {
    "WCOR-1": ["N-320", ],
    "N-320": ["N-321", "WCOR-1", ],
    "N-321": ["N-320", "N-322", ],
    "N-322": ["N-321", "N-323", "N-324", ],
    "N-323": ["N-322", "N-324", "N-325", ],
    "N-324": ["N-322", "N-323", "N-325", ],
    "N-325": ["N-323", "N-324", "BATHROOM-EW1", "N-312-EW1"],
    "N-312-EW1": ["N-323", "N-324", "BATHROOM-EW1", "N-325"],
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
    "US-LIBRARY-EW2": ["STAIR-NB", "US-LIBRARY-EW1"],
    "US-LIBRARY-EW1": ["US-LIBRARY-EW2", "STAIR-HF"],

    "STAIR-NA2": ["N-210", "N-208"],
    "N-210": ["STAIR-NA2", "N-211"],
    "N-211": ["N-210"],
    "N-208": ["STAIR-NA2", "N-207"],
    "N-207": ["N-208", "N-206"],
    "N-206": ["N-207", "BATHROOM-ST"],
    "BATHROOM-ST": ["N-206", "N-214", "N-205"],
    "N-205": ["BATHROOM-ST", "N-204"],
    "N-204": ["N-205", "N-203"],
    "N-203": ["N-204", "N-202"],
    "N-202": ["N-203", "N-201"],
    "N-201": ["N-200", "N-202"],
    "N-214": ["BATHROOM-ST", "BATHROOM-S"],
    "BATHROOM-S": ["N-214", "N-213"],
    "N-213": ["BATHROOM-S", "BATHROOM-SB"],
    "BATHROOM-SB": ["N-212", "N-215"],
    "N-212": ["BATHROOM-SB"],
    "N-215": ["BATHROOM-SB"],
    "N-200": ["N-201", "STAIR-NB2"],
    "STAIRNB-2": ["N-200", "U-206"],
    "U-206": ["STAIRNB-2", "U-207"],
    "U-207": ["U-206", "U-209"],
    "U-209": ["U-207", "U-208"],
    "U-208": ["U-209", "U-211"],
    "U-211": ["U-208", "U-210"],
    "U-210": ["U-211", "U-212"],
    "U-212": ["U-210", "U-213"],
















}

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
            const cost = oldCost + Math.abs(currentNode.cx.baseVal.value - node.cx.baseVal.value) + Math.abs(currentNode.cy.baseVal.value - node.cy.baseVal.value)
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
        const solution = path.reverse()
        removeAllLines()
        addYouAreHere(endX, endY, 3)
        for (let i = 1; i < solution.length; i++) {
            const n1 = document.getElementById(solution[i])
            const n2 = document.getElementById(solution[i - 1])
            addLine(n1.cx.baseVal.value, n1.cy.baseVal.value, n2.cx.baseVal.value, n2.cy.baseVal.value)
        }
        return solution
    } else {
        console.timeEnd()
        return []
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
    youAreHereLabel.setAttributeNS('http://www.w3.org/1999/xlink','href', 'here.png');
    youAreHereLabel.setAttribute('x', String(x))
    youAreHereLabel.setAttribute('y', String(y))
    
    youAreHereLabel.setAttribute('height', '.8rem')
    youAreHereLabel.classList.add('you-here')
    // youAreHereLabel.setAttribute('fill', 'green')
    const key = {
        2: 'svg2',
        3: "svg5"
    }
    
    document.getElementById(key[floor]).append(youAreHereLabel)
}

function clearYouAreHere(){
    Array.from(document.getElementsByClassName('you-here')).forEach((e)=>{
        e.remove()
    })
}

function addLine(x1, y1, x2, y2) {
    var newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    newLine.setAttribute('id', 'line2');
    newLine.setAttribute('x1', x1);
    newLine.setAttribute('y1', y1);
    newLine.setAttribute('x2', x2);
    newLine.setAttribute('y2', y2);
    newLine.classList.add('path_line')
    newLine.setAttribute("stroke", "blue")

    document.getElementById('svg5').append(newLine);
}

function toTextBased(path) {
    // N = north, S= south, E = east, W = west
    let directions = []
    for (let i = path.length - 1; i > 1; i--) {
        const node1 = document.getElementById(path[i - 2]);
        const node2 = document.getElementById(path[i - 1]);
        const node3 = document.getElementById(path[i]);
        if (i == (path.length - 1)) {
            directions.push("You are at " + node3.id);
        }
        if (((Math.abs(node1.cx.baseVal.value - node2.cx.baseVal.value)) < (Math.abs(node1.cy.baseVal.value - node2.cy.baseVal.value))) && ((Math.abs(node2.cx.baseVal.value - node3.cx.baseVal.value)) > (Math.abs(node2.cy.baseVal.value - node3.cy.baseVal.value)))) {
            if ((node2.cx.baseVal.value > node3.cx.baseVal.value) && (node1.cy.baseVal.value > node2.cy.baseVal.value)) {
                console.log("here1");
                directions.push("Turn right by " + node2.id);
            }
            if ((node2.cx.baseVal.value > node3.cx.baseVal.value) && (node1.cy.baseVal.value < node2.cy.baseVal.value)) {
                console.log("here1");
                directions.push("Turn left by " + node2.id);
            }

        }
        if (((Math.abs(node1.cx.baseVal.value - node2.cx.baseVal.value)) > (Math.abs(node1.cy.baseVal.value - node2.cy.baseVal.value))) && ((Math.abs(node2.cx.baseVal.value - node3.cx.baseVal.value)) < (Math.abs(node2.cy.baseVal.value - node3.cy.baseVal.value)))) {
            if ((node2.cy.baseVal.value > node3.cy.baseVal.value) && (node1.cx.baseVal.value > node2.cx.baseVal.value)) {
                console.log("here1");
                directions.push("Turn left by " + node2.id);
            }
            if ((node2.cy.baseVal.value > node3.cy.baseVal.value) && (node1.cx.baseVal.value < node2.cx.baseVal.value)) {
                console.log("here1");
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

        if (i == 2) {
            directions.push("You have arrived at " + node1.id)
        }
    }
    console.log(directions);
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