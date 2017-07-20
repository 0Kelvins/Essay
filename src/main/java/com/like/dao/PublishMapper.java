package com.like.dao;

import com.like.api.DTO.PublishPageDTO;
import com.like.entity.Publish;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PublishMapper {
    int deleteByPrimaryKey(Integer publishId);

    int insert(Publish record);

    int insertSelective(Publish record);

    Publish selectByPrimaryKey(Integer publishId);

    Publish selectByEssayId(Integer essayId);

    List selectPublishEssayList(@Param("publishPage") PublishPageDTO publishPage,
                                @Param("pageNum") int pageNum,
                                @Param("pageSize") int pageSize);

    List selectPersonPublishList(@Param("userId") Integer userId,
                                @Param("pageNum") int pageNum,
                                @Param("pageSize") int pageSize);

    int updateByPrimaryKeySelective(Publish record);

    int updateByPrimaryKey(Publish record);

    int updateForAddPageViews(Integer essayId);
}