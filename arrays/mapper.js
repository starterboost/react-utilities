import _ from 'lodash';

//pass an array of class names, this will filter out null values and turn into a single string
export function ArrayMapper({onAdd,onRemove,onUpdate,isMatch} = {}) {
	//onAdd and onRemove are required
	console.assert( _.isFunction( onAdd ), 'onAdd not implemented' ); 
	console.assert( _.isFunction( onRemove ), 'onRemove not implemented' ); 
	
	this.onAdd = onAdd;
	this.onRemove = onRemove;

	//onUpdate and isMatch are optional
	this.onUpdate = _.isFunction( onUpdate ) ? onUpdate : () => {};
	this.isMatch = _.isFunction( isMatch ) ? isMatch : ( itemA, itemB ) => itemA == itemB;

	//this.isInstance = _.isFunction( onUpdate ) ? onUpdate : () => console.warn('onUpdate not implemented') 
	this.items = [];
}

ArrayMapper.prototype.update = function( items ){

	let itemsOld = _.clone( this.items );
	//receives a list of items - we compare to the previous list of items to determine which have been added and removed
	_.each( items, (itemNew, index) => {
		//check if we have an old instance of the variable
		const itemOld = _.find( this.items, ( item ) => {
			return this.isMatch( itemNew, item );
		});

		if( !itemOld ){
			//new item identified
			this.onAdd( itemNew );
		}else{
			//call update
			this.onUpdate( itemNew );
			itemsOld = _.without( itemsOld, itemOld );
		}
	});

	//identify items that were not covere in the first loop
	_.each( itemsOld, ( itemOld ) => this.onRemove( itemOld ) );

	//record the items we've used to update
	//NOTE: clone incase items are altered externally
	this.items = _.clone( items );
}
