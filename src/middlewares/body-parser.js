import queryString from 'querystring'

export default (req, res, next) => {
    // 由于表单 POST 请求可能会携带大量的数据，所以在进行请求提交的时候会分为多次提交
    // 具体提交次数取决于数据量大小
    // 在 Node 中，对于处理这种不确定的数据，使用事件的形式处理
    // 这里可以通过监听 req 对象的data事件，然后通过对应的回调处理函数中的参数 chunk 拿到每一次接收到的数据
    //      data事件触发多少次，不一定
    
    // 当数据接收完毕之后，会自动触发 req 对象的 end 事件，然后就可以在end事件中使用接收到的表单请求体

    // req.headers 可以拿到当前请求的请求报文头信息
    // 只有 post 请求，请求体中才会有content-length这个参数
    if (req.method.toLowerCase() === 'get') {
        return next()
    }
    // 如果是普通表单POST，则咱们自己处理 application/x-www-form-urlencoded
    // 如果是有文件的表单POST，则咱们不处理
    if ( req.headers['content-type'].startsWith('multipart/form-data') ) {
        return next()
    }

    var buffers = []
    req.on('data', chunk => {
        buffers.push(chunk)
    })

    req.on('end', () => {
        // 手动给 req 对象挂载一个 body 属性，值就是当前表单 POST 请求体对象
        // 在后续的处理中间件中，就可以直接使用 req.body 了
        // 因为在同一个请求中，流通的都是同一个 req 和 res 对象
        // queryString可以将字符串形式的参数变成对象
        let data = Buffer.concat(buffers).toString();
        req.body = queryString.parse(data)
        // 这边这个next一定要放在end事件中，否则就会在end事件结束之前就执行掉
        // 只有再end事件执行之后，才可以正常拿到表单数据
        next()
    })
}