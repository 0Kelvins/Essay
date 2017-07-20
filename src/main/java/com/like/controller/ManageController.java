package com.like.controller;

import com.like.api.VO.EntityVO;
import com.like.entity.Manager;
import com.like.service.ManagerService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

/**
 * Created by Like on 2017/4/28.
 */
@RequestMapping("/manage")
@SessionAttributes("manager")
@Controller
public class ManageController {

    @Resource
    private ManagerService managerService;


    @RequestMapping(value = {"", "/"})
    public String goManageLogin() {
        return "manage/login/login";
    }

    @RequestMapping(value = {"/home"})
    public String goManageHome() {
        return "manage/home/home";
    }

    @RequestMapping("/essayManage")
    public String goEssayManage() {
        return "manage/essay-manage/essay-manage";
    }

    @RequestMapping("/commentManage")
    public String goCommentManage() {
        return "manage/comment-manage/comment-manage";
    }

    @RequestMapping("/carouselManage")
    public String goCarouselManage() {
        return "manage/carousel-manage/carousel-manage";
    }

    @RequestMapping("/plateManage")
    public String goPlateManage() {
        return "manage/plate-manage/plate-manage";
    }

    @RequestMapping("/main")
    public String goManageMain(HttpSession session) {
        Manager manager = (Manager) session.getAttribute("manager");
        if (manager != null) {
            return "manage/main/main";
        }
        return "manage/login/login";
    }

    @RequestMapping(value = "/login",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO login(@RequestBody Manager loginInfo, ModelMap modelMap) {
        EntityVO entityVO = new EntityVO();
        Manager manager = managerService.managerLogin(loginInfo);
        if (manager != null) {
            modelMap.addAttribute("manager", manager);
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
        return "manage/login/login";
    }
}
