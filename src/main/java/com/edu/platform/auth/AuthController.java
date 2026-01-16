package com.edu.platform.auth;

import com.edu.platform.common.ApiResponse;
import java.util.Arrays;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = new LoginResponse("u-1000", request.getUsername(), "demo-token");
        return ApiResponse.success(response);
    }

    @PostMapping("/logout")
    public ApiResponse<Void> logout() {
        return ApiResponse.success(null);
    }

    @GetMapping("/profile")
    public ApiResponse<UserProfile> profile() {
        UserProfile profile = new UserProfile("u-1000", "Demo Admin", "ADMIN",
                Arrays.asList("site:read", "content:write"));
        return ApiResponse.success(profile);
    }
}
