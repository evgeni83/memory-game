module.exports = {
	sourcemap: process.env.NODE_ENV === 'development',
	plugins: [
		require( 'postcss-combine-media-query' ),
		require( 'cssnano' )( {
			preset: 'default',
		} ),
		require( 'postcss-preset-env' ),
	],
};
