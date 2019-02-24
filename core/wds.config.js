module.exports = {
	entry: `./core/web4webpack.js`,
	target: 'web',
	mode: 'development',
	output: {
		path: process.cwd() +'/web',
		filename: 'web.js',
	},

	devServer: {
		contentBase: './',
		port: 8083,
		openPage: 'web.htm',
		watchContentBase: true,
		open: true,
	},
};
