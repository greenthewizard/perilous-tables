const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
	node: {
		fs: "empty"
	},
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist/')
	},
	devtool: "source-map",
	plugins: [
		new HtmlWebpackPlugin({
			hash: true,
			inject: true,
			template: 'src/index.pug'
		}),
		new CopyWebpackPlugin([
			{from: 'src/tables', to: 'tables'},
			{from: 'src/svg', to: 'svg'},
		])
	],
	module: {
		rules: [
			{
				test:/\.pug$/,
				use: 'pug-loader'
			},
			{
				test:/\.s?[a|c]ss$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'sass-loader' }
				]
			},
			{
				test:/\.(jpeg|jpg|png|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: './img'
						}
					} 
				]
			}
		]
	}
};