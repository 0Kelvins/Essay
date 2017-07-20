package com.like.service.impl;

import com.like.api.DTO.PublishPageDTO;
import com.like.dao.PublishMapper;
import com.like.entity.Publish;
import com.like.service.PublishService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Like on 2017/4/13.
 */
@Service("publishService")
public class PublishServiceImpl implements PublishService {

    @Resource
    private PublishMapper publishMapper;

    @Override
    public boolean publishEssay(Publish publish) {
        return publishMapper.insertSelective(publish) > 0;
    }

    @Override
    public Publish getPublishByEssayId(Integer essayId) {
        return publishMapper.selectByEssayId(essayId);
    }

    @Override
    public List getPublishEssayList(PublishPageDTO publishPage
            , Integer pageNum, Integer pageSize) {
        return publishMapper.selectPublishEssayList(publishPage, pageNum, pageSize);
    }

    @Override
    public Publish getPublishById(Integer publishId) {
        return publishMapper.selectByPrimaryKey(publishId);
    }

    @Override
    public List getPersonPublishList(Integer userId, Integer pageNum, Integer pageSize) {
        return publishMapper.selectPersonPublishList(userId, pageNum, pageSize);
    }

    @Override
    public boolean deletePublishEssayById(Integer publishId) {
        return publishMapper.deleteByPrimaryKey(publishId) > 0;
    }

    @Override
    public void addView(Integer essayId) {
        publishMapper.updateForAddPageViews(essayId);
    }
}
