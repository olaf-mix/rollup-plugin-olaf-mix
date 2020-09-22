const typescript = require('@rollup/plugin-typescript');
const {resolve} = require('path');
const olaf = require('../src');
module.exports = () => {
    return {
        input: resolve(__dirname, '..', 'example', 'ts', 'index.ts'),
        output: {
            name: 'main',
            globals: {
            },
            file: resolve(__dirname, '..', 'example', 'ts', 'index.output.js'),
            format: 'umd'
        },
        plugins: [
            olaf(),
            typescript({
                tsconfig: resolve(__dirname, 'tsconfig.json')
            }),
        ],
        treeshake: true
    }
};