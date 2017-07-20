package com.like.service;

import com.like.api.DTO.AuthorDTO;
import com.like.entity.User;

/**
 * Created by Like on 2017/3/7.
 */
public interface UserService {

    /*登录*/
    User userLogin(User user);

    /*注册*/
    int userRegister(User user);

    /*获取作者信息*/
    AuthorDTO getAuthor(Integer userId);

    /*更新用户信息*/
    boolean updateUserInfo(User user);

    /*更新用户密码*/
    int updateUserPassword(User user, String newPassword);
}
