var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        other: path.resolve(__dirname, './frontends/javascripts/mycanvas.js')
    },
    output: {
        path: path.resolve(__dirname, './frontends/static/javascripts'),
        filename: '[name].js'
    },
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
