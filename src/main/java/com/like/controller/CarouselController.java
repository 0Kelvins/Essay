package com.like.controller;

import com.github.pagehelper.PageInfo;
import com.like.api.VO.EntityVO;
import com.like.api.VO.PageVO;
import com.like.entity.Carousel;
import com.like.entity.Manager;
import com.like.service.CarouselService;
import com.like.utils.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by Like on 2017/5/10.
 */
@RequestMapping("/carousel")
@Controller
public class CarouselController {

    @Resource
    private CarouselService carouselService;


    @RequestMapping(value = "/getCarouselList",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO getCarouselList() {
        EntityVO entityVO = new EntityVO();

        List list = carouselService.getCarouselList();
        if (list.size() > 0) {
            entityVO.setResult(true);
            entityVO.setData(list);
        }

        return entityVO;
    }

    @RequestMapping(value = "/getAllCarousel",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public PageVO getAllCarousel(@RequestBody PageVO pageVO, HttpSession session) {
        if (pageVO != null) {
            Manager manager = (Manager) session.getAttribute("manager");
            if (manager != null) {
                int pageTo = pageVO.getCurrentPage() + pageVO.getPageNo();  //跳转页
                List list = carouselService.getAllCarousel(pageTo, pageVO.getPageSize());

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

    @RequestMapping(value = "/addCarousel",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO addCarousel(@RequestBody Carousel carousel, HttpSession session) {
        EntityVO entityVO = new EntityVO();
        if (carousel != null) {
            Manager manager = (Manager) session.getAttribute("manager");
            if (manager != null) {
                if (!StringUtils.isNull(carousel.getImageUrl())
                        && carousel.getSequence() != null) {
                    Carousel has = carouselService.selectCarouselBySequence(carousel.getSequence());
                    if (has == null) {
                        boolean flag = carouselService.addCarousel(carousel);
                        if (flag) {
                            entityVO.setResult(true);
                        }
                    }
                    else {
                        entityVO.setMessage("轮播顺序重复，请重新设置");
                    }
                }
            }
        }

        return entityVO;
    }

    @RequestMapping(value = "/updateCarousel",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO updateCarousel(@RequestBody Carousel carousel, HttpSession session) {
        EntityVO entityVO = new EntityVO();
        if (carousel != null) {
            Manager manager = (Manager) session.getAttribute("manager");
            if (manager != null) {
                if (carousel.getCarouselId() != null
                        && !StringUtils.isNull(carousel.getImageUrl())
                        && carousel.getSequence() != null) {
                    boolean flag = carouselService.updateCarousel(carousel);
                    if (flag) {
                        entityVO.setResult(true);
                    }
                }
            }
        }

        return entityVO;
    }

    @RequestMapping(value = "/deleteCarousel",
            method = RequestMethod.POST,
            consumes = "application/json")
    @ResponseBody
    public EntityVO deleteCarousel(@RequestBody Carousel carousel, HttpSession session) {
        EntityVO entityVO = new EntityVO();
        if (carousel.getCarouselId() != null) {
            Manager manager = (Manager) session.getAttribute("manager");
            if (manager != null) {
                boolean flag = carouselService.deleteCarousel(carousel.getCarouselId());
                if (flag) {
                    entityVO.setResult(true);
                }
            }
        }

        return entityVO;
    }
}
