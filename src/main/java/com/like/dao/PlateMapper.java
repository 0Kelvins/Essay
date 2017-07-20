package com.like.dao;

import com.like.entity.Plate;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlateMapper {
    int deleteByPrimaryKey(Integer plateId);

    int insert(Plate record);

    int insertSelective(Plate record);

    Plate selectByPrimaryKey(Integer plateId);

    List selectByEssayNum();

    List selectPlateList(@Param("pageNum") int pageNum,
                         @Param("pageSize") int pageSize);

    int updateByPrimaryKeySelective(Plate record);

    int updateByPrimaryKey(Plate record);

    int updateAddEssayNum(@Param("plateId") Integer plateId,
                          @Param("numToAdd") Integer numToAdd);

    int openById(Integer plateId);

    int closeById(Integer plateId);
}