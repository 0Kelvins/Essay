package com.like.dao;

import com.like.entity.Carousel;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarouselMapper {
    int deleteByPrimaryKey(Integer carouselId);

    int insert(Carousel record);

    int insertSelective(Carousel record);

    Carousel selectByPrimaryKey(Integer carouselId);

    List selectCarouselList();

    List selectAllCarousel(@Param("pageNum") int pageNum,
                           @Param("pageSize") int pageSize);

    Carousel selectBySequence(Integer sequence);

    int updateByPrimaryKeySelective(Carousel record);

    int updateByPrimaryKey(Carousel record);
}