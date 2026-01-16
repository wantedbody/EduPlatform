package com.edu.platform.site;

import jakarta.validation.constraints.NotBlank;

public record CategoryRequest(
        @NotBlank String name,
        String slug,
        String description,
        Integer order
) {
}
