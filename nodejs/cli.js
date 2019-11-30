import arg from 'arg';
import fs from 'fs';
import pipe, {buildSource} from './pipe';
import sourceBuilder from './langvisitors/langvisitor.js';
import {cargoToml, cargoMain} from './langvisitors/cargo_templates.js';
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
 };
}

const builtCrate = 'builtcrate'

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
    const result = await buildSource(context, graph, sourceBuilder);

    // for Rust
    const libs = [{name: 'i32lib', path: '../../native/libs/i32lib', version: '0.1.0'}]
    const cargotoml = cargoToml(builtCrate, libs);
    const mainrs = cargoMain(libs, 'func0', result.source, result.inputs, result.outputs);
    await fs.promises.writeFile(`./rbuild/${builtCrate}/src/main.rs`, mainrs);
    await fs.promises.writeFile(`./rbuild/${builtCrate}/Cargo.toml`, cargotoml);

    const sampleins = result.inputs.map(inp => `"${inp.name}": ${inp.type}_?`).join(',')
    console.log('--------------');
    console.log(`Done. Go to "./rbuild/${builtCrate}" and run:`);
    console.log(`cargo run -- '{${sampleins}}'`);
    console.log('--------------');
    return;
  }

  let input = await fs.promises.readFile(options.ifile, 'utf8')
    .catch(e => {throw e});
  input = JSON.parse(input);


  pipe(context, graph, input, options.lang);
}

export {cli};
