package com.like.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by Like on 2017/3/8.
 */
public class StringUtils {

    public static boolean isNull(String s) {
        if (s == null || "".equals(s) || s.isEmpty()) {
            return true;
        }
        return false;
    }

    public static boolean isInteger(String str){
        Pattern pattern = Pattern.compile("[0-9]*");
        Matcher isNum = pattern.matcher(str);
        if( !isNum.matches() ){
            return false;
        }
        return true;
    }

}
