import _ from 'lodash';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import dts from 'rollup-plugin-dts';
import { PluginPure } from 'rollup-plugin-pure';

const rollupPlugins = [
  PluginPure({
    functions: [
      'createComponent',
      'createMemoComponent',
      'StyleSheet.create',
      'React.forwardRef',
      'React.createContext',
      'Animated.createAnimatedComponent',
    ],
  }),
  typescript({ declaration: false }),
  babel({
    babelrc: false,
    exclude: 'node_modules/**',
    babelHelpers: 'bundled',
  }),
  commonjs({
    transformMixedEsModules: true,
  }),
  json(),
];

const rollupConfig = {
  input: 'src/index',
  external: [
    /node_modules/,
    /^react$/,
    /^react-native$/,
  ],
};

export default [
  ...['.web', ''].map(suffix => ({
    ...rollupConfig,
    output: [
      {
        file: `dist/index${suffix}.js`,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: `dist/index${suffix}.mjs`,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({
        extensions: [
          ..._.uniq([suffix, '']).flatMap(x => [`${x}.tsx`, `${x}.jsx`]),
          ..._.uniq([suffix, '']).flatMap(x => [`${x}.ts`, `${x}.mjs`, `${x}.js`]),
        ]
      }),
      ...rollupPlugins
    ],
  })),
  ...['.web', ''].map(suffix => ({
    ...rollupConfig,
    output: [
      {
        file: `dist/index${suffix}.d.ts`,
        format: 'es',
      },
    ],
    plugins: [
      resolve({
        extensions: [
          ..._.uniq([suffix, '']).flatMap(x => [`${x}.tsx`, `${x}.jsx`]),
          ..._.uniq([suffix, '']).flatMap(x => [`${x}.ts`, `${x}.mjs`, `${x}.js`]),
        ]
      }),
      dts()
    ],
  })),
];