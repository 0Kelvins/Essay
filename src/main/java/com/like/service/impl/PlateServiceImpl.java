package com.like.service.impl;

import com.like.dao.PlateMapper;
import com.like.entity.Plate;
import com.like.service.PlateService;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Like on 2017/4/14.
 */
@Repository
public class PlateServiceImpl implements PlateService {

    @Resource
    private PlateMapper plateMapper;

    @Override
    public List getPlateListDesc() {
        List list = plateMapper.selectByEssayNum();
        return list;
    }

    @Override
    public boolean plateAddEssayNum(Integer plateId, Integer numToAdd) {
        return plateMapper.updateAddEssayNum(plateId, numToAdd) > 0;
    }

    @Override
    public List getAllPlate(Integer pageNum, Integer pageSize) {
        return plateMapper.selectPlateList(pageNum, pageSize);
    }

    @Override
    public boolean addPlate(Plate plate) {
        plate.setEssayNum(0);
        plate.setState(1100);   //待开启
        return plateMapper.insert(plate) > 0;
    }

    @Override
    public boolean deletePlateById(Integer plateId) {
        return plateMapper.deleteByPrimaryKey(plateId) > 0;
    }

    @Override
    public boolean openPlateById(Integer plateId) {
        return plateMapper.openById(plateId) > 0;
    }

    @Override
    public boolean closePlateById(Integer plateId) {
        return plateMapper.closeById(plateId) > 0;
    }
}
