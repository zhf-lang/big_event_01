
// window.onload 外部文件和图片音频视频... 群不加载完毕再执行
$(window).on('load', function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 2.选择文件
    $('#btnChooseImage').on('click', function () {
        $('#file').click();
    })

    //3.裁剪图片
    // change事件是根据value的变化而出发
    $('#file').on('change', function (e) {
        // e.target如果此事件为冒泡执行，e.target代表this
        let file = e.target.files[0];
        // 非空校验
        if (!file) return layui.layer.msg('请选择要上传的图片');

        //根据文件产生一个内存模拟地址，页面关闭旧销毁
        let newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    //上传头像
    $('#btnUpload').on('click', function () {
        // base64类型的图片传上去会被放大30%
        // 一般用于小图片，放大不会影响
        // 获取base64类型的头像（字符串）
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        console.log(dataURL);

        $.ajax({
            url: '/my/update/avatar',
            type: 'post',
            data: {avatar:dataURL},
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg('上传头像成功');
                //渲染头像
                window.parent.getUserInfo();
            }
        })
    })
})

// document.onDOMContentLoaded:只要DOM树加载完毕就可以了，不一定要渲染到页面
// 相等于jq的
// $(function () {

// })

// onload用于图片视频音频加载完再运行js文件
// window.DOMXXX用于等dom树加载完旧运行js