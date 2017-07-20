package com.like.api.DTO;

import com.like.entity.Publish;

/**
 * Created by Like on 2017/4/14.
 */
public class PublishEssayDTO {

    private Publish publish;

    private String title;

    private AuthorDTO author;

    public Publish getPublish() {
        return publish;
    }

    public void setPublish(Publish publish) {
        this.publish = publish;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public AuthorDTO getAuthor() {
        return author;
    }

    public void setAuthor(AuthorDTO author) {
        this.author = author;
    }
}
