package com.like.api.DTO;

import com.like.entity.Comment;

/**
 * Created by Like on 2017/4/20.
 */
public class CommentDTO {

    private Comment comment;        //当前评论

    private AuthorDTO author;       //发表人

    private Comment replyComment;   //被回复评论

    private AuthorDTO replyAuthor;  //被回复评论发表人

    public Comment getComment() {

        return comment;
    }

    public void setComment(Comment comment) {
        this.comment = comment;
    }

    public AuthorDTO getAuthor() {
        return author;
    }

    public void setAuthor(AuthorDTO author) {
        this.author = author;
    }

    public Comment getReplyComment() {
        return replyComment;
    }

    public void setReplyComment(Comment replyComment) {
        this.replyComment = replyComment;
    }

    public AuthorDTO getReplyAuthor() {
        return replyAuthor;
    }

    public void setReplyAuthor(AuthorDTO replyAuthor) {
        this.replyAuthor = replyAuthor;
    }
}
