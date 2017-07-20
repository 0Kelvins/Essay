package com.like.service.impl;

import com.like.api.DTO.AuthorDTO;
import com.like.dao.CommentMapper;
import com.like.dao.EssayMapper;
import com.like.dao.UserMapper;
import com.like.entity.User;
import com.like.service.UserService;
import com.like.utils.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;

/**
 * Created by Like on 2017/3/7.
 */
@Service("userService")
public class UserServiceImpl implements UserService {

    @Resource
    private UserMapper userMapper;

    @Resource
    private EssayMapper essayMapper;

    @Resource
    private CommentMapper commentMapper;

    @Override
    public User userLogin(User user) {
        if (!StringUtils.isNull(user.getAccount()) && !StringUtils.isNull(user.getPassword())) {
            User userInfo = userMapper.selectByAccountPassword(user);
            if (userInfo != null) {
                return userInfo;
            }
        }

        return null;
    }

    @Override
    public int userRegister(User user) {
        if (!StringUtils.isNull(user.getAccount())
                && !StringUtils.isNull(user.getUsername())
                && !StringUtils.isNull(user.getPassword()) ) {
            //检查账号是否已存在
            int flag = userMapper.selectByAccount(user.getAccount());
            if (flag == 1) {
                return -1;  //已存在返回-1
            }

            //注册
            user.setAccountState(1000);
            user.setRegisterTime(new Date(System.currentTimeMillis()));
            int result = userMapper.insertSelective(user);
            if (result != 0) {
                return 1;
            }
        }
        return 0;
    }

    @Override
    public AuthorDTO getAuthor(Integer userId) {
        User user = userMapper.selectByPrimaryKey(userId);
        AuthorDTO author = null;
        if (user != null) {
            author = new AuthorDTO();
            author.initByUser(user);
            author.setEssayNum(essayMapper.countEssayNumByUserId(userId));
            author.setCommentNum(commentMapper.countCommentNumByUserId(userId));
        }
        return author;
    }

    @Override
    public boolean updateUserInfo(User user) {
        user.setPassword(null);
        return userMapper.updateByPrimaryKeySelective(user) > 0;
    }

    @Override
    public int updateUserPassword(User user, String newPassword) {
        User u = userMapper.selectByAccountPassword(user);
        if (u != null) {
            User update = new User();
            update.setUserId(user.getUserId());
            update.setPassword(newPassword);
            return userMapper.updateByPrimaryKeySelective(update);
        }

        return -1;
    }
}
