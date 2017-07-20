package com.like.dao;

import com.like.entity.Directory;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DirectoryMapper {
    int deleteByPrimaryKey(Integer dirId);

    int deleteByDirUserId(Directory directory);

    int insert(Directory record);

    int insertSelective(Directory record);

    Directory selectByPrimaryKey(Integer dirId);

    List<Directory> selectByUserId(Integer userId);

    int updateByPrimaryKeySelective(Directory record);

    int updateByPrimaryKey(Directory record);

    int updateByDirUserId(Directory record);

}