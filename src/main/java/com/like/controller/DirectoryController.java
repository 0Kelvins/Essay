package com.like.controller;

import com.like.api.VO.EntityVO;
import com.like.entity.Directory;
import com.like.entity.User;
import com.like.service.DirectoryService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by Like on 2017/4/9.
 */
@Controller
@RequestMapping("/directory")
public class DirectoryController {

    @Resource
    private DirectoryService directoryService;

    @RequestMapping(value = "/newDirectory",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO newDirectory(@RequestBody Directory newDir, HttpSession session) {
        EntityVO entityVO = new EntityVO();
        User user = (User) session.getAttribute("user");
        if (user != null) {
            newDir.setUserId(user.getUserId());
            boolean flag = directoryService.newDirectory(newDir);
            if (flag) {
                List dirList = directoryService.getDirectory(user.getUserId());
                entityVO.setResult(true);
                entityVO.setData(dirList);
            }
        }
        return entityVO;
    }

    @RequestMapping(value = "/getUserDirectory",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO getUserDirectory(HttpSession session) {
        EntityVO entityVO = new EntityVO();
        User user = (User) session.getAttribute("user");
        if (user != null) {
            List dirList = directoryService.getDirectory(user.getUserId());
            entityVO.setResult(true);
            entityVO.setData(dirList);
        }
        return entityVO;
    }

    @RequestMapping(value = "/deleteDirectory",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO deleteDirectory(@RequestBody Directory deleteDir, HttpSession session) {
        EntityVO entityVO = new EntityVO();
        User user = (User) session.getAttribute("user");
        if (user != null) {
            deleteDir.setUserId(user.getUserId());
            boolean flag = directoryService.deleteDirectory(deleteDir);
            entityVO.setResult(flag);
            if (flag) {
                List dirList = directoryService.getDirectory(user.getUserId());
                entityVO.setData(dirList);
            }
        }
        return entityVO;
    }

    @RequestMapping(value = "/updateDirectory",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO updateDirectory(@RequestBody Directory dir, HttpSession session) {
        EntityVO entityVO = new EntityVO();
        User user = (User) session.getAttribute("user");
        if (user != null) {
            dir.setUserId(user.getUserId());
            boolean flag = directoryService.updateDirectoryByDirUserId(dir);
            entityVO.setResult(flag);
            if (flag) {
                List dirList = directoryService.getDirectory(user.getUserId());
                entityVO.setData(dirList);
            }
        }
        return entityVO;
    }
}
