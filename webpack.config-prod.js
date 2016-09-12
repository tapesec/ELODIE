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
      		{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      		{ test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      		{ test: /\.eot$/,    loader: "file-loader" },
      		{ test: /\.svg$/,    loader: "file-loader" }
		]
	},
	plugins: [
    	new webpack.optimize.DedupePlugin(),
    	new webpack.optimize.UglifyJsPlugin({
      		minimize: true,
      		compress: {
        		warnings: false
      		},
      		output: {
                comments: false,
            }
    	}),
    	new webpack.DefinePlugin({
      		'process.env': {
        		'NODE_ENV': JSON.stringify('production')
      		}
    	})
  	],
  	devtool: "cheap-module-source-map"
};

module.exports = config;