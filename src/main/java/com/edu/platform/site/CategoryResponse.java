package com.edu.platform.site;

public class CategoryResponse {
    private String id;
    private String name;
    private String slug;
    private String description;
    private int order;

    public CategoryResponse() {
    }

    public CategoryResponse(String id, String name, String slug, String description, int order) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.order = order;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }
}
