import html from 'rollup-plugin-html';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  format: 'umd',
  moduleName: 'algoliaSearchIDD',
  external: [],
  dest: 'dest/index.js',
  plugins: [
    html({
      include: 'src/*.html',
        htmlMinifierOptions: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          conservativeCollapse: true,
          minifyJS: true,
        }
    }),
    babel(),
    nodeResolve({
      jsnext: true,
      main: true,
      preferBuiltins: true
    }),
    commonjs({
      exclude: ['node_modules/**']
    }),
  ],
};
