var webpack = require('webpack');
var path = require('path');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    entry: {
        entry: path.resolve(__dirname, './frontend/javascripts/entry.js'),
    },
    output: {
        path: path.resolve(__dirname, './frontend/static/javascripts'),
        filename: '[name].js'
    },
    plugins: [
        commonsPlugin
    ],
    module: {
        loaders: [
            { test: /\.jade$/, loader: "jade" },
            // => "jade" loader is used for ".jade" files
            { test: /\.scss$/, loaders: ["style", "css", "sass"] },
            // => "sass" loader is used for ".sass" files
            { test: /\.css$/, loader: "style!css" },
            // => "style" and "css" loader is used for ".css" files
            // Alternative syntax:
            { test: /\.css$/, loaders: ["style", "css"] },
            {test: /\.json$/, loader: "json"},
        ]
    }
};
