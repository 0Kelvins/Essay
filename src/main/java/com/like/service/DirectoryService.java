package com.like.service;

import com.like.entity.Directory;

import java.util.List;

/**
 * Created by Like on 2017/4/9.
 */
public interface DirectoryService {

    /*获取目录*/
    List getDirectory(int userId);

    /*新建目录*/
    boolean newDirectory(Directory directory);

    /*删除目录*/
    boolean deleteDirectory(Directory directory);

    /*更新目录*/
    boolean updateDirectoryByDirUserId(Directory directory);
}
