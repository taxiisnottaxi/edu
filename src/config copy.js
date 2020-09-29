// 需求：导出三个成员，分别是foo: bar f: function num: 10

// 以前导出方式
// exports.foo = 'bar';
// exports.f = function () {

// }
// exports.num = 10


// ES6 导出方式1
// export const foo = 'bar'
// export const f = function () {

// }
// export const num = 10

// ES6 导出方式2
const foo = 'bar'
const f = function () {

}
const num = 10

export {
    foo,
    f,
    num
}

// 相当于module.exports = function () {}
export default function () {

}
