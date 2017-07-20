package com.like.service.impl;

import com.like.dao.CommentMapper;
import com.like.entity.Comment;
import com.like.service.CommentService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Like on 2017/4/19.
 */
@Service("commentService")
public class CommentServiceImpl implements CommentService {

    @Resource
    private CommentMapper commentMapper;

    @Override
    public boolean addComment(Comment comment) {
        Integer floor = commentMapper.countCommentNumByEssayId(comment.getEssayId());
        if (floor == null) {
            floor = 1;
        }
        else {
            floor += 1;
        }
        comment.setFloor(floor);
        return commentMapper.insertSelective(comment) > 0;
    }

    @Override
    public List getCommentListByEssayId(Integer essayId, Integer pageNum, Integer pageSize) {
        return commentMapper.selectCommentUserListByEssayId(essayId, pageNum, pageSize);
    }

    @Override
    public List getCommentListByUserId(Integer userId, Integer pageNum, Integer pageSize) {
        return commentMapper.selectCommentListByUserId(userId, pageNum, pageSize);
    }

    @Override
    public Comment getReplyComment(Comment comment) {
        return commentMapper.selectReplyComment(comment);
    }

    @Override
    public boolean deleteCommentContentById(Integer commentId) {
        Comment comment = new Comment();
        comment.setCommentId(commentId);
        comment.setCommentContent("该评论已被删除");
        comment.setCommentState(1400);

        return commentMapper.updateByPrimaryKeySelective(comment) > 0;
    }
}
