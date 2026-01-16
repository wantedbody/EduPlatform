package com.edu.platform.audit;

import java.time.OffsetDateTime;

public class AuditLogResponse {
    private String id;
    private String actor;
    private String action;
    private String resource;
    private OffsetDateTime createdAt;

    public AuditLogResponse() {
    }

    public AuditLogResponse(String id, String actor, String action, String resource, OffsetDateTime createdAt) {
        this.id = id;
        this.actor = actor;
        this.action = action;
        this.resource = resource;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getActor() {
        return actor;
    }

    public void setActor(String actor) {
        this.actor = actor;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getResource() {
        return resource;
    }

    public void setResource(String resource) {
        this.resource = resource;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
