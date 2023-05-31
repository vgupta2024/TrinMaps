const connections = {
  "N-319":["N-321"],
  "N-320":["N-321"],
  "N-321":["N-319","N-320","N-322"],
  "N-322":["N-321","N-323","N-324"],
  "N-323":["N-312","N-322","N-324","N-325"],
  "N-324":["N-312","N-322","N-323","N-325"],
  "N-325":["N-312"],
  
}

function findPath(start, end){
  
}

function getNode(id){
  return document.getElementById(id);
}

function getMDistance(node1, node2){
  return Math.abs(node1.x-node2.x) + Math.abs(node1.y-node2.y)
}
function getDistance(node1,node2){

}
function getX(node){

}