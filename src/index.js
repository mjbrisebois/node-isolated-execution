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

    run ( script ) {
	if ( !(script instanceof Script) )
	    script			= new Script( script );

	script.run( this._context );

	return script;
    }
}


export class Script {
    constructor ( code ) {
	if ( typeof code === "function" )
	    code			= `(${code.toString()})()`;

	if ( code instanceof vm.Script )
	    this._script		= code;
	else
	    this._script		= new vm.Script( code );
    }

    get script () {
	return this._script;
    }

    run ( ctx ) {
	if ( !vm.isContext( ctx ) )
	    vm.createContext( ctx );
	this._script.runInContext( ctx );
    }
}
