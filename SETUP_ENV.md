# Hướng dẫn cấu hình VITE_ORDER_ENDPOINT

## Vấn đề
Khi nhấn "Đặt hàng", hiển thị lỗi: "Vui lòng cấu hình VITE_ORDER_ENDPOINT trong file .env"

## Giải pháp

### Bước 1: Tạo file .env
Trong thư mục `vietrelic-landingPage`, tạo file `.env` (nếu chưa có)

### Bước 2: Thêm URL Google Apps Script
Mở file `.env` và thêm dòng sau:

```env
VITE_ORDER_ENDPOINT=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

**Lưu ý:** Thay `YOUR_SCRIPT_ID` bằng ID từ Google Apps Script của bạn.

### Bước 3: Lấy URL từ Google Apps Script
1. Mở Google Apps Script project của bạn
2. Click **Deploy** → **Manage deployments**
3. Click icon **Copy** (📋) bên cạnh **Web App URL**
4. Copy toàn bộ URL (có dạng: `https://script.google.com/macros/s/.../exec`)
5. Dán vào file `.env`

### Bước 4: Restart Dev Server
**QUAN TRỌNG:** Sau khi tạo/sửa file `.env`, bạn PHẢI restart dev server:

1. Dừng dev server hiện tại (Ctrl+C trong terminal)
2. Chạy lại:
```bash
npm run dev
```

### Bước 5: Kiểm tra
1. Mở trang Checkout
2. Điền thông tin và nhấn "Đặt hàng"
3. Nếu thành công, sẽ hiển thị: "Đặt hàng thành công! Cảm ơn bạn đã mua hàng."

## Lưu ý
- File `.env` đã được thêm vào `.gitignore` để không commit lên Git
- Không chia sẻ file `.env` công khai vì chứa URL endpoint của bạn
- Mỗi lần sửa `.env`, phải restart dev server để Vite load lại biến môi trường

## Troubleshooting

### Vẫn báo lỗi sau khi tạo .env?
1. Kiểm tra file `.env` có đúng tên không (phải là `.env`, không phải `.env.txt`)
2. Kiểm tra URL có đúng format không (phải có `/exec` ở cuối)
3. Đảm bảo đã restart dev server
4. Kiểm tra console browser có lỗi CORS không (nếu có, cần cấu hình Google Apps Script)

### Lỗi CORS?
Nếu gặp lỗi CORS khi gửi request:
1. Vào Google Apps Script
2. Click **Deploy** → **Manage deployments**
3. Click **Edit** (biểu tượng bút chì)
4. Đảm bảo **Execute as**: Me
5. Đảm bảo **Who has access**: Anyone
6. Click **Deploy** và thử lại
