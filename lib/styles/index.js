import _ from 'lodash';

//pass an array of class names, this will filter out null values and turn into a single string
export function ClassNames() {
	return _.filter(arguments, className => {
		return className ? true : false;
	}).join(' ');
}