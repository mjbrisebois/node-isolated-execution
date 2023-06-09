[![](https://img.shields.io/npm/v/@whi/isolated-execution/latest?style=flat-square)](http://npmjs.com/package/@whi/isolated-execution)

# Isolated Execution
A (node) module for running code with a controlled global context.


[![](https://img.shields.io/github/issues-raw/mjbrisebois/node-isolated-execution?style=flat-square)](https://github.com/mjbrisebois/node-isolated-execution/issues)
[![](https://img.shields.io/github/issues-closed-raw/mjbrisebois/node-isolated-execution?style=flat-square)](https://github.com/mjbrisebois/node-isolated-execution/issues?q=is%3Aissue+is%3Aclosed)
[![](https://img.shields.io/github/issues-pr-raw/mjbrisebois/node-isolated-execution?style=flat-square)](https://github.com/mjbrisebois/node-isolated-execution/pulls)


## Overview
This module is intended to provide more deterministic controls to the native
[`vm`](https://nodejs.org/api/vm.html) library.

### Features

- Prevent access to `process` inside VM
- Support multiple input types for code


## Install

```bash
npm i @whi/isolated-execution
```

## Basic Usage

```js
import { VM, Script } from '@whi/isolated-execution';

let vm = new VM({
    console,
});

let code = new Script(() => {
    console.log("Hello world");
});

vm.run( code );
code.run( context );
```

### IO Support
When the `run` input is a function, input/output controls are supported.

```js
let vm = new VM({});
let greeting = vm.run( ( first_name, last_name ) => {
    return `Hello, ${first_name} ${last_name}`;
}, "Robin", "Williams" );
// Hello, Robin Williams
```



### API Reference

See [docs/API.md](docs/API.md)

### Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)
