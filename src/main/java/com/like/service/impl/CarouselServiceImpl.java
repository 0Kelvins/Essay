package com.like.service.impl;

import com.like.dao.CarouselMapper;
import com.like.entity.Carousel;
import com.like.service.CarouselService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Like on 2017/5/10.
 */
@Service("carouselService")
public class CarouselServiceImpl implements CarouselService {

    @Resource
    private CarouselMapper carouselMapper;

    @Override
    public List getCarouselList() {
        return carouselMapper.selectCarouselList();
    }

    @Override
    public List getAllCarousel(Integer pageNum, Integer pageSize) {
        return carouselMapper.selectAllCarousel(pageNum, pageSize);
    }

    @Override
    public Carousel selectCarouselBySequence(Integer sequence) {
        return carouselMapper.selectBySequence(sequence);
    }

    @Override
    public boolean addCarousel(Carousel carousel) {
        return carouselMapper.insertSelective(carousel) > 0;
    }

    @Override
    public boolean deleteCarousel(Integer carouselId) {
        return carouselMapper.deleteByPrimaryKey(carouselId) > 0;
    }

    @Override
    public boolean updateCarousel(Carousel carousel) {
        return carouselMapper.updateByPrimaryKeySelective(carousel) > 0;
    }
}
