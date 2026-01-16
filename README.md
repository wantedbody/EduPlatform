# EduPlatform Backend

Spring Boot 2.7.x backend skeleton for education platform services (Java 8 compatible).

## 模块包结构

- `com.edu.platform.auth`：认证/用户
- `com.edu.platform.site`：站点管理
- `com.edu.platform.content`：内容管理
- `com.edu.platform.system`：系统配置
- `com.edu.platform.audit`：日志审计
- `com.edu.platform.common`：通用响应与错误码
- `com.edu.platform.config`：CORS 与拦截器配置

## 启动

```bash
mvn spring-boot:run
```

## API 规范

详见 `docs/api-spec.md`。
