// 変更後は「npm run webpack:dev」
module.exports = [
	{
		entry: `./core/app4webpack.js`,
		target: 'electron-renderer',
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".json"],
		},
		module: {
			rules: [
				{test: /\.tsx?$/, loader: "awesome-typescript-loader"},
			],
		},
		output: {
			path: process.cwd() +'/app',
			filename: 'index.js',
		},
	},
	{
		entry: `./core/web4webpack.js`,
		target: 'web',
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".json"],
		},
		module: {
			rules: [
				{test: /\.tsx?$/, loader: "awesome-typescript-loader"},
			],
		},
		output: {
			path: process.cwd() +'/web',
			filename: 'web.js',
			chunkFilename: 'web.[name].js'
		},
	},
];
