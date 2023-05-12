[back to README.md](../README.md)

# API Reference

### Module exports
```js
{
    VM,
    Script,
}
```

## `new VM( context )`
Create a virtual machine context.

Example usage
```js
let vm = new VM({
    "say": "Hello world",
});
```


### `<VM>.context( ctx )`
Get or extend the context variables.

Example usage
```js
let vm = new VM({
    "say": "Hello world",
});

vm.context()
// { say: "Hello world" }

vm.context({ say: undefined, name: "Agent Smith" });
// { name: "Agent Smith" }
```


### `<VM>.run( code[, ...input_args] )`
Run the given code in this VM's context.

- When `code` is a function, `input_args` are passed to that function.

Example usage
```js
let vm = new VM({
    square ( n ) {
        return n**2;
    }
});
vm.run(`square( 2 );`)
```




## `new Script( code, default_ctx )`
Create a pre-compiled script.

Example usage
```js
let script = new Script(`square( 2 )`);
```

Code input can be a function, string, or instance of `vm.Script`.

- When `code` is a function, `input_args` are passed to that function.

#### Code as a function
```js
let ctx = {
    square (n) {
        return n**2;
    },
};

let script = new Script( (num) => {
    return square( num );
});

let result = script.run( ctx, 2 );
// 4
```

#### Code as a string
```js
let script = new Script(`square( 2 )`);
```

#### Code as instance of `vm.Script`
```js
import vm from 'vm';

let vm_script = new vm.Script(`square( 2 )`);
let script = new Script( vm_script );
```


### `<Script>.script : vm.Script`
Get the underlying instance of `vm.Script`.


### `<Script>.run( ctx[, ...input_args] )`
Run this Script's code using the given context.

- `ctx` - *(required)* can be an instance of `VM` or an object
  - `default_ctx` is applied, then `ctx`

Example usage
```js
let script = new Script(`square( 2 )`);

script.run({
    square ( n ) {
        return n**2;
    }
});
```
