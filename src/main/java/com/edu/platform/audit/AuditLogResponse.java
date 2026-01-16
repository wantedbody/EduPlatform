package com.edu.platform.audit;

import java.time.OffsetDateTime;

public record AuditLogResponse(
        String id,
        String actor,
        String action,
        String resource,
        OffsetDateTime createdAt
) {
}
