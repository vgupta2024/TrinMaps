const express = require("express");
router = express.Router();
const fs = require("fs");
const Maps = require("../models/maps_model");

router.get("/", function (request, response) {
  response.status(200);
  response.setHeader("Content-Type", "text/html");
  try {
    const u = request.session.passport.user;
    let data = Maps.getAllRooms();
    let connections = Maps.getAllConnections();
    let multi_room = Maps.getAllMultiRooms();
    response.render("index3", {
      user: request.user,
      data: data,
      connections: connections,
      multi_room: multi_room,
      logged: true,
    });
  } catch {
    response.render("login", {
      user: request.user,
      logged: false,
    });
  }
});

router.get("/d", (req, res) => {
  // console.log('h')
  res.status(200);
  res.setHeader("Content-Type", "text/html");
  res.render("structure");
});
router.get("/structure/:id", (req, res) => {
  res.status(200);
  console.log(req.params.id);
  // res.setHeader('Content-Type', 'text/html')
  res.send(Maps.getFloorInfo(req.params.id));
  // res.render('structure')
});
router.post("/d/save", (req, res) => {
    const body = req.body
    const FLOOR_NUMBER = body.floor 
    Maps.writeFloorSVG(FLOOR_NUMBER, body.svg)
    Maps.writeFloorInfo(FLOOR_NUMBER, JSON.stringify(body.load))
    Maps.writeFloorConnections(FLOOR_NUMBER, JSON.stringify(body.edges))
    let connections = Maps.getFloorConnectionsInfo()
    // inputArray[Number(FLOOR_NUMBER)-1] = body.edges
    connections = mergeObjects(inputArray)
  let stairs = {};
  let shared = {};
  let unqiue_destinations = [];
  let linked;

  Object.keys(connections).forEach((name) => {
    let components = name.split("-");
    if (
      components.length > 1 &&
      !isNaN(Number(components[components.length - 1]))
    ) {
      if (
        (components[0] == "M" || components[0] == "W") &&
        components[1] == "BATHROOM"
      ) {
        const index_name = components[0] + "-" + components[1];
        index_name in shared
          ? shared[index_name].push(name)
          : (shared[index_name] = [name]);
      } else if (components[0] == "STAIR") {
        const index_name = components.splice(0, 3).join("-");
        index_name in stairs
          ? stairs[index_name].push(name)
          : (stairs[index_name] = [name]);
      } else if (components[0] !== "INT") {
        components.pop();
        const index_name = components.join("-");
        if (index_name.length > 1) {
          index_name in shared
            ? shared[index_name].push(name)
            : (shared[index_name] = [name]);
        } else {
          unqiue_destinations.push(name);
        }
      }
    } else if (components[0] == "EXIT") {
      const index_name = "EXIT";
      index_name in shared
        ? shared[index_name].push(name)
        : (shared[index_name] = [name]);
    } else {
      unqiue_destinations.push(name);
    }
  });

  Object.keys(stairs).forEach((code) => {
    linked = stairs[code];
    linked.forEach((stair_name) => {
      linked.forEach((stair_name_2) => {
        stair_name_2 !== stair_name
          ? connections[stair_name].push(stair_name_2)
          : null;
      });
    });
  });

  let result = {};
  let temp = Object.keys(connections);
  temp.sort();
  temp.forEach((name) => {
    result[name] = connections[name];
  });
  Maps.writeConnections(JSON.stringify(result));
//   console.log(stairs);
//   console.log(shared);
  unqiue_destinations = unqiue_destinations.concat(Object.keys(shared));
  
    Maps.writeDestinations(JSON.stringify(unqiue_destinations.sort()))
  Maps.writeShared(JSON.stringify(shared));
  let room_names = Object.keys(result);
  let global_test = null;
  let matrix = room_names.map((el) => {
    global_test = el;
    return room_names.map((room) => {
      return result[global_test].includes(room) ? 1 : 0;
    });
  });
  Maps.writeMatrix(JSON.stringify(matrix));
  res.send(200)
});
router.get("/alg", (req, res) => {
  // console.log('h')
  res.status(200);
  let connections = Maps.getAllConnections();
  let matrix = Maps.getMatrix();
  res.setHeader("Content-Type", "text/html");
  res.render("algs", {
    connections: connections,
    matrix: matrix,
  });
});

router.get("/login", function (request, response) {
  response.status(200);
  response.setHeader("Content-Type", "text/html");
  response.render("login", {
    user: request.user,
  });
});

function mergeObjects(objects) {
    const mergedObject = {};
    for (const obj of objects) {
      Object.assign(mergedObject, obj);
    }
    return mergedObject;
  }
module.exports = router
