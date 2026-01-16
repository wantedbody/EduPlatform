package com.edu.platform.site;

public class MenuItemResponse {
    private String id;
    private String name;
    private String path;
    private String icon;
    private int order;

    public MenuItemResponse() {
    }

    public MenuItemResponse(String id, String name, String path, String icon, int order) {
        this.id = id;
        this.name = name;
        this.path = path;
        this.icon = icon;
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

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }
}
