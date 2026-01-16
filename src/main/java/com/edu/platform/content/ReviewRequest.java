package com.edu.platform.content;

import jakarta.validation.constraints.NotNull;

public record ReviewRequest(
        @NotNull ContentStatus status,
        String remark
) {
}
