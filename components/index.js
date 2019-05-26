import React, {Component} from 'react';
import _ from 'lodash';

//pass an array of class names, this will filter out null values and turn into a single string
class UtilComponent extends Component{
	constructor ( props ){
		super( props );

		var prototype = null;
		//work our way down the prototype chain until we reach PixelComponent - binding any on methods as we go
		do{
			//pull out the first or the next in the chain
			prototype = Object.getPrototypeOf( prototype || this );
			//iterate
			_.each( Object.getOwnPropertyNames( prototype ), ( name ) => {
				//if name starts with on then we bind it so we keep reference to 'this'
				if( name.indexOf('on') == 0 && this[name] && typeof this[name].bind == 'function' ){
					this[name] = this[name].bind( this );
				} 
			});
		}while( prototype != UtilComponent.prototype );
	}
}

export {UtilComponent as Component};