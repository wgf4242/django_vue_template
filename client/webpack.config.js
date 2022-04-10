// js 使用, lang=ts后会用tsconfig.json识别
// webstorm 识别 alias,
'use strict'
const path = require('path')

function resolve (dir) {
    return path.join(__dirname, '.', dir)
}

module.exports = {
    context: path.resolve(__dirname, './'),
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('./src'),
        }
    },
}
