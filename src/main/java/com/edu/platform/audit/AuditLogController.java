package com.edu.platform.audit;

import com.edu.platform.common.ApiResponse;
import com.edu.platform.common.PageResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/audit/logs")
public class AuditLogController {

    @GetMapping
    public ApiResponse<PageResponse<AuditLogResponse>> listLogs(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String actor,
            @RequestParam(required = false) String action
    ) {
        List<AuditLogResponse> logs = List.of(
                new AuditLogResponse("log-1", "admin", "CREATE", "content:cnt-1", OffsetDateTime.now()),
                new AuditLogResponse("log-2", "editor", "UPDATE", "menu:m-2", OffsetDateTime.now())
        );
        PageResponse<AuditLogResponse> pageResponse = new PageResponse<>(logs, page, size, logs.size());
        return ApiResponse.success(pageResponse);
    }
}
