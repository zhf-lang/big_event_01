$(function () {
    let form = layui.form;

    form.verify({
        nickname: function (value) {
            if (value.trim().length < 1 || value.trim().length > 6) {
                return "昵称长度为1-6之间";
            }
        }
    })

    // 1.用户渲染
    initUserInfo();
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            // 相当于type,以后vue要用
            method: 'get',
            success: (res) => {
                console.log(res.data);
                if (res.status != 0) {
                    return layui.layer.msg(res.message, { icon: 5 });
                }
                //formUserInfo 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                form.val("formUserInfo", res.data);
            }
        })

    }

    //使用浏览器的默认重置效果会重置成为输入框写的的value值
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })

    // 注意表单提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            method: 'post',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg('恭喜你用户信息修改成功', { icon: 6 })

                console.log(window);
                console.log(window.parent);
                window.parent.getUserInfo();

            }
        })
    })
})