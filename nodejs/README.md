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

Build Rust binary from Pipeline graph:
```
node pipecline --gfile examples/graph6.json --build-source --lang rust
```

Build Solidity contract from Pipeline graph:
```
node pipecline --gfile examples/graph7sol.json --build-source --lang solidity
```
