module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
           {
        		test: /\.js$/, // a regular expression that catches .js files
        		exclude: /node_modules/,
       			loader: 'babel-loader'
			},
            { 
            	test: /\.css$/, loader: "style-loader!css-loader" 
            }        
          ]
    },
    devServer: {
    	port: 3000, // most common port
    	contentBase: './',
    	inline: true
	}
};