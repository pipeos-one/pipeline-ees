import fs from 'fs';
import {cargoToml, cargoMain} from './cargo_templates.js';
import rustv from './rust_templates';
import solidityv from './solidity_templates';

const visitorMap = {
  rust: rustv,
  solidity: solidityv,
}

const sourceBuilder = (lang) => (enrichedNodes) => {
  const visitor = visitorMap[lang];
  if (!visitor) throw new Error('Language not available');

  const inputs = enrichedNodes.shift();
  let outputs = enrichedNodes.pop();

  if (outputs[0].i < 3000) {
    enrichedNodes.push(outputs);
    outputs = [];
  }

  // Function definition
  const fname = 'func0';
  const ins = visitor.finputs(inputs.map(inp => inp.record.pfunction.gapi.outputs_idx[0]));
  const outs = visitor.foutputs(outputs.map(out => out.inputs[0]));
  const fdef = visitor.fdefinition(fname, ins, outs);

  // Function body - graph steps
  const body = [].concat(
    ...enrichedNodes.map(row => row.map(visitor.buildGraphStep))
  ).join('\n');
  const freturn = visitor.buildFout(outputs);
  const fsource = fdef + '\n' + body + '\n' + freturn;

  let imports = [...new Set([].concat(
    ...enrichedNodes.map(row => row.map(visitor.buildImports))
  )).values()].join('\n');

  if (visitor.buildExtra) {
    const extra = visitor.buildExtra([...new Set([].concat(
      ...enrichedNodes
    )).values()]);
    imports += extra;
  }

  const source = visitor.buildContainer(imports, fsource);

  return {
    source,
    inputs: visitor.setTypes(
      inputs.map(inp => inp.record.pfunction.gapi.outputs_idx[0])
    ),
    outputs: visitor.setTypes(outputs.map(out => out.inputs[0])),
  }
}

const builtCrate = 'builtcrate';

const crateBuilder = async ({source, inputs, outputs}) => {
  const libs = [{name: 'i32lib', path: '../../native/libs/i32lib', version: '0.1.0'}]
  const cargotoml = cargoToml(builtCrate, libs);
  const mainrs = cargoMain(libs, 'func0', source, inputs, outputs);
  await fs.promises.writeFile(`./rbuild/${builtCrate}/src/main.rs`, mainrs);
  await fs.promises.writeFile(`./rbuild/${builtCrate}/Cargo.toml`, cargotoml);

  const sampleins = inputs.map(inp => `"${inp.name}": ${inp.type}_?`).join(',')
  console.log('--------------');
  console.log(`Done. Go to "./rbuild/${builtCrate}" and run:`);
  console.log(`cargo run -- '{${sampleins}}'`);
  console.log('--------------');
}

export {sourceBuilder, crateBuilder};
