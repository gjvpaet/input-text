const webpack = require('webpack');

module.exports = {
	mode: 'production',
	context: __dirname,
	devtool: false,
	entry: {
		index: ['core-js/stable', 'regenerator-runtime/runtime', './index.js']
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['@babel/react', '@babel/env'],
					plugins: [
						'react-html-attrs',
						['@babel/proposal-decorators', { legacy: true }],
						'@babel/proposal-class-properties',
						'@babel/plugin-proposal-export-default-from',
						'@babel/plugin-syntax-dynamic-import'
					]
				}
			},
			{
				test: /\.(css|scss)$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.(ttf|eot|woff|woff2)$/,
				loader: 'file-loader',
				options: {
					name: 'fonts/[name].[ext]'
				}
			},
			{
				test: /\.(jpg|png|svg|gif)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: 'images/[name].[hash].[ext]'
					}
				}
			}
		]
	},
	output: {
		path: `${__dirname}/dist/`,
		filename: '[name].min.js',
		chunkFilename: '[name].[chunkhash].chunk.min.js',
		libraryTarget: 'commonjs2'
	},
	externals: {
		'@tinymce/tinymce-react': '@tinymce/tinymce-react',
		antd: 'antd',
		react: 'react',
		'react-dom': 'react-dom',
		'react-input-mask': 'react-input-mask',
		unidecode: 'unidecode'
	},
	plugins: [
		new webpack.optimize.AggressiveMergingPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		})
	]
};
