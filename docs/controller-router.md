## Controller

Controller có trách nhiệm xử lý `request` và trả về `responses`
Thay vì tạo controller cơ bản, `nestjs` sử dụng `class` và `decorator`.

Để tạo một controller cơ bản sử dụng câu lệnh sau:

```
nest g controller [tên controller]
```

## Routing

Như đã nói ở trên, nestjs sử dụng `class` và `decorator`.

Ví dụ :

```
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

Ở ví dụ trên:

- Khai báo `CatsController` là một controller có đường dẫn là `\cats` thông qua decorator `@Controller('cats')
- Khai báo function `findAll()` có phương thức GET qua decorator `@Get()`

Nestjs cung cấp decorator cho tất cả HTTP methods: `@Get()`, `@Post()`, `@Put()`, `@Delete()`, `@Patch()`, `@Options()`, `@Head()`, `@All()`.

## Request Object

Thông thường để xử lý một tác vụ chúng ta cần truy cập vào `request` của client. Nest cung cấp `@Req`/`@Request` decorator để truy cập vào `client request`

Ví dụ:

```
@Post()
create(@Req() request: Request): string {
    ...
  }
```

Danh sách các decorator:
| Decorator | Represent |
| --------- | --------- |
| `@Request(), @Req` | `req` |
| `@Response(), @Res()` | `res` |
| `@Next()` | `next` |
| `@Session()` | `req.session` |
| `@Param(key?: string)` | `req.params` / `req.params[key]` |
| `@Body(key?: string)` | `req.body` / `req.body[key]` |
| `@Query(key?: string)` | `req.query` / `req.query[key]` |
| `@Headers(name?: string)` | `req.headers` / `req.headers[name]` |
| `@Ip()` | `req.ip` |
| `@HostParam()` | `req.hosts` |
