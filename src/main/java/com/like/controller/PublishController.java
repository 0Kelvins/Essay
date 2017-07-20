package com.like.controller;

import com.github.pagehelper.PageInfo;
import com.like.api.DTO.PublishPageDTO;
import com.like.api.VO.EntityVO;
import com.like.api.VO.PageVO;
import com.like.api.VO.PublishPageVO;
import com.like.entity.Essay;
import com.like.entity.Manager;
import com.like.entity.Publish;
import com.like.entity.User;
import com.like.service.EssayService;
import com.like.service.PlateService;
import com.like.service.PublishService;
import com.like.utils.DateUtils;
import com.like.utils.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;

/**
 * Created by Like on 2017/4/13.
 */
@SessionAttributes({"pageDTO", "plateId"})
@RequestMapping("/publish")
@Controller
public class PublishController {

    @Resource
    private PublishService publishService;

    @Resource
    private EssayService essayService;

    @Resource
    private PlateService plateService;

    @RequestMapping(value = "/publishEssay",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO publishEssay(@RequestBody Publish publish, HttpSession session) {
        EntityVO entityVO = new EntityVO();
        User user = (User) session.getAttribute("user");

        if (user != null && publish.getPlateId() != null) {
            Essay e = new Essay();
            e.setEssayId(publish.getEssayId());
            e.setUserId(user.getUserId());
            Essay eForSure = essayService.getEssayByEssayUserId(e);
            if (eForSure != null) {
                publish.setPublishTime(new Date(System.currentTimeMillis()));
                boolean flag = publishService.publishEssay(publish);
                if (flag) {
                    plateService.plateAddEssayNum(publish.getPlateId(), 1);
                    entityVO.setResult(true);
                }
            }
        }
        return entityVO;
    }

    @RequestMapping(value = "/publishCancel",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO publishCancel(@RequestBody Publish publish, HttpSession session) {
        EntityVO entityVO = new EntityVO();
        User user = (User) session.getAttribute("user");

        if (user != null && publish.getEssayId() != null) {
            Essay e = new Essay();
            e.setEssayId(publish.getEssayId());
            e.setUserId(user.getUserId());
            Essay eForSure = essayService.getEssayByEssayUserId(e);
            if (eForSure != null) {
                Publish hasPublish = publishService.getPublishByEssayId(eForSure.getEssayId());
                if (hasPublish != null) {
                    boolean result = publishService.deletePublishEssayById(hasPublish.getPublishId());
                    if (result) {
                        plateService.plateAddEssayNum(publish.getPlateId(), -1);
                        entityVO.setResult(true);
                    }
                }
            }
        }
        return entityVO;
    }

    @RequestMapping(value = "/publishCheck",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO publishCheck(@RequestBody Publish publish, HttpSession session) {
        EntityVO entityVO = new EntityVO();
        User user = (User) session.getAttribute("user");

        if (user != null && publish.getEssayId() != null) {
            Essay e = new Essay();
            e.setEssayId(publish.getEssayId());
            e.setUserId(user.getUserId());
            Essay eForSure = essayService.getEssayByEssayUserId(e);
            if (eForSure != null) {
                Publish hasPublish = publishService.getPublishByEssayId(eForSure.getEssayId());
                if (hasPublish != null) {
                    entityVO.setResult(true);
                }
            }
            else {
                entityVO.setMessage("获取异常文章发布信息！");
            }
        }
        return entityVO;
    }

    @RequestMapping(value = "/getEssayList",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public PublishPageVO getEssayList(@RequestBody PublishPageVO publishPageVO) {
        if (publishPageVO != null) {
            Integer plateId = publishPageVO.getPlateId();       //板块标识
            Integer sortMethod = publishPageVO.getSortMethod(); //排序方式
            Integer dateRange = publishPageVO.getDateRange();   //日期范围
            String search = publishPageVO.getMessage();
            if (StringUtils.isNull(search))
                search = null;

            if (sortMethod != null) {
                if (sortMethod < 0 || sortMethod > 1) {
                    sortMethod = 0;
                }
            }

            if (dateRange < -999 || dateRange > -1) {
                dateRange = -365;
            }


            Date beginDate = DateUtils.getRelateDateFromNow(dateRange);//筛选起始日期

            int pageTo = publishPageVO.getCurrentPage() + publishPageVO.getPageNo();  //跳转页

            PublishPageDTO publishPage = new PublishPageDTO();
            publishPage.setPlateId(plateId);
            publishPage.setSortMethod(sortMethod);
            publishPage.setBeginDate(beginDate);
            publishPage.setSearch(search);

            List list = publishService.getPublishEssayList(publishPage, pageTo, publishPageVO.getPageSize());
            PageInfo pageInfo = new PageInfo(list);  //分页信息

            publishPageVO.setResult(true);
            publishPageVO.setData(list);
            publishPageVO.setCurrentPage(pageInfo.getPageNum());
            publishPageVO.setPageSize(pageInfo.getPageSize());
            publishPageVO.setTotalRows(pageInfo.getTotal());
            publishPageVO.setTotalPage(pageInfo.getPages());
        }

        return publishPageVO;
    }

    @RequestMapping(value = "/getPersonPublishList",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public PageVO getPersonPublishList(@RequestBody PageVO pageVO) {
        if (pageVO != null && pageVO.getMessage() != null) {

            int pageTo = pageVO.getCurrentPage() + pageVO.getPageNo();  //跳转页

            int userId = Integer.valueOf(pageVO.getMessage());

            List list = publishService.getPersonPublishList(userId, pageTo, pageVO.getPageSize());
            PageInfo pageInfo = new PageInfo(list);  //分页信息

            pageVO.setResult(true);
            pageVO.setData(list);
            pageVO.setCurrentPage(pageInfo.getPageNum());
            pageVO.setPageSize(pageInfo.getPageSize());
            pageVO.setTotalPage(pageInfo.getPages());
        }

        return pageVO;
    }

    @RequestMapping(value = "/deletePublishEssay",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO deletePublishEssay(@RequestBody Publish deleteInfo, HttpSession session) {
        Integer publishId = deleteInfo.getPublishId();
        Manager manager = (Manager) session.getAttribute("manager");
        EntityVO entityVO = new EntityVO();
        if (publishId != null && manager != null) {

            boolean flag = publishService.deletePublishEssayById(publishId);

            if (flag) {
                entityVO.setResult(true);
            }
        }

        return entityVO;
    }

}
