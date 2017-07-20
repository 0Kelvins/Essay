package com.like.entity;

public class Directory implements java.io.Serializable {

    private Integer dirId;

    private Integer userId;

    private String dirName;

    public Directory() {
    }

    public Directory(Integer userId, String dirName) {
        this.userId = userId;
        this.dirName = dirName;
    }

    public Integer getDirId() {
        return dirId;
    }

    public void setDirId(Integer dirId) {
        this.dirId = dirId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getDirName() {
        return dirName;
    }

    public void setDirName(String dirName) {
        this.dirName = dirName == null ? null : dirName.trim();
    }
}