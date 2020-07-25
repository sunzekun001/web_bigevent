$(function() {
    var form = layui.form
    var layar = layui.layar
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })
    initUserInfo()

    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res);
                // layar.msg(res.message)
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 监听重置按钮
    $('#btnReset').on('click', function(e) {
            e.preventDefault()
            initUserInfo()
        })
        // 监听form表单提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data: $(this).serliaze(),

            success: function(res) {
                if (res.status !== 0) {
                    return layar.msg('更新用户信息失败！')
                }
                layar.msg('更新用户信息成功！')
                window.parent.getUserInfo()
            }
        });
    })
})