package com.edu.platform.site;

import javax.validation.constraints.NotBlank;

public class MenuItemRequest {
    @NotBlank
    private String name;
    private String path;
    private String icon;
    private Integer order;

    public MenuItemRequest() {
    }

    public MenuItemRequest(String name, String path, String icon, Integer order) {
        this.name = name;
        this.path = path;
        this.icon = icon;
        this.order = order;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }
}
