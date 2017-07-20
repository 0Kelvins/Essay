package com.like.api.VO;

import com.like.entity.User;

/**
 * Created by Like on 2017/4/6.
 */
public class RegisterVO extends User{
    private String passwords;

    public String getPasswords() {
        return passwords;
    }

    public void setPasswords(String passwords) {
        this.passwords = passwords;
    }
}
