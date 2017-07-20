package com.like.dao;

import com.like.entity.Directory;
import com.like.entity.Essay;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EssayMapper {
    int deleteByPrimaryKey(Integer essayId);

    int deleteByEssayUserId(Essay essay);

    int insert(Essay record);

    int insertSelective(Essay record);

    Essay selectByPrimaryKey(Integer essayId);

    Essay selectByEssayUserId(Essay essay);

    List selectListByUserId(Integer userId);

    List selectListByUserDirId(Directory directory);

    int countEssayNumByUserId(Integer userId);

    int updateByPrimaryKeySelective(Essay record);

    int updateByPrimaryKeyWithBLOBs(Essay record);

    int updateByPrimaryKey(Essay record);

    int updateByEssayUserId(Essay record);
}