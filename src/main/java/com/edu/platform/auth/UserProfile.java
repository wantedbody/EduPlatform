package com.edu.platform.auth;

import java.util.List;

public class UserProfile {
    private String id;
    private String name;
    private String role;
    private List<String> permissions;

    public UserProfile() {
    }

    public UserProfile(String id, String name, String role, List<String> permissions) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.permissions = permissions;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<String> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<String> permissions) {
        this.permissions = permissions;
    }
}
