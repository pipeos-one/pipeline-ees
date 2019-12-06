import arg from 'arg';
import fs from 'fs';
import pipe, {buildSource} from './pipe';
import {sourceBuilder, crateBuilder} from './langvisitors/langvisitor.js';
import {executeGraph} from './wasmffi.js';
import tests from './tests/tests';

function parseArgumentsIntoOptions(rawArgs) {
 const args = arg(
   {
     '--provider': String,
     '--gfile': String,
     '--graphid': String,
     '--ifile': String,
     '--xfile': String,
     '--lang': String,
     '--run-tests': Boolean,
     '--build-source': Boolean,
     '--ffi': Boolean,
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
   graphid: args['--graphid'] || '',
   lang: args['--lang'] || '',
   runTests: args['--run-tests'] || false,
   buildSource: args['--build-source'] || false,
   ffi: args['--ffi'] || false,
 };
}

async function cli(args) {
  const options = parseArgumentsIntoOptions(args);
  // console.log(options);

  if (options.runTests) {
    tests();
    return;
  }

  let graph = await fs.promises.readFile(options.gfile, 'utf8')
    .catch(e => {throw e});
  graph = JSON.parse(graph);

  let context = await fs.promises.readFile(options.xfile, 'utf8')
    .catch(e => {throw e});
  context = JSON.parse(context);

  if (options.buildSource) {
    // depending on the language, choose sourceBuilder
    if (!options.lang) {
      throw new Error('No --lang flag found');
    }
    const nodes = await buildSource(context, graph);
    const result = sourceBuilder(options.lang)(nodes);

    switch(options.lang) {
      case 'rust':
        await crateBuilder(result);
        break;
      case 'solidity':
        console.log('-----------');
        console.log(result.source);
        console.log('-----------');
        break;
      default:
        throw new Error(`Language ${options.lang} not supported`);
    }
    return;
  }

  let input = await fs.promises.readFile(options.ifile, 'utf8')
    .catch(e => {throw e});
  input = JSON.parse(input);

  if (options.ffi) {
    const nodes = await buildSource(context, graph);
    const result = await executeGraph(nodes, input);
    console.log(result);
    return;
  }

  pipe(context, graph, input, options.lang);
}

export {cli};
