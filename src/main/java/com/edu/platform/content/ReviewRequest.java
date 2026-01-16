package com.edu.platform.content;

import javax.validation.constraints.NotNull;

public class ReviewRequest {
    @NotNull
    private ContentStatus status;
    private String remark;

    public ReviewRequest() {
    }

    public ReviewRequest(ContentStatus status, String remark) {
        this.status = status;
        this.remark = remark;
    }

    public ContentStatus getStatus() {
        return status;
    }

    public void setStatus(ContentStatus status) {
        this.status = status;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
