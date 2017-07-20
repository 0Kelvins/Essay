package com.like.api.DTO;

import java.util.List;

/**
 * Created by Like on 2017/4/14.
 */
public class PageDTO {

    // 用户输入的分页条件
    private int currentPage = 1; // 当前获取页
    private int pageSize = 10;   // 每页最大行数
    private int rows;            // 总行数

    private int begin = 0;  //起始记录
    private int end;        //结束记录

    private int totalPage;  // 根据总行数计算总页数

    private List list;  //数据列表

    public PageDTO() {
    }

    public PageDTO(int currentPage, int pageSize) {
        this.currentPage = currentPage;
        this.pageSize = pageSize;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

    public int getTotalPage() {
        if (rows % pageSize == 0) {
            totalPage = rows / pageSize;
        } else {
            totalPage = rows / pageSize + 1;
        }
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }

    public int getBegin() {
        begin = (currentPage - 1) * pageSize;
        return begin;
    }

    public void setBegin(int begin) {
        this.begin = begin;
    }

    public int getEnd() {
        end = currentPage * pageSize + 1;
        return end;
    }

    public void setEnd(int end) {
        this.end = end;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public List getList() {
        return list;
    }

    public void setList(List list) {
        this.list = list;
    }


}