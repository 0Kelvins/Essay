package com.like.api.VO;

/**
 * Created by Like on 2017/4/14.
 */
public class PageVO extends EntityVO {

    private int pageNo = 0;      // 跳转页
    private int currentPage = 1; // 当前页
    private int pageSize = 10;   // 每页最大行数
    private long totalRows = 0;        // 总行数
    private long totalPage = 0;   // 总页数

    public PageVO() {
    }

    public PageVO(int pageNo, int pageSize) {
        this.pageNo = pageNo;
        this.pageSize = pageSize;
    }

    public int getPageNo() {
        return pageNo;
    }

    public void setPageNo(int pageNo) {
        this.pageNo = pageNo;
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

    public long getTotalRows() {
        return totalRows;
    }

    public void setTotalRows(long totalRows) {
        this.totalRows = totalRows;
    }

    public long getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(long totalPage) {
        this.totalPage = totalPage;
    }
}
