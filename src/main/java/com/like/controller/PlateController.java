package com.like.controller;

import com.github.pagehelper.PageInfo;
import com.like.api.VO.EntityVO;
import com.like.api.VO.PageVO;
import com.like.entity.Manager;
import com.like.entity.Plate;
import com.like.service.PlateService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by Like on 2017/4/13.
 */
@RequestMapping("/plate")
@Controller
public class PlateController {

    @Resource
    private PlateService plateService;

    @RequestMapping(value = "/getPlateList",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO getPlateList() {
        EntityVO entityVO = new EntityVO();
        List list = plateService.getPlateListDesc();
        entityVO.setData(list);
        entityVO.setResult(true);
        return entityVO;
    }

    @RequestMapping(value = "/getAllPlate",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public PageVO getAllPlate(@RequestBody PageVO pageVO, HttpSession session) {
        if (pageVO != null) {
            Manager manager = (Manager) session.getAttribute("manager");
            if (manager != null) {
                int pageTo = pageVO.getCurrentPage() + pageVO.getPageNo();  //跳转页
                List list = plateService.getAllPlate(pageTo, pageVO.getPageSize());

                PageInfo pageInfo = new PageInfo(list);  //分页信息

                pageVO.setResult(true);
                pageVO.setData(list);
                pageVO.setCurrentPage(pageInfo.getPageNum());
                pageVO.setPageSize(pageInfo.getPageSize());
                pageVO.setTotalRows(pageInfo.getTotal());
                pageVO.setTotalPage(pageInfo.getPages());
            }
        }

        return pageVO;
    }

    @RequestMapping(value = "/addPlate",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO addPlate(@RequestBody Plate plate, HttpSession session) {
        EntityVO entityVO = new EntityVO();
        Manager manager = (Manager) session.getAttribute("manager");
        if (manager != null) {
            boolean flag = plateService.addPlate(plate);
            if (flag) {
                entityVO.setResult(true);
            }
        }
        return entityVO;
    }

    @RequestMapping(value = "/openPlate",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO openPlate(@RequestBody Plate plate, HttpSession session) {
        EntityVO entityVO = new EntityVO();
        Manager manager = (Manager) session.getAttribute("manager");
        if (manager != null) {
            boolean flag = plateService.openPlateById(plate.getPlateId());
            if (flag) {
                entityVO.setResult(true);
            }
        }
        return entityVO;
    }

    @RequestMapping(value = "/closePlate",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO closePlate(@RequestBody Plate plate, HttpSession session) {
        EntityVO entityVO = new EntityVO();
        Manager manager = (Manager) session.getAttribute("manager");
        if (manager != null) {
            boolean flag = plateService.closePlateById(plate.getPlateId());
            if (flag) {
                entityVO.setResult(true);
            }
        }
        return entityVO;
    }

    @RequestMapping(value = "/deletePlate",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO deletePlate(@RequestBody Plate plate, HttpSession session) {
        EntityVO entityVO = new EntityVO();
        Manager manager = (Manager) session.getAttribute("manager");
        if (manager != null) {
            boolean flag = plateService.deletePlateById(plate.getPlateId());
            if (flag) {
                entityVO.setResult(true);
            }
        }
        return entityVO;
    }
}
