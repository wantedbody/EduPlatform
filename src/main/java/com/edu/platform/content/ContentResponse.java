package com.edu.platform.content;

import java.time.OffsetDateTime;

public record ContentResponse(
        String id,
        String title,
        String summary,
        String categoryId,
        ContentStatus status,
        OffsetDateTime updatedAt
) {
}
