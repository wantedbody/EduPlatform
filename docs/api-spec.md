# EduPlatform REST API 规范

基础路径：`/api`

> 说明：当前示例为接口骨架，鉴权暂未实现。后续可接入 JWT/Session。

## 通用响应

```json
{
  "code": 0,
  "message": "OK",
  "data": {}
}
```

## 认证/用户

### 登录
`POST /api/auth/login`

**Request**

```json
{
  "username": "admin",
  "password": "******"
}
```

**Response**

```json
{
  "code": 0,
  "message": "OK",
  "data": {
    "userId": "u-1000",
    "displayName": "admin",
    "token": "demo-token"
  }
}
```

### 登出
`POST /api/auth/logout`

### 用户信息
`GET /api/auth/profile`

## 站点管理

### 菜单管理
- `GET /api/site/menus`
- `POST /api/site/menus`
- `PUT /api/site/menus/{menuId}`
- `DELETE /api/site/menus/{menuId}`

**Request**

```json
{
  "name": "Content",
  "path": "/content",
  "icon": "file",
  "order": 2
}
```

### 栏目管理
- `GET /api/site/categories`
- `POST /api/site/categories`
- `PUT /api/site/categories/{categoryId}`
- `DELETE /api/site/categories/{categoryId}`

## 内容管理

### 内容列表（分页筛选）
`GET /api/content/items?page=1&size=10&status=APPROVED&keyword=course`

**Response**

```json
{
  "code": 0,
  "message": "OK",
  "data": {
    "items": [],
    "page": 1,
    "size": 10,
    "total": 0
  }
}
```

### 内容 CRUD
- `POST /api/content/items`
- `GET /api/content/items/{contentId}`
- `PUT /api/content/items/{contentId}`
- `DELETE /api/content/items/{contentId}`

### 审核状态流转
`POST /api/content/items/{contentId}/review`

**Request**

```json
{
  "status": "APPROVED",
  "remark": "Looks good"
}
```

## 系统配置
- `GET /api/system/configs`
- `GET /api/system/configs/{configKey}`
- `POST /api/system/configs`
- `PUT /api/system/configs/{configKey}`

## 日志审计
`GET /api/audit/logs?page=1&size=10&actor=admin&action=CREATE`
