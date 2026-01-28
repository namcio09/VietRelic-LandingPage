 cd vi# Hướng dẫn cài đặt react-router-dom

## Vấn đề
Package `react-router-dom` chưa được cài đặt vào `node_modules`, gây ra lỗi TypeScript:
```
Cannot find module 'react-router-dom' or its corresponding type declarations.
```

## Giải pháp

### Cách 1: Cài đặt bình thường (khuyến nghị)
Mở terminal trong thư mục `vietrelic-landingPage` và chạy:

```bash
npm install
```

Hoặc cài đặt riêng react-router-dom:
```bash
npm install react-router-dom
```

### Cách 2: Nếu gặp lỗi cache
Nếu npm báo lỗi về cache, thử các lệnh sau:

```bash
# Xóa cache
npm cache clean --force

# Cài đặt lại
npm install
```

### Cách 3: Nếu npm ở chế độ offline
Nếu npm đang ở chế độ `only-if-cached`, thử:

```bash
# Tắt chế độ offline
npm config set offline false
npm config set prefer-offline false

# Cài đặt lại
npm install react-router-dom
```

### Cách 4: Sử dụng yarn (nếu có)
Nếu bạn có yarn, có thể dùng:

```bash
yarn add react-router-dom
```

## Kiểm tra sau khi cài đặt

Sau khi cài đặt xong, kiểm tra:

1. File `node_modules/react-router-dom` phải tồn tại
2. TypeScript sẽ tự động nhận diện types từ package
3. Lỗi import sẽ biến mất

## Lưu ý
- Đảm bảo bạn có kết nối internet khi cài đặt
- Nếu vẫn gặp lỗi, thử restart TypeScript server trong IDE (VS Code: Ctrl+Shift+P > "TypeScript: Restart TS Server")
