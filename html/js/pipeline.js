
let sol = {}
let xr =40

const S = window.sanctuary

const $ =  window.sanctuaryDef;

var draw, graph;

const config1 = {
  "fe11":{
  category: 'plugem1',
  plugemName: 'plugem1',
  abi: [
    {
      "constant": true,
      "inputs": [],
      "name": "add",
      "_id": "fe1",
      "inputs": [
        {
          "name": "a",
          "type": "number"
        },
        {
          "name": "b",
          "type": "number"
        }
      ],
      "outputs": [
        {
          "name": "c",
          "type": "number"
        },
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "add2",
      "_id": "fe13",
      "inputs": [
        {
          "name": "a",
          "type": "number"
        },
        {
          "name": "b",
          "type": "number"
        }
      ],
      "outputs": [
        {
          "name": "c",
          "type": "number"
        },
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
  ],
  dependencies: [
    {
      name: 'plugem2',
      category: 'plugem2',
      methods: ['double'],
    },
  ],
},
"de34511":{
  category: 'plugem2',
  plugemName: 'plugem2',
  abi: [
    {
      "constant": true,
      "_id": "de345",
      "inputs": [],
      "name": "add",
      "inputs": [
        {
          "name": "a",
          "type": "number"
        },
        {
          "name": "b",
          "type": "number"
        }
      ],
      "outputs": [
        {
          "name": "c",
          "type": "number"
        },
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
  ],
  dependencies: [
    {
      name: 'plugem2',
      category: 'plugem2',
      methods: ['double'],
    },
  ],
},
"gen23411":{
  category: 'generator',
  plugemName: 'plugem2',
  abi: [
    {
      "constant": true,
      "_id": "gen234",
      "inputs": [],
      "name": "getUint256",
      "outputs": [
        {
          "name": "uint256value",
          "type": "uint256"
        },
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
  ],
  dependencies: [],
}};

var g, g1 = [
  {
    "n": {
      "0": {
        "i": 0,
        "id": "5c95397d4212cc40afeec929"
      },
      "1": {
        "i": 1,
        "id": "5c95397d4212cc40afeec922"
      },
      "2": {
        "i": 2,
        "id": "5c95397d4212cc40afeec91f"
      },
      "2001": {
        "i": 2001,
        "id": "5bc59e192817116e84bdd831"
      }
    },
    "e": [
      [
        2001,
        1,
        0,
        1
      ],
      [
        2001,
        1,
        1,
        2
      ],
      [
        2001,
        1,
        0,
        2
      ],
      [
        2001,
        1,
        2,
        1
      ]
    ]
  }
]

const xn = 20
const yn = xn*1.5
var currentPoint = {x: 0, y: 1}


function doit3(){
  S.map (graph1=> calculateGraph2(graph1)) (g)
}

function setEdges(graf1, edge){
  
}

function graphShow(na){
  if (currentPoint === undefined) currentPoint = {x: 0, y: 1}
  currentPoint.y = na.level
  if (na.row  === 0) currentPoint.x = 0
  na.node.position = {x: currentPoint.x, y: currentPoint.y}
  let max  = Math.max(na.node.abi.inputs.length, na.node.abi.outputs.length)
  currentPoint.x = currentPoint.x  + max
}

function difference(first, second) {
  for (var i=0; i<second.length; i++) {
      var index = undefined;
      while ((index = first.indexOf(second[i])) !== -1) {
          first.splice(index, 1);
      }
  }
  return first;
}

function inputNodesAreVisited(node, visited){
  //console.log("iii", node)
  for (const key in node.in) {
    if (!visited.includes(""+node.in[key][0]) ) return false;
  }
  return true
}

function positionNodes(gf, unvisited, visited, visitors, level){
  //console.log("nodeee", level, unvisited)
  //console.log("ffff",gf, unvisited, visited, visitors, level)
  if (unvisited.length  === 0) return;
  let row = 0, visitedNow = []
  S.map (n => {
    if (inputNodesAreVisited(gf.n[n], visited) === true){
      S.flip (visitors) ({node: gf.n[n] , level: level, row: row}) 
      row = row+1
      visitedNow.push(n)
    }
  }) (unvisited)
  unvisited = difference(unvisited, visitedNow)
  visited = visited.concat(visitedNow)
  positionNodes(gf, unvisited, visited, visitors, level+1)
}

function calculateGraph(gr){
  
  checkNodesExistence(gr.n)
  addEdges(gr)
  
}

function calculateGraph2(gr){
  let visitors = [ graphShow] //, graphOrder, 
  positionNodes(gr, S.keys(gr.n), [], visitors, 0)
  graph = gr
  doit2()
}




function addPorts(gf){

}

function addEdges(g){
  //console.log("grfff",g)
  S.map (
    e => {
      //console.log("edge",e)
      if (g.n[e[0]].out[e[1]]) {
        g.n[e[0]].out[e[1]].push([e[2], e[3]])
      } else {
        g.n[e[0]].out[e[1]] = [[e[2], e[3]]]
      }
      g.n[e[2]].in[e[3]] = [e[0], e[1]]
    }
  ) (g.e)
}

function checkNodesExistence2(ns){
  let r = S.map (
    x => {
      return S.reduce (S.or) (false) (S.map (d => {
        let p0  = S.map (e => {
          if (e._id == x.id) {
            x.abi = e
            x.out  ={}
            x.in = {}
          }
          return e._id;
        }) (d.abi)
        let p1  = S.map (S.equals (x.id)) (p0) 
        return p1[0]
      }) (config1))
    }
  ) (ns)
}

function checkNodesExistence(ns){
  //console.log(sys)
  let len = Object.keys(ns).length, step = 0
  let r = S.map (
    x => {
      x.out  ={}
      x.in = {}
      if (!(x.id in sys)) {
        axios.get('http://192.168.1.140:3001/pfunction/'+x.id)
        .then(function (response) {
          // handle success
          step++;
          x.abi = response.data.pfunction.gapi
          if (step == len) calculateGraph2(g[0])
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
      } else {
        step++;
        x.abi = sys[x.id].pfunction.gapi
        if (step == len) calculateGraph2(g[0])
      }
    }
  ) (ns)
}


