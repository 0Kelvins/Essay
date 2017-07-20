package com.like.controller;

import com.like.api.VO.EntityVO;
import com.like.entity.Directory;
import com.like.entity.Essay;
import com.like.entity.User;
import com.like.service.impl.EssayServiceImpl;
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
 * Created by Like on 2017/4/9.
 */
@Controller
@RequestMapping("/essays")
public class EssayController {

    @Resource
    private EssayServiceImpl essayService;


    @RequestMapping(value = "/newEssay",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO newEssay(@RequestBody Essay newEssay, HttpSession session) {
        EntityVO entityVO = new EntityVO();
        User user = (User) session.getAttribute("user");
        if (user != null) {
            newEssay.setUserId(user.getUserId());
            newEssay.setTitle("");
            newEssay.setContent("");
            newEssay.setEssayState(1000);
            newEssay.setCreateTime(new Date(System.currentTimeMillis()));

            boolean flag = essayService.newEssay(newEssay);
            if (flag) {
                List essayList = essayService.getEssayList(user.getUserId());
                entityVO.setResult(true);
                entityVO.setData(essayList);
            }
        }
        return entityVO;
    }

    @RequestMapping(value = "/getEssayInDir",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO getEssayInDir(@RequestBody Directory directory, HttpSession session) {
        EntityVO entityVO = new EntityVO();
        User user = (User) session.getAttribute("user");
        if (user != null) {
            directory.setUserId(user.getUserId());
            List essayList = essayService.getEssayInDir(directory);
            entityVO.setResult(true);
            entityVO.setData(essayList);
        }
        return entityVO;
    }

    @RequestMapping(value = "/getEssayList",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO getEssayList(HttpSession session) {
        EntityVO entityVO = new EntityVO();
        User user = (User) session.getAttribute("user");
        if (user != null) {
            List essayList = essayService.getEssayList(user.getUserId());
            entityVO.setResult(true);
            entityVO.setData(essayList);
        }
        return entityVO;
    }

    @RequestMapping(value = "/getEssayById",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO getEssayById(@RequestBody Essay essay, HttpSession session) {
        EntityVO entityVO = new EntityVO();
        User user = (User) session.getAttribute("user");
        if (user != null) {
            essay.setUserId(user.getUserId());
            Essay essayContent = essayService.getEssayByEssayUserId(essay);
            entityVO.setResult(true);
            entityVO.setObject(essayContent);
        }
        return entityVO;
    }

    @RequestMapping(value = "/deleteEssay",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO deleteEssay(@RequestBody Essay deleteEssay, HttpSession session) {
        EntityVO entityVO = new EntityVO();
        User user = (User) session.getAttribute("user");
        if (user != null) {
            deleteEssay.setUserId(user.getUserId());
            boolean flag = essayService.deleteEssay(deleteEssay);
            entityVO.setResult(flag);
            if (flag) {
                List essayList = essayService.getEssayList(user.getUserId());
                entityVO.setData(essayList);
            }
        }
        return entityVO;
    }

    @RequestMapping(value = "/updateEssay",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO updateEssay(@RequestBody Essay essay, HttpSession session) {
        EntityVO entityVO = new EntityVO();
        User user = (User) session.getAttribute("user");
        if (user != null) {
            essay.setUserId(user.getUserId());
            essay.setUpdateTime(new Date(System.currentTimeMillis()));
            boolean flag = essayService.updateEssay(essay);
            entityVO.setResult(flag);
        }
        return entityVO;
    }

}
