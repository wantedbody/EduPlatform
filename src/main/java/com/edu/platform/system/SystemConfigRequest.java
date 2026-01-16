package com.edu.platform.system;

import jakarta.validation.constraints.NotBlank;

public record SystemConfigRequest(
        @NotBlank String key,
        @NotBlank String value,
        String description
) {
}
