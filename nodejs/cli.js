import arg from 'arg';
import fs from 'fs';
import pipe from './pipe';
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
  let input = await fs.promises.readFile(options.ifile, 'utf8')
    .catch(e => {throw e});
  let context = await fs.promises.readFile(options.xfile, 'utf8')
    .catch(e => {throw e});

  graph = JSON.parse(graph);
  input = JSON.parse(input);
  context = JSON.parse(context);

  pipe(context, graph, input, options.lang);
}

export {cli};
