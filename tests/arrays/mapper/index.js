const _ = require('lodash');
const {utilArrays} = require('../../../');

describe('Arrays > Mapper', function(){
	let mapper;
	before(() => {
		mapper = new utilArrays.mapper.ArrayMapper({
			onAdd : ( item ) => {
				console.log('onAdd', item );
			},
			onRemove : ( item ) => {
				console.log('onRemove', item );
			}
		})
	});

	it('Should list items', () => {
		let items = [
			{id:1},
			{id:2}
		];

		mapper.update( items );
		
		items = _.without( items, _.find( items, {id:1} ) );

		mapper.update( items );
	});
});