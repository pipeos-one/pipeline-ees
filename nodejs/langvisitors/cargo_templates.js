const cargoToml = (crateName, libs) => `[package]
name = "${crateName}"
version = "0.1.0"
edition = "2018"

[dependencies]
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
${libs.map(lib => {
  return `${lib.name} = { path = "${lib.path}", version = "${lib.version}" }`
}).join('\n')}
`

const cargoMain = (libs, fname, fsource, inputAbi, outputAbi) => {
  let outputs, outputPrint;
  if (outputAbi.length === 1) {
    outputs = outputAbi[0].name;
    outputPrint = `println!("func0 is {}", ${outputs});`;
  } else {
    outputs = `(${outputAbi.map(out => out.name).join(', ')})`;
    outputPrint = `println!("func0 is {:?}", ${outputs});`
  }

  return`
use std::env;
use serde::{Deserialize, Serialize};
use serde_json::{Result};

${fsource}

#[derive(Serialize, Deserialize, Debug)]
struct Input {
    ${inputAbi.map(inp => `${inp.name}: ${inp.type},`).join('\n    ')}
}

fn deserialize(data: String) -> Result<()> {
    let parsed: Input = serde_json::from_str(&data)?;

    println!("parsed = {:?}", parsed);

    let ${outputs} = ${fname}(${inputAbi.map(inp => `parsed.${inp.name}`).join(', ')});

    ${outputPrint}

    Ok(())
}

fn main() {
    let args: Vec<_> = env::args().collect();
    deserialize(args[1].to_string()).unwrap();
}
`
}

export {cargoToml, cargoMain};
