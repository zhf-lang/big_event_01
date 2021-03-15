$(function () {

    getUserInfo();

    //不用写全局
    $('#btnLogout').on('click', function () {
        layer.confirm('确认要退出?', { icon: 3, title: '提示' }, function (index) {
            //do something

            localStorage.removeItem('myToken');
            location.href = '/login.html';
            layer.close(index);
        });
    })
})

//其他地方要调用，所以写成全局函数
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        type: 'get',
        // headers: {
        //     // 拿不到数据就返回空字符串，不然返回null不太合适
        //     Authorization: localStorage.getItem('myToken') || ''
        // },
        success: (res) => {
            if (res.status != 0) {
                return layer.msg(res.message);
            }
            readerAvatar(res.data)
        }
    })
}

function readerAvatar(user) {
    console.log(user.username);

    let name = user.nickname || user.username;

    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic === null) {
        $('.text-avatar').show().html(name[0].toUpperCase());
        $('.layui-nav-img').hide();
    } else {
        $('.text-avatar').hide();
        $('.layui-nav-img').show().prop('src', user.user_pic);
    }
}
