package com.edu.platform.system;

import javax.validation.constraints.NotBlank;

public class SystemConfigRequest {
    @NotBlank
    private String key;
    @NotBlank
    private String value;
    private String description;

    public SystemConfigRequest() {
    }

    public SystemConfigRequest(String key, String value, String description) {
        this.key = key;
        this.value = value;
        this.description = description;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
