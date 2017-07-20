package com.like.api.DTO;

import java.util.List;

/**
 * Created by Like on 2017/3/10.
 */
public class EntityDTO {

    /**
     *  返回结果，默认否定
     */
    public boolean result = false;

    /**
     * 返回数据列表
     */
    public List data;

    /**
     * 返回对象
     */
    public Object object;

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public List getData() {
        return data;
    }

    public void setData(List data) {
        this.data = data;
    }

    public Object getObject() {
        return object;
    }

    public void setObject(Object object) {
        this.object = object;
    }

    public EntityDTO() {
    }

    public EntityDTO(boolean result) {
        this.result = result;
    }
}
