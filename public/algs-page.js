const rooms = Object.keys(connections);
let time_chart = null;
let bar_chart = null;
let visited_chart = null;
let table = null;
let floyd_visited,
  floyd_time,
  distanceMatrix = null;
let floyd_visited_matrix,
  floyd_time_matrix,
  distanceMatrix_matrix = null;

function parseUnique(array, set) {
  let unique = [];
  for (let i = 0; i < array.length; i++) {
    !set.has(array[i]) ? unique.push(array[i]) : null;
  }
  return unique;
}
const createFloydMatrix_matrix = function () {
  const start = performance.now();
  let count = 0;
  let distanceMatrix_2 = [];
  for(let i = 0; i < rooms.length; i++){
    let arr = []
    for(let q=0;q < rooms.length; q++){
      arr.push(Infinity)
    }
    distanceMatrix_2.push(arr)
  }

  for (let i = 0; i < rooms.length; i++) {
    distanceMatrix_2[i][i] = 0;
  }

  for (let i = 0; i < rooms.length; i++) {
    const arr1 =connections_matrix[i]
    for (let q = 0; q < rooms.length; q++) {
      if(arr1[q]){
        const node = document.getElementById(rooms[i]);
        const node1 = document.getElementById(rooms[q]);
        const weight =
          Math.abs(node1.cx.baseVal.value - node.cx.baseVal.value) +
          Math.abs(node1.cy.baseVal.value - node.cy.baseVal.value);
        distanceMatrix_2[i][q] = weight;
      }
    }
  }

  for (let k = 0; k < rooms.length; k++) {
    for (let i = 0; i < rooms.length; i++) {
      for (let j = 0; j < rooms.length; j++) {
        count++;
        const ikjSum = distanceMatrix_2[i][k] + distanceMatrix_2[k][j];
        if (ikjSum < distanceMatrix_2[i][j]) {
          distanceMatrix_2[i][j] = ikjSum;
        }
      }
    }
  }
  const end = performance.now();
  return [count, end - start, distanceMatrix_2];
};
const createFloydMatrix = function () {
  const start = performance.now();
  let count = 0;
  let distanceMatrix = {};
  for (let nodeID1 in connections) {
    distanceMatrix[nodeID1] = {};
    for (let nodeID2 in connections) {
      distanceMatrix[nodeID1][nodeID2] = Infinity;
    }
  }

  for (let nodeID in connections) {
    distanceMatrix[nodeID][nodeID] = 0;
  }

  for (let nodeID1 in connections) {
    for (let nodeID2 of connections[nodeID1]) {
      const node = document.getElementById(nodeID2);
      const node1 = document.getElementById(nodeID1);
      const weight =
        Math.abs(node1.cx.baseVal.value - node.cx.baseVal.value) +
        Math.abs(node1.cy.baseVal.value - node.cy.baseVal.value);

      distanceMatrix[nodeID1][nodeID2] = weight;
    }
  }

  for (let k in connections) {
    for (let i in connections) {
      for (let j in connections) {
        // console.log(j)
        count++;
        const ikjSum = distanceMatrix[i][k] + distanceMatrix[k][j];
        if (ikjSum < distanceMatrix[i][j]) {
          distanceMatrix[i][j] = ikjSum;
        }
      }
    }
  }
  const end = performance.now();
  return [count, end - start, distanceMatrix];
};
const floydNoMatrix = async function (startNodeID, endNodeID) {
  let path = [startNodeID];
  let current_node = startNodeID;
  let count = 1;
  while (current_node !== endNodeID) {
    let nextNodeID = null;
    let minDistance = Infinity;
    count++;
    for (let neighborID of connections[current_node]) {
      if (distanceMatrix[neighborID][endNodeID] < minDistance) {
        minDistance = distanceMatrix[neighborID][endNodeID];
        nextNodeID = neighborID;
      }
    }
    if (nextNodeID === null) {
      return [];
    }
    path.push(nextNodeID);
    current_node = nextNodeID;
  }
  return {
    path: path,
    visited: count,
  };
};

const floydNoMatrix_matrix = async function (startNodeID, endNodeID) {
  startNodeID = rooms.indexOf(startNodeID)
  endNodeID = rooms.indexOf(endNodeID)
  let path = [startNodeID];
  let current_node = startNodeID;
  let count = 1;
  while (current_node !== endNodeID) {
    let nextNodeID = null;
    let minDistance = Infinity;
    count++;
    for (let i = 0; i < rooms.length; i++) {
      if(connections_matrix[current_node][i]){
        if (distanceMatrix_matrix[i][endNodeID] < minDistance) {
          minDistance = distanceMatrix_matrix[i][endNodeID];
          nextNodeID = i;
        }
      }
    }
    if (nextNodeID === null) {
      return [];
    }
    path.push(nextNodeID);
    current_node = nextNodeID;
  }
  return {
    path: path,
    visited: count,
  };
};
const floydWarshall = async function (startNodeID, endNodeID) {
  let distanceMatrix = {};
  let count = 0;
  const start = performance.now();
  for (let nodeID1 in connections) {
    distanceMatrix[nodeID1] = {};
    for (let nodeID2 in connections) {
      distanceMatrix[nodeID1][nodeID2] = Infinity;
    }
  }

  for (let nodeID in connections) {
    distanceMatrix[nodeID][nodeID] = 0;
  }

  for (let nodeID1 in connections) {
    for (let nodeID2 of connections[nodeID1]) {
      const node = document.getElementById(nodeID2);
      const weight =
        Math.abs(
          document.getElementById(nodeID1).cx.baseVal.value -
            node.cx.baseVal.value
        ) +
        Math.abs(
          document.getElementById(nodeID1).cy.baseVal.value -
            node.cy.baseVal.value
        );

      distanceMatrix[nodeID1][nodeID2] = weight;
    }
  }

  for (let k in connections) {
    for (let i in connections) {
      for (let j in connections) {
        if (
          distanceMatrix[i][k] + distanceMatrix[k][j] <
          distanceMatrix[i][j]
        ) {
          distanceMatrix[i][j] = distanceMatrix[i][k] + distanceMatrix[k][j];
        }
      }
    }
  }
  const end = performance.now();
  let path = [startNodeID];
  while (startNodeID !== endNodeID) {
    let nextNodeID = null;
    let minDistance = Infinity;
    for (let neighborID of connections[startNodeID]) {
      if (distanceMatrix[neighborID][endNodeID] < minDistance) {
        minDistance = distanceMatrix[neighborID][endNodeID];
        nextNodeID = neighborID;
      }
    }
    if (nextNodeID === null) {
      console.log("No path found");
      return [];
    }
    path.push(nextNodeID);
    startNodeID = nextNodeID;
  }

  return {
    path: path,
    visited: 10000,
  };
};
const bellmanFord = async function (startNodeID, endNodeID) {
  if (startNodeID == endNodeID) {
    return { path: [startNodeID, endNodeID], visited: 0 };
  }
  let count = 0;
  let node_data = {};
  let update = true;
  for (const nodeID in connections) {
    node_data[nodeID] = {
      distance: Infinity,
      previous: null,
    };
  }
  node_data[startNodeID].distance = 0;

  for (let i = 0; i < Object.keys(connections).length - 1 && update; i++) {
    update = false;
    for (const sourceNodeID in connections) {
      count++;
      for (const targetNodeID of connections[sourceNodeID]) {
        const sourceNode = document.getElementById(sourceNodeID);
        const targetNode = document.getElementById(targetNodeID);

        const weight =
          Math.abs(sourceNode.cx.baseVal.value - targetNode.cx.baseVal.value) +
          Math.abs(sourceNode.cy.baseVal.value - targetNode.cy.baseVal.value);

        const newDistance = node_data[sourceNodeID].distance + weight;

        if (newDistance < node_data[targetNodeID].distance) {
          node_data[targetNodeID].distance = newDistance;
          node_data[targetNodeID].previous = sourceNodeID;
          update = true;
        }
      }
    }
  }
  let path = [];
  let next = endNodeID;
  while (next !== startNodeID) {
    path.push(next);
    next = node_data[next].previous;
  }
  path.push(next);
  return {
    path: path,
    visited: count,
  };
};
const bellmanFord_matrix = async function (startNodeID, endNodeID) {
  startNodeID = rooms.indexOf(startNodeID)
  endNodeID = rooms.indexOf(endNodeID)
  if (startNodeID == endNodeID) {
    return { path: [startNodeID, endNodeID], visited: 0 };
  }
  let count = 0;
  let node_data = [];
  let update = true;
  for (let i = 0; i < rooms.length; i++) {
    node_data[i] = {
      distance: Infinity,
      previous: null,
    };
  }
  node_data[startNodeID].distance = 0;

  for (let a = 0; a < rooms.length - 1 && update; a++) {
    update = false;
    for (let i = 0; i < rooms.length; i++) {
      count++;
      for (let q = 0; q < rooms.length; q++) {
        if(connections_matrix[i][q]){
          const sourceNode = document.getElementById(rooms[i]);
          const targetNode = document.getElementById(rooms[q]);
  
          const weight =
            Math.abs(sourceNode.cx.baseVal.value - targetNode.cx.baseVal.value) +
            Math.abs(sourceNode.cy.baseVal.value - targetNode.cy.baseVal.value);
  
          const newDistance = node_data[i].distance + weight;
  
          if (newDistance < node_data[q].distance) {
            node_data[q].distance = newDistance;
            node_data[q].previous = i;
            update = true;
          }
        }
      }
    }
  }
  let path = [];
  let next = endNodeID;
  while (next !== startNodeID) {
    path.push(next);
    next = node_data[next].previous;
  }
  path.push(next);
  return {
    path: path,
    visited: count,
  };
};
const dfs = async (startNodeID, endNodeID) => {
  let visited = new Set();
  visited.add("START");
  visited.add(startNodeID);
  let path = [startNodeID];
  let currentNodeID = startNodeID;
  outerloop: while (visited.size < rooms.length - 2 && path.length) {
    let neighbors = connections[currentNodeID];
    let newNodeID = "START";
    while (visited.has(newNodeID)) {
      neighbors = parseUnique(neighbors, visited);
      if (neighbors.length) {
        newNodeID = neighbors[Math.floor(Math.random() * neighbors.length)];
      } else {
        path.pop();
        currentNodeID = path[path.length - 1];
        if (path.length) {
          continue outerloop;
        } else {
          return [];
        }
      }
    }
    path.push(newNodeID);
    if (newNodeID == endNodeID) {
      break;
    }
    visited.add(newNodeID);
    currentNodeID = newNodeID;
  }
  return {
    path: path,
    visited: visited.size,
  };
};
const dfs_matrix = async (startNodeID, endNodeID) => {
  startNodeID = rooms.indexOf(startNodeID)
  endNodeID = rooms.indexOf(endNodeID)
  let visited = new Set();
  visited.add("START");
  visited.add(startNodeID);
  let path = [startNodeID];
  let currentNodeID = startNodeID;
  outerloop: while (visited.size < rooms.length - 2 && path.length) {
    let neighbors = grabNeighbors(currentNodeID);
    let newNodeID = "START";
    while (visited.has(newNodeID)) {
      neighbors = parseUnique(neighbors, visited);
      if (neighbors.length) {
        newNodeID = neighbors[Math.floor(Math.random() * neighbors.length)];
      } else {
        path.pop();
        currentNodeID = path[path.length - 1];
        if (path.length) {
          continue outerloop;
        } else {
          return [];
        }
      }
    }
    path.push(newNodeID);
    if (newNodeID == endNodeID) {
      break;
    }
    visited.add(newNodeID);
    currentNodeID = newNodeID;
  }
  return {
    path: path,
    visited: visited.size,
  };
};
function insertSorted(mainArray, cellID, cell_data) {
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
async function bfs_matrix(startNode, endNode) {
  startNode = rooms.indexOf(startNode)
  endNode = rooms.indexOf(endNode)
  const visited = {};
  const queue = [[startNode, [startNode]]];
  visited[startNode] = true;
  while (queue.length > 0) {
    const [currentNode, path] = queue.shift();

    if (currentNode === endNode) {
      return {
        path: path,
        visited: Object.keys(visited).length,
      };
    }
    for (let i = 0; i < rooms.length; i++) {
      if(connections_matrix[currentNode][i]){
        if (!visited[i]) {
          visited[i] = true;
          queue.push([i, [...path, i]]);
        }
      }
    }
  }
  return {
    path: null,
    visited: null,
  };
}
async function bfs(startNode, endNode) {
  const visited = {};
  const queue = [[startNode, [startNode]]];
  visited[startNode] = true;
  while (queue.length > 0) {
    const [currentNode, path] = queue.shift();

    if (currentNode === endNode) {
      return {
        path: path,
        visited: Object.keys(visited).length,
      };
    }
    for (const neighbor of connections[currentNode] || []) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push([neighbor, [...path, neighbor]]);
      }
    }
  }
  return {
    path: null,
    visited: null,
  };
}

const a_star = async function (endNodeID, startNodeID) {
  if (startNodeID == endNodeID) {
    return { path: [startNodeID, endNodeID], visited: 0 };
  }
  const endNode = document.getElementById(endNodeID);
  const startNode = document.getElementById(startNodeID);
  const endX = endNode.cx.baseVal.value,
    endY = endNode.cy.baseVal.value;
  let node_data = {
    // nodeID : {
    //   distance : // Manhattan distance from endNode
    //   cost : // culmulative costs to reach node from start
    //   previous : // previous node
    // }
  };
  let solved = false;
  let existingNeighbors = new Set();
  let existingVisted = new Set();
  existingVisted.add(startNodeID);
  let touching = [...connections[startNodeID]];
  touching.forEach((nodeID) => {
    existingNeighbors.add(nodeID);
    const node = document.getElementById(nodeID);
    const weight =
      Math.abs(startNode.cx.baseVal.value - node.cx.baseVal.value) +
      Math.abs(startNode.cy.baseVal.value - node.cy.baseVal.value);
    const cell_formatted = {
      distance:
        Math.abs(node.cx.baseVal.value - endX) +
        Math.abs(node.cy.baseVal.value - endY),
      cost: weight,
      previous: startNodeID,
    };
    node_data[nodeID] = cell_formatted;
  });
  touching = touching.sort((nodeID1, nodeID2) => {
    const n1 = node_data[nodeID1];
    const n2 = node_data[nodeID2];
    return n2.cost + n2.distance - n1.cost - n2.distance;
  });
  while (touching.length && !solved) {
    const currentID = touching.pop();
    existingNeighbors.delete(currentID);
    if (currentID == endNodeID) {
      solved = true;
      break;
    } else {
      existingVisted.add(currentID);
    }
    let oldCost = node_data[currentID].cost;
    const currentNode = document.getElementById(currentID);
    let newNeighbors = [...connections[currentID]].filter((neighbor_node) => {
      return !existingVisted.has(neighbor_node);
    });
    let requireReorder = newNeighbors.filter((neighborID) => {
      const node = document.getElementById(neighborID);
      const cost =
        oldCost +
        Math.abs(currentNode.cx.baseVal.value - node.cx.baseVal.value) +
        Math.abs(currentNode.cy.baseVal.value - node.cy.baseVal.value);
      if (existingNeighbors.has(neighborID)) {
        if (cost < node_data[neighborID].cost) {
          node_data[neighborID].cost = cost;
          node_data[neighborID].previous = currentID;
          touching.splice(touching.indexOf(neighborID), 1);
          return true;
        }
        return false;
      } else {
        const distance =
          Math.abs(node.cx.baseVal.value - endX) +
          Math.abs(node.cy.baseVal.value - endY);
        node_data[neighborID] = {
          distance: distance,
          cost: cost,
          previous: currentID,
        };
        existingNeighbors.add(neighborID);
        return true;
      }
    });
    requireReorder.forEach((id) => {
      insertSorted(touching, id, node_data);
    });
  }
  if (solved) {
    let path = [];
    let next = endNodeID;
    while (next !== startNodeID) {
      path.push(next);
      next = node_data[next].previous;
    }
    path.push(next);
    return {
      path: path,
      visited: existingVisted.size,
    };
  } else {
    console.log(startNode, endNode, "FAILED");
    return {
      path: [],
      visited: null,
    };
  }
};
const grabNeighbors = function(id){
  let res = [];
  for(let i = 0; i < rooms.length; i++){
    connections_matrix[id][i] ? res.push(i) : null
  }
  return res
}
const a_star_matrix = async function (endNodeID, startNodeID) {
  startNodeID = rooms.indexOf(startNodeID)
  endNodeID = rooms.indexOf(endNodeID)
  if (startNodeID == endNodeID) {
    return { path: [startNodeID, endNodeID], visited: 0 };
  }
  const endNode = document.getElementById(rooms[endNodeID]);
  const startNode = document.getElementById(rooms[startNodeID]);
  const endX = endNode.cx.baseVal.value,
    endY = endNode.cy.baseVal.value;
  let node_data = {
    // nodeID : {
    //   distance : // Manhattan distance from endNode
    //   cost : // culmulative costs to reach node from start
    //   previous : // previous node
    // }
  };
  let solved = false;
  let existingNeighbors = new Set();
  let existingVisted = new Set();
  existingVisted.add(startNodeID);
  let touching = []
  const startArr = connections_matrix[startNodeID]
  for(let i = 0; i < rooms.length; i++){
    if(startArr[i]){
      touching.push(i)
    }
  }
  touching.forEach((nodeID) => {
    existingNeighbors.add(nodeID);
    const node = document.getElementById(rooms[nodeID]);
    const weight =
      Math.abs(startNode.cx.baseVal.value - node.cx.baseVal.value) +
      Math.abs(startNode.cy.baseVal.value - node.cy.baseVal.value);
    const cell_formatted = {
      distance:
        Math.abs(node.cx.baseVal.value - endX) +
        Math.abs(node.cy.baseVal.value - endY),
      cost: weight,
      previous: startNodeID,
    };
    node_data[nodeID] = cell_formatted;
  });
  touching = touching.sort((nodeID1, nodeID2) => {
    const n1 = node_data[nodeID1];
    const n2 = node_data[nodeID2];
    return n2.cost + n2.distance - n1.cost - n2.distance;
  });
  while (touching.length && !solved) {
    const currentID = touching.pop();
    existingNeighbors.delete(currentID);
    if (currentID == endNodeID) {
      solved = true;
      break;
    } else {
      existingVisted.add(currentID);
    }
    let oldCost = node_data[currentID].cost;
    const currentNode = document.getElementById(rooms[currentID]);
    
    let newNeighbors = grabNeighbors(currentID).filter((neighbor_node) => {
      return !existingVisted.has(neighbor_node);
    });
    let requireReorder = newNeighbors.filter((neighborID) => {
      const node = document.getElementById(rooms[neighborID]);
      const cost =
        oldCost +
        Math.abs(currentNode.cx.baseVal.value - node.cx.baseVal.value) +
        Math.abs(currentNode.cy.baseVal.value - node.cy.baseVal.value);
      if (existingNeighbors.has(neighborID)) {
        if (cost < node_data[neighborID].cost) {
          node_data[neighborID].cost = cost;
          node_data[neighborID].previous = currentID;
          touching.splice(touching.indexOf(neighborID), 1);
          return true;
        }
        return false;
      } else {
        const distance =
          Math.abs(node.cx.baseVal.value - endX) +
          Math.abs(node.cy.baseVal.value - endY);
        node_data[neighborID] = {
          distance: distance,
          cost: cost,
          previous: currentID,
        };
        existingNeighbors.add(neighborID);
        return true;
      }
    });
    requireReorder.forEach((id) => {
      insertSorted(touching, id, node_data);
    });
  }
  if (solved) {
    let path = [];
    let next = endNodeID;
    while (next !== startNodeID) {
      path.push(next);
      next = node_data[next].previous;
    }
    path.push(next);
    return {
      path: path,
      visited: existingVisted.size,
    };
  } else {
    console.log(startNode, endNode, "FAILED");
    return {
      path: [],
      visited: null,
    };
  }
};
async function dijkstra(startNode, endNode) {
  let distances = {};
  let predecessors = {};
  let visited = new Set();
  let queue = [startNode];
  distances[startNode] = 0;
  predecessors[startNode] = null;
  while (queue.length) {
    const currentNode = queue.pop();
    if (currentNode === endNode) {
      break;
    }
    visited.add(currentNode);
    for (const neighbor of connections[currentNode]) {
      if (true) {
        const current_node_element = document.getElementById(currentNode);
        const neighbor_node_element = document.getElementById(neighbor);
        const edgeWeight =
          Math.abs(
            current_node_element.cx.baseVal.value -
              neighbor_node_element.cx.baseVal.value
          ) +
          Math.abs(
            current_node_element.cy.baseVal.value -
              neighbor_node_element.cy.baseVal.value
          );
        const potentialDistance = distances[currentNode] + edgeWeight;
        if (neighbor in distances) {
          if (potentialDistance < distances[neighbor]) {
            distances[neighbor] = potentialDistance;
            predecessors[neighbor] = currentNode;
            dij_insertSorted(queue, neighbor, distances);
          }
        } else {
          distances[neighbor] = potentialDistance;
          predecessors[neighbor] = currentNode;
          dij_insertSorted(queue, neighbor, distances);
        }
      }
    }
  }
  const path = [];
  let node = endNode;
  while (node !== null) {
    path.push(node);
    node = predecessors[node];
  }
  return {
    path: path,
    visited: visited.size,
  };
}
async function dijkstra_matrix(startNode, endNode) {
  startNode = rooms.indexOf(startNode)
  endNode = rooms.indexOf(endNode)
  let distances = {};
  let predecessors = {};
  let visited = new Set();
  let queue = [startNode];
  distances[startNode] = 0;
  predecessors[startNode] = null;
  while (queue.length) {
    const currentNode = queue.pop();
    if (currentNode === endNode) {
      break;
    }
    visited.add(currentNode);
    for (let i = 0; i < rooms.length; i++) {
      if (connections_matrix[currentNode][i]) {
        const current_node_element = document.getElementById(rooms[currentNode]);
        const neighbor_node_element = document.getElementById(rooms[i]);
        const edgeWeight =
          Math.abs(
            current_node_element.cx.baseVal.value -
              neighbor_node_element.cx.baseVal.value
          ) +
          Math.abs(
            current_node_element.cy.baseVal.value -
              neighbor_node_element.cy.baseVal.value
          );
        const potentialDistance = distances[currentNode] + edgeWeight;
        if (i in distances) {
          if (potentialDistance < distances[i]) {
            distances[i] = potentialDistance;
            predecessors[i] = currentNode;
            dij_insertSorted(queue, i, distances);
          }
        } else {
          distances[i] = potentialDistance;
          predecessors[i] = currentNode;
          dij_insertSorted(queue, i, distances);
        }
      }
    }
  }
  const path = [];
  let node = endNode;
  while (node !== null) {
    path.push(node);
    node = predecessors[node];
  }
  return {
    path: path,
    visited: visited.size,
  };
}
function dij_insertSorted(mainArray, cellID, cell_data) {
  let left = 0;
  let right = mainArray.length - 1;
  const small_weight = cell_data[cellID];
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const middle_data = cell_data[mainArray[mid]];
    if (middle_data > small_weight) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  const index = left;
  mainArray.splice(index, 0, cellID);
}

function getCount() {
  const n = Number(document.getElementById("count").value);
  return isNaN(n) ? null : n;
}

function calculate_distance(path, matrix) {
  path = matrix ? path.map(n=>rooms[n]) : path
  let distance = 0;
  let last_node = [
    document.getElementById(path[0]).cx.baseVal.value,
    document.getElementById(path[0]).cy.baseVal.value,
  ];
  for (let i = 1; i < path.length; i++) {
    const newElement = document.getElementById(path[i]);
    let values = [newElement.cx.baseVal.value, newElement.cy.baseVal.value];
    distance += Math.sqrt(
      (values[0] - last_node[0]) ** 2 + (values[1] - last_node[1]) ** 2
    );
    last_node = values;
  }
  return distance;
}

function createBarChart(data) {
  bar_chart = new Chart(document.getElementById("myBarChart"), {
    type: "bar",
    data: data,
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Algorithm Name",
          },
          align: "center",
        },
        y: {
          title: {
            display: true,
            text: "Execution Time (ms)",
          },
          min:0,
          align: "center",
          ticks: {
            callback: function (value, index, values) {
              return value.toFixed(1);
            },
          },
        },
      },
      plugins: {
        colors: {
          enabled: true,
        },
        decimation: {
          enabled: true,
        },
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Execution Time for Matrix vs. Adjacency List Graph Representations",
        },
      },
    },
  });
}
function createTimeChart(data) {
  time_chart = new Chart(document.getElementById("myTimeChart"), {
    type: "scatter",
    data: data,
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Shortest Path Length (nodes)",
          },
          align: "center",
          ticks: {
            textStrokeWidth : 10
          }
        },
        y: {
          title: {
            display: true,
            text: "Execution Time (ms)",
          },
          min:0,
          align: "center",
          ticks: {
            callback: function (value, index, values) {
              return value.toFixed(1);
            },
            textStrokeWidth: 10
          },
        },
      },
      plugins: {
        colors: {
          enabled: true,
        },
        decimation: {
          enabled: true,
        },
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Execution Time vs. Shortest Path Length",
        },
      },
    },
  });
}
function createVisitedChart(data) {
  visited_chart = new Chart(document.getElementById("myVisitedChart"), {
    type: "scatter",
    data: data,
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Shortest Path Length (nodes)",
          },
          align: "center",
        },
        y: {
          title: {
            display: true,
            text: "Visited Nodes (nodes)",
          },
          align: "center",
        },
      },
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Visited Nodes vs. Shortest Path Length",
        },
      },
    },
  });
}
async function runTest() {
  document.getElementById("startScreen").classList.add("noSpace");
  let floyd_test = document.getElementById("floyd_test").checked;
  let bell_test = document.getElementById("bell_test").checked;
  let matrix_test = document.getElementById("matrix_test").checked;
  if (floyd_test) {
    [floyd_visited, floyd_time, distanceMatrix] = await createFloydMatrix();
    [floyd_visited_matrix, floyd_time_matrix, distanceMatrix_matrix] = await createFloydMatrix_matrix();
  }
  const count = getCount();
  let testCombos = [];

  for (let i = 0; i < count; i++) {
    testCombos.push([
      rooms[Math.floor(Math.random() * rooms.length)],
      rooms[Math.floor(Math.random() * rooms.length)],
    ]);
  }
  let algs = [
    {
      name: "A*",
      code: "ast",
      func: a_star,
      type: false,
      avg: {
        path: 0,
        time: 0,
        dist: 0,
        vino: 0,
      },
      time: {
        data: [],
        label: "A*",
      },
      complexity: "O((V+E)*log(V))",
      visited: {
        data: [],
        label: "A*",
      },
    },
    {
      name: "Dijkstra's",
      code: "dij",
      func: dijkstra,
      type: false,
      avg: {
        path: 0,
        time: 0,
        dist: 0,
        vino: 0,
      },
      time: {
        data: [],
        label: "Dijkstra's",
      },
      complexity: "Elog(V)",
      visited: {
        data: [],
        label: "Dijkstra's",
      },
    },
    {
      name: "Bellman Ford",
      code: "bel",
      func: bellmanFord,
      type: false,
      avg: {
        path: 0,
        time: 0,
        dist: 0,
        vino: 0,
      },
      time: {
        data: [],
        label: "Bellman Ford",
      },
      visited: {
        data: [],
        label: "Bellman Ford",
      },
    },
    {
      name: "Floyd Warshall",
      code: "flo",
      func: floydNoMatrix,
      type: false,
      avg: {
        path: 0,
        time: 0,
        dist: 0,
        vino: 0,
      },
      time: {
        data: [],
        label: "Floyd Warshall",
      },
      visited: {
        data: [],
        label: "Floyd Warshall",
      },
    },
    {
      name: "Depth First Search",
      code: "dfs",
      func: dfs,
      type: false,
      avg: {
        path: 0,
        time: 0,
        dist: 0,
        vino: 0,
      },
      time: {
        data: [],
        label: "Depth First Search",
      },
      visited: {
        data: [],
        label: "Depth First Search",
      },
    },
    {
      name: "Breadth First Search",
      code: "bfs",
      func: bfs,
      type: false,
      avg: {
        path: 0,
        time: 0,
        dist: 0,
        vino: 0,
      },
      time: {
        data: [],
        label: "Breadth First Search",
      },
      visited: {
        data: [],
        label: "Breadth First Search",
      },
    },
    {
      name: "A* (matrix)",
      code: "ast",
      func: a_star_matrix,
      type: true,
      avg: {
        path: 0,
        time: 0,
        dist: 0,
        vino: 0,
      },
      time: {
        data: [],
        label: "A* (matrix)",
      },
      complexity: "O((V+E)*log(V))",
      visited: {
        data: [],
        label: "A* (matrix)",
      },
    },
    {
      name: "Dijkstra's (matrix)",
      code: "dij",
      func: dijkstra_matrix,
      type: true,
      avg: {
        path: 0,
        time: 0,
        dist: 0,
        vino: 0,
      },
      time: {
        data: [],
        label: "Dijkstra's (matrix)",
      },
      complexity: "Elog(V)",
      visited: {
        data: [],
        label: "Dijkstra's (matrix)",
      },
    },
    {
      name: "Bellman Ford (matrix)",
      code: "bel",
      func: bellmanFord_matrix,
      type: true,
      avg: {
        path: 0,
        time: 0,
        dist: 0,
        vino: 0,
      },
      time: {
        data: [],
        label: "Bellman Ford (matrix)",
      },
      visited: {
        data: [],
        label: "Bellman Ford (matrix)",
      },
    },
    {
      name: "Floyd Warshall (matrix)",
      code: "flo",
      func: floydNoMatrix_matrix,
      type: true,
      avg: {
        path: 0,
        time: 0,
        dist: 0,
        vino: 0,
      },
      time: {
        data: [],
        label: "Floyd Warshall (matrix)",
      },
      visited: {
        data: [],
        label: "Floyd Warshall (matrix)",
      },
    },
    {
      name: "Depth First Search (matrix)",
      code: "dfs",
      func: dfs_matrix,
      type: true,
      avg: {
        path: 0,
        time: 0,
        dist: 0,
        vino: 0,
      },
      time: {
        data: [],
        label: "Depth First Search (matrix)",
      },
      visited: {
        data: [],
        label: "Depth First Search (matrix)",
      },
    },
    {
      name: "Breadth First Search (matrix)",
      code: "bfs",
      func: bfs_matrix,
      type: true,
      avg: {
        path: 0,
        time: 0,
        dist: 0,
        vino: 0,
      },
      time: {
        data: [],
        label: "Breadth First Search (matrix)",
      },
      visited: {
        data: [],
        label: "Breadth First Search (matrix)",
      },
    },
  ];
  if (!floyd_test && !bell_test) {
    algs.splice(2, 2);
  } else if (!floyd_test) {
    algs.splice(3, 1);
  } else if (!bell_test) {
    algs.splice(2, 1);
  }
  if(matrix_test){
    if (!floyd_test && !bell_test) {
      algs.splice(6, 2);
    } else if (!bell_test) {
      algs.splice(7, 1);
    } else if (!floyd_test){
      algs.splice(8, 1);
    }
  }else{
    algs.splice(algs.length-6)
  }
  console.log(algs)

  for (const combo of testCombos) {
    // const manhattan_distance =
    //   Math.abs(
    //     document.getElementById(combo[0]).cx.baseVal.value -
    //       document.getElementById(combo[1]).cx.baseVal.value
    //   ) +
    //   Math.abs(
    //     document.getElementById(combo[0]).cy.baseVal.value -
    //       document.getElementById(combo[1]).cy.baseVal.value
    //   );
    let manhattan_distance = await a_star(combo[0], combo[1]);
    manhattan_distance = manhattan_distance.path.length;
    for (const alg_data of algs) {
      const startTime = performance.now();
      const result = await alg_data["func"](combo[0], combo[1]);
      const endTime = performance.now();
      const solution = result.path;
      alg_data.avg.time += endTime - startTime;
      alg_data.avg.path += solution.length;
      alg_data.avg.dist += calculate_distance(solution, alg_data.type);
      alg_data.avg.vino += result.visited;
      alg_data.time.data.push({
        x: manhattan_distance,
        y: endTime - startTime,
      });
      alg_data.visited.data.push({
        x: manhattan_distance,
        y: result.visited,
      });
    }
  }
  let tableData = algs.map((alg_data) => {
    return {
      name: alg_data.name,
      path: Math.round((alg_data.avg.path * 1000) / count) / 1000,
      distance: Math.round((alg_data.avg.dist * 1000) / count) / 1000,
      time: Math.round((alg_data.avg.time * 1000) / count) / 1000,
      visited: Math.round((alg_data.avg.vino * 1000) / count) / 1000,
      tpv:
        Math.round(
          ((Math.round((alg_data.avg.time * 1000) / count) / 1000) * 100000) /
            (Math.round((alg_data.avg.vino * 1000) / count) / 1000)
        ) / 100000,
    };
  });
  table = new Tabulator("#myDataTable", {
    data: tableData,
    layout: "fitDataStretch",
    columns: [
      { title: "Algorithm Name", field: "name", width: 150 },
      { title: "Avg. Path Length (nodes)", field: "path" },
      { title: "Avg. Distance (units)", field: "distance" },
      { title: "Avg. Time (ms)", field: "time" },
      { title: "Avg. # of Visited Nodes", field: "visited" },
      { title: "Avg. Time per Visited Node (ms)", field: "tpv" },
    ],
  });
  
  if (floyd_test) {
    if (bell_test) {
      tableData[3].time += ` + ${floyd_time}`;
      tableData[3].visited += ` + ${floyd_visited}`;
    } else {
      tableData[2].time += ` + ${floyd_time}`;
      tableData[2].visited += ` + ${floyd_visited}`;
    }
    if(matrix_test){
      if(bell_test){
        tableData[10].time += ` + ${floyd_time_matrix}`;
        tableData[10].visited += ` + ${floyd_visited_matrix}`;
      }else{
        tableData[8].time += ` + ${floyd_time_matrix}`;
        tableData[8].visited += ` + ${floyd_visited_matrix}`;
      }
    }
  }

  createTimeChart({
    datasets: algs.filter(a=>!a.type).map((alg_data) => {
      return alg_data.time;
    }),
  });
  createVisitedChart({
    datasets: algs.filter(a=>!a.type).map((alg_data) => {
      return alg_data.visited;
    }),
  });
  console.log(algs.filter(a=>!a.type).map((alg_data)=>{return alg_data.name}))
  createBarChart({
    labels: algs.filter(a=>!a.type).map((alg_data)=>{return alg_data.name}),
    datasets: [
      {
        label: 'Adjacency List',
        data: algs.filter(a=>!a.type).map((alg_data) => {
          return Math.round((alg_data.avg.time * 1000) / count) / 1000
        }),
      },
      {
        label: 'Matrix',
        data: algs.filter(a=>a.type).map((alg_data) => {
          return Math.round((alg_data.avg.time * 1000) / count) / 1000
        }),
      }
    ]
  })
  document.getElementById("myDataTable").classList.remove("noSpace");
  // document.getElementById("myGeneralTable").classList.remove("noSpace");
  document.getElementById("timeChartDiv").classList.remove("noSpace");
  document.getElementById("barChartDiv").classList.remove("noSpace");
  document.getElementById("visitedChartDiv").classList.remove("noSpace");
}

function testOptions() {
  document.getElementById("test-options-div").classList.toggle("noSpace");
  document.getElementById("test_options").innerHTML =
    document.getElementById("test_options").innerHTML ===
    "Show Advanced Test Options"
      ? "Hide Advanced Test Options"
      : "Show Advanced Test Options";
}
