$(document).ready(function () {
    var $plateTable = $('#plateTable');

    $(".side-tool").addClass("hidden");

    $plateTable.bootstrapTable({
        url: "/plate/getAllPlate",
        method: 'post',
        contentType: 'application/json',
        dataType: "json",
        search: false,
        showRefresh: true,
        singleSelect: true, //单行选择
        pagination: true,   //分页
        sidePagination: 'server',
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
        responseHandler: function (res) {
            return {
                pageSize: res.pageSize,
                pageNumber: res.currentPage,
                total: res.totalRows,
                rows: res.data
            };
        },
        columns: [
            {
                title: '序号',
                align: 'center',
                formatter: indexFormatter
            },
            {
                title: '版块',
                field: 'name',
                align: 'center',
            },
            {
                title: '发表文章数',
                field: 'essayNum',
                align: 'center'
            },
            {
                title: '状态',
                field: 'state',
                align: 'center',
                formatter: stateFormatter
            },
            {
                title: '操作',
                align: 'center',
                field: 'plateId',
                formatter: operateFormatter
            }
        ]
    });

    function indexFormatter(value, row, index) {
        return index + 1;
    }

    function stateFormatter(state) {
        var s = "待定";
        switch (state) {
            case 1000:
                s = "已开启";
                break;
            case 1100:
                s = "待开启";
                break;
            case 1400:
                s = "已关闭";
                break;
            default :
                s = "待定";
        }
        return s;
    }

    function operateFormatter(value, row, index) {
        var op = "";
        if (row.state == 1000) {
            op = '<a class="btn btn-warning"' +
                ' href="#" onclick="plateClose(' + row.plateId + ')">关闭</a> ';
        }
        else {
            op = '<a class="btn btn-success open"' +
                ' href="#" onclick="plateOpen(' + row.plateId + ')">开启</a> ';
        }
        return op + '<a class="btn btn-danger remove pull-right"' +
            ' href="#" onclick="plateDelete(' + row.plateId + ')">删除</a> ';
    }

});

var plateDelete = function (plateId) {
    if (plateId == undefined || plateId == null) {
        return;
    }

    Common.confirm({
        message: "确认删除该板块？",
        operate: function (result) {
            if (result) {
                var deleteInfo = {
                    "plateId": plateId
                }

                $.ajax({
                    type: 'POST',
                    contentType: 'application/json;charset=UTF-8',
                    url: '/plate/deletePlate',
                    async: false,
                    dataType: 'json',
                    data: JSON.stringify(deleteInfo),
                    success: function (data) {
                        if (data) {
                            if (data.result == true) {
                                $('#plateTable').bootstrapTable('remove', {
                                    field: "plateId",
                                    values: [plateId]
                                });

                                tipsAlert('alert-success', '提示', '版块删除成功！');
                            }
                            else {
                                tipsAlert('alert-warning', '提醒', '版块删除失败！');
                            }
                        }
                        else {
                            tipsAlert('alert-danger', '异常', '版块删除失败！');
                        }
                    },
                    error: function (err) {
                        console.log(err.statusText);
                        tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
                    }
                });
            } else {
                return false;
            }
        }
    })
};

var plateClose = function (plateId) {
    if (plateId == undefined || plateId == null) {
        return;
    }
    Common.confirm({
        message: "确认关闭该板块？",
        operate: function (result) {
            if (result) {
                var closeInfo = {
                    "plateId": plateId
                }

                $.ajax({
                    type: 'POST',
                    contentType: 'application/json;charset=UTF-8',
                    url: '/plate/closePlate',
                    async: false,
                    dataType: 'json',
                    data: JSON.stringify(closeInfo),
                    success: function (data) {
                        if (data) {
                            if (data.result == true) {
                                $('#plateTable').bootstrapTable('refresh');

                                tipsAlert('alert-success', '提示', '版块关闭成功！');
                            }
                            else {
                                tipsAlert('alert-warning', '提醒', '版块关闭失败！');
                            }
                        }
                        else {
                            tipsAlert('alert-danger', '异常', '版块关闭失败！');
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

var plateOpen = function (plateId) {
    if (plateId == undefined || plateId == null) {
        return;
    }

    var openInfo = {
        "plateId": plateId
    }

    $.ajax({
        type: 'POST',
        contentType: 'application/json;charset=UTF-8',
        url: '/plate/openPlate',
        async: false,
        dataType: 'json',
        data: JSON.stringify(openInfo),
        success: function (data) {
            if (data) {
                if (data.result == true) {
                    $('#plateTable').bootstrapTable('refresh');

                    tipsAlert('alert-success', '提示', '版块开启成功！');
                }
                else {
                    tipsAlert('alert-warning', '提醒', '版块开启失败！');
                }
            }
            else {
                tipsAlert('alert-danger', '异常', '版块开启失败！');
            }
        },
        error: function (err) {
            console.log(err.statusText);
            tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
        }
    });
};

var addPlate = function () {
    $("#modal").modal('show');
    $("#plateAddSubmit").on('click', function () {
        var plateName = $("#plate-name").val();

        $("#modal").modal('hide');
        var addInfo = {
            "name": plateName
        };
        $.ajax({
            type: 'POST',
            contentType: 'application/json;charset=UTF-8',
            url: '/plate/addPlate',
            async: false,
            dataType: 'json',
            data: JSON.stringify(addInfo),
            success: function (data) {
                if (data) {
                    if (data.result == true) {
                        $('#plateTable').bootstrapTable('refresh');
                        tipsAlert('alert-success', '提示', '版块添加成功！');
                    }
                    else {
                        tipsAlert('alert-warning', '提醒', '版块添加失败！');
                    }
                }
                else {
                    tipsAlert('alert-danger', '异常', '版块添加失败！');
                }
            },
            error: function (err) {
                console.log(err.statusText);
                tipsAlert('alert-danger', '请求异常', '服务器内部异常，请联系管理员！');
            }
        });
    });
};