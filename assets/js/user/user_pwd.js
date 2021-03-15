$(function () {
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samepwd: function (value) {
            if (value === $('[name=oldPwd]').val().trim()) {
                return '新密码和旧密码不能相同';
            }
        },

        repwd: function (value) {
            if (value !== $('[name=newPwd]').val().trim()) {
                return '两次新密码输入不一致';
            }
        }
    })

    $('form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/updatepwd',
            method: 'post',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg(res.message,{icon:5})
                }
                layui.layer.msg('密码修改成功', { icon: 6 });
                $('form')[0].reset();
            }
        })
    })
})