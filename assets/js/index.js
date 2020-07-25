$(function() {
        getUserInfo()
        var layar = layui.layar
        $('#btnLogout').on('click', function() {
            layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
                //do something
                // 1. 清空本地存储中的 token
                localStorage.removeItem('token')
                    // 2. 重新跳转到登录页面
                location.href = '/login.html'

                // 关闭 confirm 询问框
                layer.close(index)
            })
        })
    })
    // 获取用户基本信息
function getUserInfo() {
    $.ajax({
        type: "get",
        url: "/my/userinfo",

        success: function(res) {
            if (res.status !== 0) {
                return layui.layar.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
        }
    });
}
// 渲染用户头像
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp&nbsp' + name)
        // 按需渲染用户头像
    if (user.user_pic !== null) {

        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()

        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.test-avatar').html(first).show()
    }
}