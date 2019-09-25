const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'index.js',
        library: 'react-formwork',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                "presets": ["@babel/preset-env", "@babel/preset-react"]
            }
        }]
    },
    externals: {
        'react': 'commonjs react',
        'lodash/capitalize': 'commonjs lodash/capitalize',
        'lodash/isArray': 'commonjs lodash/isArray',
        'lodash/isFunction': 'commonjs lodash/isFunction',
        'lodash/isObject': 'commonjs lodash/isObject',
        'lodash/isString': 'commonjs lodash/isString',
        'lodash/isNil': 'commonjs lodash/isNil',
        'lodash/map': 'commonjs lodash/map',
        'lodash/each': 'commonjs lodash/each',
        'lodash/keys': 'commonjs lodash/keys'
    }
};
