import { defineConfig } from 'vite'
const { resolve } = require('path')

const root = resolve(__dirname, './src')
const outDir = resolve(__dirname, './public')

export default defineConfig({
    base: './',
    root,
    build: {
        outDir,
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(root, 'index.html'),
                404: resolve(root, '404.html'),
            }
        }
    }
})