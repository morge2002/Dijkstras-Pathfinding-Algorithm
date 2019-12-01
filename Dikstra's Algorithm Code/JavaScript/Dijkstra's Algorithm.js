//Created by Morgan Lewis - 18/11/2019
//Resources - Computerfule, Wikapedia (used only for inspiration. No code was seen for
//this problem)
//I have also created another python version but it does not visualse it and the network is
//hard to create.

//This program creates a netwrok of size nodeNum+2 with a random topology. It Then
//finds the shortest path between the start node and the end node and highlights this
//this route. It does this using Dijkastra's Algorithm that I have implimented.
//Recursion and OOP has been utilised to make this problem simlpler and to reduce
//the amount of code needed. When using recursion I used a method I learned from a
//MIT lecture on recursion. I broke down the problem into smaller problem (check which
//connection is the shortest) and repeated it (called the function for a different node)
//I found this to be very useful and take full advantage of recursion in this problem.
//Although this problem could have been done interitivly it is simpler and more eligant
//to use recursion.


//Initialise variables

//holds all nodes
let nodes = [];
//Amount of intermediate nodes
let nodeNum = 5;
//start nodes
let start;
//end node
let end;
//Array of nodes that need the dijkstra's function run on them
let que;

//--------------------------------------------------------------------------------------

function setup() {
  createCanvas(windowWidth-10,windowHeight-10);
  background(0);
  //Creates the intermediate nodes
  for (var i = 0; i < nodeNum; i++) {
    nodes[i] = new node();

  }
  //creates the end and start nodes with their specific properties
  start = new node();
  start.start = true;
  start.x = 20;
  start.y = 20;
  start.path = 0
  end = new node();
  end.end = true;
  end.x = width - 20;
  end.y = height - 20;
  start.path = 0

//Adds the end the the end of the nodes array and start to the beggining
  nodes.push(end);
  nodes.unshift(start);

  que = [start]

//This creates at least one connection between the intermediate nodes and at least two
//connections between the start and the end nodes. It will also create another connection
//between the an intermediate node randomly
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].name = i.toString();
    if (i!=nodes.length-1) {
      connect(nodes[i],nodes[i+1]);
      nodes[i].cons.push(nodes[i+1]);
      nodes[i+1].cons.push(nodes[i]);
      if (random(-1,1) < 0 && i != nodes.length - 2) {
        connect(nodes[i],nodes[i+2]);
        nodes[i].cons.push(nodes[i+2]);
        nodes[i+2].cons.push(nodes[i]);
      }else if (i == 0) {
        connect(nodes[i],nodes[i+2]);
        nodes[i].cons.push(nodes[i+2]);
        nodes[i+2].cons.push(nodes[i]);
      }
    }
  }
  for (var i = 0; i < nodes.length; i++) {
//Displays the nodes
    nodes[i].show();
//Draws a line between all of the connections for each node
    nodes[i].connWeights();
  }

//Performs the dijkstra's on the first node. Then will recursivly do this to all other nodes
  dijkstra(nodes[0]);

//Logs the shortest path and draws a thicker line between the shortest path
  console.log('ShortestPath: ');
  logShortestPath();
}

//--------------------------------------------------------------------------------------

function draw() {
  //Nothing needs to be updated or done again so nothing is needed in draw
}

//--------------------------------------------------------------------------------------

//This function draws a line beetween two nodes to show a connection
function connect(n1,n2){
  stroke(255);
  line(n1.x,n1.y,n2.x,n2.y);
}

//--------------------------------------------------------------------------------------

//This is the node class that is used tho create the node objects. This automatically
//creates a network since the position of each node is random. It also initialises
//some bass variable for a intermediate node.
class node {
  constructor() {
    this.weights = [];
    this.cons = [];
    this.visit = false;
    this.prevNode = '';
    this.width = 40;
    this.x = floor(random(0+this.width,width-this.width));
    this.y = floor(random(0+this.width,height-this.width));
    this.start = false;
    this.end = false;
    this.name;
    this.path = Infinity;
  }
//Draws a circle and the nodes number within that cirlce.
  show() {
    ellipse(this.x,this.y,this.width);
    fill(255);
    text(this.name,this.x,this.y);
    fill(0);
  }
//This records the weight for each connection which is the Euclidean distance beetween
//the nodes
  connWeights() {
    for (var i = 0; i < this.cons.length; i++) {
      this.weights[i] = dist(this.x,this.y,this.cons[i].x,this.cons[i].y);
    }
  }
}

//--------------------------------------------------------------------------------------

//This function starts with the first nodes and finishes with the end node. It checks that
//the nodes has not been visited, then sees if this nodes route to its connection is the
//shortest. If it is then it well set its connection node path and state that
//its connection's previous node is the the current node. So that when it is backtracked
//later there is record of which node has the shortest path.
//
//Then it will add the current nodes connections to the que. This means that all nodes will
//be added to the que.
//
//Then it increments i by one so that it will then check the next item in the que. Changes
//the current nodes to the next item in the que (the current nodes connections) and then
//if it hasnt reached then end it will call itself on the next node in the que. Otherwise
//it will terminate.
function dijkstra(start,i=0) {
  for (var n = 0; n < start.cons.length; n++) {
    if (start.cons[n].visit == false) {
      if ((start.path + start.weights[n]) < start.cons[n].path) {
        start.cons[n].path = (start.path + start.weights[n]);
        start.cons[n].prevNode = start;
      }
      if (start.cons[n].end == false) {
        que.push(start.cons[n]);
      }
    }
  }
  start.visit = true;
  i++;
  if (i <= que.length-1) {
    start = que[i];
    dijkstra(start,i);
  }
}

//--------------------------------------------------------------------------------------

//This function starts at the end node and works its way back to the starting node,
//whilst it does this it also connects the nodes with a thicker line to show its them
//shortest. The reason it does this is because the previous node of the end node is
//the node with the shortest path to the end. So if you take the previous node of the
//previous node and so on you will get the shortest path back to the end. It does this
//by calling itself if its not at the start.
function logShortestPath(node=nodes[nodes.length-1]){
  strokeWeight(4);
  connect(node,node.prevNode);

  if (node.end == true) {
    console.log(end.name);
  }
  if (node.start == false) {
    console.log(node.prevNode.name);
    node = node.prevNode;
    logShortestPath(node);
  }
}
