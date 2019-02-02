const nodeExternals = require('webpack-node-externals')

module.exports = {
    devtool: 'eval-source-map',
    mode: 'development',
    entry: [
        'babel-polyfill',
        './bin/start'
    ],
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: '/node_modules/',
                loader: 'eslint-loader'
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                loader: 'babel-loader'
            }
        ]
    },
    target: 'node',
    externals: [nodeExternals()],
    resolve: {
        modules: [
            __dirname,
            'node_modules'
        ]
    }
}
