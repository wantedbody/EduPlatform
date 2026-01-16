package com.edu.platform.site;

import javax.validation.constraints.NotBlank;

public class CategoryRequest {
    @NotBlank
    private String name;
    private String slug;
    private String description;
    private Integer order;

    public CategoryRequest() {
    }

    public CategoryRequest(String name, String slug, String description, Integer order) {
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.order = order;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }
}
