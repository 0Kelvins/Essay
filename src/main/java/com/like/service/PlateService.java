package com.like.service;

import com.like.entity.Plate;

import java.util.List;

/**
 * Created by Like on 2017/4/14.
 */
public interface PlateService {

    /*获取板块列表*/
    List getPlateListDesc();

    /*板块添加文章*/
    boolean plateAddEssayNum(Integer plateId, Integer numToAdd);

    /*获取所有版块*/
    List getAllPlate(Integer pageNum, Integer pageSize);

    /*添加版块*/
    boolean addPlate(Plate plate);

    /*删除版块*/
    boolean deletePlateById(Integer plateId);

    /*开启版块*/
    boolean openPlateById(Integer plateId);

    /*关闭版块*/
    boolean closePlateById(Integer plateId);

}
