const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		src: './client/index.js',
	},
	devtool: 'eval-source-map',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	plugins: [
		new HTMLWebpackPlugin({
			title: 'Development',
			template: '/client/index.html',
		}),
	],
	module: {
		rules: [
			{
				test: /.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env', '@babel/preset-react'],
				},
			},
			{
				test: /.(css|scss)$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	devServer: {
		host: 'localhost',
		port: 8080,
		hot: true,
		static: {
			publicPath: 'build',
			directory: path.resolve(__dirname, 'build'),
		},
		proxy: {
			'/': 'http://localhost:3000',
			'/login': 'http://localhost:3000',
			'/home': 'http://localhost:3000',
		},
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
};
