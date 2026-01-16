package com.edu.platform.common;

public enum ErrorCode {
    SUCCESS(0, "OK"),
    INVALID_REQUEST(40000, "Invalid request"),
    UNAUTHORIZED(40100, "Unauthorized"),
    NOT_FOUND(40400, "Not found"),
    SERVER_ERROR(50000, "Server error");

    private final int code;
    private final String message;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int code() {
        return code;
    }

    public String message() {
        return message;
    }
}
