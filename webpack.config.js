var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'client/app');

var config = {
	entry: [
		APP_DIR + '/index.jsx',
		"bootstrap-webpack!./bootstrap.config.js"
	],
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js'
	},
	module : {
		loaders : [
			{
				test : /\.jsx?/,
				include : APP_DIR,
				loader : 'babel'
			},
			// the url-loader uses DataUrls. 
      		// the file-loader emits files. 
      		{ test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      		{ test: /\.ttf$/,    loader: "file-loader" },
      		{ test: /\.eot$/,    loader: "file-loader" },
      		{ test: /\.svg$/,    loader: "file-loader" }
		]
	}
};

module.exports = config;