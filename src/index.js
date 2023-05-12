import vm				from 'vm';

function compress ( input ) {
    return String(input).replace(/\s+/g, " ");
}

export class VM {
    [Symbol.toStringTag]		= "VM";

    constructor ( context = {} ) {
	this._context			= Object.create( null );
	vm.createContext( this._context );

	this.context( context );
    }

    context ( ctx ) {
	if ( ctx ) {
	    if ( typeof ctx !== "object" || ctx === null )
		throw new TypeError(`Setting context input expects key/value object; not type '${typeof ctx}'`);

	    Object.assign( this._context, ctx );
	    for ( let k in ctx ) {
		if ( ctx[k] === undefined )
		    delete this._context[k];
	    }
	}

	return this._context;
    }

    run ( script, ...input_args ) {
	if ( !(script instanceof Script) )
	    script			= new Script( script );

	return script.run( this, ...input_args );
    }
}


export class Script {
    constructor ( code, default_ctx ) {
	this.__is_function		= typeof code === "function";
	this.__default_ctx		= default_ctx;

	if ( this.isFunction() )
	    code			= `__io__.output = (${code.toString()})( ...__io__.input )`;

	this.__source			= code;

	if ( code instanceof vm.Script )
	    this._script		= code;
	else
	    this._script		= new vm.Script( code );
    }

    isFunction () {
	return this.__is_function;
    }

    get script () {
	return this._script;
    }

    run ( vm, ...input_args ) {
	if ( !(vm instanceof VM) ) {
	    vm				= new VM( this.__default_ctx );
	    vm.context( ctx );
	}

	const __io__			= {
	    "input": input_args,
	    "output": null,
	}

	if ( this.isFunction() )
	    vm.context({ __io__ });

	this._script.runInContext( vm.context() );

	if ( this.isFunction() )
	    vm.context({ "__io__": undefined });

	return __io__.output;
    }
}
