const typeMap = {
  'number': 'i32',
  'number[]': 'Vec<i32>',
  'string': 'String',
  'function': 'Fn(i32) -> i32',
}

const fdefs = funcs => `${funcs.join('\n')}`;
const fdef = (name, inputs, outType) => {
  const outs = outType.length === 1 ? outType[0] : `(${outType.join(', ')})`;
  return `pub fn ${name}(${inputs.join(', ')}) -> ${outs} {`;
}
const finputs = inputs => inputs.map(inp => `${inp.name}: ${typeMap[inp.type]}`);
const foutputs = outputs => outputs.map(out => typeMap[out.type]);

const buildFdef = (name, inputs, outputs) => {
  // const ins = finputs(inputs.map(inp => inp.record.pfunction.gapi.outputs[0]));
  const ins = finputs(inputs.map(inp => inp.record.pfunction.gapi.outputs_idx[0]));
  // const ins = finputs(inputs.map(inp => inp.outputs[0]));
  // const outs = foutputs(outputs.map(out => out.record.pfunction.gapi.inputs[0]));
  const outs = foutputs(outputs.map(out => out.inputs[0]));
  return fdef(name, ins, outs);
}

const buildFout = outputs => {
  const outs = outputs.map(out => {
    const output = out.inputs[0];
    // const output = out.record.pfunction.gapi.inputs[0];
    return output.name;
  });

  return `
  ${outs.length === 1 ? outs[0] : `(${outs.join(', ')})`}
}`
}

// TODO: fix node.record.pclassid
const pclassName = 'i32lib';

const buildStep = (node) => {
  // console.log('---- buildStep, node:', JSON.stringify(node));
  const record = node.record;
  // const ins = record.pfunction.gapi.inputs.map(inp => {
  const ins = node.inputs.map(inp => {
    if (inp.type.includes('[')) return `&${inp.name}`;
    return inp.name;
  });
  // const outs = record.pfunction.gapi.outputs.map(out => out.name);
  const outs = record.pfunction.gapi.outputs_idx.map(out => out.name);
  // const outs = node.outputs.map(out => out.name);

  const fcall = `${pclassName}::${record.pfunction.gapi.name}(${ins.join(', ')});`;

  if (outs.length === 1) {
    return `  let ${outs[0]} = ${fcall}`;
  }

  // TODO: fix multiple outputs
  return `  let [${outs.join(', ')}] = ${fcall}`;
}

const buildImports = (node) => `use ${pclassName};`;

const sourceBuilder = (enrichedNodes) => {
  const inputs = enrichedNodes.shift();
  const outputs = enrichedNodes.pop();

  const fdef = buildFdef('func0', inputs, outputs);
  const body = [].concat(...enrichedNodes.map(row => row.map(buildStep))).join('\n');
  const freturn = buildFout(outputs);
  const fsource = fdef + '\n' + body + '\n' + freturn;

  const imports = [...new Set([].concat(...enrichedNodes.map(row => row.map(buildImports)))).values()].join('\n');

  const source = `${imports}

${fsource}
`
  return {
    source,
    // inputs: inputs.map(inp => inp.record.pfunction.gapi.outputs[0]).map(inp => {
    inputs: inputs.map(inp => inp.record.pfunction.gapi.outputs_idx[0]).map(inp => {
    // inputs: inputs.map(inp => inp.outputs[0]).map(inp => {
      // console.log('inp.type', inp.type, typeMap[inp.type]);
      inp.type = typeMap[inp.type] || inp.type;  // TODO: fixme - graph4 issue if no ||
      return inp;
    }),
    // outputs: outputs.map(out => out.record.pfunction.gapi.inputs[0]).map(out => {
    outputs: outputs.map(out => out.inputs[0]).map(out => {
      // console.log('out.type', out.type, typeMap[out.type]);
      out.type = typeMap[out.type];
      return out;
    }),
  }
}

export default sourceBuilder;
