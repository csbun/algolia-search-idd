import html from 'rollup-plugin-html';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import less from 'rollup-plugin-less';

export default {
  input: 'src/index.js',
  output: {
    file: 'dest/index.js',
    name: 'algoliaSearchIDD',
    format: 'umd',
  },
  external: [],
  plugins: [
    less({
      insert: true,
      output: 'dest/style.css',
    }),
    html({
      include: 'src/*.html',
      htmlMinifierOptions: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        conservativeCollapse: true,
        minifyJS: true,
      },
    }),
    babel({
      exclude: ['node_modules/**'],
    }),
    nodeResolve({
      jsnext: true,
      main: true,
      preferBuiltins: true,
    }),
    commonjs({
      // exclude: ['node_modules/**']
    }),
  ],
};
