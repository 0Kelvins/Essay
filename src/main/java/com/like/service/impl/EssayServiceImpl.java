package com.like.service.impl;

import com.like.dao.EssayMapper;
import com.like.entity.Directory;
import com.like.entity.Essay;
import com.like.service.EssayService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Like on 2017/4/9.
 */
@Service("essayService")
public class EssayServiceImpl implements EssayService {

    @Resource
    private EssayMapper essayMapper;

    @Override
    public Essay getEssayById(Integer essayId) {
        return essayMapper.selectByPrimaryKey(essayId);
    }

    @Override
    public boolean newEssay(Essay essay) {
        return essayMapper.insertSelective(essay) > 0;
    }

    @Override
    public Essay getEssayByEssayUserId(Essay essay) {
        essay = essayMapper.selectByEssayUserId(essay);
        return essay;
    }

    @Override
    public List getEssayList(Integer userId) {
        List list = essayMapper.selectListByUserId(userId);
        return list;
    }

    @Override
    public List getEssayInDir(Directory directory) {
        List list = essayMapper.selectListByUserDirId(directory);
        return list;
    }

    @Override
    public boolean updateEssay(Essay essay) {
        return essayMapper.updateByEssayUserId(essay) > 0;
    }

    @Override
    public boolean deleteEssay(Essay essay) {
        return essayMapper.deleteByEssayUserId(essay) > 0;
    }
}
