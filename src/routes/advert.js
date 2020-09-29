import express from "express";
import formidable from 'formidable';
import Advert from '../models/advert'
import config from '../config'
import { basename } from 'path'

// 创建一个路由容器，将所有的路由中间件挂在给路由容器
const router = express.Router();

router.get('/advert', (req, res, next) => {
  const page = Number.parseInt(req.query.page, 10)
  const pageSize = 5
  Advert
    .find()
    .skip((page - 1) * 5)
    .limit(5)
    .exec((err, adverts) => {
      if (err) {
        return next(err)
      }
      Advert.count((err, count) => {
        if (err) {
          return next(err)
        }
        // 总页码 = 总记录数 / 总记录大小
        const totalPage = Math.ceil(count / pageSize)
        res.render('advert_list.html', {
          // adverts: adverts
          adverts,
          totalPage,
          page
        })
      })
    })
})

router.get('/advert/add', (req, res, next) => {
  res.render('advert_add.html')
})

/* 
    POST /advert/add
    body: { title, image, link, start_time, end_time }
*/
router.post("/advert/add", (req, res, next) => {
  // 1. 接收表单提交的数据
  // const body = req.body

  const form = new formidable({multiples: true})
  form.uploadDir = config.uploadDir  // 配置 formidable 文件上传接收路径
  form.keepExtensions = true  // 配置保持文件原始扩展名，默认是false

  // fields 就是接收到的表单中的普通数据字段
  // files 就是表单中文件上传上来的一些文件信息，例如文件大小、内容，上传路径
  form.parse(req, (err, fields, files) => {
    if (err) {
      return next(err)
    }
    // 在这里把files中的图片处理下，
    // 就是在 body 中添加一个 image 值就是图片上传上来的路径
    const body = fields
    body.image = basename(files.image.path)

    // 2. 操作数据库
    const advert = new Advert({
      title: body.title,
      image: body.image,
      link: body.link,
      start_time: body.start_time,
      end_time: body.end_time,
    })

    // 3. 保存数据
    advert.save((err, result) => {
      if (err) {
        return next(err)
      }
      res.json({
        err_code: 0
      })
    })
  })

  // console.log(advert)

  // 1.接受客户端提交的数据
  // 2.操作数据库
  // 3.发送响应信息
  // 使用 mongodb 原生 js 库操作数据库
  // 1. 打开连接
  // MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  //   if (err) {
  //     // 当错误发生的时候，调用next将当前错误对象传递给 next
  //     // 然后就会被后面的app.use((err, req, res, next)=>{})中间件匹配到
  //     // 而且该错误处理中间件一定要放在所有路由之后
  //     return next(err);
  //   }
  //   var db = client.db("edu");
  //   // 2.操作数据库
  //   db.collection("test").insertOne(req.body, (err, result) => {
  //     if (err) {
  //       throw err;
  //     }
  //     res.json({
  //       // 使用错误码作为成功与否的标识
  //       err_code: 0,
  //     });
  //   });

  //   // 3. 关闭连接
  //   // client.close();
  // });
});

// 查询
router.get('/advert/list', (req, res, next) => {
  Advert.find({}, (err, docs) => {
    if (err) {
      return next(err)
    }
    res.json({
      err_code: 0,
      result: docs
    })
  })
})

// 使用路径参数，让路径携带参数
// /advert/1
// /advert/2
// /advert/3
// /advert/one/:advertId 是一个模糊匹配路径
// 可以匹配 /advert/one/* 的路径形式
// 例如：/advert/one/1 /advert/one/2 /advert/one/a /advert/one/abc 等路径
// 但是 /advert/one 或者 /advert/one/a/b 是不行的
// 至于 advertId 是自己起的一个名字，可以在处理函数中通过 req.params 来进行获取
router.get('/advert/one/:advertId', (req, res, next) => {
  Advert.findById(req.params.advertId, (err, result) => {
    if (err) {
      return next(err)
    }
    res.json({
      err_code: 0,
      result: result
    })
  })
})

// 更新
// /advert/edit
router.post('/advert/edit', (req, res, next) => {
  Advert.findById(req.body.id, (err, advert) => {
    if (err) {
      return next(err)
    }
    const body = req.body
    advert.title = body.title
    advert.image = body.image
    advert.link = body.link
    advert.start_time = body.start_time
    advert.end_time = body.end_time
    advert.last_modified = Date.now()
    
    // 这里的 save 因为内部有一个 _id 所以这里是不会新增数据的，而是更新已有的数据
    advert.save((err, result) => {
      if (err) {
        return next(err)
      }
      res.json({
        err_code: 0
      })
    })
  })
})

// 删除
router.get('/advert/remove/:advertId', (req, res, next) => {
  Advert.remove({_id: req.params.advertId}, err => {
    if (err) {
      return next(err)
    }
    res.json({
      err_code: 0
    })
  })
})


// 通过 export default 暴露的接口成员不能定义的同时直接暴露
// 最好先定义，再暴露
// export default 可以直接暴露字面量 {} 123
export default router;
