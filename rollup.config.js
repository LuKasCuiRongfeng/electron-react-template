import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { join } from 'path'

export default {
    input: join(__dirname, "src/main/main.js"),
    output: {
        file: join(__dirname, "dist/main/main.js"),
        format: "cjs",
        sourcemap: true
    },
    plugins: [nodeResolve(), commonjs()],
    external: ["electron"]
}