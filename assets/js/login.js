$(function () {
    $('#link_reg').click(function () {

        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').click(function () {

        $('.login-box').show();
        $('.reg-box').hide();
    })

    /* 登录密码校验 */
    let form = layui.form;
    // verify为对象
    form.verify({
        //支持函数式的方式，也支持下述数组的形式
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value != $('.reg-box input[name=password]').val()) {
                return '两次密码输入不一致,请重新输入';
            }
        }

    })
    let layer = layui.layer;
    //form表单绑定 submit事件语义化更强
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/reguser',
            type: 'post',
            data: {
                username:$('.reg-box input[name=username]').val(),
                password: $('.reg-box input[name=password]').val()
            },
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, {icon: 5}); 
                }

                layer.msg(res.message, { icon: 6 });
                $('#link_login').click();
                // reset是原生api,用jq时要转会DOM对象，[0]或get(0)都可以
                // 或者直接用原生获取元素
                $('#form_reg')[0].reset();
            }
        })
    })
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            type: 'post',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, {icon: 5}); 
                }
                layer.msg(res.message, { icon: 6 });
                // 未来的接口要使用token
                localStorage.setItem('myToken', res.token);
                // 跳转
                location.href='/index.html'
            }
        })
    })


})