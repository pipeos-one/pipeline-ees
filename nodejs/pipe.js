const S = require ('sanctuary');
const _ = require ('sanctuary-def');
var bigInt = require("big-integer");
const axios = require('axios').default;
const rust = require('./native/index.node');

global.S = S;
global.rust = rust;

const DEFAULT_LANG = 'javascript';
let languageFlag = DEFAULT_LANG;
const getFuncSource = (sources) => {
  let source = sources[languageFlag] || sources.javascript;
  if (!source) {
    const lang = Object.keys(sources).find(key => key.includes('javascript.'));
    source = sources[lang];
  }
  return source;
}

const instance = axios.create({
  baseURL: 'http://192.168.1.140:3001'
});

var marker
let sol = {}
let xr =10
let currentPoint
var settings  ={}, s = settings;
s.start = null
s.end  = null
s.graph = 0

settings.currentArrow = null

settings.maybeDrag = false
settings.currentDrag = null
settings.font = "Roboto Condensed"
settings.opacity  = 0.9
s.runstep = 5000
s.id = "5bc59e192817116e84bdd831"

// const S = window.sanctuary

// const _ =  window.sanctuaryDef;

//    isSanctuaryFunction :: Function -> Boolean
const isSanctuaryFunction = f =>
  Object.prototype.hasOwnProperty.call(f, 'toString') &&
  f.toString().includes(' :: ');

function doit(){
  //var rect = draw.rect(100,100)
  draw.clear()
  texts = draw.group()

  //var text = document.getElementById("code").value
  //// console.log(text)
 let text = '[{"n":{"0":{"i":0,"id":"5c95397d4212cc40afeec929"},"1":{"i":1,"id":"5c95397d4212cc40afeec922"},"2":{"i":2,"id":"5c95397d4212cc40afeec91f"},"2001":{"i":2001,"id":"5bc59e192817116e84bdd831"}},"e":[[2,1,1,2],[2,1,0,1],[2001,1,0,2],[2001,1,2,1]]}]'
  g = JSON.parse(text)
  var btn = draw.circle(30).center(0,0)
  btn.on("click", doit2)

  //// console.log(graph)
  marker = draw.marker(xr/co, xr/co, function(add) {
    add.path("M0,0 L"+xr/co/2+","+xr/co/2+ " "+ 0+","+xr/co+" z").attr({"fill": colors["edge"],"stroke-linejoin":"round" ,"stroke-linecap":"round"}) // M100,50 L0,90 L30,50 L0,10 Z
  })

  s1  = draw.defs().path([  // half-round
    ["M", xr*2, xr],
    ["L", xr*2, xr*2],
    ["L", 0, xr*2],
    ["L", 0, xr],
    ["C", 0, xr/2, xr/2, 0, xr, 0],
    ["C", 3*xr/2, 0, xr*2, xr/2, xr*2, xr],
    ["Z"]
    ]).attr({ fill: colors["int256"] })

  //S.map (graph1=> calculateGraph(graph1)) (g)
}



function doit2(){
  draw.clear()
  texts = draw.group()


  //graph  = run_gr


  //// console.log("graph", graph)
  marker = draw.marker(xr/co, xr/co, function(add) {
    add.path("M0,0 L"+xr/co/2+","+xr/co/2+ " "+ 0+","+xr/co+" z").attr({"fill": colors["edge"],"stroke-linejoin":"round" ,"stroke-linecap":"round"}) // M100,50 L0,90 L30,50 L0,10 Z
  })

  s1  = draw.defs().path([  // half-round
    ["M", xr*2, xr],
    ["L", xr*2, xr*2],
    ["L", 0, xr*2],
    ["L", 0, xr],
    ["C", 0, xr/2, xr/2, 0, xr, 0],
    ["C", 3*xr/2, 0, xr*2, xr/2, xr*2, xr],
    ["Z"]
    ]).attr({ fill: colors["int256"] })

  var max
  S.map (fx => {
    //max =  Math.max( fx.abi.inputs.length, fx.abi.outputs.length)
    //draw.rect(50,yn/2).move(fx.position.x*xn*2, fx.position.y*yn)
    drawNode(fx)

  }) (graph.n)

  S.map (fx => {
    //max =  Math.max( fx.abi.inputs.length, fx.abi.outputs.length)
    //draw.rect(50,yn/2).move(fx.position.x*xn*2, fx.position.y*yn)
    if (!graph.r[fx[0]]) {
      let p1 = graph.n[fx[0]].position
      let p2  = graph.n[fx[2]].position
      //// console.log(fx, p1, p2)
      let arrow = drawArrow(p1.x*4+(fx[1]-1)*4+3, p1.y*8+4, p2.x*4+(fx[3]-1)*4+3, p2.y*8+0)

      arrow.data("edge", fx)
      arrow.on("dblclick", function(e){
        // console.log(this, this.data("edge"))
        let t = remove_edge (graph.init) (this.data("edge"))
        // console.log(t)
          graph = enrich_graph (t)
          doit2()
      })
    }


  }) (graph.e)


  // const cast = type => obj => {
  //   const names = Object.keys (type.types);
  //   const types = Object.values (type.types);
  //   const values = Object.values (obj);
  //   return values.length === types.length &&
  //          values.every ((v, idx) => S.is (types[idx]) (v))
  //          ? S.Just (S.unchecked.fromPairs (S.unchecked.zip (names) (values)))
  //          : S.Nothing;
  // };

  // const cast = t1 => t2 => {
  //   const names = Object.keys (t1.types);
  //   const types1 = Object.values (t1.types);
  //   const types2 = Object.values (t2.types);
  //   const values = Object.values (t2.values);
  //   return S.equals (types1) (types2) &&
  //         //values.length === types1.length &&
  //         values.every ((v, idx) => S.is (types1[idx]) (v))
  //         ? S.Just (S.unchecked.fromPairs (S.unchecked.zip (names) (values)))
  //         : S.Nothing;
  // };

  // const failure = cast ({_.RecordType ({x: _.Number, y: _.String})})
  //                      (_.RecordType ({x: _.String, y: _.String}));

  // const success = cast (_.RecordType ({x: _.Number, y: _.String}))
  //                      (_.RecordType ({a: _.Number, bb: _.String}));

  // // console.log(S.show(failure))
  // // console.log(S.show(success));

  const like = t1 => t2 =>
  t1.type === 'RECORD' &&
  t2.type === 'RECORD' &&
  S.equals (Object.values (t1.types))
           (Object.values (t2.types));

  const r = like (_.RecordType ({x: _.String, y: _.String})) (_.RecordType ({aa: _.Number, bbb: _.String}))
  //// console.log(r)
  //[failure, success];
}

//var xr = 10



//var xn = xr*3
// var syns = SVG.Color.random("pastel")

// var colors = {
//   uint256:  syns,
//   uint: syns,
//   number: syns,
//   any: SVG.Color.random("pastel"),
//   address: SVG.Color.random("pastel"),
//   bytes: SVG.Color.random("pastel"),
//   bytes4: SVG.Color.random("pastel"),
//   func: SVG.Color.random("pastel"),
//   edge: SVG.Color.random("dark"),
//   text: SVG.Color.random("dark"),
//   function: SVG.Color.random("pastel"),
// }


var s1;





/*
s1  = draw.defs().path([  // half-round
  ["M", xr*2, xr],
  ["L", xr*2, xr*2],
  ["L", 0, xr*2],
  ["L", 0, xr],
  ["C", 0, xr/2, xr/2, 0, xr, 0],
  ["C", 3*xr/2, 0, xr*2, xr/2, xr*2, xr],
  ["Z"]
  ]).attr({ fill: colors["int256"] })


s1 = draw.defs().path([  // round
  ["M",0, xr],
  ["C",0, xr/2, xr/2,0, xr,0],
  ["C", 3*xr/2,0, xr*2, xr/2, xr*2, xr],
  ["C", xr*2, 3*xr/2, 3*xr/2, xr*2, xr, xr*2],
  ["C", xr/2, xr*2,0, 3*xr/2,0, xr],
  ["Z"]]).attr({ fill: colors["int256"] })

  s1 = draw.defs().path([ // square
  ["M", 0, 0],
  ["L", xr*2, 0],
  ["L", xr*2, xr*2],
  ["L", 0, xr*2],
  ["L", 0, 0],
  ["Z"]]).attr({ fill: colors["int256"] })

*/




//// console.log(JSON.stringify(s1.array()))

function drawNode(n) {
  //// console.log("fffffff",n)
  let node_info = indexed_func[n.id].pfunction.gapi
  let ins = node_info.inputs.length
  let outs = node_info.outputs.length
  let max = Math.max(ins, outs)
  let fs = xr
  let rotate = -45
  let xn = xr*4
  let yn = xr*8
  let anim = 100

  var gr = draw.group()
  var psi  = []
  var pso  = []
  var lsi = []
  var lso = []
  var mode =0

  function fold(){
    r.animate(anim).attr({ width: xn })
    gr2.animate(anim).attr({opacity: 0})
    for (const key in psi){
      psi[key].animate(anim).attr({x: n.position.x*xn+ xr*2})
    }
    for (const key in pso){
      pso[key].animate(anim).attr({x: n.position.x*xn+ xr*2})
    }
  }

  function unfold(){
    r.animate(anim).attr({ width: xn*max })
    gr2.animate(anim).attr({opacity: 1})
    for (const key in psi){
      psi[key].animate(anim).attr({x: xr*2+n.position.x*xn+ key*xn})
    }
    for (const key in pso){
      pso[key].animate(anim).attr({x: xr*2+n.position.x*xn+ key*xn})
    }
  }

  function expand(){
    r.animate(anim).attr({ height: xn, y: r.y()-xr })
    lb.animate(anim).attr({opacity: 1})
    for (const key in psi){
      psi[key].animate(anim).attr({y: psi[key].y()-xr*2})
    }
    for (const key in pso){
      pso[key].animate(anim).attr({y: pso[key].y()-xr*2})
    }
    for (const key in lsi){
      lsi[key].animate(anim).attr({y: lsi[key].y()-xr*2})
    }
    for (const key in lso){
      lso[key].animate(anim).attr({y: lso[key].y()+1*xr, x: lso[key].x()+1*xr})
    }
  }

  function implode(){
    r.animate(anim).attr({ height: xr*2, y: xr+n.position.y*yn })
    lb.animate(anim).attr({opacity: 0})
    for (const key in psi){
      psi[key].animate(anim).attr({y: n.position.y*yn})
    }
    for (const key in pso){
      pso[key].animate(anim).attr({
        x: n.position.x*xn+ key*xn+xr*2,
        y: (-n.position.y-.5)*yn
      })
    }
    for (const key in lsi){
      lsi[key].animate(anim).move(
        (( 0+key)*xn+n.position.x*xn-(n.position.y)*yn+xr*3)/sq2,
        (( 0+key)*xn+n.position.x*xn+(n.position.y)*yn+xr*3)/sq2
      )
    }
    for (const key in lso){
      lso[key].animate(anim).move((( 0+key)*xn+n.position.x*xn-(n.position.y)*yn-tx.length())/sq2,
      (( 0+key)*xn+n.position.x*xn+(n.position.y)*yn+xr*2+tx.length())/sq2)
    }
  }


  if (n.i < 3000) {
    var r = gr.rect(xn*max, xr*2).move(xr+n.position.x*xn,xr+n.position.y*yn).attr({ fill: colors["func"].toHex(), stroke:"#000","stroke-width":1, rx: xr, ry: xr, opacity: s.opacity})

    r.data("key", n.i)

    r.on("mousedown", function(x1){
      // console.log(x1)
      s.maybeDrag = true
      //s.currentDrag = [x1.screenX, x1.screenY]
    })

    r.on("mouseup", function(x1){
      s.maybeDrag = false
      s.currentDrag = null
    })

    r.on("mouseleave", function(e){
      if (s.maybeDrag) {
        if (! s.currentDrag) r.fire("dragstart")
        r.fire("drag")
      }
    })

    r.on("dragstart", function(x1){
      // console.log(x1)
      s.currentDrag = [x1.screenX, x1.screenY]
    })

    r.on("drag", function(e){
      let n  = graph.n[r.data("key")]
      // console.log(JSON.stringify([s.currentDrag, e.screenX]))
      if (e.screenX == s.currentDrag[0]) return
      if (e.screenX > s.currentDrag[0]) {
        n.position.x = n.position.x + 1
      } else {
        n.position.x = n.position.x - 1
      }
      doit2()
    })




  r.on("click", function(e){
    switch (mode%2) {
      // case 0:
      //   fold()
      //   break;
      // case 0:
      //   unfold()
      //   break;
      case 0:
        expand()
        break;
      case 1:
        implode()
        break;
    }
    mode++;
    //fold()
    //unfold()
  })

  r.on("dblclick", function(e){
    // console.log(e)
    let key = this.data("key")
    // console.log(key)
    let t  = remove_node (graph.init) (key)
    graph = enrich_graph (indexed_func) (t)
    run_gr = make_runtime (indexed_func) (graph)
    doit2()
  })

  }




  var lb = texts.text(shorten(n.id,8*max-2)+"\n"+shorten(node_info.name,8*max-2)).move(xr*2+n.position.x*xn-xr/2,n.position.y*yn+xr/1.5).attr({ fill: colors["text"], "opacity": 0,"font-family": s.font, "font-size": xr*1})



  var ports = gr.group()
  var gr2 = gr.group()
  var sq2 = Math.sqrt(2)
  var with_labels  = true
  if (n.id == s.id) with_labels = false

  function st1(e){
    if (s.start) {
      //add_edge (graph.init) ([])
      // console.log(s.start, s.start.data("key"))
      let t = add_edge (graph.init) (s.start.data("key").concat(this.data("key")))

      graph = enrich_graph (indexed_func) (t)
      run_gr = make_runtime (indexed_func) (graph)
      s.start  = s.end = null
      doit2()
      // // console.log(t)
      // s.start.attr({"stroke-width":0})
      // s.start  = null

    } else {
      this.attr({"stroke-width": 2, "stroke":"#000"})
      s.end = this
    }
  }

  function st2(e){
    if (s.end) {
      let t = add_edge (graph.init) (s.end.data("key").concat(this.data("key")))

      graph = enrich_graph (indexed_func) (t)
      run_gr = make_runtime (indexed_func) (graph)
      s.start  = s.end = null
      doit2()
      // // console.log(t)
      // s.end.attr({"stroke-width":0})
      // s.end  = null

    } else {
      this.attr({"stroke-width": 2, "stroke":"#000"})
      s.start = this
    }
  }


  var s2, tx,key2;
  for (const key in node_info.inputs) {
    s2 = ports.use(s1)
    //draw.add(s2)
    key2 = parseInt(key)
    s2.data("key", [n.i, key2+1])
    s2.data("type", node_info.inputs[key].type)
    s2.data("name", node_info.inputs[key].name)
    psi.push(s2)
    //// console.log(xr, xn, n.position.x, n.position.y, key2,xr*3+n.position.x*xn+ key2*xn)
    s2.move(xr*2+n.position.x*xn+ key2*xn, n.position.y*yn).attr({ fill: colors[node_info.inputs[key].type], opacity: s.opacity })
    if (with_labels) {
      tx = texts.text(shorten(node_info.inputs[key].name, 8)).attr({"font-family": s.font, "font-size":fs, "text-anchor": "start"}).addClass("noselect")
      tx.rotate(rotate, 0, 0).move(
        (( 0+key)*xn+n.position.x*xn-(n.position.y)*yn+xr*3)/sq2,
        (( 0+key)*xn+n.position.x*xn+(n.position.y)*yn+xr*3)/sq2
      ) // ,0,fs
      //// console.log(tx.transform())
      lsi.push(tx)
    }

    s2.on("touchstart", st1)
    s2.on("click", st1)

  }

  for (const key in node_info.outputs) {
    s2 = ports.use(s1)
    //gr.add(s2)
    key2 = parseInt(key)
    s2.data("key", [n.i, key2+1])
    s2.data("type", node_info.outputs[key].type)
    s2.data("name", node_info.outputs[key].name)
    pso.push(s2)
    s2.flip("y")
    s2.move(n.position.x*xn+ key2*xn+xr*2, (-n.position.y-.5)*yn).attr({ fill: colors[node_info.outputs[key].type], opacity: s.opacity })
    if (with_labels) {
      tx = texts.text(shorten(node_info.outputs[key].name, 10)).attr({"font-family": s.font, "font-size":fs, "text-anchor": "end"}).addClass("noselect")
      tx.rotate(rotate, 0, 0).move(
        (( 0+key)*xn+n.position.x*xn-(n.position.y)*yn-tx.length())/sq2,
        (( 0+key)*xn+n.position.x*xn+(n.position.y)*yn+xr*2+tx.length())/sq2
      )
      lso.push(tx)
    }
    //s2.draggable()

    s2.on("touchstart", st2)
    s2.on("click", st2)

    // s2.on("dragstart", function(x1){
    //   // console.log(x1)
    //   s.currentDrag = [x1.screenX, x1.screenY]

    // })
    // s2.on("drag", function(x){
    //   // console.log(x)
    //   let t1 = this.rbox()
    //   // console.log(t1)
    //   if (s.currentArrow) s.currentArrow.remove()
    //   s.currentArrow = drawExactArrow(t1.cx, t1.cy, t1.cx+x.screenX-s.currentDrag[0], t1.cy+x.screenY-s.currentDrag[1])


    // })
    // s2.on("dragend", function(x){
    //   if (s.currentArrow) s.currentArrow.remove()
    // })
  }

  //gr.dmove(xr, xr*4)
}









var xr2 = xr

//var end = draw.path("M100,50 L0,90 L30,50 L0,10 Z")
var co = 1



function drawArrow(x1, y1, x2, y2){
  let arr  = drawExactArrow(x1*xr2, y1*xr2, x2*xr2, y2*xr2)

  return arr
  // var midx = (x2+x1)*xr2/2
  // var midy = (y2+y1)*xr2/2
  // var color = SVG.Color.random("dark")
  // var line  =  draw.path([
  // ["M", x1*xr2, y1*xr2],
  // ["C", x1*xr2, midy, midx, midy, midx, midy],
  // ["C", midx, midy, x2*xr2, midy, x2*xr2, y2*xr2]]).attr({fill:"none", "stroke-width": xr2/8,  "stroke": color,"stroke-linejoin":"round" ,"stroke-linecap":"round" })//.move(xr*19, xr*13)
  // line.marker('end', marker)

  // var circle = draw.circle(xr/2).center(midx, midy).attr({"fill": color})
}

function drawExactArrow(x1, y1, x2, y2){
  var midx = (x2+x1)/2
  var midy = (y2+y1)/2
  var color = SVG.Color.random("dark")
  var all = draw.group()
  var line  =  all.path([
  ["M", x1, y1],
  ["C", x1, midy, midx, midy, midx, midy],
  ["C", midx, midy, x2, midy, x2, y2]]).attr({fill:"none", "stroke-width": xr2/8,  "stroke": color,"stroke-linejoin":"round" ,"stroke-linecap":"round" })//.move(xr*19, xr*13)
  line.marker('end', marker)

  var circle = all.circle(xr/1.5).center(midx, midy).attr({"fill": color})
  return all
}

function drawNodes(gn){
  for (const key in gn[0].n) {
    if (gn[0].n.hasOwnProperty(key)) {
      drawNode(gn[0].n[key]);

    }
  }
}




//var draw = SVG('#draw').size(300, 300)
//var rect = draw.rect(100, 100).attr({ fill: '#f06' })

function shorten(txt, noChar){
  let len = txt.length
  if ( len < noChar) return txt;
  let half = Math.floor(noChar/2)
  //// console.log(len,half)
  let ans = txt.slice(0, half)+ ".." +txt.slice(-half)
  return ans

}




function introspect(object) {
  var x;
  var type = Object.prototype.toString.call(object);

  switch(type){
    case '[object Array]':
    x = "array";
    break;

    case '[object Object]':
    x = "object";
    var keys = Object.keys(object);
    // console.log(keys)
    break;

    case '[object String]':
    x = "string";
    break;

    case '[object Number]':
    x = "number";
    break;

    case '[object Boolean]':
    x= "boolean";
    break;

    case '[object Date]':
    x= "date";
    break;

    case '[object Undefined]':
    x= "undefined";
    break;

    case '[object Null]':
    x= "null";
    break;

    case '[object Function]':
    x= "function";
    //// console.log(object.arguments.callee)
    //// console.log(object.arguments)
    var keys = Object.keys(object);
    // console.log(keys)
    break;

    default:
    x ="not recognized";
    // console.log(type)
  }
  return x;
}


const  baseurl  = "http://example.com/my-package#";
var zero = bigInt();
var two = new bigInt(2)
//var two = new BN(2)

// console.log(two)

S.map (((y)=>{
  sol["uint"+y*8] = _.NullaryType
  ('uint'+y*8)
  ('uint'+y*8)
  ([])
  (x => bigInt.isInstance(x) &&
        x.geq(0) &&
        x.lesser(two.pow(new bigInt(y*8))));

  sol["int"+y*8] = _.NullaryType
    ('int'+y*8)
    ('int'+y*8)
    ([])
    (x => bigInt.isInstance(x) &&
          x.geq(-two.pow(new bigInt(y*8-1))) &&
          x.lesser(two.pow(new bigInt(y*8-1))));

  sol["bytes"+y] = _.NullaryType
    ('bytes'+y)
    ('bytes'+y)
    ([])
    (x => bigInt.isInstance(x) &&
          x.geq(0) &&
          x.lesser(two.pow(new bigInt(y*8))));
})) (S.range (1) (33));

sol["address"] = sol["bytes20"];
sol["byte"] = sol["bytes1"];
sol["uint"] = sol["uint256"];
sol["int"] = sol["int256"];
sol["bool"] = sol["uint8"];
sol["string"] = _.String;
sol["bytes"] = _.String;

sol["tuple"] = _.RecordType;

sol["number"] = _.Number;
sol["any"] = _.Any;
sol["array"] = _.Array;
sol["function"] = _.AnyFunction;
sol["number[]"] = _.Array(sol["number"]);
sol["string[]"] = _.Array(sol["string"]);
sol["object"] = _.Object;
sol["object[]"] = _.Array (sol["object"]);

//    env :: Array Type
const env = _.env;

const def = _.create ({
  checkTypes: true,
  env,
});

// console.log(sol)

// console.log(S.is (sol["tuple"]({a: sol["tuple"] ({b: sol["uint"]})})) ({a: {b: 8} }))

const Point = _.RecordType ({x: _.FiniteNumber, y: _.FiniteNumber});

var COMMENTS = /((\/\/.*_)|(\/\*[\s\S]*?\*\/))/mg;
var DEFAULT_PARAMS = /=[^,]+/mg;
var FAT_ARROWS = /=>.*_/mg;

function getParameterNames(fn) {
  var code = fn.toString()
    .replace(COMMENTS, '')
    .replace(FAT_ARROWS, '')
    .replace(DEFAULT_PARAMS, '');

  var result = code.slice(code.indexOf('(') + 1, code.indexOf(')'))
    .match(/([^\s,]+)/g);

  return result === null
    ? []
    : result;
}

function functionName(fun) {
  var ret = fun.toString();
  ret = ret.substr('function '.length);
  ret = ret.substr(0, ret.indexOf('('));
  return ret;
}

var wrapFun = function(fn, typesIn, typesOut){
  // console.log(getParameterNames(fn), functionName(fn))
  var ndx  = -1
  var inputs = getParameterNames(fn).map(x=>{ ndx++; return {"name":x, "type": typesIn[ndx]};})
  ndx = -1
  var outputs = typesOut.map(x=>{ndx++; return {"name": "out_"+x, "type": x};})

  return {
    run: function(){
    try{
      return fn.apply(this, arguments);
    }catch(ex){
      ErrorHandler.Exception(ex);
    }
  },
    abi: {
    "constant": true,
    "inputs": inputs,
    "name": functionName(fn),
    "outputs": outputs,
    "payable": false,
    "stateMutability": "view",
    "type": "function"
    }
  };
};

function func1(a){
  return a;
}

var func2 = [getParameterNames(func1), functionName(func1)]

// console.log(func2)

var func3 = wrapFun(func1, [_.Number], [_.Number])
// console.log(func3.abi)

// console.log(func3.run(9))
// _.RecordType({"run": _.Function, "abi": _.Object})



const wrap1 = def ('wrap1')
  ({})
  ([_.Object, _.Type, _.Type, _.Type])
  (fn => ins => outs => {
    var ndx  = -1
    var inputs = getParameterNames(fn).map(x=>{ ndx++; return {"name":x, "type": ins[ndx]};})
    ndx = -1
    var outputs = outs.map(x=>{ndx++; return {"name": "out_"+x, "type": x};})
    return {
      run: fx,
      abi: {
        "constant": true,
        "inputs": inputs,
        "name": functionName(fn),
        "outputs": outputs,
        "payable": false,
        "stateMutability": "view",
        "type": "function"
        }
    }
  })

//var f1 = wrap(func1) ([_.Number]) ([_.Number])


const wrap = def ('wrap')
  ({})
  ([_.AnyFunction, _.StrMap(_.NonEmpty (_.String)), _.StrMap(_.NonEmpty (_.String)), _.RecordType({run: _.AnyFunction, api: _.Object})])
  (fn => ins => outs => {
    var ndx  = -1
    // console.log(ins)
    const names = Object.keys (ins);
    const types = Object.values (ins);
    const inputs = names.map(n=>{ ndx++; return {name: n, type: types[ndx]}})
    ndx = -1
    const names2 = Object.keys (outs);
    const types2 = Object.values (outs);
    const outputs = names2.map(n=>{ ndx++; return {name: n, type: types2[ndx]}})
    return {
    run: fn,
    api: {
      "constant": true,
        "inputs": inputs,
        "name": functionName(fn),
        "outputs": outputs,
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
    }
  })

//    like :: Type -> Type -> Boolean
const like = t1 => t2 =>
  t1.type === 'RECORD' &&
  t2.type === 'RECORD' &&
  S.equals (Object.values (t1.types))
           (Object.values (t2.types));

//    cast :: Type -> Object -> Maybe Object
const cast = type => obj => {
  const names = Object.keys (type.types);
  const types = Object.values (type.types);
  const values = Object.values (obj);
  return values.length === types.length &&
         values.every ((v, idx) => S.is (types[idx]) (v))
         ? S.unchecked.fromPairs (S.unchecked.zip (names) (values))
         : S.Nothing;
};

const wrap2 = def ('wrap2')
  ({})
  ([_.AnyFunction, _.Object, _.AnyFunction])
  (fn => abi => {
    const outType = _.RecordType(S.unchecked.fromPairs (S.unchecked.zip (abi.outputs.map(out => out.name)) (abi.outputs.map(out => out.type))))
    return def (functionName(fn)) ({})
      ([
          //abi.inputs.map(inn => inn.type)
          _.RecordType(S.unchecked.fromPairs (S.unchecked.zip (abi.inputs.map(inn => inn.name)) (abi.inputs.map(inn => inn.type))))
        ,
          //_.Any  //
          outType
      ])
      (ins => {
        // console.log(ins);
        let len1 = Object.values(ins).length
        let len2 = fn.length
        if (len1 == len2) {
          let ans = fn.apply(this, Object.values (ins))  // fn(ins)//fn.call(this, Object.values (ins))
          return cast (outType) (ans) //fn.call(Object.values (ins)) fn
        }
        if (len1 <= 6 && len2 == 1) {
          //const fn2 = pl.curry[len1] ()
          let ans = S.unchecked.reduce (S.I)
            (fn)
            (Object.values (ins))
          // console.log(ans)
          const type_ans = introspect(ans)
          if ( type_ans != "array" && type_ans != "object") {
            return cast (outType) ([ans])
          }
          return cast (outType) (ans)
        }

        // console.log(len1, len2)


        //S.unchecked.fromPairs (S.unchecked.zip (abi.outputs.map(out => out.name)) (fn.map(out => out.type)))
      }
      )
  })

var f1 = wrap(func1) ({num:"uint256"}) ({num:"uint256"})
// console.log(f1.run(5))  // bigInt(9)  sol["uint"]

const fun1 = function(a, b){
  // console.log(a)
  return {x:a.add(13), y:b.add(1)};
}

// console.log(S.is (_.AnyFunction)  (S.equals))


// console.log(S.unchecked.fromPairs (S.unchecked.zip (["name1",  "n"]) (["value3", "v"])))
var f2 = wrap2(fun1) ({
  "constant": true,
    "inputs": [
      {name: "num1", type: sol["uint8"]},
      {name: "num2", type: sol["uint"]}
    ],
    "name": functionName(func1),
    "outputs": [
      {name: "num", type: sol["uint"]},
      {name: "nubm", type: sol["uint"]}
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
})

var f3 = wrap2(S.add) ({
  "constant": true,
    "inputs": [
      {name: "num1", type: _.Number},
      {name: "num2", type: _.Number}
    ],
    "name": functionName(func1),
    "outputs": [
      {name: "numm", type: _.Number}
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
})

//// console.log(func1.call(this, {num:8}))
// console.log(f2({"num1":bigInt(30), "num2":bigInt(17)}) )   // bigInt(7)
// console.log(f3({"num1":30, "num2":17}) )
var pipeline = {}, pl = pipeline;


const MongoId = _.NullaryType  ('mongoid') (baseurl+'mongoid') ([])
  (x => S.is (_.String) (x)// && bigInt(x, 16).geq(0) && bigInt(x, 16).lesser(two.pow(12*8))
  )

pl["node"] = _.RecordType({"i": _.Number, "id": MongoId})
pl["rich_node"] = _.RecordType({
  "i": _.Number, "svg_id": _.String,
  "id": MongoId,
   "out": _.StrMap (_.Array (_.Array (_.Number))),
   "in": _.StrMap (_.Array (_.Number)),
   "position": _.RecordType({
    "x": _.Number,
    "y": _.Number
    }),
    "edges": _.Array (_.String)
  })

pl["edge"] = _.NullaryType  ('edge') (baseurl+'edge') ([])
  (x => S.is (_.Array (_.Number)) (x) && S.equals (4) (x.length) )

pl["rich_edge"] = _.NullaryType  ('edge') (baseurl+'edge') ([])
  (x  => S.is (_.RecordType({
    "e": pl["edge"], "svg_id": _.String, "type": _.String
    })) (x) &&
    S.is (_.Type) (sol[x.type])
  )
// pl["rich_edge"] = _.NullaryType  ('edge') (baseurl+'edge') ([])
//   (x => S.is (_.Array (_.Number)) (x) && S.equals (5) (x.length) )
pl["nodes"] = _.StrMap (pl["node"])
pl["rich_nodes"] = _.StrMap (pl["rich_node"])
pl["edges"] = _.Array (pl["edge"])
pl["runtime"]  = _.Array (_.Any)
pl["graph"] = _.NullaryType  ('graph') (baseurl+'graph') ([])
  (
    x => S.is (_.RecordType({"n": pl["nodes"], "e": pl["edges"], r: pl["runtime"]})) (x)
    //&& S.map (edge => (x.n[edge[0]] || x.r[edge[0]]) && (x.n[edge[2]] || x.r[edge[2]]) (x.e) )

      )
pl["rich_graph"] = _.NullaryType  ('rich_graph') (baseurl+'rich_graph') ([])
  (
    x => S.is (_.RecordType({ "n": pl["rich_nodes"], "e": pl["edges"], "r": pl["runtime"], init: pl["graph"]})) (x)
  )

pl["graph_history"] = _.Array (pl["graph"])

pl["io"]  = _.NullaryType ('io') (baseurl+'graph') ([])
    ( x =>
      S.is (_.RecordType({"name": _.String, "type": _.String})) (x) &&
      S.is (_.Type) (sol[x.type])
    )

pl["abi_type"]  = _.EnumType
  ('abi_type')
  (baseurl+'abi_type')
  (["function", "constructor",  "fallback", "event", "string"]);

pl["abi_mutability"]  = _.EnumType
  ('abi_mutability')
  (baseurl+'abi_mutability')
  (["pure", "view", "nonpayable", "payable"]);

pl["func_abi"] = _.RecordType({
  "type": pl["abi_type"],
  "name": _.String,
  "inputs": _.Array (pl["io"]),
  "outputs": _.Array (pl["io"]),
  "constant": _.Boolean,
  "payable": _.Boolean,
  "stateMutability": pl["abi_mutability"],
})

pl["cont_abi"] = _.Array (pl["func_abi"])

pl["db_func"] = _.RecordType({
  "_id": MongoId,
  "pclassid": MongoId,
  "pfunction": _.RecordType({
    "signature": _.String,
    "gapi": pl["func_abi"],
    "sources": _.StrMap (_.String),
    "graph": _.Any
  }),
  // "tags": _.Array (_.String),
  "categories": _.StrMap (_.Any),
  "timestamp": _.String
})



pl["db_funcs"]  = _.Array (pl["db_func"])
pl["id_funcs"] = _.StrMap (pl["db_func"])


pl["runtime_graph"] = _.RecordType({
  "rich_graph": pl["rich_graph"],
  "runnable_graph":  _.Array (_.Array (_.Number)),
  "context": pl["id_funcs"],
  "runtime": _.StrMap ( pl["runtime"])
})

const index_funcs = def ('index_funcs') ({})
  ([pl["db_funcs"], pl["id_funcs"]])
  (db_funcs => {
    let obj_funcs = {}
    S.map (x => obj_funcs[x._id] = x) (db_funcs)
    return obj_funcs;
  })

// console.log(isSanctuaryFunction (S.add));
  //// console.log("hu", S.add.length)

const add_const = def ('add_const') ({})
  ([pl["graph"], _.Object, pl["graph"]])
  (graph =>  edge => variable => {
    let graph2 = JSON.parse(JSON.stringify(graph))
    s.runstep ++
    graph2.r[s.runstep] = variable
    return add_edge (graph2) (edge)
  })

const add_edge = def ('add_edge') ({})
  ([pl["graph"], pl["edge"], pl["graph"]])
  (graph => edge => {
    //if (!(graph.n[edge[0]] && graph.n[edge[2]])) return graph;
    if (edge in graph.e) return graph;
    let graph2 = JSON.parse(JSON.stringify(graph))
    graph2.e.push(edge)
    return graph2;
  })

function indexInArray(array, item) {
  // console.log(array, item)
    for (var i = 0; i < array.length; i++) {
        // This if statement depends on the format of your array
        if (
            array[i][0] == item[0] &&
            array[i][1] == item[1] &&
            array[i][2] == item[2] &&
            array[i][3] == item[3]
          ) {
            return i;   // Found it
        }
    }
    return -1;   // Not found
}

const remove_edge = def ('remove_edge') ({})
  ([pl["graph"], pl["edge"], pl["graph"]])
  (graph => edge => {
    // console.log("ndx", graph.e)
    let index = indexInArray(graph.e, edge);
    // console.log("ndx", index)
    if (index > -1) {
      let graph2 = JSON.parse(JSON.stringify(graph))
      graph2.e.splice(index, 1);
      return graph2;
    }
    return graph;
  })

const add_node = def ('add_node') ({})
  ([pl["graph"], pl["node"], pl["graph"]])
  (graph => node => {
    let graph2 = JSON.parse(JSON.stringify(graph))
    graph2.n[node.i] = node
    return graph2;
  })

const remove_node = def ('remove_node') ({})
  ([pl["graph"], _.Number, pl["graph"]])
  (graph => node_id => {
    // console.log(!(""+node_id in graph.n))
    if (!(""+node_id in graph.n)) return graph;
    let graph2 = JSON.parse(JSON.stringify(graph))
    // console.log(graph2)
    let ndx = 0
    // delete edges from/to that node first!
    while (graph2.e.length > ndx) {
      if (graph2.e[ndx][0] == node_id || graph2.e[ndx][2] == node_id) {
        graph2.e.splice(ndx, 1);
      }  else {
        ndx++
      }
    }
    delete graph2.n[""+node_id]
    return graph2;
  })


var func = new Function("return " + "function (a, b) { return a + b; }")();


let gr = []

gr[0]= {
  "n": {
    1: { "i": 1, "id": "5dbbf356f18ff7488e9b1096"}
    // , 2: { "i": 2, "id": "5dbe11bb052a148d62eae283"}
  },
  "e": [],
  "r": []
}

// graph in graph
gr[1] = {
  "n": {
    //1: { "i": 1, "id": "5dbbf356f18ff7488e9b1096"}, // "5dbecd8c052a148d62eae284"
    1: { "i": 1, "id": "5dc1ac9333634f14a7cca671" }
  },
  "e": [],
  "r": []
}   // set function "5dc16388dbae007bf0da09fc"

// simple map
gr[2] = {
  "n": {
    1: { "i": 1, "id": "5dbbf356f18ff7488e9b1096"}, // "5dbecd8c052a148d62eae284"
    //1: { "i": 1, "id": "5dbee35b052a148d62eae285" }
  },
  "e": [],
  "r": []
}

//// console.log(S.is (pl["graph"]) (gr))

//// console.log(add_edge(gr) ([1, 2, 2, 1]))

//// console.log(remove_edge(gr) ([1, 2, 2, 1]))

//// console.log(remove_node(gr) (1))

// var funct = {"_id":"5c95397d4212cc40afeec929","pclassid":"5c95397d4212cc40afeec914","pfunction":{"signature":"getQuantity(address,uint256)","gapi":{"constant":true,"inputs":[{"name":"vendor","type":"address"},{"name":"product_id","type":"uint256"}],"name":"getQuantity","outputs":[{"name":"quantity","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},"chainids":["3"]},"categories"{"tags":["Pipeline Demo Package","ethpm","pipeline","ethpm"]},"timestamp":"2019-03-22T14:38:36.112Z"}
//
// var functs = [
//   {"_id":"5c95397d4212cc40afeec929","pclassid":"5c95397d4212cc40afeec914","pfunction":{"signature":"getQuantity(address,uint256)","gapi":{"constant":true,"inputs":[{"name":"term1","type":"number"},{"name":"term2","type":"number"}],"name":"add","outputs":[{"name":"quantity","type":"number"}],"payable":false,"stateMutability":"view","type":"function"},"chainids":["3"]},"categories"{"tags":["Pipeline Demo Package","ethpm","pipeline","ethpm"]},"timestamp":"2019-03-22T14:38:36.112Z", "js": "function(a, b) {return a+b;}"},
//
//   {"_id":"5c95397d4212cc40afeec922","pclassid":"5c95397d4212cc40afeec914","pfunction":{"signature":"getQuantity(address,uint256)","gapi":{"constant":true,"inputs":[{"name":"term1","type":"number"},{"name":"term2","type":"number"}],"name":"subst","outputs":[{"name":"quantity1","type":"number"}, {"name":"quantity2","type":"number"}],"payable":false,"stateMutability":"view","type":"function"},"chainids":["3"]},"categories"{"tags":["Pipeline Demo Package","ethpm","pipeline","ethpm"]},"timestamp":"2019-03-22T14:38:36.112Z", "js": "function(a, b) {return [a*2, b/2];}"},
//
//   {"_id":"5c95397d4212cc40afeec91f","pclassid":"5c95397d4212cc40afeec914","pfunction":{"signature":"getQuantity(address,uint256)","gapi":{"constant":true,"inputs":[{"name":"term1","type":"number"},{"name":"term2","type":"number"}],"name":"mul","outputs":[{"name":"quantity","type":"number"}],"payable":false,"stateMutability":"view","type":"function"},"chainids":["3"]},"categories"{"tags":["Pipeline Demo Package","ethpm","pipeline","ethpm"]},"timestamp":"2019-03-22T14:38:36.112Z", "js": "function(a, b) {return a*b;}"},
//
//   {"_id":"5c95397d4212cc40afeec91a","pclassid":"5c95397d4212cc40afeec914","pfunction":{"signature":"sum(array)","gapi":{"constant":true,"inputs":[{"name":"term1","type":"any"}],"name":"sum","outputs":[{"name":"sum","type":"number"}],"payable":false,"stateMutability":"view","type":"function"},"chainids":["3"]},"categories"{"tags":["Pipeline Demo Package","ethpm","pipeline","ethpm"]},"timestamp":"2019-03-22T14:38:36.112Z", "js": "function(a) {return S.reduce (S.add) (0) (a);}"},
//
//   {"_id":"5c95397d4212cc40afeec91e", "pclassid":"5c95397d4212cc40afeec914","pfunction":{"signature":"map(function,array)","gapi":{"constant":true,"inputs":[{"name":"func","type":"function"},{"name":"array","type":"any"}],"name":"map","outputs":[{"name":"result","type":"any"}],"payable":false,"stateMutability":"view","type":"function"},"chainids":["3"]},"categories"{"tags":["Pipeline Demo Package","ethpm","pipeline","ethpm"]},"timestamp":"2019-03-22T14:38:36.112Z", "js": "S.map"},
//
//   {"_id": s.id,"pclassid":"5c95397d4212cc40afeec914","pfunction":{"signature":"io","gapi":{"constant":true,"inputs":[{"name":"i","type":"any"}],"name":"io","outputs":[{"name":"o","type":"any"}],"payable":false,"stateMutability":"view","type":"function"},"chainids":["3"]},"categories"{"tags":["Pipeline Demo Package","ethpm","pipeline","ethpm"]},"timestamp":"2019-03-22T14:38:36.112Z", "js": "S.I"}
// ]

const ffuncs = ["5dbaa731f18ff7488e9b108b"]  //,"5dbae12df18ff7488e9b108f"]

function getFuncsFromDB(arr){
  let out = {}
  arr.forEach(element => {
    axios.get('http://192.168.1.140:3001/pfunction?filter={%22where%22:{%22pclassid%22:%22'+element+'%22}}')
      .then(function (response) {
        // console.log("response",response);
        out = response.data

      })
      .catch(function (error) {
        // console.log(error);
      });
  });
}

getFuncsFromDB(ffuncs)

var indexed_func





function enrich(na){
  if (currentPoint === undefined) currentPoint = {x: 0, y: 1}
  currentPoint.y = na.level
  if (na.row  === 0) currentPoint.x = 0
  na.node.position = {x: currentPoint.x, y: currentPoint.y}
  //// console.log(na.context[na.node.id])
  let max  = Math.max(na.context[na.node.id].pfunction.gapi.inputs.length, na.context[na.node.id].pfunction.gapi.outputs.length)
  currentPoint.x = currentPoint.x  + max
}

function addEdges(g){
  //// console.log("grfff",g)
  S.map (
    e => {
      // console.log("edge",e, g)
      if (g.r[e[0]]) {
        //g.n[e[0]].out[e[1]].push([e[2], e[3]])
      } else {
        //g.n[e[0]].out[e[1]] = [[e[2], e[3]]]
        if (g.n[e[0]].out[e[1]]) {
          g.n[e[0]].out[e[1]].push([e[2], e[3]])
        } else {
          g.n[e[0]].out[e[1]] = [[e[2], e[3]]]
        }
      }
      g.n[e[2]].in[e[3]] = [e[0], e[1]]
    }
  ) (g.e)
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
  // console.log("iii", node,  visited)

  for (const key in node.in) {
    if (!visited.includes(""+node.in[key][0]) ) return false;
  }
  return true
}

function inputNodesAreDefined(node, defined, level){
  // console.log("iii", node, defined)
  if (level  === 0) return false
  for (const key in node.in) {
    // console.log("iiikey", key, node.in[key])
    let u  = defined[node.in[key][0]]
    // console.log("iiikeyu", u)
    //return  true
    if (!u ) return false;
    if (!u[node.in[key][0]]) return false;
  }
  return true
}

function positionNodes(gf, unvisited, visited, visitors, level){
  if (unvisited.length  === 0) return;
  let row = 0, visitedNow = []
  let only_outputs = true
  S.map (n => {if (n < 4000 ) only_outputs = false }) (unvisited)

  S.map (n => {
    if ((inputNodesAreVisited(gf.n[n], visited)  || inputNodesAreDefined(gf.n[n], gf.r, level)) && (level >0 || n > 2000)){
      S.flip (visitors) ({node: gf.n[n] , level: level, row: row, context: indexed_func})
      row = row+1
      if (only_outputs || n < 4000) visitedNow.push(n)
    }
  }) (unvisited)
  unvisited = difference(unvisited, visitedNow)
  visited = visited.concat(visitedNow)
  // console.log(gf, unvisited, visited, visitors, level+1)
  return positionNodes(gf, unvisited, visited, visitors, level+1)
}

function addNodesEdges(grf, context){
  let added_nodes = {}
  let added_edges = []
  let step_out = 4000
  let step_in = 3000
  while (grf.n[""+step_out] !== undefined) step_out++
  while (grf.n[""+step_in] !== undefined) step_in++
  S.map (
    n => {
      for (let i = 1 ; i <=context[n.id].pfunction.gapi.outputs.length; i++){
        if (!(""+i in n.out) && n.id != s.id) {
          let no = {
            i: step_out,
            svg_id: "",
            id: s.id+step_out,
            in:{"1": [n.i, i]},
            out:{},
            position: {x: 0, y:0} ,
            edges: []
          }
          let typing  = context[n.id].pfunction.gapi.outputs[i-1]
          // console.log(context[n.id].pfunction.gapi.outputs, i)
          indexed_func[s.id+step_out]  = {"_id": s.id + step_out,"pclassid":"5c95397d4212cc40afeec914","pfunction":{"signature":"io", "sources": {"javascript":"f=>f"}, "graph":{}, "gapi":{"constant":true,"inputs":[{"name":typing.name,"type": typing.type}],"name":"io","outputs":[{"name":"o","type": typing.type}],"payable":false,"stateMutability":"view","type":"function"},"chainids":["3"]},"categories":{"tags":["Pipeline Demo Package","ethpm","pipeline","ethpm"]},"timestamp":"2019-03-22T14:38:36.112Z", graph: {}}
          added_nodes[step_out]  = no
          added_edges.push([n.i, i, step_out, 1])
          n.out[""+i]= [[step_out, 1]]
          step_out++;
        }
      }

      for (let i = 1 ; i <=context[n.id].pfunction.gapi.inputs.length; i++){
        if (!(""+i in n.in) && n.id != s.id) {
          let on = {edges: [], i: step_in, id: s.id +step_in,
          in:{}, out:{"1":[[n.i, i]]}, position: {x: 0, y:0}, svg_id: ""}
          let typing  = context[n.id].pfunction.gapi.inputs[i-1]
          // console.log(context[n.id].pfunction.gapi.inputs, i)
          indexed_func[s.id + step_in]  = {"_id": s.id +step_in,"pclassid":"5c95397d4212cc40afeec914","pfunction":{"signature":"io", "sources": {"javascript":"f=>f"},"graph":{}, "gapi":{"constant":true,"inputs":[{"name": "i","type": typing.type}],"name":"io","outputs":[{"name":typing.name,"type": typing.type}],"payable":false,"stateMutability":"view","type":"function"},"chainids":["3"]},"categories":{"tags":["Pipeline Demo Package","ethpm","pipeline","ethpm"]},"timestamp":"2019-03-22T14:38:36.112Z", graph: {}}
          added_nodes[step_in]  = on
          added_edges.push([step_in, 1, n.i, i])
          n.in[""+i] = [step_in, 1]
          step_in++;
        }
      }
    }
  ) (grf.n)
  grf.n= Object.assign(grf.n, added_nodes)
  // console.log("added_edges", added_edges)
  grf.e = grf.e.concat(added_edges)
}

const enrich_graph = def ('enrich_graph') ({})
  ([pl["id_funcs"], pl["graph"], pl["rich_graph"]])
  (context => graph1 => {
    let graph2 = JSON.parse(JSON.stringify(graph1))

    S.map (x => {
      x.out = {};
      x.in ={};
      x.position = {x: 0, y: 0};
      x.svg_id = "";
      x.edges = [];
    }) (graph2.n)
    addEdges(graph2);
    addNodesEdges(graph2, context);
    // console.log("lllll",graph2)
    let visitors = [enrich];

    let graph3 =  positionNodes(graph2, S.keys(graph2.n), ["0"], visitors, 0)

    graph2.init  = graph1
    return graph2


  })
  //// console.log("kkkk",gr)
//graph  = enrich_graph (gr)

//draw.clear()
//doit2()

const make_runtime =  def ('make_runtime') ({})
([pl["id_funcs"], pl["rich_graph"], pl["runtime_graph"]])
(context  => rich_graph => {
  let rows = []
  let rich_graph2 = JSON.parse(JSON.stringify(rich_graph))
  for (let x in rich_graph2.n) {
    // console.log("x", rich_graph.n[x], rows[rich_graph.n[x].position.y])
      if ( rows[rich_graph2.n[x].position.y] === undefined) rows[rich_graph2.n[x].position.y] = []
    rows[rich_graph2.n[x].position.y].push(parseInt(x))
    }
    // console.log(JSON.stringify(rows))
    //S.map (x  => S.map (y => rows[x][y] = 100) (x)) (rows)
  // console.log(JSON.stringify(rows))
  return {
    "rich_graph": rich_graph2,
    "runnable_graph": rows,
    "context": context,
    "runtime": { "0": rich_graph2.r}
  }
});

//let run_gr = make_runtime(graph) (indexed_func)
//// console.log(run_gr)

var deb

const run_graph =  def ('run_graph') ({})
([pl["runtime_graph"], _.Any, _.Any])
( runtime_graph => ins => {
  let outs = [], ndx = 0, node
  let func, args, ans;
  let arr_ins = Object.values(ins)


  let runtime = JSON.parse(JSON.stringify(runtime_graph.runtime))
  let runnable = JSON.parse(JSON.stringify(runtime_graph.runnable_graph))
  let rich = JSON.parse(JSON.stringify(runtime_graph.rich_graph))

  //// console.log("gkkgg", arr_ins)
  S.map (x => {
    //console.log("in item gkkgg", x, ndx, arr_ins, arr_ins[ndx], ""+x)
    runtime[""+x] = [arr_ins[ndx]]
    //console.log("vvvv", JSON.parse(JSON.stringify(runtime)), runtime[""+x])
    ndx++
  }) (runnable[0])

  //console.log(ins, arr_ins, runnable)
  //console.log("gkkgg ins", arr_ins, runnable, JSON.parse(JSON.stringify(runtime)))
  ndx = 0
  S.map (x => {
    //console.log(x,"x")
    //if (ndx !== 0) {
    S.map (y => {
    node  = rich.n[""+y]
    let contxt = runtime_graph.context[node.id]
    let source = getFuncSource(contxt.pfunction.sources)
    // console.log(runtime_graph, contxt, node.id, source, node)


    // console.log("gkkgg", runtime_graph.runtime)
    //deb  = runtime_graph
    let args=[]
    //console.log("node.in.length", node.in,  node,"1" in node.in)

    if  ("1" in node.in){
      let port  =  0
      S.map (x1=> {
        // console.log(x1)
        let argt = runtime[x1[0]][x1[1]-1]
        let type  = contxt.pfunction.gapi.inputs[port].type
        if (type == "function") {
          argt  = new Function("return " + argt)();
        }
        port++
        args.push(argt)
      }) (node.in)
    } else {
      args  = runtime[""+y]
    }

    args = args || [];
    //console.log("argss", x, y,JSON.stringify(args), JSON.stringify(runtime))

    if (contxt.pfunction.gapi.type == "function") {
      //let ans, func
      if (Object.getOwnPropertyNames(contxt.pfunction.graph).length > 0) {
        //console.log("------", contxt.pfunction.graph, node)
        ans = run_graph (make_runtime (indexed_func) (enrich_graph (indexed_func) (contxt.pfunction.graph))) (args);
        //ans = Object.values(func.apply(this, [args]));
        ans = Object.values(ans)
      } else {
        //console.log("Src: ",source)
        func = new Function("return " + source)();
        //console.log("func",func,JSON.stringify(args), JSON.stringify(runtime))
        if (func.length < args.length) {
          ans = S.unchecked.reduce (S.I)
          (func)
          (args)
        } else  {
          // ans = func.apply(this, args);
          ans = func.apply(this, args);
        }



      }

    } else {
      try {
        func = JSON.parse("["+source+"]")[0]
      } catch (error) {
        func = JSON.parse("[\""+source+"\"]")[0]
      }
    }




    // if ( contxt.pfunction.gapi.outputs.length <= 1) {
    //   ans = [ans]
    // }
    runtime[""+y] = [ans]
    //console.log("aans2", ans, func, JSON.stringify(runtime))

    if (y >=  4000)  outs.push(ans)

    //// console.log(JSON.stringify(runtime_graph.runtime))
}) (x) } )  (runnable)
  // console.log(ins)
  //console.log("run, out", JSON.stringify(runtime), outs)
  return outs;

})

//let inp = {a: function(x){return x*5}, d: [89, 798, 89]}



const fun_graph = def ('fun_graph') ({})
  ([pl["id_funcs"], pl["graph"], _.Object, _.Any])
  ( context => graph => ins =>{
    // return run_graph (make_runtime (context) (enrich_graph (context) (graph)) ) (ins)
    return run_graph(make_runtime_graph (context) (graph)) (ins)
  })

const make_runtime_graph = def ('make_runtime_graph') ({})
  ([pl["id_funcs"], pl["graph"], _.Any])
  ( context => graph => {
    return make_runtime (context) (enrich_graph (context) (graph))
  })



//// console.log(inp,fun_graph (indexed_func) (graph) )

function cl(e){
  // console.log(e)
}

//// console.log(bigInt("5c95397d4212cc40afeec91f", 16).lesser(two.pow(12*8)))

function getClass(classid) {
  return instance.get('/pfunction?filter={%22where%22:{%22pclassid%22:%22'+classid+'%22}}');
}

function getFunc(funcid) {
  return instance.get('/pfunction/'+funcid);
}

const classes2  = ["5dbaa731f18ff7488e9b108b",  "5c95397d4212cc40afeec914"]

// axios.all( S.map (getClass) (classes2) )
//   .then(function (response) {
//         // console.log("responsesss",response);
// });

axios.all( [getClass("5dbaa731f18ff7488e9b108b")]) // , getClass("5c95397d4212cc40afeec914")
  .then(function (responses) {

    let merged = {}
    responses.forEach( el  =>{
      el.data.map( fun  =>{
        merged[fun._id] = fun
      })
    })
    indexed_func  = Object.assign({}, indexed_func, merged)
    // console.log(indexed_func)

});

function getFuncsFromGraph(gf) {
  let out  = []
  for (let node in  gf.n) {
    out.push(gf.n[node].id)
  }
  return out
}

function resolveDb(arrFunc){
  let arr =  arrFunc.filter(x=>!(x in indexed_func))
  //console.log(arr, indexed_func)
  axios.all( arr.map(getFunc) ) // , getClass("5c95397d4212cc40afeec914")
    .then(function (responses) {

      let merged = {}
      responses.forEach( el  =>{
          merged[el.data._id] = el.data
          if (el.data.pfunction.graph != {}) {
            resolveDb(getFuncsFromGraph(el.data.pfunction.graph))
          }
      })
      indexed_func  = Object.assign({}, indexed_func, merged)
      // console.log(indexed_func)

      // let menu2 = {
      //   name: "Add Node",
      //   size: merged.length,
      //   children: indexed_func
      // }

      // fillMenu2(menu2, "caruso", "breadcrumbs")

      //doit()

  });
}

function  dg(gi){
  s.graph = gi
  resolveDb(getFuncsFromGraph(gr[s.graph]))

  setTimeout ( x=>{
    graph  = enrich_graph (indexed_func) (gr[s.graph])
    //doit2()
  }, 1000)
}

//dg(0)
var gra0,ins0

function getRuntimeGraph(context, gra) {
  //console.log("gra", context, gra, ins)
  indexed_func = index_funcs(context)
  resolveDb(getFuncsFromGraph(gra));
  gra0  = gra

  return new Promise((resolve, reject) => {
    setTimeout (() => {
      let out
      out = make_runtime_graph(indexed_func) (gra0);
      // console.log(out);
      resolve(out);
    }, 2000);
  })
}

export async function buildSource(context0, gra, sourceBuilder) {
  const {rich_graph, runnable_graph, context, runtime} = await getRuntimeGraph(context0, gra);

  let contextCopy = {};
  Object.keys(rich_graph.n).forEach(nodeIndex => {
    const node = rich_graph.n[nodeIndex];
    const contextKey = `${node.id}_${nodeIndex}`;
    contextCopy[contextKey] = JSON.parse(JSON.stringify(context[node.id]));
    rich_graph.n[nodeIndex].id = contextKey;

    contextCopy[contextKey].pfunction.gapi.inputs_idx = JSON.parse(JSON.stringify(contextCopy[contextKey].pfunction.gapi.inputs));
    contextCopy[contextKey].pfunction.gapi.outputs_idx = JSON.parse(JSON.stringify(contextCopy[contextKey].pfunction.gapi.outputs));
  });

  const levelCount = runnable_graph.length;
  const enrichedNodes = runnable_graph.map((level, levelNo) => level.map(nodeIndex => {
    // console.log('nodeIndex', nodeIndex, levelNo);
    const node = rich_graph.n[nodeIndex];
    node.record = contextCopy[node.id];
    const olen = node.record.pfunction.gapi.outputs.length;
    const ilen = node.record.pfunction.gapi.inputs.length;

    // outputs get the name of the inputs
    if (levelNo < levelCount - 1) {
      node.outputs = [...Array(olen + 1).keys()].slice(1).map(i => {
        const findex = node.out[i][0][0];
        const oindex = node.out[i][0][1] - 1;  // starts at 1
        const output = JSON.parse(JSON.stringify(contextCopy[rich_graph.n[findex].id].pfunction.gapi.inputs[oindex]));

        output.name += `_${findex}_${oindex}`;
        contextCopy[rich_graph.n[findex].id].pfunction.gapi.inputs_idx[oindex] = output;
        return output;
      });
      // console.log('node.outputs', JSON.stringify(node.outputs));
    }
    if (levelNo > 0) {
      node.inputs = [...Array(ilen + 1).keys()].slice(1).map(i => {
        // console.log('node.inputs', i, node.in[i]);
        const findex = node.in[i][0];
        const oindex = node.in[i][1] - 1;  // starts at 1
        const input = JSON.parse(JSON.stringify(contextCopy[rich_graph.n[findex].id].pfunction.gapi.outputs[oindex]));

        input.name += `_${findex}_${oindex}`;
        contextCopy[rich_graph.n[findex].id].pfunction.gapi.outputs_idx[oindex] = input;
        return input;
      });
      // console.log('-- node.inputs', JSON.stringify(node.inputs));
    }
    return node;
  }));

  const result = sourceBuilder(enrichedNodes);

  return result;
}

async function resolveGraph(context, gra, ins, lang) {
  // console.log("gra", context, gra, ins)
  ins0 = ins
  languageFlag = lang || DEFAULT_LANG;

  const runtimeGraph = await getRuntimeGraph(context, gra);
  let out
  out = run_graph(runtimeGraph)(ins);
  console.log(out);
  return out;
}

export default resolveGraph;
