// final ouput = console.log(new XMLSerializer().serializeToString(document.getElementById("floor-plan")))
const svg = document.getElementById("floor-plan");
class Nodes {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", 3);
    circle.classList.add('node')
    svg.appendChild(circle);
    this.element = circle;
    this.parents = [];
    this.setID(generateRandomString())
  }
  setID(name) {
    this.element.id = name;
  }
  getID(){
    return this.element.id
  }
  addParent(parent){
    this.parents.push(parent);
  }
  removeParent(parent) {
    this.parents.splice(this.parents.indexOf(parent), 1);
  }
  displayInfo(){
    document.getElementById('item_info_div').classList.remove('hidden');
    document.getElementById('confirm_name').innerHTML = this.getID()
    document.getElementById('new_name').value = this.getID() 
    document.getElementById('new_name').classList.remove('hidden');
    document.getElementById('confirm_changes').classList.remove('hidden');
  }
  deleteSelf() {
    for (let i = 0; i < this.parents.length; i++) {
      const parent = this.parents[i];
      parent.removeNode(this);
    }
    nodes.splice(nodes.indexOf(this), 1);
    this.element.remove();
  }
}
class Lines {
  constructor(startX, startY, endX, endY, id=null) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    // 0 = horizontal, 1 = vertical
    this.type = startX == endX ? 1 : 0;
    this.nodes = [];
    this.id = id ? id : generateRandomString()
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    if (Math.abs(this.endX - this.startX) > Math.abs(this.endY - this.startY)) {
      line.setAttribute("x1", this.startX);
      line.setAttribute("y1", this.startY);
      line.setAttribute("x2", this.endX);
      line.setAttribute("y2", this.startY);
    } else {
      line.setAttribute("x1", this.startX);
      line.setAttribute("y1", this.startY);
      line.setAttribute("x2", this.startX);
      line.setAttribute("y2", this.endY);
    }
    line.classList.add('line')
    svg.appendChild(line);
    lines.push(this);
    previousLine = this;
    this.element = line;
    return this
  }
  addNode(node) {
    this.nodes.push(node);
    node.addParent(this)
  }
  removeNode(node){
    this.nodes.splice(this.nodes.indexOf(node), 1)
  }
  displayInfo(){
    document.getElementById('item_info_div').classList.remove('hidden');
    document.getElementById('confirm_name').innerHTML = "LINE"
    document.getElementById('new_name').classList.add('hidden');
    document.getElementById('confirm_changes').classList.add('hidden');
  }
  deleteSelf() {
    lines.splice(lines.indexOf(this), 1);
    while(this.nodes.length){
      this.nodes[0].deleteSelf()
    }
    this.element.remove();
  }
  
}

let lines = [];
let nodes = [];

document.getElementById('floor-plan').style.cursor = "none";
let isDrawing = false;
let previousTempLine = false;
let previousLine = null;
let startX, startY, endX, endY;
let inter_count = 0
let selected_line = null
let selected_point = null
let selected = null
let mousePOS = [0,0]

document.addEventListener("keydown", (e) => {
  if(e.key === "n" && selected_line){
    const type = selected_line.type
    let new_node;
    if(type){
      new_node = new Nodes(selected_line.startX, mousePOS[1])
    }else{
      new_node = new Nodes(mousePOS[0], selected_line.startY)
    }
    nodes.push(new_node)
    selected_line.addNode(new_node)
  }else if (e.key === "d" && e.ctrlKey) {
    if (previousTempLine) {
      document.getElementById("tempLine").remove();
      previousTempLine = false;
    }
    isDrawing = false;
  }
});

svg.addEventListener("mousedown", (e) => {
  if(e.getModifierState("Alt")){
    if (!isDrawing) {
      startX = e.pageX;
      startY = e.pageY;
      isDrawing = true;
    } else {
      endX = e.pageX;
      endY = e.pageY;
      isDrawing = false;

      const new_line = Math.abs(startX-endX) > Math.abs(startY-endY) ? new Lines(startX, startY, endX, startY) : new Lines(startX, startY, startX, endY)
      for(let i = 0; i < lines.length-1; i++){
        const line = lines[i];
        if(lines[i] !== new_line){
          let intersection = findIntersection(new_line.startX, new_line.startY, new_line.endX, new_line.endY, new_line.type, line.startX, line.startY, line.endX, line.endY, line.type)
          if(intersection){
            console.log(intersection)
            const new_node = new Nodes(intersection[0], intersection[1])
            new_node.setID(`INT-${inter_count}-3`)
            inter_count++
            nodes.push(new_node)
            new_line.addNode(new_node)
            line.addNode(new_node)
          }
        }
      }
      if (previousTempLine) {
        document.getElementById("tempLine").remove();
        previousTempLine = false;
      }
    }
  }else if(e.shiftKey){
    
      const found_line = lines.find((line)=>{
        return isClickNearLine(line.startX, line.startY, line.endX, line.endY, e.pageX, e.pageY)
      })
      if(selected_point){
        selected_point.element.classList.remove('selected')
        selected_point = null
      }
      if(selected_line){
        selected_line.element.classList.remove('selected')
        selected_line = null
      }
      document.getElementById('item_info_div').classList.add('hidden'); 
      if(found_line){
        found_line.element.classList.add('selected')
        selected_line = found_line
        showSelection(selected_line)
      }
    
  }else{
    const found_point = nodes.find((node)=>{
      return arePointsNear(node.x, node.y, e.pageX, e.pageY)
    })
    if(selected_line){
      selected_line.element.classList.remove('selected')
      selected_line = null
    }
    if(selected_point){
      selected_point.element.classList.remove('selected')
      selected_point = null
    }
    document.getElementById('item_info_div').classList.add('hidden'); 
    if(found_point){
      found_point.element.classList.add('selected')
      selected_point = found_point
      showSelection(selected_point)
    }
  }
  
});

svg.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    if (previousTempLine) {
      document.getElementById("tempLine").remove();
      previousTempLine = false;
    }
    endX = e.pageX;
    endY = e.pageY;
    drawTempLine();
  }
  drawGreenCircle(e.pageX, e.pageY);
  mousePOS = [e.pageX, e.pageY]
});

function drawTempLine() {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  if (Math.abs(endX - startX) > Math.abs(endY - startY)) {
    line.setAttribute("x1", startX);
    line.setAttribute("y1", startY);
    line.setAttribute("x2", endX);
    line.setAttribute("y2", startY);
  } else {
    line.setAttribute("x1", startX);
    line.setAttribute("y1", startY);
    line.setAttribute("x2", startX);
    line.setAttribute("y2", endY);
  }
  line.setAttribute("stroke", "orange");
  line.setAttribute("stroke-width", "3");
  line.setAttribute("id", "tempLine");
  svg.appendChild(line);
  previousTempLine = true;
}


function drawGreenCircle(x, y) {
  const previousGreenCircle = document.getElementById("greenCircle");
  if (previousGreenCircle) {
    previousGreenCircle.remove();
  }

  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  circle.setAttribute("r", 3);
  circle.setAttribute("fill", "green");
  circle.setAttribute("stroke", "green");
  circle.setAttribute("stroke-width", "3");
  circle.setAttribute("id", "greenCircle");
  svg.appendChild(circle);
}
function isClickNearLine(x1, y1, x2, y2, x3, y3) {
  const segmentLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const dotProduct = ((x3 - x1) * (x2 - x1) + (y3 - y1) * (y2 - y1)) / Math.pow(segmentLength, 2);
  let closestX, closestY;
  if (dotProduct < 0) {
      closestX = x1;
      closestY = y1;
  } else if (dotProduct > 1) {
      closestX = x2;
      closestY = y2;
  } else {
      closestX = x1 + dotProduct * (x2 - x1);
      closestY = y1 + dotProduct * (y2 - y1);
  }
  return Math.sqrt(Math.pow(x3 - closestX, 2) + Math.pow(y3 - closestY, 2)) <= 5;
}
function findIntersection(X1, Y1, X2, Y2, type1, X3, Y3, X4, Y4, type2) {
  if(type1==type2) {
    return false
  }else{
    if(type1){
      if(Y3 >= Math.min(Y1, Y2) && Y3 <= Math.max(Y1, Y2) && X1 >= Math.min(X3,X4) && X1 <= Math.max(X3,X4)){
        return [X1, Y3]
      }
      return false
    }else{
      if(Y1 >= Math.min(Y3, Y4) && Y1 <= Math.max(Y3, Y4) && X3 >= Math.min(X1,X2) && X3 <= Math.max(X1,X2)){
        return [X3, Y1]
      }
      return false
    }
  }
}

function arePointsNear(x1, y1, x2, y2) {
  const distance = Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
  return distance <= 10;
}

function showSelection(selection){
  selected = selection;
  selection.displayInfo()  
}
function updateItem(){
  selected.setID(document.getElementById('new_name').value)
  selected.displayInfo()
}
function deleteItem(){
  selected.deleteSelf()
  document.getElementById('item_info_div').classList.add('hidden'); 
}
function generateRandomString() {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomString = '';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    randomString += letters.charAt(randomIndex);
  }

  return randomString;
}

function generateOutput(){
  document.getElementById('html_out').innerText = String(new XMLSerializer().serializeToString(document.getElementById("floor-plan")))
  let edges_output = {}
  lines.forEach((line)=>{
    line.type ? line.nodes.sort((a,b)=>a.y-b.y) : line.nodes.sort((a,b)=>a.x-b.x)
    let lastNode = null
    for(let i = 0; i < line.nodes.length; i++){
      const current_node = line.nodes[i].getID()
      if(lastNode){
        if(current_node in edges_output){
          edges_output[current_node].push(lastNode)
        }else{
          edges_output[current_node] = [lastNode]
        }
      }
      if(i !== line.nodes.length-1){
        if(current_node in edges_output){
          edges_output[current_node].push(line.nodes[i+1].getID())
        }else{
          edges_output[current_node] = [line.nodes[i+1].getID()]
        }
      }
      lastNode = current_node
    }
  })
  document.getElementById('edges_out').innerText = JSON.stringify(edges_output)
  let data_out = {lines:{}, nodes:{}}
  lines.forEach(function(line){
    data_out.lines[line.id] = {
      startX:line.startX,
      startY:line.startY,
      endX:line.endX,
      endY:line.endY,
      nodes:[]
    }
  })
  nodes.forEach(function(node){
    data_out.nodes[node.element.id] = {
      x:node.x,
      y:node.y,
    }
    node.parents.forEach(function(parent){
      data_out.lines[parent.id].nodes.push(node.element.id)
    })
  })
  document.getElementById('data_out').innerText = JSON.stringify(data_out)
}
async function loadInput() {
  const response = await fetch(`/structure/${document.getElementById('data-in').value}`);
  const data_in = await response.json();
  let nodes2 = Object.keys(data_in.nodes)
  inter_count = nodes2.reduce(((c, name)=>{
    if(name.split('-')[0] === "INT"){
      const c_val = Number(name.split('-')[1])
      return c_val > c ? c_val : c
    }else{
      return c
    }
  }), 0)+1
  let node_map = {}
  let line_names = Object.keys(data_in.lines)
  let line_objs = line_names.map((name)=>{
    const line_data = data_in.lines[name]
    const obj = new Lines(line_data.startX,line_data.startY,line_data.endX,line_data.endY, name)
    return obj
  })
  nodes2 = nodes2.map((node)=>{
    let nodeObj = data_in.nodes[node]
    let newNode = new Nodes(nodeObj.x, nodeObj.y)
    newNode.setID(node)
    node_map[node] = newNode
    return newNode
  })
  line_objs.forEach((obj, i)=>{
    obj.nodes = data_in.lines[line_names[i]].nodes.map((node_name)=>{
      const child = node_map[node_name]
      child.parents.push(obj)
      return child
    })
  })
  nodes = nodes2
}