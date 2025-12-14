const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const CopyPlugin = require("copy-webpack-plugin");

const IS_DEV = process.env.NODE_ENV === 'development';
const ANALYZE = process.env.ANALYZE === 'true';
const GH_PAGES = process.env.GH_PAGES === 'true';

const BundleAnalyzerPlugin = ANALYZE ? require('webpack-bundle-analyzer').BundleAnalyzerPlugin : null;

// Заголовки безопасности
const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  }
];

const config = {
	mode: process.env.NODE_ENV || 'development',
	resolve: {
		extensions: [ '.js', '.jsx', '.ts', '.tsx', '.json' ],
	},
	entry: { app: path.resolve( __dirname, 'src', 'index.tsx' ) },
	output: {
		path: path.resolve( __dirname, 'dist' ),
		publicPath: GH_PAGES ? '/memory-game/' : '/',
		filename: IS_DEV ? 'js/[name].js' : 'js/[name]-[contenthash:base64].js',
		clean: true,
	},
	devServer: {
		port: 3333,
		open: true,
		hot: true,
		static: path.resolve(__dirname, 'public'),
		setupMiddlewares: (middlewares, devServer) => {
			// Добавляем заголовки безопасности
			middlewares.unshift((req, res, next) => {
				securityHeaders.forEach(header => {
					res.setHeader(header.key, header.value);
				});
				next();
			});
			return middlewares;
		},
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
					from: path.resolve( __dirname, 'public' ),
					to: path.resolve( __dirname, 'dist' ),
				},
			],
		}),
		...(ANALYZE ? [new BundleAnalyzerPlugin()] : []),
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
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
					priority: 10,
					reuseExistingChunk: true,
				},
				react: {
					test: /[\\/]node_modules[\\/](react|react-dom|react-redux|@reduxjs\/toolkit)[\\/]/,
					name: 'react',
					chunks: 'all',
					priority: 20,
					reuseExistingChunk: true,
				},
				framer: {
					test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
					name: 'framer-motion',
					chunks: 'all',
					priority: 15,
					reuseExistingChunk: true,
				},
			},
		},
	},
};

module.exports = config;
