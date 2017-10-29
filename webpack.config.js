var nodeExternals = require('webpack-node-externals');
const path = require('path')
module.exports = {
    entry: [
        "babel-polyfill", "./src/main.js"
    ],
    externals: [nodeExternals()],
    target: "node",
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.bundle.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["env"]
                    }
                }
            }
        ]
    }
};
