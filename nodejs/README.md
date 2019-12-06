# Pipecline


## Install

- https://neon-bindings.com/docs/getting-started/


```
neon build
```

## Usage

Execute graph in node.js:
```
node pipecline --gfile examples/graph4.json ----ifile in4.json
```

Execute graph with preference for Rust (if functions have Rust source):
```
node pipecline --gfile examples/graph4.json ----ifile in4.json --lang "javascript.rust"
```

Build Rust crate from Pipeline graph:
```
node pipecline --gfile examples/graph6.json --build-source --lang rust
cd builtcrate
cargo run -- '{"array1_3000_0": [2,4,1],"array2_3001_0": [6,3,9],"start_3002_0": 0}'
```

Build Wasm binary from Rust crate:
- `rustup target add wasm32-wasi`
- install `wasmtime` (https://wasmtime.dev/)

```
cd builtcrate
cargo build --target wasm32-wasi
# or cargo build --target wasm32-unknown-unknown
wasmtime target/wasm32-wasi/debug/builtcrate.wasm '{"array1_3000_0": [2,4,1],"array2_3001_0": [6,3,9],"start_3002_0": 0}'
```

Build Solidity contract from Pipeline graph:
```
node pipecline --gfile examples/graph7sol.json --build-source --lang solidity
```
