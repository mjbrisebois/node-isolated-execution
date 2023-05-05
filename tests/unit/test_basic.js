import { Logger }			from '@whi/weblogger';
const log				= new Logger("test-basic", process.env.LOG_LEVEL );

import { expect }			from 'chai';
import { VM,
	 Script }			from '../../src/index.js';


function basic_tests () {
    it("should run anonymous function in VM ", async function () {
	let full_name;
	const ctx			= {
	    "name": "Robin Williams",
	    setName ( value ) {
		full_name		= value;
	    },
	};
	const vm			= new VM( ctx );

	expect( vm			).to.be.a( "VM" );

	vm.run(() => {
	    full_name			= name;
	});

	expect( full_name		).to.be.undefined;

	vm.run(() => {
	    setName( name );
	});

	expect( full_name		).to.equal( ctx.name );
    });

    it("should run script in VM ", async function () {
	let full_name;
	const ctx			= {
	    "name": "Robin Williams",
	    setName ( value ) {
		full_name		= value;
	    },
	};
	const vm			= new VM( ctx );

	expect( vm			).to.be.a( "VM" );

	vm.run(`
	    full_name			= name;
	`);

	expect( full_name		).to.be.undefined;

	vm.run(`
	    setName( name );
	`);

	expect( full_name		).to.equal( ctx.name );
    });

    it("should run pre-compiled script in VM ", async function () {
	let full_name;
	const ctx			= {
	    "name": "Robin Williams",
	    setName ( value ) {
		full_name		= value;
	    },
	};
	const vm			= new VM( ctx );

	expect( vm			).to.be.a( "VM" );

	vm.run( new Script(`
	    full_name			= name;
	`));

	expect( full_name		).to.be.undefined;

	vm.run( new Script(`
	    setName( name );
	`));

	expect( full_name		).to.equal( ctx.name );
    });

    it("should remove a context variable if it set to undefined ", async function () {
	const ctx			= {
	    "name": "Robin Williams",
	};
	const vm			= new VM( ctx );

	{
	    const ctx_vars		= Object.keys( vm.context() );

	    expect( ctx_vars		).to.have.length( 1 );
	    expect( ctx_vars		).to.include("name");
	}

	vm.context({
	    "name": undefined,
	    "say": "Hello world",
	});

	{
	    const ctx_vars		= Object.keys( vm.context() );

	    expect( ctx_vars		).to.have.length( 1 );
	    expect( ctx_vars		).to.include("say");
	}
	{
	    const ctx_vars		= Object.keys( ctx );

	    expect( ctx_vars		).to.have.length( 1 );
	    expect( ctx_vars		).to.include("name");
	}
    });
}

function errors_tests () {
}

describe("SubProcess", () => {

    describe("Basic", basic_tests );
    describe("Errors", errors_tests );

});
