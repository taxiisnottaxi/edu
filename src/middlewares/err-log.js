import mongodb from "mongodb";

const MongoClient = mongodb.MongoClient;
const url = "mongodb://edu:edu@localhost:27017";

export default (errLog, req, res, next) => {
  // 1. 将错误日志记录到数据库，方便排查错误
  // 2. 发送响应给用户，给一些友好的提示信息
  // 1. 打开连接
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    var db = client.db("edu");
    // 2.操作数据库
    db.collection("errors_logs").insertOne({
        name: errLog.name,
        message: errLog.message,
        stack: errLog.stack,
        time: new Date()
    }, (err, result) => {
      res.json({
        // 使用错误码作为成功与否的标识
        err_code: 500,
        message: errLog.message
      });
    });

    // 3. 关闭连接
    // client.close();
  });
}