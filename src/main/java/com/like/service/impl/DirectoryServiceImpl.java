package com.like.service.impl;

import com.like.dao.DirectoryMapper;
import com.like.entity.Directory;
import com.like.service.DirectoryService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Like on 2017/4/9.
 */
@Service("directoryService")
public class DirectoryServiceImpl implements DirectoryService{

    @Resource
    public DirectoryMapper directoryMapper;

    @Override
    public List getDirectory(int userId) {
        return directoryMapper.selectByUserId(userId);
    }

    @Override
    public boolean newDirectory(Directory directory) {
        return directoryMapper.insert(directory) > 0;
    }

    @Override
    public boolean deleteDirectory(Directory directory) {
        return directoryMapper.deleteByDirUserId(directory) > 0;
    }

    @Override
    public boolean updateDirectoryByDirUserId(Directory directory) {
        return directoryMapper.updateByDirUserId(directory) > 0;
    }
}
