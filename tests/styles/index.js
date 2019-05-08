//required modules
const util = require('util');
const _ = require('lodash');
const assert = require('assert');
const sinon = require('sinon');

//the library we're testing
const {utilStyles} = require('../../');
const {ClassNames} = utilStyles;

describe('Styles', function(){
	
	it('Should provide a ClassNames function', () => {
		//check the function exists
		assert(_.isFunction(ClassNames),'ClassNames missing')
	});

	it('Should generate ClassNames from basic strings', () => {
		//create a new set of mock functions
		assert.equal( ClassNames('a'), 'a' );
		assert.equal( ClassNames('a','b'), 'a b' );
		assert.equal( ClassNames('a',null,'b'), 'a b' );
	});
	
	it('Should generate ClassNames from strings and arrays', () => {
		//create a new set of mock functions
		assert.equal( ClassNames(['a']), 'a' );
		assert.equal( ClassNames(['a','b']), 'a b' );
		assert.equal( ClassNames(['a'],['b']), 'a b' );
		assert.equal( ClassNames(['a'],['b','c']), 'a b c' );
		assert.equal( ClassNames(['a'],[null],['b']), 'a b' );
	});

});