package com.like.controller;

import com.like.api.VO.EntityVO;
import com.like.api.VO.RegisterVO;
import com.like.entity.User;
import com.like.service.UserService;
import com.like.utils.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

/**
 * Created by Like on 2017/4/9.
 */
@SessionAttributes("user")
@Controller
public class UserController {

    @Resource
    private UserService userService;

    @RequestMapping(value = "/login",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO login(@RequestBody User userInfo, ModelMap modelMap) {
        EntityVO entityVO = new EntityVO();
        User user = userService.userLogin(userInfo);
        if (user != null) {
            modelMap.addAttribute("user", user);
            entityVO.setResult(true);
        }
        else {
            entityVO.setMessage("账号或密码不正确！");
        }
        return entityVO;
    }

    @RequestMapping("/logout")
    public String logout(SessionStatus sessionStatus) {
        sessionStatus.setComplete();
        return "home/home";
    }

    @RequestMapping(value = "/register",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO register(@RequestBody RegisterVO userInfo) {
        EntityVO entityVO = new EntityVO();
        userInfo.setAvatar("/images/upload/default_avatar.png");
        int result = userService.userRegister(userInfo);
        if (result == 1) {
            entityVO.setResult(true);
        }
        else if (result == -1) {
            entityVO.setMessage("账号已注册！");
        }
        else {
            entityVO.setMessage("注册失败！");
        }

        return entityVO;
    }

    @RequestMapping(value = "/getCurrentUser",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO getCurrentUser(ModelMap modelMap) {
        EntityVO entityVO = new EntityVO();
        User user = (User) modelMap.get("user");
        if (user != null) {
            entityVO.setObject(user);
            entityVO.setResult(true);
        }
        return entityVO;
    }

    @RequestMapping(value = "/updateUserInfo",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO updateUserInfo(@RequestBody User updateInfo, HttpSession session) {
        EntityVO entityVO = new EntityVO();
        boolean rule = true;

        if (updateInfo != null) {
            String avatar = updateInfo.getAvatar();
            String username = updateInfo.getUsername();

            if (StringUtils.isNull(avatar) && StringUtils.isNull(username)
                || avatar.length() > 100 || username.length() > 10) {
                rule = false;
            }

            if (rule) {
                User user = (User) session.getAttribute("user");
                if (user != null) {

                    user.setAvatar(avatar);
                    user.setUsername(username);

                    boolean flag = userService.updateUserInfo(user);

                    if (flag) {
                        entityVO.setResult(true);
                        entityVO.setObject(user);
                        entityVO.setMessage("修改成功");
                    }
                }
                else {
                    entityVO.setMessage("请重新登录！");
                }
            }
            else {
                entityVO.setMessage("修改信息不合法");
            }
        }

        return entityVO;
    }

    @RequestMapping(value = "/updatePassword",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO updatePassword(@RequestBody RegisterVO passwordInfo, HttpSession session, SessionStatus sessionStatus) {
        EntityVO entityVO = new EntityVO();
        if (passwordInfo.getPassword() != null && passwordInfo.getPasswords() != null) {
            if (passwordInfo.getPassword() != passwordInfo.getPasswords()) {
                User user = (User) session.getAttribute("user");
                if (user != null) {
                    user.setPassword(passwordInfo.getPassword());

                    int flag = userService.updateUserPassword(user, passwordInfo.getPasswords());

                    if (flag == -1) {
                        entityVO.setMessage("原密码错误！");
                    } else if (flag == 0) {
                        entityVO.setMessage("密码修改失败！");
                    }
                    if (flag == 1) {
                        entityVO.setResult(true);
                        entityVO.setMessage("密码修改成功,请重新登录！");
                        sessionStatus.setComplete();
                    }
                }
                else {
                    entityVO.setMessage("请重新登录！");
                }
            }
            else {
                entityVO.setMessage("密码未修改！");
            }
        }
        return entityVO;
    }
}
