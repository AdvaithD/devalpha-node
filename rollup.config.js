import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'

const env = process.env.NODE_ENV
const config = {
  input: 'lib/index.js',
  output: {
    file: 'dist/cjs/bundle.js',
    format: 'cjs'
  },
  plugins: [
    resolve({
      preferBuiltins: true
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    }),
    commonjs({
      include: ['node_modules/**'],
      namedExports: {
        immutable: ['Map', 'List', 'is', 'fromJS'],
        mathjs: [
          'add',
          'abs',
          'bignumber',
          'chain',
          'max',
          'mean',
          'min',
          'multiply',
          'number',
          'sign',
          'sqrt',
          'std',
          'subtract'
        ]
      }
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
}

export default config
