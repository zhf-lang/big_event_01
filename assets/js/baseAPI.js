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
    // 手动添加url根路径
    option.url = baseURL + option.url;

    // 包含/my/的需要权限，需要传入Authorization
    if (option.url.indexOf('/my/') != -1) {  //或者>-1
        option.headers = {
            // 拿不到数据就返回空字符串，不然返回null不太合适
            Authorization: localStorage.getItem('myToken') || ''
        }
        option.complete = function (res) {
            console.log(res.responseJSON);
            let obj = res.responseJSON;
            if (obj.status == 1 && obj.message === '身份认证失败！') {
                localStorage.removeItem('myToken');
                location.href = '/login.html';
            }

        }
    }



})