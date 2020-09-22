const j = require('jscodeshift');
const helpers = require('@babel/helpers');
const { createFilter } = require('@rollup/pluginutils');
const {mixCode, injectHelperCode, generateMixSet, chaosHelperCode} = require('@olaf-mix/olaf-mix');

module.exports = (options = {}) => {
    const filter = createFilter(options.include, options.exclude, {
    });
    const mixSet = generateMixSet(2);
    const moduleInjectedHelpCode = true;
    return {
        name: 'rollup-plugin-olaf-mix',
        resolveId(source, importer){
            if (source === 'tslib') {
                return null;
            }
        },
        resolveDynamicImport(specifier, importer){
        },
        load(id){
            if (!filter(id))
                return null;
        },
        transform(code, id) {
            if (!filter(id)) return null;
            let parser = options.parser || /^.*\.tsx?$/.test(id) ? 'ts' : 'js';
            const opt = {moduleInjectedHelpCode, parser, isFlatInject: true};
            const {source} = mixCode(code, opt);
            return {
                code: source
            };
        },
        generateBundle(options, bundle, isWrite){
        },
        renderChunk(code, chunk, options){
            if (!moduleInjectedHelpCode){
                return injectHelperCode(code, {mode: options.format}).source;
            } else {
                return chaosHelperCode(code, {mode: options.format}).source
            }
        },
        renderStart(code, chunk, options){
        }
    };
};