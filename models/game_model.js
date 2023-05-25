const uuid = require('uuid');
const fs = require('fs');


exports.getAllGames =  function() {
  let allGames = JSON.parse(fs.readFileSync(__dirname+'/../data/games.json'));
  return allGames;
}

exports.getSortedGames =  function() {
  let allGames = JSON.parse(fs.readFileSync(__dirname+'/../data/games.json'));
  let results=[];

  for(game in allGames){
    results.push(allGames[game])
  }
  results.sort(function(a, b){
    return new Date(b.date) - new Date(a.date);
  });

  return results;
}
exports.getSomeSortedGames =  function(gamesList) {
  let allGames = JSON.parse(fs.readFileSync(__dirname+'/../data/games.json'));
  let results=[];

  for(game in allGames){
    if(gamesList && gamesList.indexOf(game)>=0)
      results.push(allGames[game])
  }
  results.sort(function(a, b){
    return new Date(b.date) - new Date(a.date);
  });

  return results;
}

exports.getGame =  function(gameID) {
  let allGames = JSON.parse(fs.readFileSync(__dirname+'/../data/games.json'));
  return allGames[gameID];
}

exports.playGame =  function(opponent, playerThrow) {
  let opponentThrowChoices=["Paper", "Rock", "Scissors"];
  let opponentThrow = opponentThrowChoices[Math.floor(Math.random() * 3)];

  if(playerThrow===opponentThrow){
    outcome= "tie";
  }else if(playerThrow==="Paper"){
    if(opponentThrow=="Scissors") outcome= "opponent";
    else outcome= "player";
  }else if(playerThrow==="Scissors"){
    if(opponentThrow=="Rock") outcome= "opponent";
    else outcome= "player";
  }else{
    if(opponentThrow=="Paper") outcome= "opponent";
    else outcome="player";
  }
  let allGames = JSON.parse(fs.readFileSync(__dirname+'/../data/games.json'));

  let results={};
  results["opponentName"]=opponent;
  results["opponentThrow"]=opponentThrow;
  results["playerThrow"]=playerThrow;
  results["outcome"] = outcome;
  results["date"] = new Date();

  let newID = uuid.v1();
  allGames[newID] = results;
  results["gameID"] = newID;

  fs.writeFileSync(__dirname+'/../data/games.json', JSON.stringify(allGames));

  return results;
}
