## 知识点

- MongoDB
- Mongoose

## MongoDB

### 存储结构

- 一个计算机上可以有一个数据库服务实例
- 一个数据库服务实例上可以有多个数据库
- 一个数据库中可以有多个集合
    + 集合根据数据的业务类型划分
    + 例如用户数据、商品信息数据、广告信息数据。。。
    + 对数据进行分门别类的存储
    + 集合在 MongoDB 中就类似于数组
- 一个集合中可以有多个文档
    + 文档在 MongoDB 中就是一个类似于 JSON 的数据对象
    + 文档对象是动态的，可以随意生成
    + 为了便于管理，最好一个集合中存储的数据一定要保持文档结构的统一（数据完整性）

## Mongoose

- https://mongoosejs.com/

安装：
```bash
# npm install mongoose
yarn add mongoose
```

