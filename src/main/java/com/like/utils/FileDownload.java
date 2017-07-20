package com.like.utils;

import javax.servlet.http.HttpServletResponse;
import java.io.*;

/**
 * Created by Like on 2017/7/19.
 */
public class FileDownload {

    /**
     * 下载文件
     * @param name 需要下载的文件名
     * @param type 文件格式
     * @param path 路径
     * @param response response参数
     * @return 下载
     * @throws Exception
     */
    public static boolean downLoadFile(String name, String type, String path,
                                       HttpServletResponse response) throws Exception {
        String fileName = name;
        String fileType = type;
        String fileFullName = fileName + "." + fileType;
        File file = new File(path + fileFullName);  //根据文件路径获得File文件
        if (!file.exists()) {
            return false;
        }
        //设置文件类型(这样设置就不止是下Excel文件了，一举多得)
        if ("pdf".equals(fileType)) {
            response.setContentType("application/pdf;charset=GBK");
        } else if ("csv".equals(fileType)) {
            response.setContentType("application/msexcel;charset=GBK");
        } else if ("doc".equals(fileType)) {
            response.setContentType("application/msword;charset=GBK");
        } else if ("xls".equals(fileType)) {
            response.setContentType("application/msexcel;charset=GBK");
        }
        //文件名
        response.setHeader("Content-Disposition", "attachment;filename=\""
                + new String(fileFullName.getBytes(), "ISO8859-1") + "\"");
        response.setContentLength((int) file.length());
        byte[] buffer = new byte[4096];// 缓冲区
        BufferedOutputStream output = null;
        BufferedInputStream input = null;
        try {
            output = new BufferedOutputStream(response.getOutputStream());
            input = new BufferedInputStream(new FileInputStream(file));
            int n = -1;
            //遍历，开始下载
            while ((n = input.read(buffer, 0, 4096)) > -1) {
                output.write(buffer, 0, n);
            }
            output.flush();   //不可少
            response.flushBuffer();//不可少
        } catch (Exception e) {
            throw new IOException(e.getMessage());
        } finally {
            //关闭流，不可少
            if (input != null)
                input.close();
            if (output != null)
                output.close();
        }
        return true;
    }
}
