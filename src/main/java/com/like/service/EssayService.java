package com.like.service;

import com.like.entity.Directory;
import com.like.entity.Essay;

import java.util.List;

/**
 * Created by Like on 2017/4/9.
 */
public interface EssayService {
    
    Essay getEssayById(Integer essayId);

    /*用户新建文章*/
    boolean newEssay(Essay essay);

    /*获取用户文章*/
    Essay getEssayByEssayUserId(Essay essay);

    /*获取用户文章列表*/
    List getEssayList(Integer userId);

    /*获取用户目录内文章*/
    List getEssayInDir(Directory directory);

    /*用户更新文章*/
    boolean updateEssay(Essay essay);

    /*用户删除文章*/
    boolean deleteEssay(Essay essay);
}
