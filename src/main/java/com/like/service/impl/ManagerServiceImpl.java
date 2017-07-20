package com.like.service.impl;

import com.like.dao.ManagerMapper;
import com.like.entity.Manager;
import com.like.service.ManagerService;
import com.like.utils.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by Like on 2017/4/28.
 */
@Service("managerService")
public class ManagerServiceImpl implements ManagerService {

    @Resource
    private ManagerMapper managerMapper;

    @Override
    public Manager managerLogin(Manager manager) {
        if (!StringUtils.isNull(manager.getAccount()) && !StringUtils.isNull(manager.getPassword())) {
            Manager managerInfo = managerMapper.selectByAccountPassword(manager);
            if (managerInfo != null) {
                return managerInfo;
            }
        }
        return null;
    }
}
