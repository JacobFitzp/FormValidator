const path = require('path');

module.exports = {
    entry: './src/Core/FormValidator/FormValidator.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'formvalidator-es6.min.js',
        path: path.resolve(__dirname, 'dist'),
    },
};