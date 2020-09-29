import express from 'express'
// const express = require('express')
// 无法直接拿，要通过解构赋值去拿
// import config from './config.js'
// 通过解构赋值可以拿
// import { foo } from './config'
// 通过集成导入
// import * as config from './config'
// 这种方式会去找被加载模块中通过 export default 导出的成员
import config from './config'

// 通过export导出的成员必须通过解构赋值按需加载，
//           或者通过 * as 变量名的形式加载所有通过 export 关键字导出的接口成员
// 通过 export default 加载导出的成员必须通过 import 变量名 from '模块标识' 进行加载
// export 和 export default 可以共存
import defaultConfig from './config'
import { foo } from './config'


const app = express()

console.log(config)

// app.set('views', )

// app.get('/', (req, res) => {
//     res.end('hello world')
// }) 

// app.listen(3000, () => {
//     console.log('Server is running at port 3000...')
// })
