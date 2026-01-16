package com.edu.platform.content;

import javax.validation.constraints.NotBlank;

public class ContentRequest {
    @NotBlank
    private String title;
    private String summary;
    private String body;
    private String categoryId;

    public ContentRequest() {
    }

    public ContentRequest(String title, String summary, String body, String categoryId) {
        this.title = title;
        this.summary = summary;
        this.body = body;
        this.categoryId = categoryId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }
}
