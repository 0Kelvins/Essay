package com.like.service;

import com.like.api.DTO.PublishPageDTO;
import com.like.entity.Publish;

import java.util.List;

/**
 * Created by Like on 2017/4/13.
 */
public interface PublishService {

    /*发布文章*/
    boolean publishEssay(Publish publish);

    /*检查是否以及发布*/
    Publish getPublishByEssayId(Integer essayId);

    /*获取首页发布文章列表*/
    public List getPublishEssayList(PublishPageDTO publishPage, Integer pageNum, Integer pageSize);

    /*根据标识获取发布信息*/
    Publish getPublishById(Integer publishId);

    /*获取个人发布文章列表*/
    public List getPersonPublishList(Integer userId, Integer pageNum, Integer pageSize);

    /*删除发布文章*/
    boolean deletePublishEssayById(Integer publishId);

    /*访问热度*/
    void addView(Integer essayId);
}
