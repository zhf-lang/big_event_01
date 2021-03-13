// 1.开发环境服务器地址
let baseURL = 'http://api-breakingnews-web.itheima.net';
// 2.测试环境服务器地址
// let baseURL = 'http://api-breakingnews-web.itheima.net';
//  3.生产环境服务器地址
// let baseURL = 'http://api-breakingnews-web.itheima.net';

//在$get,$post,$ajax的请求之后触发
// 也在所有ajax接受之后触发
// jq的ajax过滤器
// 第一个参数获取ajax的对象里的所有值
$.ajaxPrefilter(function (option) {
    // console.log(option);
    option.url = baseURL + option.url;
})