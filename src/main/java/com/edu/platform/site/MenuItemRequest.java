package com.edu.platform.site;

import jakarta.validation.constraints.NotBlank;

public record MenuItemRequest(
        @NotBlank String name,
        String path,
        String icon,
        Integer order
) {
}
