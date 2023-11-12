let time_chart = null;
let visited_chart = null;

function parseUnique(array, set) {
  let unique = [];
  for (let i = 0; i < array.length; i++) {
    !set.has(array[i]) ? unique.push(array[i]) : null;
  }
  return unique;
}
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
async function dijkstra(startNode, endNode) {
  let distances = {};
  let predecessors = {};
  let visited = new Set();
  let queue = [startNode]
  distances[startNode] = 0;
  predecessors[startNode] = null
  while (queue.length) {
    const currentNode = queue.pop()
    if (currentNode === endNode) {
      break;
    }
    visited.add(currentNode);
    for (const neighbor of connections[currentNode]) {
      if(true) {
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
            dij_insertSorted(queue, neighbor, distances)
          }
        } else {
          distances[neighbor] = potentialDistance;
          predecessors[neighbor] = currentNode;
          dij_insertSorted(queue, neighbor, distances)
        }
      }
    }
  }
  const path = [];
  let node = endNode;
  while (node !== null) {
    path.push(node)
    node = predecessors[node]
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

function calculate_distance(path) {
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
            text: "Manhattan Distance Between Start and End (units)",
          },
          align: "center",
        },
        y: {
          // max:3,
          title: {
            display: true,
            text: "Execution Time (ms)",
          },
          align: "center",
          ticks: {
            callback: function (value, index, values) {
              return value.toFixed(1);
            },
          },
        },
      },
      plugins: {
        colors:{
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
          text: "Execution Time vs. Manhattan Distance Between Start and End",
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
            text: "Manhattan Distance Between Start and End (units)",
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
          text: "Visited Nodes vs. Manhattan Distance Between Start and End",
        },
      },
    },
  });
}
async function runTest() {
  const count = getCount();
  let testCombos = [];

  for (let i = 0; i < count; i++) {
    testCombos.push([
      rooms[Math.floor(Math.random() * rooms.length)],
      rooms[Math.floor(Math.random() * rooms.length)],
    ]);
  }

  let dij_time_dataset = {
    data: [],
    label: "Dijkstra's",
  };
  let ast_time_dataset = {
    data: [],
    label: "A*",
  };
  let dfs_time_dataset = {
    data: [],
    label: "Depth First Search",
  };
  let bfs_time_dataset = {
    data: [],
    label: "Breadth First Search",
  };
  let dij_visited_dataset = {
    data: [],
    label: "Dijkstra's",
  };
  let ast_visited_dataset = {
    data: [],
    label: "A*",
  };
  let dfs_visited_dataset = {
    data: [],
    label: "Depth First Search",
  };
  let bfs_visited_dataset = {
    data: [],
    label: "Breadth First Search",
  };

  let dij_path_avg = 0;
  let dij_dist_avg = 0;
  let dij_time_avg = 0;
  let dij_vino_avg = 0;

  let ast_path_avg = 0;
  let ast_dist_avg = 0;
  let ast_time_avg = 0;
  let ast_vino_avg = 0;

  let dfs_path_avg = 0;
  let dfs_dist_avg = 0;
  let dfs_time_avg = 0;
  let dfs_vino_avg = 0;

  let bfs_path_avg = 0;
  let bfs_dist_avg = 0;
  let bfs_time_avg = 0;
  let bfs_vino_avg = 0;

  for (const combo of testCombos) {
    const manhattan_distance =
      Math.abs(
        document.getElementById(combo[0]).cx.baseVal.value -
          document.getElementById(combo[1]).cx.baseVal.value
      ) +
      Math.abs(
        document.getElementById(combo[0]).cy.baseVal.value -
          document.getElementById(combo[1]).cy.baseVal.value
      );
    // const sol = await a_star(combo[0], combo[1])
    // const manhattan_distance =sol.path.length
    const dij_startTime = performance.now();
    const dijkstra_result = await dijkstra(combo[0], combo[1]);
    const dij_endTime = performance.now();
    const dij_solution = dijkstra_result.path;
    dij_time_avg += dij_endTime - dij_startTime;
    dij_path_avg += dij_solution.length;
    dij_dist_avg += calculate_distance(dij_solution);
    dij_vino_avg += dijkstra_result.visited;
    dij_time_dataset.data.push({
      x: manhattan_distance,
      y: dij_endTime - dij_startTime,
    });
    dij_visited_dataset.data.push({
      x: manhattan_distance,
      y: dijkstra_result.visited,
    });

    const ast_startTime = performance.now();
    const a_star_result = await a_star(combo[0], combo[1]);
    const ast_endTime = performance.now();
    const ast_solution = a_star_result.path;
    ast_time_avg += ast_endTime - ast_startTime;
    ast_path_avg += ast_solution.length;
    ast_dist_avg += calculate_distance(ast_solution);
    ast_vino_avg += a_star_result.visited;
    ast_time_dataset.data.push({
      x: manhattan_distance,
      y: ast_endTime - ast_startTime,
    });
    ast_visited_dataset.data.push({
      x: manhattan_distance,
      y: a_star_result.visited,
    });

    const dfs_startTime = performance.now();
    const dfs_result = await dfs(combo[0], combo[1]);
    const dfs_endTime = performance.now();
    const dfs_solution = dfs_result.path;
    dfs_time_avg += dfs_endTime - dfs_startTime;
    dfs_path_avg += dfs_solution.length;
    dfs_dist_avg += calculate_distance(dfs_solution);
    dfs_vino_avg += dfs_result.visited;
    dfs_time_dataset.data.push({
      x: manhattan_distance,
      y: dfs_endTime - dfs_startTime,
    });
    dfs_visited_dataset.data.push({
      x: manhattan_distance,
      y: dfs_result.visited,
    });

    const bfs_startTime = performance.now();
    const bfs_result = await bfs(combo[0], combo[1]);
    const bfs_endTime = performance.now();
    const bfs_solution = bfs_result.path;
    bfs_time_avg += bfs_endTime - bfs_startTime;
    bfs_path_avg += bfs_solution.length;
    bfs_dist_avg += calculate_distance(bfs_solution);
    bfs_vino_avg += bfs_result.visited;
    bfs_time_dataset.data.push({
      x: manhattan_distance,
      y: bfs_endTime - bfs_startTime,
    });
    bfs_visited_dataset.data.push({
      x: manhattan_distance,
      y: bfs_result.visited,
    });
  }

  dij_path_avg = Math.round((dij_path_avg * 1000) / count) / 1000;
  dij_dist_avg = Math.round((dij_dist_avg * 1000) / count) / 1000;
  dij_time_avg = Math.round((dij_time_avg * 1000) / count) / 1000;
  dij_vino_avg = Math.round((dij_vino_avg * 1000) / count) / 1000;
  let dij_viti_avg = Math.round((dij_time_avg * 1000) / dij_vino_avg) / 1000;

  ast_path_avg = Math.round((ast_path_avg * 1000) / count) / 1000;
  ast_dist_avg = Math.round((ast_dist_avg * 1000) / count) / 1000;
  ast_time_avg = Math.round((ast_time_avg * 1000) / count) / 1000;
  ast_vino_avg = Math.round((ast_vino_avg * 1000) / count) / 1000;
  let ast_viti_avg = Math.round((ast_time_avg * 1000) / ast_vino_avg) / 1000;

  dfs_path_avg = Math.round((dfs_path_avg * 1000) / count) / 1000;
  dfs_dist_avg = Math.round((dfs_dist_avg * 1000) / count) / 1000;
  dfs_time_avg = Math.round((dfs_time_avg * 1000) / count) / 1000;
  dfs_vino_avg = Math.round((dfs_vino_avg * 1000) / count) / 1000;
  let dfs_viti_avg = Math.round((dfs_time_avg * 1000) / dfs_vino_avg) / 1000;

  bfs_path_avg = Math.round((bfs_path_avg * 1000) / count) / 1000;
  bfs_dist_avg = Math.round((bfs_dist_avg * 1000) / count) / 1000;
  bfs_time_avg = Math.round((bfs_time_avg * 1000) / count) / 1000;
  bfs_vino_avg = Math.round((bfs_vino_avg * 1000) / count) / 1000;
  let bfs_viti_avg = Math.round((bfs_time_avg * 1000) / bfs_vino_avg) / 1000;

  const dij_path_element = document.getElementById("dij_path");
  const dij_dist_element = document.getElementById("dij_dist");
  const dij_time_element = document.getElementById("dij_time");
  const dij_vino_element = document.getElementById("dij_vino");
  const dij_viti_element = document.getElementById("dij_viti");

  const ast_path_element = document.getElementById("ast_path");
  const ast_dist_element = document.getElementById("ast_dist");
  const ast_time_element = document.getElementById("ast_time");
  const ast_vino_element = document.getElementById("ast_vino");
  const ast_viti_element = document.getElementById("ast_viti");

  const dfs_path_element = document.getElementById("dfs_path");
  const dfs_dist_element = document.getElementById("dfs_dist");
  const dfs_time_element = document.getElementById("dfs_time");
  const dfs_vino_element = document.getElementById("dfs_vino");
  const dfs_viti_element = document.getElementById("dfs_viti");

  const bfs_path_element = document.getElementById("bfs_path");
  const bfs_dist_element = document.getElementById("bfs_dist");
  const bfs_time_element = document.getElementById("bfs_time");
  const bfs_vino_element = document.getElementById("bfs_vino");
  const bfs_viti_element = document.getElementById("bfs_viti");

  dij_path_element.innerHTML = dij_path_avg;
  dij_dist_element.innerHTML = dij_dist_avg;
  dij_time_element.innerHTML = dij_time_avg;
  dij_vino_element.innerHTML = dij_vino_avg;
  dij_viti_element.innerHTML = dij_viti_avg;

  ast_path_element.innerHTML = ast_path_avg;
  ast_dist_element.innerHTML = ast_dist_avg;
  ast_time_element.innerHTML = ast_time_avg;
  ast_vino_element.innerHTML = ast_vino_avg;
  ast_viti_element.innerHTML = ast_viti_avg;

  dfs_path_element.innerHTML = dfs_path_avg;
  dfs_dist_element.innerHTML = dfs_dist_avg;
  dfs_time_element.innerHTML = dfs_time_avg;
  dfs_vino_element.innerHTML = dfs_vino_avg;
  dfs_viti_element.innerHTML = dfs_viti_avg;

  bfs_path_element.innerHTML = bfs_path_avg;
  bfs_dist_element.innerHTML = bfs_dist_avg;
  bfs_time_element.innerHTML = bfs_time_avg;
  bfs_vino_element.innerHTML = bfs_vino_avg;
  bfs_viti_element.innerHTML = bfs_viti_avg;

  createTimeChart({
    datasets: [
      dij_time_dataset,
      ast_time_dataset,
      dfs_time_dataset,
      bfs_time_dataset,
    ],
  });
  createVisitedChart({
    datasets: [
      dij_visited_dataset,
      ast_visited_dataset,
      dfs_visited_dataset,
      bfs_visited_dataset,
    ],
  });
}

let rooms = [
  "A-101",
  "A-102",
  "A-104",
  "A-200",
  "A-201",
  "A-202",
  "A-203",
  "A-204",
  "ADMISSIONS",
  "BERLIN-GARDEN",
  "CAFETERIA-1",
  "CAFETERIA-2",
  "CAFETERIA-3",
  "CAFETERIA-4",
  "EXIT-101",
  "EXIT-ANNEX",
  "EXIT-HM",
  "EXIT-KITCHEN",
  "EXIT-LINK",
  "EXIT-LS",
  "EXIT-MS",
  "EXIT-STAIR-N-A",
  "EXIT-STAIR-N-B",
  "EXIT-US-EAST",
  "EXIT-US-WEST",
  "HAWLEY-1",
  "HAWLEY-2",
  "HAWLEY-3",
  "HEAD-CONF",
  "HEAD-OFFICE",
  "INT-0-2",
  "INT-1-2",
  "INT-10",
  "INT-10-2",
  "INT-10-3",
  "INT-100",
  "INT-100-2",
  "INT-100-3",
  "INT-101",
  "INT-101-2",
  "INT-101-3",
  "INT-102",
  "INT-102-2",
  "INT-102-3",
  "INT-103-2",
  "INT-103-3",
  "INT-104",
  "INT-104-2",
  "INT-104-3",
  "INT-105",
  "INT-105-2",
  "INT-106",
  "INT-106-2",
  "INT-107",
  "INT-107-2",
  "INT-108",
  "INT-108-2",
  "INT-109",
  "INT-109-2",
  "INT-11-2",
  "INT-110-2",
  "INT-111",
  "INT-111-2",
  "INT-112-2",
  "INT-113-2",
  "INT-114-2",
  "INT-115",
  "INT-115-2",
  "INT-116",
  "INT-116-2",
  "INT-117-2",
  "INT-118-2",
  "INT-119",
  "INT-119-2",
  "INT-12",
  "INT-12-2",
  "INT-12-3",
  "INT-120",
  "INT-120-2",
  "INT-121",
  "INT-121-2",
  "INT-122",
  "INT-122-2",
  "INT-123",
  "INT-123-2",
  "INT-124",
  "INT-124-2",
  "INT-125-2",
  "INT-126",
  "INT-126-2",
  "INT-127",
  "INT-128-2",
  "INT-129",
  "INT-129-2",
  "INT-13",
  "INT-13-2",
  "INT-13-3",
  "INT-130",
  "INT-130-2",
  "INT-131",
  "INT-131-2",
  "INT-132",
  "INT-132-2",
  "INT-133-2",
  "INT-134",
  "INT-134-2",
  "INT-135",
  "INT-135-2",
  "INT-137",
  "INT-137-2",
  "INT-138",
  "INT-138-2",
  "INT-139",
  "INT-139-2",
  "INT-14",
  "INT-14-3",
  "INT-140",
  "INT-140-2",
  "INT-141",
  "INT-141-2",
  "INT-142",
  "INT-142-2",
  "INT-143",
  "INT-143-2",
  "INT-144",
  "INT-144-2",
  "INT-146",
  "INT-147",
  "INT-147-2",
  "INT-148",
  "INT-148-2",
  "INT-149",
  "INT-15-2",
  "INT-150",
  "INT-150-2",
  "INT-151",
  "INT-151-2",
  "INT-152",
  "INT-152-2",
  "INT-153",
  "INT-153-2",
  "INT-154-2",
  "INT-155",
  "INT-155-2",
  "INT-156",
  "INT-156-2",
  "INT-157",
  "INT-158",
  "INT-158-2",
  "INT-159",
  "INT-159-2",
  "INT-16-2",
  "INT-160",
  "INT-161",
  "INT-162",
  "INT-162-2",
  "INT-163",
  "INT-163-2",
  "INT-164",
  "INT-164-2",
  "INT-165",
  "INT-166",
  "INT-167",
  "INT-168",
  "INT-169",
  "INT-17-2",
  "INT-170",
  "INT-171",
  "INT-172",
  "INT-173",
  "INT-174",
  "INT-175",
  "INT-176",
  "INT-177",
  "INT-178",
  "INT-179",
  "INT-18",
  "INT-18-2",
  "INT-18-3",
  "INT-189",
  "INT-19-2",
  "INT-190",
  "INT-192",
  "INT-193",
  "INT-194",
  "INT-195",
  "INT-196",
  "INT-197",
  "INT-198",
  "INT-199",
  "INT-2-2",
  "INT-2-3",
  "INT-2-4",
  "INT-20-2",
  "INT-202",
  "INT-203",
  "INT-21-2",
  "INT-21-3",
  "INT-22-2",
  "INT-23-2",
  "INT-23-3",
  "INT-24-3",
  "INT-25-3",
  "INT-26",
  "INT-26-2",
  "INT-27",
  "INT-27-2",
  "INT-27-3",
  "INT-29",
  "INT-3-2",
  "INT-3-3",
  "INT-30-3",
  "INT-31-3",
  "INT-32",
  "INT-33-3",
  "INT-34",
  "INT-34-2",
  "INT-34-3",
  "INT-35-2",
  "INT-35-3",
  "INT-36-3",
  "INT-37-2",
  "INT-38",
  "INT-38-2",
  "INT-38-3",
  "INT-39-2",
  "INT-39-3",
  "INT-4",
  "INT-4-2",
  "INT-40-2",
  "INT-40-3",
  "INT-41-3",
  "INT-42-3",
  "INT-43",
  "INT-43-2",
  "INT-43-3",
  "INT-44",
  "INT-44-2",
  "INT-44-3",
  "INT-45",
  "INT-45-2",
  "INT-45-3",
  "INT-46",
  "INT-46-2",
  "INT-46-3",
  "INT-47",
  "INT-47-2",
  "INT-47-3",
  "INT-48",
  "INT-48-2",
  "INT-48-3",
  "INT-49",
  "INT-49-2",
  "INT-49-3",
  "INT-5-2",
  "INT-5-3",
  "INT-5-4",
  "INT-50",
  "INT-50-3",
  "INT-51",
  "INT-51-3",
  "INT-52",
  "INT-52-2",
  "INT-52-3",
  "INT-53-2",
  "INT-53-3",
  "INT-54",
  "INT-54-2",
  "INT-54-3",
  "INT-55",
  "INT-55-2",
  "INT-55-3",
  "INT-56",
  "INT-56-2",
  "INT-56-3",
  "INT-57-2",
  "INT-58-2",
  "INT-58-3",
  "INT-59-2",
  "INT-6-2",
  "INT-6-3",
  "INT-60-2",
  "INT-60-3",
  "INT-61-2",
  "INT-62-2",
  "INT-64-2",
  "INT-65-2",
  "INT-66-2",
  "INT-66-3",
  "INT-67-3",
  "INT-68",
  "INT-68-3",
  "INT-69",
  "INT-69-2",
  "INT-69-3",
  "INT-7",
  "INT-70",
  "INT-70-2",
  "INT-71",
  "INT-71-2",
  "INT-71-3",
  "INT-72",
  "INT-72-2",
  "INT-72-3",
  "INT-73",
  "INT-73-2",
  "INT-73-3",
  "INT-74",
  "INT-74-2",
  "INT-74-3",
  "INT-75",
  "INT-75-2",
  "INT-75-3",
  "INT-76",
  "INT-76-2",
  "INT-76-3",
  "INT-77",
  "INT-77-2",
  "INT-79-2",
  "INT-8-2",
  "INT-8-3",
  "INT-80",
  "INT-80-3",
  "INT-81-2",
  "INT-81-3",
  "INT-82",
  "INT-82-2",
  "INT-82-3",
  "INT-83-2",
  "INT-84-2",
  "INT-84-3",
  "INT-85",
  "INT-85-2",
  "INT-85-3",
  "INT-86",
  "INT-86-2",
  "INT-87-2",
  "INT-87-3",
  "INT-88-2",
  "INT-88-3",
  "INT-89",
  "INT-89-2",
  "INT-9",
  "INT-9-2",
  "INT-90-2",
  "INT-91-2",
  "INT-92",
  "INT-92-2",
  "INT-93",
  "INT-93-2",
  "INT-94",
  "INT-94-2",
  "INT-95",
  "INT-95-3",
  "INT-96",
  "INT-96-3",
  "INT-98",
  "INT-98-3",
  "INT-99",
  "INT-99-2",
  "INT-99-3",
  "KITCHEN-1",
  "KITCHEN-2",
  "L-101",
  "L-102",
  "L-103",
  "L-104",
  "L-105A",
  "L-105B",
  "L-201",
  "L-202",
  "L-203",
  "L-204",
  "L-205",
  "L-206",
  "L-301",
  "L-302",
  "L-303",
  "L-304",
  "L-305",
  "L-306",
  "L-307",
  "L-308",
  "L-309",
  "LS-ASSISTANT",
  "LS-PRINCIPAL",
  "M-100",
  "M-101",
  "M-102",
  "M-103",
  "M-104",
  "M-106",
  "M-107",
  "M-108",
  "M-109",
  "M-110",
  "M-111",
  "M-112",
  "M-200",
  "M-201",
  "M-202",
  "M-203",
  "M-204",
  "M-205",
  "M-206",
  "M-208",
  "M-209",
  "M-211",
  "M-212",
  "M-300-1",
  "M-300-2",
  "M-300-3",
  "M-BATHROOM-1",
  "M-BATHROOM-2",
  "M-BATHROOM-3",
  "M-BATHROOM-4",
  "M-BATHROOM-5",
  "M-BATHROOM-6",
  "M-BATHROOM-7",
  "MANUAL-INT-1",
  "MANUAL-INT-2",
  "MS-ASSISTANT",
  "MS-PRINCIPAL",
  "N-101",
  "N-101A",
  "N-200",
  "N-201-1",
  "N-201-2",
  "N-203",
  "N-207",
  "N-208",
  "N-209",
  "N-210",
  "N-211",
  "N-212-1",
  "N-212-2",
  "N-213",
  "N-215",
  "N-301",
  "N-302-1",
  "N-302-2",
  "N-304-1",
  "N-304-2",
  "N-305",
  "N-306-1",
  "N-306-2",
  "N-307",
  "N-307-1",
  "N-308",
  "N-310",
  "N-312-1",
  "N-312-2",
  "N-313",
  "N-314",
  "N-315",
  "N-316",
  "N-317",
  "N-320",
  "N-321",
  "N-322",
  "N-323",
  "N-324",
  "N-325",
  "N-326",
  "N-327",
  "N-329",
  "N-330",
  "NURSE-LS",
  "NURSE-US",
  "STAIR-C-L-1",
  "STAIR-C-L-2",
  "STAIR-C-L-3",
  "STAIR-E-A-1",
  "STAIR-E-A-2",
  "STAIR-E-A-3",
  "STAIR-E-B-1",
  "STAIR-H-A-1",
  "STAIR-H-B-1",
  "STAIR-H-B-2",
  "STAIR-H-C-1",
  "STAIR-H-C-2",
  "STAIR-H-D-1",
  "STAIR-H-D-2",
  "STAIR-H-D-3",
  "STAIR-H-E-1",
  "STAIR-H-E-2",
  "STAIR-H-E-3",
  "STAIR-H-F-1",
  "STAIR-H-F-2",
  "STAIR-H-F-3",
  "STAIR-H-F-4",
  "STAIR-H-G-1",
  "STAIR-H-H-2",
  "STAIR-L-A-1",
  "STAIR-L-A-2",
  "STAIR-M-A-1",
  "STAIR-M-A-2",
  "STAIR-M-A-3",
  "STAIR-M-B-1",
  "STAIR-M-B-2",
  "STAIR-N-A-1",
  "STAIR-N-A-2",
  "STAIR-N-A-3",
  "STAIR-N-A-4",
  "STAIR-N-B-1",
  "STAIR-N-B-2",
  "STAIR-N-B-3",
  "STAIR-N-B-4",
  "STAIR-N-C-2",
  "STAIR-N-C-3",
  "STAIR-N-D-1",
  "STAIR-N-D-2",
  "STAIR-N-D-3",
  "STAIR-N-D-4",
  "TRASH-ROOM",
  "TURF-1",
  "TURF-2",
  "TURF-3",
  "TURF-4",
  "U-101",
  "U-102",
  "U-103",
  "U-104",
  "U-105",
  "U-106",
  "U-107",
  "U-108",
  "U-108A",
  "U-109",
  "U-111",
  "U-112",
  "U-113",
  "U-114",
  "U-115",
  "U-116",
  "U-117",
  "U-118",
  "U-119",
  "U-120",
  "U-121",
  "U-200",
  "U-201",
  "U-202",
  "U-204",
  "U-205",
  "U-206",
  "U-207",
  "U-208",
  "U-209",
  "U-210",
  "U-211",
  "U-212",
  "U-213",
  "U-214-1",
  "U-214-2",
  "U-215",
  "U-216",
  "U-218",
  "U-219",
  "U-220",
  "U-221",
  "U-222",
  "U-223",
  "U-224",
  "U-225",
  "U-226",
  "U-227",
  "U-228",
  "U-229",
  "U-230",
  "U-300-1",
  "U-300-2",
  "U-300-3",
  "US-ASSISTANT-PRINCIPAL",
  "US-COAT-ROOM",
  "US-CONFERENCE-ROOM",
  "US-DEAN-OF-STUDENT-LIFE",
  "US-LIBRARY-1",
  "US-LIBRARY-2",
  "US-LIBRARY-3",
  "US-LIBRARY-4",
  "US-PRINCIPAL",
  "US-SWAMP",
  "W-BATHROOM-1",
  "W-BATHROOM-2",
  "W-BATHROOM-3",
  "W-BATHROOM-4",
  "W-BATHROOM-6",
  "W-BATHROOM-7",
];
