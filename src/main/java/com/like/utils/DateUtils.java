package com.like.utils;

import java.util.Calendar;
import java.util.Date;

/**
 * Created by Like on 2017/5/6.
 */
public class DateUtils {

    /**
     * 获取 当前时间 + day 天的日期
     * @param day
     * @return
     */
    public static Date getRelateDateFromNow(int day) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.DAY_OF_YEAR, calendar.get(Calendar.DAY_OF_YEAR) + day);
        //设置秒变化间隔10秒，使查询参数变化减少变化，缓存得以有效
        calendar.set(Calendar.MILLISECOND, calendar.get(Calendar.MILLISECOND) / 10);
        Date date = calendar.getTime();
        return date;
    }
}
