const { babel } = require('@rollup/plugin-babel');
const { resolve } = require('path');
const olaf = require('../src');

module.exports = () => {
    return [{
        input: resolve(__dirname, '..', 'example', 'js', 'index.js'),
        output: {
            name: 'main',
            globals: {
            },
            file: resolve(__dirname, '..', 'example', 'js', 'index.output.js'),
            format: 'umd'
        },
        plugins: [
            olaf(),
            babel({
                exclude: 'node_modules/**'
            }),
        ],
        treeshake: false
    }]
};