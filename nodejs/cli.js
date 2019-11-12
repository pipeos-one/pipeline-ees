import arg from 'arg';
import fs from 'fs';
import pipe from './pipe';



var settings = {}, s= settings, options

//let o = require('./pipe').run_graph({});


// http://192.168.1.140:3001
function parseArgumentsIntoOptions(rawArgs) {
 const args = arg(
   {
     '--provider': String,
     '--gfile': String,
     '--graphid': String,
     '--ifile': String,
     '--xfile': String,
     '-p': '--provider',
     '-g': '--graphid',
     '-i': '--ifile',
     '-x': '--xfile'
   },
   {
     argv: rawArgs.slice(2),
   }
 );
 return {
   provider: args['--provider'] || 'http://192.168.1.140:3001',
   xfile:  args['--xfile'] || './context.json',
   gfile: args['--gfile'] || './graph.json',
   ifile:  args['--ifile'] || './in.json',
   graphid: args['--graphid'] || ''
 };
}

function setGraph(err, data){
  if (err) throw err;
  s.graph = JSON.parse(data);
  //s  = Object.assign(s, options)
  //console.log(s)
  fs.readFile(options.ifile, 'utf8', setInput);
}

function setInput(err, data){
  if (err) throw err;
  s.input = JSON.parse(data);
  //s  = Object.assign(s, options)
  fs.readFile(options.xfile, 'utf8', setContext);
  //console.log(s)
  
}

function setContext(err, data){
  if (err) throw err;
  s.context = JSON.parse(data);
  //s  = Object.assign(s, options)
  //console.log(data)
  pipe(s.context, s.graph, s.input)
}


export function cli(args) {
  //console.log(args)
  options = parseArgumentsIntoOptions(args);
  //console.log(JSON.stringify(options))
  fs.readFile(options.gfile, 'utf8', setGraph);
 
 
 //return options;
}