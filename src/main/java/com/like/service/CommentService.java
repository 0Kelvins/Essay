package com.like.service;

import com.like.entity.Comment;

import java.util.List;

/**
 * Created by Like on 2017/4/19.
 */
public interface CommentService {

    /*添加评论*/
    boolean addComment(Comment comment);

    /*获取文章评论列表*/
    List getCommentListByEssayId(Integer essayId, Integer pageNum, Integer pageSize);

    /*获取用户评论列表*/
    List getCommentListByUserId(Integer userId, Integer pageNum, Integer pageSize);

    /*获取被回复评论*/
    Comment getReplyComment(Comment comment);

    /*根据评论标识删除评论*/
    boolean deleteCommentContentById(Integer commentId);
}
