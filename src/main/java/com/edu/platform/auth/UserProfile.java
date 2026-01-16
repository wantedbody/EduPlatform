package com.edu.platform.auth;

import java.util.List;

public record UserProfile(String id, String name, String role, List<String> permissions) {
}
