const path = require('path');

const loaderNameMatches = function(rule, loaderName) {
	return rule && rule.loader && typeof rule.loader === 'string' &&
		(rule.loader.indexOf(`${path.sep}${loaderName}${path.sep}`) !== -1 ||
		rule.loader.indexOf(`@${loaderName}${path.sep}`) !== -1);
};

const getLoader = function(rules, matcher) {
	let loader;

	// Array.prototype.some is used to return early if a matcher is found
	rules.some(rule => {
		return (loader = matcher(rule)
		? rule
		: getLoader(rule.use || rule.oneOf || (Array.isArray(rule.loader) && rule.loader) || [], matcher));
	});

	return loader;
};

module.exports = function( options ){
	const {extname,loader} = options;

	console.assert( extname, 'options.extname required' );
	console.assert( loader, 'options.loader required' );

	return {
		overrideWebpackConfig: ({ webpackConfig }) => {
		  const styleExtension = new RegExp(`\.${extname}$`);
	
		  const fileLoader = getLoader(
			webpackConfig.module.rules,
			rule => loaderNameMatches(rule, 'file-loader')
		  );
		  fileLoader.exclude.push(styleExtension);
	
		  const rules = {
			oneOf: [{
			  test: styleExtension,
			  use: [
				{
					loader: require.resolve('style-loader')
				}, 
				{
					loader: 'css-loader',
					options : {
						importLoaders : 1,
						modules : true,
						localIdentName : '[name]_[local]_[hash:base64:5]'
					}
				}, 
				{
					loader: require.resolve( loader ),
				}
			  ]
			}]
		  }
		
		  const oneOfRule = webpackConfig.module.rules.find(rule => (
			typeof rule.oneOf !== 'undefined'
		  ));
		  const appendTo = oneOfRule ? oneOfRule.oneOf : webpackConfig.module.rules;
		  appendTo.push(rules);
	
		  return webpackConfig;
		}
	}
}
