const typeMap = {
  'number': 'i32',
  'number[]': 'Vec<i32>',
  'string': 'String',
  'function': 'Fn(i32) -> i32',
}

// TODO: fix node.record.pclassid
const pclassName = 'i32lib';

const buildImports = (node) => `use ${pclassName};`;

const buildContainer = (imports, fsource) => `${imports}

${fsource}
`

const fdefinition = (name, inputs, outType) => {
  const outs = outType.length === 1 ? outType[0] : `(${outType.join(', ')})`;
  return `pub fn ${name}(${inputs.join(', ')}) -> ${outs} {`;
}

const setTypes = ios => ios.map(io => {
  const cpy = JSON.parse(JSON.stringify(io));
  cpy.type = typeMap[io.type];
  return cpy;
});

const finputs = inputs => setTypes(inputs).map(inp => `${inp.name}: ${inp.type}`);
const foutputs = outputs => setTypes(outputs).map(out => out.type);

const buildGraphStep = (node) => {
  // console.log('---- buildGraphStep, node:', JSON.stringify(node));
  const record = node.record;
  const ins = node.inputs.map(inp => {
    if (inp.type.includes('[')) return `&${inp.name}`;
    return inp.name;
  });
  const outs = record.pfunction.gapi.outputs_idx.map(out => out.name);

  const fcall = `${pclassName}::${record.pfunction.gapi.name}(${ins.join(', ')});`;

  if (outs.length === 1) {
    return `  let ${outs[0]} = ${fcall}`;
  }

  // TODO: fix multiple outputs
  return `  let (${outs.join(', ')}) = ${fcall}`;
}

const buildFout = outputs => {
  const outs = outputs.map(out => {
    const output = out.inputs[0];
    return output.name;
  });

  return `
  ${outs.length === 1 ? outs[0] : `(${outs.join(', ')})`}
}`
}

export default {
  buildImports,
  buildContainer,
  fdefinition,
  finputs,
  foutputs,
  buildGraphStep,
  buildFout,
  setTypes,
}
