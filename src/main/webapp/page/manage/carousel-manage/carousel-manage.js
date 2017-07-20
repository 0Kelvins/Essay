$(document).ready(function () {
    var $carouselTable = $('#carouselTable');

    $(".side-tool").addClass("hidden");

    $carouselTable.bootstrapTable({
        url: "/carousel/getAllCarousel",
        method: 'post',
        contentType: 'application/json',
        dataType: "json",
        search: false,
        showRefresh: true,
        singleSelect: true, //单行选择
        pagination: true,   //分页
        sidePagination: 'server',
        uniqueId : 'carouselId',
        pageNumber: 1,
        pageSize: 10,
        pageList: [5, 10, 20],
        queryParams: function (params) {
            var pageVO = {
                currentPage: params.pageNumber, //当前页面
                pageNo: params.offset,          //跳转页
                pageSize: params.limit          //页面行数
            };
            if (params.pageNumber != undefined || params.pageNumber != null || params.pageNumber != "") {
                pageVO.currentPage = 1;
            }
            return pageVO;
        },
        responseHandler : function(res) {
            return {
                pageSize: res.pageSize,
                pageNumber: res.currentPage,
                total : res.totalRows,
                rows : res.data
            };
        },
        columns: [
            {
                title: '序号',
                align: 'center',
                formatter: indexFormatter
            },
            {
                title: '标题',
                field: 'title',
                align: 'center',
            },
            {
                title: '链接',
                field: 'url',
                align: 'center',
                formatter: urlFormatter
            },
            {
                title: '图片',
                field: 'imageUrl',
                align: 'center',
                formatter: imageFormatter
            },
            {
                title: '轮播顺序',
                field: 'sequence',
                align: 'center'
            },
            {
                title: '描述',
                field: 'description',
                align: 'center'
            },
            {
                title: '操作',
                align: 'center',
                field: 'carouselId',
                formatter: operateFormatter
            }
        ]
    });

    function indexFormatter(value, row, index) {
        return index + 1;
    }

    function urlFormatter(url) {
        return '<a href="'+ url +'" target="view_window">'+ url +'</a> ';
    }

    function imageFormatter(imageUrl) {
        return '<img src="'+ imageUrl +'">';
    }

    function operateFormatter(value, row, index){
        return '<a class="btn btn-info"' +
            ' href="#" onclick="editCarousel('+ row.carouselId +')">编辑</a> ' +
            '<a class="btn btn-danger remove pull-right"' +
            ' href="#" onclick="carouselDelete('+ row.carouselId +')">删除</a> ';
    }

    $("#imageUp").change(function () {
       imageUpload();
    });

});

var carouselDelete = function (carouselId) {
    if (carouselId == undefined || carouselId == null) {
        return;
    }

    Common.confirm({
        message: "确认删除该轮播？",
        operate: function (result) {
            if (result) {
                var deleteInfo = {
                    "carouselId" : carouselId
                }

                $.ajax({
                    type : 'POST',
                    contentType : 'application/json;charset=UTF-8',
                    url : '/carousel/deleteCarousel',
                    async: false,
                    dataType: 'json',
                    data : JSON.stringify(deleteInfo),
                    success : function(data) {
                        if (data) {
                            if (data.result == true) {
                                $('#carouselTable').bootstrapTable('remove', {
                                    field: "carouselId",
                                    values: [carouselId]
                                });

                                tipsAlert('alert-success', '提示', '轮播删除成功！');
                            }
                            else {
                                tipsAlert('alert-warning', '提醒', '轮播删除失败！');
                            }
                        }
                        else {
                            tipsAlert('alert-danger', '异常', '轮播删除失败！');
                        }
                    },
                    error : function(err) {
            console.log(err.statusText);
            tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
        }
                });
            }
            else {
                return false;
            }
        }
    });
};

/*

var carouselClose = function (carouselId) {
    if (carouselId == undefined || carouselId == null) {
        return;
    }
    Common.confirm({
        message: "确认关闭该轮播？",
        operate: function (result) {
            if (result) {
                var closeInfo = {
                    "carouselId": carouselId
                }

                $.ajax({
                    type: 'POST',
                    contentType: 'application/json;charset=UTF-8',
                    url: '/carousel/closeCarousel',
                    async: false,
                    dataType: 'json',
                    data: JSON.stringify(closeInfo),
                    success: function (data) {
                        if (data) {
                            if (data.result == true) {
                                $('#carouselTable').bootstrapTable('refresh');

                                tipsAlert('alert-success', '提示', '轮播关闭成功！');
                            }
                            else {
                                tipsAlert('alert-warning', '提醒', '轮播关闭失败！');
                            }
                        }
                        else {
                            tipsAlert('alert-danger', '异常', '轮播关闭失败！');
                        }
                    },
                    error: function (err) {
            console.log(err.statusText);
            tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
        }
                });
            }
            else {
                return false;
            }
        }
    });
};

var carouselOpen = function (carouselId) {
    if (carouselId == undefined || carouselId == null) {
        return;
    }

    var openInfo = {
        "carouselId" : carouselId
    }

    $.ajax({
        type : 'POST',
        contentType : 'application/json;charset=UTF-8',
        url : '/carousel/openCarousel',
        async: false,
        dataType: 'json',
        data : JSON.stringify(openInfo),
        success : function(data) {
            if (data) {
                if (data.result == true) {
                    $('#carouselTable').bootstrapTable('refresh');

                    tipsAlert('alert-success', '提示', '轮播开启成功！');
                }
                else {
                    tipsAlert('alert-warning', '提醒', '轮播开启失败！');
                }
            }
            else {
                tipsAlert('alert-danger', '异常', '轮播开启失败！');
            }
        },
        error : function(err) {
            console.log(err.statusText);
            tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
        }
    });
};
*/

var addCarousel = function () {
    $("#modalLabel").text('添加轮播信息');
    $("#carouselSubmit").text('添加');
    $("#modal").modal('show');
    $("#title").val("");
    $("#url").val("");
    $("#imageUrl").val("");
    $("#sequence").val("");
    $("#description").val("");

    $("#carouselSubmit").unbind();
    $("#carouselSubmit").on('click', function () {
        var title = $("#title").val(),
            url = $("#url").val(),
            imageUrl = $("#imageUrl").val(),
            sequence = $("#sequence").val(),
            description = $("#description").val();

        $("#modal").modal('hide');
        var addInfo = {
            "title" : title,
            "url" : url,
            "imageUrl" : imageUrl,
            "sequence" : sequence,
            "description" : description
        };
        $.ajax({
            type : 'POST',
            contentType : 'application/json;charset=UTF-8',
            url : '/carousel/addCarousel',
            async: false,
            dataType: 'json',
            data: JSON.stringify(addInfo),
            success : function(data) {
                if (data) {
                    if (data.result == true) {
                        $('#carouselTable').bootstrapTable('refresh');
                        tipsAlert('alert-success', '提示', '轮播添加成功！');
                    }
                    else {
                        tipsAlert('alert-danger', '提醒', '添加失败');
                    }
                }
                else {
                    tipsAlert('alert-danger', '异常', '添加失败');
                }
            },
            error : function(err) {
            console.log(err.statusText);
            tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
        }
        });
    });
};

var editCarousel = function (carouselId) {
    if (carouselId == undefined || carouselId == null) {
        return;
    }

    var row = $('#carouselTable').bootstrapTable('getRowByUniqueId', carouselId);

    $("#modalLabel").text('修改轮播信息');
    $("#title").val(row.title);
    $("#url").val(row.url);
    $("#imageUrl").val(row.imageUrl);
    $("#description").val(row.description);
    $("#sequence").val(row.sequence);
    $("#carouselSubmit").text('修改');

    $("#modal").modal('show');
    $("#carouselSubmit").unbind();
    $("#carouselSubmit").on('click', function () {
        var title = $("#title").val(),
            url = $("#url").val(),
            imageUrl = $("#imageUrl").val(),
            sequence = $("#sequence").val(),
            description = $("#description").val();

        $("#modal").modal('hide');
        var updateInfo = {
            "carouselId" : row.carouselId,
            "title" : title,
            "url" : url,
            "imageUrl" : imageUrl,
            "sequence" : sequence,
            "description" : description
        };
        $.ajax({
            type : 'POST',
            contentType : 'application/json;charset=UTF-8',
            url : '/carousel/updateCarousel',
            async: false,
            dataType: 'json',
            data: JSON.stringify(updateInfo),
            success : function(data) {
                if (data) {
                    if (data.result == true) {
                        $('#carouselTable').bootstrapTable('refresh');
                        tipsAlert('alert-success', '提示', '轮播信息修改成功！');
                    }
                    else {
                        tipsAlert('alert-danger', '提醒', '修改失败');
                    }
                }
                else {
                    tipsAlert('alert-danger', '异常', '修改失败');
                }
            },
            error : function(err) {
            console.log(err.statusText);
            tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
        }
        });
    });
};

var imageUpload = function () {
    $.ajaxFileUpload({
        url:'/c/imageUpload',
        secureuri:false,                           //是否启用安全提交,默认为false
        fileElementId:'imageUp',                   //文件选择框的id属性
        dataType:'text',                           //服务器返回的格式,可以是json或xml等
        success:function(data){
            if (data == "<pre></pre>") {
                $("#imageTips").text('图片上传失败');
                setTimeout(function () {
                    $("#imageTips").text('');
                }, 3000);
            }
            else {
                $("#imageUrl").val(data);
                $("#imageTips").text('图片上传成功');
                setTimeout(function () {
                    $("#imageTips").text('');
                }, 3000);
            }
        },
        error:function(data, e){
            $("#imageTips").text('图片上传失败');
            setTimeout(function () {
                $("#imageTips").text('');
            }, 3000);
        }
    });
};