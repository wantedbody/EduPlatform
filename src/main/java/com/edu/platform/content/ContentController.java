package com.edu.platform.content;

import com.edu.platform.common.ApiResponse;
import com.edu.platform.common.PageResponse;
import java.time.OffsetDateTime;
import java.util.Arrays;
import java.util.List;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/content/items")
public class ContentController {

    @GetMapping
    public ApiResponse<PageResponse<ContentResponse>> listContent(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) ContentStatus status,
            @RequestParam(required = false) String keyword
    ) {
        List<ContentResponse> items = Arrays.asList(
                new ContentResponse("cnt-1", "Welcome", "Intro", "c-1", ContentStatus.APPROVED, OffsetDateTime.now()),
                new ContentResponse("cnt-2", "Course Plan", "Outline", "c-2", ContentStatus.PENDING_REVIEW,
                        OffsetDateTime.now())
        );
        PageResponse<ContentResponse> pageResponse = new PageResponse<>(items, page, size, items.size());
        return ApiResponse.success(pageResponse);
    }

    @PostMapping
    public ApiResponse<ContentResponse> createContent(@Valid @RequestBody ContentRequest request) {
        ContentResponse response = new ContentResponse("cnt-new", request.getTitle(), request.getSummary(),
                request.getCategoryId(), ContentStatus.DRAFT, OffsetDateTime.now());
        return ApiResponse.success(response);
    }

    @GetMapping("/{contentId}")
    public ApiResponse<ContentResponse> getContent(@PathVariable String contentId) {
        ContentResponse response = new ContentResponse(contentId, "Sample", "Summary", "c-1",
                ContentStatus.APPROVED, OffsetDateTime.now());
        return ApiResponse.success(response);
    }

    @PutMapping("/{contentId}")
    public ApiResponse<ContentResponse> updateContent(
            @PathVariable String contentId,
            @Valid @RequestBody ContentRequest request
    ) {
        ContentResponse response = new ContentResponse(contentId, request.getTitle(), request.getSummary(),
                request.getCategoryId(), ContentStatus.DRAFT, OffsetDateTime.now());
        return ApiResponse.success(response);
    }

    @DeleteMapping("/{contentId}")
    public ApiResponse<Void> deleteContent(@PathVariable String contentId) {
        return ApiResponse.success(null);
    }

    @PostMapping("/{contentId}/review")
    public ApiResponse<ContentResponse> reviewContent(
            @PathVariable String contentId,
            @Valid @RequestBody ReviewRequest request
    ) {
        ContentResponse response = new ContentResponse(contentId, "Sample", "Summary", "c-1",
                request.getStatus(), OffsetDateTime.now());
        return ApiResponse.success(response);
    }
}
