import express from "express";
import config from "./config";
import nunjucks from "nunjucks";
import indexRouter from "./routes/index";
import advertRouter from './routes/advert'
import bodyParser from "./middlewares/body-parser";
import errLog from './middlewares/err-log'

const app = express();

// 暴露静态资源
// 静态资源路径是相对于当前路径地址的
// 有的时候，我们需要将静态资源路径变成绝对资源路径
// 后面使用 /node_modules 和 mode_modules 是不一样的
// 前者是绝对资源路径，后者是相对于当前请求地址的相对静态资源路径
app.use("/node_modules", express.static(config.node_modules_path));
app.use("/public", express.static(config.public_path));

// 配置使用 nunjucks 模板引擎
// nunjucks 模板引擎没有对模板文件名的后缀名做特定限制
// 如果文件名是 a.html，则渲染的时候就需要传递 a.html
// 如果文件名是 b.nujs，则渲染 b.nujs
// nunjucks 模板引擎默认会缓存输出的文件
// 为了开发方便，所以把缓存禁用掉，可以实时看到模板文件修改后的变化
nunjucks.configure(config.viewPath, {
  autoescape: true,
  express: app,
  noCache: true
});

// 挂载解析处理表单 POST 请求体中间件
app.use(bodyParser);
// x-www-form-urlencoded：测试普通表单，没有文件类型的要使用
// form-data：测试带文件的表单

// 挂载路由容器（路由容器中组织了网站功能处理路由中间件）
app.use(indexRouter);
app.use(advertRouter);

app.use(errLog)

app.listen(3000, () => {
  console.log("Server is running at port 3000...");
});
