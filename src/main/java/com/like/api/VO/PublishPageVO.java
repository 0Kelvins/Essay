package com.like.api.VO;

/**
 * Created by Like on 2017/5/6.
 */
public class PublishPageVO extends PageVO {

    private Integer plateId;

    private Integer sortMethod = 0;

    private Integer dateRange = -365;

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

    public Integer getDateRange() {
        return dateRange;
    }

    public void setDateRange(Integer dateRange) {
        this.dateRange = dateRange;
    }
}
