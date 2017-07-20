package com.like.service;

import com.like.entity.Carousel;

import java.util.List;

/**
 * Created by Like on 2017/5/10.
 */
public interface CarouselService {

    /*获取首页顺序轮播*/
    List getCarouselList();

    /*获取所有轮播*/
    List getAllCarousel(Integer pageNum, Integer pageSize);

    /*根据轮播顺序查找轮播*/
    Carousel selectCarouselBySequence(Integer sequence);

    /*添加轮播*/
    boolean addCarousel(Carousel carousel);

    /*删除轮播*/
    boolean deleteCarousel(Integer carouselId);

    /*修改轮播信息*/
    boolean updateCarousel(Carousel carousel);
}
