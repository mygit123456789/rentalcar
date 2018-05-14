const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

module.exports = {
	context: __dirname,
	entry: "./client/components/app/App.jsx",
	devtool: "cheap-eval-source-map",
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "bundle.js"
	},
	resolve: {
		extensions: [".js", ".jsx", ".json", ".css"],
		modules: [
			"node_modules",
			path.resolve(__dirname, "./"),
			"server",
			path.resolve(__dirname, "./"),
			"public",
			path.resolve(__dirname, "client"),
			"сomponents"
		]
	},
	devServer: {
		host: "localhost",
		port: 8000,
		contentBase: "public",
		hot: true,
		inline: true,
		proxy: {
			"/data": {
				target: "http://localhost:3000/data.json",
				pathRewrite: { "^/data": "" }
			}
		},
		historyApiFallback: true,
	},
	stats: {
		colors: true,
		reasons: true,
		chunks: true
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: "babel-loader",
				exclude: path.resolve(__dirname, "node_modules")
			},
			{
				test: /\.(scss)$/,
				loader: ExtractTextPlugin.extract(["css-loader", "sass-loader"])
			},
			{
				test: /\.css$/,
				loaders: [
					"style-loader",
					"css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&sourceMap&-minimize"
				]
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					"file-loader",
					{
						loader: "image-webpack-loader",
						options: {
							bypassOnDebug: true
						}
					}
				]
			}
		]
	},

	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	]
};
