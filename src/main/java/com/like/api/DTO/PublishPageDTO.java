package com.like.api.DTO;

import java.util.Date;

/**
 * Created by Like on 2017/5/24.
 */
public class PublishPageDTO {

    private Integer plateId;    //板块
    private Integer sortMethod; //排序方式
    private Date beginDate;     //起始日期
    private String search;      //标题搜索

    public Integer getPlateId() {
        return plateId;
    }

    public void setPlateId(Integer plateId) {
        this.plateId = plateId;
    }

    public Integer getSortMethod() {
        return sortMethod;
    }

    public void setSortMethod(Integer sortMethod) {
        this.sortMethod = sortMethod;
    }

    public Date getBeginDate() {
        return beginDate;
    }

    public void setBeginDate(Date beginDate) {
        this.beginDate = beginDate;
    }

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }
}
