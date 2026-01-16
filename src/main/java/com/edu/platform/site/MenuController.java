package com.edu.platform.site;

import com.edu.platform.common.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/site/menus")
public class MenuController {

    @GetMapping
    public ApiResponse<List<MenuItemResponse>> listMenus() {
        List<MenuItemResponse> items = List.of(
                new MenuItemResponse("m-1", "Dashboard", "/dashboard", "home", 1),
                new MenuItemResponse("m-2", "Content", "/content", "file", 2)
        );
        return ApiResponse.success(items);
    }

    @PostMapping
    public ApiResponse<MenuItemResponse> createMenu(@Valid @RequestBody MenuItemRequest request) {
        MenuItemResponse response = new MenuItemResponse("m-new", request.name(), request.path(), request.icon(),
                request.order() == null ? 0 : request.order());
        return ApiResponse.success(response);
    }

    @PutMapping("/{menuId}")
    public ApiResponse<MenuItemResponse> updateMenu(
            @PathVariable String menuId,
            @Valid @RequestBody MenuItemRequest request
    ) {
        MenuItemResponse response = new MenuItemResponse(menuId, request.name(), request.path(), request.icon(),
                request.order() == null ? 0 : request.order());
        return ApiResponse.success(response);
    }

    @DeleteMapping("/{menuId}")
    public ApiResponse<Void> deleteMenu(@PathVariable String menuId) {
        return ApiResponse.success(null);
    }
}
