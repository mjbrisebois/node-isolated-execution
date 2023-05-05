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


### `<VM>.run( code )`
Run the given code in this VM's context.

Example usage
```js
let vm = new VM({
    square ( n ) {
        return n**2;
    }
});
vm.run(`square( 2 );`)
```




## `new Script( code )`
Create a pre-compiled script.

Example usage
```js
let script = new Script(`square( 2 )`);
```

Code input can be a function, string, or instance of `vm.Script`.

#### Code as a function
```js
vm.run(() => {
    square( 2 );
});
```

#### Code as a string
```js
vm.run(`square( 2 )`)
```

#### Code as instance of `vm.Script`
```js
import vm from 'vm';

let script = new vm.Script(`square( 2 )`);
vm.run( script )
```


### `<Script>.script : vm.Script`
Get the underlying instance of `vm.Script`.


### `<Script>.run( ctx )`
Run this Script's code using the given context.

Example usage
```js
let script = new Script(`square( 2 )`);

script.run({
    square ( n ) {
        return n**2;
    }
});
```
