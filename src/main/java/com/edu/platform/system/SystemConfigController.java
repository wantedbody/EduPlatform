package com.edu.platform.system;

import com.edu.platform.common.ApiResponse;
import java.util.Arrays;
import java.util.List;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/system/configs")
public class SystemConfigController {

    @GetMapping
    public ApiResponse<List<SystemConfigResponse>> listConfigs() {
        List<SystemConfigResponse> configs = Arrays.asList(
                new SystemConfigResponse("site.title", "Edu Platform", "Homepage title"),
                new SystemConfigResponse("site.theme", "light", "Theme mode")
        );
        return ApiResponse.success(configs);
    }

    @GetMapping("/{configKey}")
    public ApiResponse<SystemConfigResponse> getConfig(@PathVariable String configKey) {
        SystemConfigResponse response = new SystemConfigResponse(configKey, "value", "Description");
        return ApiResponse.success(response);
    }

    @PostMapping
    public ApiResponse<SystemConfigResponse> createConfig(@Valid @RequestBody SystemConfigRequest request) {
        SystemConfigResponse response = new SystemConfigResponse(request.getKey(), request.getValue(),
                request.getDescription());
        return ApiResponse.success(response);
    }

    @PutMapping("/{configKey}")
    public ApiResponse<SystemConfigResponse> updateConfig(
            @PathVariable String configKey,
            @Valid @RequestBody SystemConfigRequest request
    ) {
        SystemConfigResponse response = new SystemConfigResponse(configKey, request.getValue(),
                request.getDescription());
        return ApiResponse.success(response);
    }
}
