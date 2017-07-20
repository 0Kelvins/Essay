package com.like.api.VO;

import java.util.List;

/**
 * Created by Like on 2017/3/10.
 */
public class EntityVO {

    /**
     * 返回结果，默认否定
     */
    public boolean result = false;

    /**
     * 返回消息
     */
    public String message;

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

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
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

    public EntityVO() {
    }

    public EntityVO(boolean result) {
        this.result = result;
    }
}
