const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const CopyPlugin = require("copy-webpack-plugin");

const IS_DEV = process.env.NODE_ENV === 'development';

module.exports = {
	mode: process.env.NODE_ENV || 'development',
	resolve: {
		extensions: [ '.js', '.jsx', '.ts', '.tsx', 'json' ],
	},
	entry: { app: path.resolve( __dirname, 'src', 'index.tsx' ) },
	output: {
		path: path.resolve( __dirname, 'dist' ),
		filename: IS_DEV ? 'js/[name].js' : 'js/[name]-[contenthash:base64].js',
		clean: true,
	},
	devServer: {
		port: 3333,
		open: true,
		hot: true,
	},
	devtool: IS_DEV ? 'source-map' : false,
	module: {
		rules: [
			{
				test: /\.[tj]sx?$/,
				exclude: /node_modules/,
				use: [ 'ts-loader' ],
			},
			{
				test: /\.module\.s?[ac]ss$/,
				use: [
					IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: IS_DEV,
							modules: {
								localIdentName: '[name]__[local]--[hash:base64:5]',
							},
						},
					},
					'postcss-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: IS_DEV,
						},
					},
				],
			},
			{
				test: /\.s?[ac]ss$/,
				exclude: /\.module.(s[ac]ss)$/,
				use: [
					IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: IS_DEV,
						},
					},
					'postcss-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: IS_DEV,
						},
					},
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				loader: 'file-loader',
				options: {
					outputPath: 'images',
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin( {
			template: path.resolve( __dirname, 'src', 'index.html' ),
		} ),
		new MiniCssExtractPlugin( {
			filename: IS_DEV ? 'css/[name].css' : 'css/[name]-[contenthash:base64].css',
		} ),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve( __dirname, 'src', 'images', 'favicon' ),
					to: path.resolve( __dirname, 'dist', 'images', 'favicon' ),
				},
			],
		}),
	],
	optimization: {
		minimize: !IS_DEV,
		minimizer: [ new TerserPlugin( {
			terserOptions: {
				format: {
					comments: false,
				},
			},
			extractComments: false,
		} ) ],
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},
};
