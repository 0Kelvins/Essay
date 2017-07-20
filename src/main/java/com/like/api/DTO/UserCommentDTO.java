package com.like.api.DTO;

import com.like.entity.Comment;

/**
 * Created by Like on 2017/4/25.
 */
public class UserCommentDTO {

    private Integer id;

    private String essayTitle;

    private Comment comment;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEssayTitle() {
        return essayTitle;
    }

    public void setEssayTitle(String essayTitle) {
        this.essayTitle = essayTitle;
    }

    public Comment getComment() {
        return comment;
    }

    public void setComment(Comment comment) {
        this.comment = comment;
    }
}
