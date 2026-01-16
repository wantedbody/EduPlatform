package com.edu.platform.auth;

public record LoginResponse(String userId, String displayName, String token) {
}
