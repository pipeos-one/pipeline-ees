import { Wrapper, Struct, Pointer, types, rust } from 'wasm-ffi';

function prepNodes(nodes) {
  return nodes.map(level => level.map(node => {
    return {
      pclass: {name: 'i32lib', path: './native/libs/i32lib/target/wasm32-unknown-unknown/debug/'},
      name: node.record.pfunction.gapi.name,
      inputs: node.inputs,
      outputs: node.record.pfunction.gapi.outputs_idx,
    }
  }));
}

const typeMap = {
  'number': 'i32',
  'number[]': rust.vector('i32'),
  'string': rust.string,
  'function': 'Fn(i32) -> i32',
}

async function executeGraph(nodes, input) {

  const steps = prepNodes(nodes);

  // TODO map everything on pclass & package
  let libInterfaces = {};
  let libraries = {};
  let values = input;
  let outputs = [];

  let stepStart = 0;
  let stepStop = nodes.length - 1;
  if (nodes[0][0].i >= 3000) {
    stepStart = 1;
  }
  if (nodes[stepStop][0].i >= 3000) {
    stepStop --;
  }

  const fsteps = steps.slice(stepStart, stepStop + 1);

  fsteps.forEach(level => level.map(node => {
    const outputType = typeMap[node.outputs[0].type];
    const inputTypes = node.inputs.map(inp => typeMap[inp.type]);
    if (!libInterfaces[node.pclass.name]) {
      libInterfaces[node.pclass.name] = {
        pathToExe: `${node.pclass.path}${node.pclass.name}.wasm`,
        interface: {},
      };
    }
    libInterfaces[node.pclass.name].interface[node.name] = [outputType, inputTypes];
  }));

  for (const libname of Object.keys(libInterfaces)) {
    libraries[libname] = new Wrapper(libInterfaces[libname].interface);

    try {
      await libraries[libname].fetch(libInterfaces[libname].pathToExe);
    } catch (e) {
      console.log(`${libname} not found`, e.message);
      return;
    }
  }

  fsteps.forEach(level => level.map(node => {
    const library = libraries[node.pclass.name];
    const inputArgs = node.inputs.map(inp => values[inp.name]);

    values[node.outputs[0].name] = library[node.name](...inputArgs);

    if (node.outputs[0].type.includes('[')) {
      values[node.outputs[0].name] = values[node.outputs[0].name].values;
    }
    if (node.outputs[0].type === 'string') {
      values[node.outputs[0].name] = values[node.outputs[0].name].value;
    }

    console.log(
      `${JSON.stringify(values[node.outputs[0].name])} = ${node.pclass.name}.${node.name}(${
        inputArgs.map(JSON.stringify).join(', ')
      })`
    );
  }));

  if (stepStop === (nodes.length - 1)) return outputs;

  steps[stepStop + 1].map(out => {
    outputs.push(values[out.inputs[0].name]);
  });

  return outputs;
}

export {executeGraph}
