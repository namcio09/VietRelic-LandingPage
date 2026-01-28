# Hướng dẫn sửa lỗi "Invalid hook call" và màn hình trắng

## Vấn đề
- Lỗi: "Invalid hook call. Hooks can only be called inside of the body of a function component"
- Lỗi: "Cannot read properties of null (reading 'useRef')"
- Màn hình trắng, không hiển thị giao diện

## Nguyên nhân
1. `react-router-dom` chưa được cài đặt vào `node_modules`
2. React 19 có thể không tương thích hoàn toàn với react-router-dom 6.x
3. Có thể có duplicate React instances

## Giải pháp

### Bước 1: Xóa node_modules và package-lock.json
```bash
cd vietrelic-landingPage
rm -rf node_modules package-lock.json
```

Hoặc trên Windows PowerShell:
```powershell
cd vietrelic-landingPage
Remove-Item -Recurse -Force node_modules, package-lock.json
```

### Bước 2: Cấu hình npm (nếu gặp lỗi cache)
```bash
npm config set offline false
npm config set prefer-offline false
```

### Bước 3: Cài đặt lại dependencies
```bash
npm install
```

### Bước 4: Kiểm tra cài đặt
Đảm bảo các package sau được cài đặt:
- `node_modules/react` (version 18.3.1)
- `node_modules/react-dom` (version 18.3.1)
- `node_modules/react-router-dom` (version 6.26.0)

### Bước 5: Chạy lại dev server
```bash
npm run dev
```

## Lưu ý
- Đã downgrade React từ 19.2.0 xuống 18.3.1 để tương thích tốt hơn với react-router-dom
- Đã thêm `resolve.dedupe` trong vite.config.ts để tránh duplicate React
- Nếu vẫn gặp lỗi, thử xóa cache browser và hard refresh (Ctrl+Shift+R)
