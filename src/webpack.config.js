var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer')


module.exports = {
    entry: {
          index: path.join(__dirname, 'js/app/index.js'),
          search: path.join(__dirname, 'js/app/search.js'),
          searchstyle:path.join(__dirname, 'less/search/search.less')//less文件的第二入口

       },

    output: {
        path: path.join(__dirname,'../public/js'),
        filename: '[name].js'
    },
    module:{
        rules: [
            {
                test:  /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "less-loader", "postcss-loader"]
                })
            }]
    },
    resolve:{
        alias: {
            jquery: path.join(__dirname,"js/lib/jquery.min.js"),
            less: path.join(__dirname, "less"),
            mod: path.join(__dirname, "js/mod")
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery"
        }) ,
        new ExtractTextPlugin("../css/[name].css"),//less文件的出口
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer(),
                ]
            }
        })

    ]
};