const fs = require('fs');

exports.getPlayers = function(){
  let players = JSON.parse(fs.readFileSync(__dirname+'/../data/players.json'));
  return players;
}

exports.isPlayer = function(playerID){
  let players = JSON.parse(fs.readFileSync(__dirname+'/../data/players.json'));
  if(players[playerID] && players[playerID]["privileges"].indexOf("player")>=0) return true;
  else return false;
}

exports.makeAdmin = function(playerID){
  let players = JSON.parse(fs.readFileSync(__dirname+'/../data/players.json'));
  if(players[playerID] && players[playerID]["privileges"].indexOf("admin")<0) players[playerID]["privileges"].push("admin");
  fs.writeFileSync(__dirname+'/../data/players.json', JSON.stringify(allPlayers));
}

exports.isAdmin = function(playerID){
  let players = JSON.parse(fs.readFileSync(__dirname+'/../data/players.json'));
  if(players[playerID] && players[playerID]["privileges"].indexOf("admin")>=0) return true;
  else return false;
}

exports.getPlayer = function(playerID){
  let players = JSON.parse(fs.readFileSync(__dirname+'/../data/players.json'));

  players[playerID].win_percent = (players[playerID].win/parseFloat(players[playerID].win+players[playerID].lose+players[playerID].tie) * 100).toFixed(2);
  if(players[playerID].win_percent=="NaN") players[playerID].win_percent=0;

  return players[playerID];
}

exports.createPlayer =  function (playerID, playerDisplayName){
  let allPlayers = JSON.parse(fs.readFileSync(__dirname+'/../data/players.json'));
  if(!allPlayers[playerID]){
    let newPlayer={
      "displayName": playerDisplayName,
      "win": 0,
      "lose": 0,
      "tie": 0,
      "privileges": ["player"],
      "games": [],
      "dateJoined": new Date()
    }
    allPlayers[playerID] = newPlayer;
    fs.writeFileSync(__dirname+'/../data/players.json', JSON.stringify(allPlayers));
  }
}

exports.updatePlayer =  function (playerName, results){
  let allPlayers = JSON.parse(fs.readFileSync(__dirname+'/../data/players.json'));

/*  if(outcome=="player") allPlayers[playerName]["win"]++;
  else if(outcome=="player") allPlayers[playerName]["lose"]++;
  else allPlayers[playerName]["tie"]++;
*/

  fs.writeFileSync(__dirname+'/../data/players.json', JSON.stringify(allPlayers));
}

exports.removePlayer = function(playerID){
  let allPlayers = JSON.parse(fs.readFileSync(__dirname+'/../data/players.json'));
  if(allPlayers[playerID]) delete allPlayers[playerID];
  fs.writeFileSync(__dirname+'/../data/players.json', JSON.stringify(allPlayers));
}

exports.addGame = function(playerID, results){
  let allPlayers = JSON.parse(fs.readFileSync(__dirname+'/../data/players.json'));
  if(allPlayers[playerID]){
    if(results["outcome"]=="tie") allPlayers[playerID]["tie"]++;
    else if(results["outcome"]=="player") allPlayers[playerID]["win"]++;
    else allPlayers[playerID]["lose"]++;
    allPlayers[playerID]["games"].push(results["gameID"]);
  }
  fs.writeFileSync(__dirname+'/../data/players.json', JSON.stringify(allPlayers));
}
