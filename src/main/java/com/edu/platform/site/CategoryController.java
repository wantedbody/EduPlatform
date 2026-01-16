package com.edu.platform.site;

import com.edu.platform.common.ApiResponse;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/site/categories")
public class CategoryController {

    @GetMapping
    public ApiResponse<List<CategoryResponse>> listCategories() {
        List<CategoryResponse> categories = Arrays.asList(
                new CategoryResponse("c-1", "News", "news", "Latest announcements", 1),
                new CategoryResponse("c-2", "Courses", "courses", "Course catalog", 2)
        );
        return ApiResponse.success(categories);
    }

    @PostMapping
    public ApiResponse<CategoryResponse> createCategory(@Valid @RequestBody CategoryRequest request) {
        int order = request.getOrder() == null ? 0 : request.getOrder();
        CategoryResponse response = new CategoryResponse("c-new", request.getName(), request.getSlug(),
                request.getDescription(), order);
        return ApiResponse.success(response);
    }

    @PutMapping("/{categoryId}")
    public ApiResponse<CategoryResponse> updateCategory(
            @PathVariable String categoryId,
            @Valid @RequestBody CategoryRequest request
    ) {
        int order = request.getOrder() == null ? 0 : request.getOrder();
        CategoryResponse response = new CategoryResponse(categoryId, request.getName(), request.getSlug(),
                request.getDescription(), order);
        return ApiResponse.success(response);
    }

    @DeleteMapping("/{categoryId}")
    public ApiResponse<Void> deleteCategory(@PathVariable String categoryId) {
        return ApiResponse.success(null);
    }
}
