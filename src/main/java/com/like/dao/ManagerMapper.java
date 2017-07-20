package com.like.dao;

import com.like.entity.Manager;
import org.springframework.stereotype.Repository;

@Repository
public interface ManagerMapper {
    int deleteByPrimaryKey(Integer managerId);

    int insert(Manager record);

    int insertSelective(Manager record);

    Manager selectByPrimaryKey(Integer managerId);

    Manager selectByAccountPassword(Manager record);

    int updateByPrimaryKeySelective(Manager record);

    int updateByPrimaryKey(Manager record);
}