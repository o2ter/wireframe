import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import dts from 'rollup-plugin-dts';

import packageJson from './package.json';

const rollupPlugins = [
  typescript(),
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
    /node_modules/
  ],
};

export default [
  {
    ...rollupConfig,
    output: [
      {
        file: packageJson.main + '.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module + '.mjs',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({
        extensions: ['.ts', '.tsx', '.mjs', '.js']
      }),
      ...rollupPlugins
    ],
  },
  {
    ...rollupConfig,
    output: [
      {
        file: packageJson.main + '.web.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module + '.web.mjs',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({
        extensions: [
          '.web.ts', '.web.tsx', '.web.mjs', '.web.js',
          '.ts', '.tsx', '.mjs', '.js',
        ]
      }),
      ...rollupPlugins
    ],
  },
  {
    ...rollupConfig,
    output: [
      {
        file: 'dist/index.d.ts',
        format: 'es',
      },
    ],
    plugins: [
      resolve({
        extensions: ['.ts', '.tsx', '.mjs', '.js']
      }),
      dts()
    ],
  },
  {
    ...rollupConfig,
    output: [
      {
        file: 'dist/index.web.d.ts',
        format: 'es',
      },
    ],
    plugins: [
      resolve({
        extensions: [
          '.web.ts', '.web.tsx', '.web.mjs', '.web.js',
          '.ts', '.tsx', '.mjs', '.js',
        ]
      }),
      dts()
    ],
  },
];