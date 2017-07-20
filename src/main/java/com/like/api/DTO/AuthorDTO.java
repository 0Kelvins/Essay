package com.like.api.DTO;

import com.like.entity.User;

/**
 * Created by Like on 2017/4/14.
 */
public class AuthorDTO {
    private Integer userId;

    private String username;

    private String avatar;

    private String gender;

    private String instruction;

    private Integer essayNum;

    private Integer commentNum;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar == null ? null : avatar.trim();
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender == null ? null : gender.trim();
    }

    public String getInstruction() {
        return instruction;
    }

    public void setInstruction(String instruction) {
        this.instruction = instruction == null ? null : instruction.trim();
    }

    public Integer getEssayNum() {
        return essayNum;
    }

    public void setEssayNum(Integer essayNum) {
        this.essayNum = essayNum;
    }

    public Integer getCommentNum() {
        return commentNum;
    }

    public void setCommentNum(Integer commentNum) {
        this.commentNum = commentNum;
    }

    public void initByUser(User user) {
        this.userId = user.getUserId();
        this.username = user.getUsername();
        this.avatar = user.getAvatar();
        this.gender = user.getGender();
        this.instruction = user.getInstruction();
    }
}
