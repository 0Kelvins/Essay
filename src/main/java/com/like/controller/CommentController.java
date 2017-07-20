package com.like.controller;

import com.github.pagehelper.PageInfo;
import com.like.api.DTO.AuthorDTO;
import com.like.api.DTO.CommentDTO;
import com.like.api.VO.EntityVO;
import com.like.api.VO.PageVO;
import com.like.entity.Comment;
import com.like.entity.Manager;
import com.like.entity.User;
import com.like.service.CommentService;
import com.like.service.UserService;
import com.like.utils.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;

/**
 * Created by Like on 2017/4/19.
 */
@RequestMapping("/comment")
@Controller
public class CommentController {

    @Resource
    private CommentService commentService;

    @Resource
    private UserService userService;

    @RequestMapping(value = "/addComment",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO addComment(@RequestBody Comment comment, HttpSession session) {
        EntityVO entityVO = new EntityVO();
        if (comment.getEssayId() != null && comment.getCommentContent() != null) {
            User user = (User) session.getAttribute("user");
            comment.setUserId(user.getUserId());
            comment.setPublishTime(new Date(System.currentTimeMillis()));
            comment.setCommentState(1000);

            boolean flag = commentService.addComment(comment);
            if (flag)
                entityVO.setResult(true);
        }
        return entityVO;
    }

    @RequestMapping(value = "/getCommentList",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public PageVO getCommentList(@RequestBody PageVO pageVO) {
        PageInfo pageInfo = null;   //分页信息
        if (pageVO != null ) {
            Integer essayId = null;
            if (pageVO.getMessage() != null && StringUtils.isInteger(pageVO.getMessage())) {
                essayId = Integer.valueOf(pageVO.getMessage());
            }

            int pageTo = pageVO.getCurrentPage() + pageVO.getPageNo();  //跳转页

            List<CommentDTO> list = commentService.getCommentListByEssayId(essayId, pageTo, pageVO.getPageSize());
            pageInfo = new PageInfo(list);

            for (int i = 0; i < list.size(); i++) {  // 填充被回复评论信息
                if (list.get(i).getComment().getReplyFloor() != 0) {
                    Comment replyComment = commentService.getReplyComment(list.get(i).getComment());
                    list.get(i).setReplyComment(replyComment);
                    AuthorDTO replyAuthor = userService.getAuthor(replyComment.getUserId());
                    list.get(i).setReplyAuthor(replyAuthor);
                }
            }
            pageVO.setResult(true);
            pageVO.setData(list);
            pageVO.setCurrentPage(pageInfo.getPageNum());
            pageVO.setPageSize(pageInfo.getPageSize());
            pageVO.setTotalRows(pageInfo.getTotal());
            pageVO.setTotalPage(pageInfo.getPages());
        }
        return pageVO;
    }

    @RequestMapping(value = "/getPersonCommentList",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public PageVO getPersonCommentList(@RequestBody PageVO pageVO) {
        PageInfo pageInfo = null;   //分页信息
        if (pageVO != null && pageVO.getMessage() != null) {
            int pageTo = pageVO.getCurrentPage() + pageVO.getPageNo();  //跳转页

            int userId = Integer.valueOf(pageVO.getMessage());

            List list = commentService.getCommentListByUserId(userId, pageTo, pageVO.getPageSize());
            pageInfo = new PageInfo(list);

            pageVO.setResult(true);
            pageVO.setData(list);
            pageVO.setCurrentPage(pageInfo.getPageNum());
            pageVO.setPageSize(pageInfo.getPageSize());
            pageVO.setTotalRows(pageInfo.getTotal());
            pageVO.setTotalPage(pageInfo.getPages());
        }
        return pageVO;
    }

    @RequestMapping(value = "/deleteComment",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO deleteComment(@RequestBody Comment deleteInfo, HttpSession session) {
        Integer commentId = deleteInfo.getCommentId();
        Manager manager = (Manager) session.getAttribute("manager");
        EntityVO entityVO = new EntityVO();
        if (commentId != null && manager != null) {

            boolean flag = commentService.deleteCommentContentById(commentId);

            if (flag) {
                entityVO.setResult(true);
            }
        }

        return entityVO;
    }

}
