$(function() {
    // 点击去注册账号的连接
    $("#link_reg").on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $("#link_login").on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    var form = layui.form
    var layer = layui.layer
    form.verify({
            "pwd": [/^[\S]{6,12}$/, '密码必须6-12位，且不能出现空格'],
            "repwd": function(value) {
                var pwd = $(".reg-box [name=password]").val()
                if (pwd !== value) {
                    return "两次密码不一致！"
                }
            }
        })
        // 监听注册表单的提交
    $('#form-reg').on('submit', function(e) {
            e.preventDefault()
            var data = {
                username: $('#form-reg [name=username]').val(),
                password: $('#form-reg [name=password]').val()
            }
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    console.log(res);
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！')
                    // 模拟人的点击行为
                $('#link_login').click()
            })

        })
        //监听登录表单的提交
    $('#form-login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "/api/login",
            data: $(this).serialize(),

            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                    // 将登录成功的token的字符串保存到本地
                localStorage.setItem('token', res.token)
                    // 跳转到主页
                location.href = '/index.html'
            }
        });
    })
})