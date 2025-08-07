import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

import packageJson from "./package.json" with { type: "json" };

export default [
  {
    input: "src/index.ts",
    external: [...Object.keys(packageJson.peerDependencies || {})],
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        // sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        // sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ 
        tsconfig: "./tsconfig.json",
        declaration: false
      }),
    ],
    onwarn: (warning, warn) => {
      if (
        warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
        warning.message.includes(`"use client"`)
      ) {
        return;
      }
      warn(warning);
    }
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [...Object.keys(packageJson.peerDependencies || {})]
  },
];