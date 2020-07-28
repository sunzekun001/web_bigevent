$(function() {
    var layer = layui.layer
    var form = layui.form
    initArtCateList()
        // 获取文章分类列表
    function initArtCateList() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",

            success: function(res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        });
    }
    var indexAdd = null
    $('#btnAddCate').on('click', function() {
            indexAdd = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '添加文章分类',
                content: $('#dialog-add').html()
            })
        })
        // 通过代理形式来绑定form-add表单事件
    $('body').on('submit', '#form-add', function(e) {
            e.preventDefault()
            $.ajax({
                type: "post",
                url: "/my/article/addcates",
                data: $(this).serialize(),

                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('新增分类失败！')
                    }
                    initArtCateList()
                    layer.msg('新增扥类成功！')
                    layer.close(indexAdd)
                }
            });
        })
        // 通过代理的形式为btn-edit按钮绑定事件
    var indexEdit = null
    $("tbody").on('click', ".btn-edit", function(e) {
        var indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id')
            // 发起请求获取对应分类数据
        $.ajax({
            type: "get",
            url: "/my/article/cates/" + id,
            success: function(res) {

                form.val('form-edit', res.data)
            }
        });
    })

    // 通过代理的形式为修改分类的表单绑定submit事件
    $('body').on('submit', "#form-edit", function(e) {
            e.preventDefault()
            $.ajax({
                type: "post",
                url: "/my/article/updatacate",
                data: $(this).serialize(),

                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('更新分类失败！')
                    }
                    layer.msg('更新分类成功！')
                    layer.close(indexEdit)
                    initArtCateList()
                }
            });
        })
        // 删除按钮事件
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initArtCateList()
                }
            })
        })
    })
})