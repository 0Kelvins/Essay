package com.like.dao;

import com.like.entity.Comment;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentMapper {
    int deleteByPrimaryKey(Integer commentId);

    int insert(Comment record);

    int insertSelective(Comment record);

    Comment selectByPrimaryKey(Integer commentId);

    /*查询被回复评论*/
    Comment selectReplyComment(Comment record);

    /*查询文章的评论列表*/
    List selectCommentUserListByEssayId(@Param(value = "essayId") Integer essayId,
                             @Param(value = "pageNum") Integer pageNum,
                             @Param(value = "pageSize") Integer pageSize);

    /*查询用户的评论列表*/
    List selectCommentListByUserId(@Param(value = "userId") Integer userId,
                                       @Param(value = "pageNum") Integer pageNum,
                                       @Param(value = "pageSize") Integer pageSize);

    /*根据用户标识查询评论数*/
    Integer countCommentNumByUserId(Integer userId);

    /*根据文章标识查询评论数*/
    Integer countCommentNumByEssayId(Integer essayId);

    int updateByPrimaryKeySelective(Comment record);

    int updateByPrimaryKey(Comment record);
}