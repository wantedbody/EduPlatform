package com.edu.platform.content;

import jakarta.validation.constraints.NotBlank;

public record ContentRequest(
        @NotBlank String title,
        String summary,
        String body,
        String categoryId
) {
}
