import uglify from 'rollup-plugin-uglify';
import config from './rollup.config';

const out = Object.assign({}, config);
out.output.file = 'dest/index.min.js';
out.plugins.push(uglify());

export default out;
