# Hướng dẫn sửa lỗi CORS với Google Apps Script

## Vấn đề

Khi gửi request từ `localhost:5173` đến Google Apps Script, browser chặn request do CORS policy:
```
Access to fetch at 'https://script.google.com/...' from origin 'http://localhost:5173' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present
```

## Giải pháp: Cập nhật Google Apps Script với CORS Headers

### Bước 1: Cập nhật Google Apps Script Code

Mở Google Apps Script project của bạn và thay thế code bằng version có CORS headers:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    const row = [
      new Date().toLocaleString('vi-VN'),
      data.customer.fullName,
      data.customer.phone,
      data.customer.address,
      data.itemsText || data.items.map(item => `${item.name} (x${item.quantity}) - ${item.price * item.quantity}đ`).join('\n'),
      data.total + 'đ'
    ];
    
    sheet.appendRow(row);
    
    // Trả về response với CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
  }
}

// Xử lý OPTIONS request (preflight) cho CORS
function doOptions() {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}
```

### Bước 2: Redeploy Google Apps Script

1. **Lưu code** (Ctrl+S hoặc Cmd+S)

2. **Redeploy:**
   - Click **Deploy** → **Manage deployments**
   - Click icon **Edit** (✏️) bên cạnh deployment hiện tại
   - Click **Deploy** (không cần thay đổi gì)
   - Chọn **New version** hoặc **Update**

3. **Copy URL mới** (nếu có) hoặc dùng URL cũ

### Bước 3: Cập nhật Checkout.tsx

Code trong `Checkout.tsx` đã được cập nhật để:
- Gửi headers `Content-Type: application/json`
- Xử lý cả 2 trường hợp: có CORS và không có CORS
- Đọc response nếu có thể

### Bước 4: Test

1. **Restart dev server:**
   ```bash
   # Dừng server (Ctrl+C)
   npm run dev
   ```

2. **Test đặt hàng:**
   - Mở browser console (F12)
   - Thêm sản phẩm vào giỏ
   - Điền form và click "Đặt hàng"
   - Kiểm tra:
     - ✅ Không còn lỗi CORS trong console
     - ✅ Hiển thị thông báo thành công
     - ✅ Dữ liệu được ghi vào Google Sheet

## So sánh 2 cách

### Cách 1: Dùng `no-cors` (Hiện tại)
```javascript
await fetch(endpoint, {
  method: 'POST',
  mode: 'no-cors',  // Không đọc được response
  body: JSON.stringify(orderData),
});
```

**Ưu điểm:**
- Đơn giản, không cần cấu hình server
- Request vẫn được gửi thành công

**Nhược điểm:**
- Không đọc được response
- Không biết request có thành công hay không
- Không thể xử lý lỗi từ server

### Cách 2: Cấu hình CORS headers (Khuyến nghị)
```javascript
await fetch(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(orderData),
});
```

**Ưu điểm:**
- Đọc được response từ server
- Biết chính xác request có thành công
- Có thể xử lý lỗi chi tiết
- Trải nghiệm tốt hơn cho người dùng

**Nhược điểm:**
- Cần cấu hình Google Apps Script

## Lưu ý

1. **`Access-Control-Allow-Origin: '*'`** cho phép tất cả origins
   - An toàn cho development
   - Nếu cần bảo mật hơn, thay `'*'` bằng domain cụ thể: `'https://yourdomain.com'`

2. **Sau khi cập nhật Google Apps Script**, có thể mất vài phút để thay đổi có hiệu lực

3. **Nếu vẫn gặp lỗi CORS:**
   - Kiểm tra lại code Google Apps Script
   - Đảm bảo đã redeploy
   - Clear browser cache và thử lại
   - Kiểm tra browser console để xem lỗi chi tiết

## Troubleshooting

### Vẫn báo lỗi CORS sau khi cập nhật?
1. Đảm bảo đã thêm function `doOptions()` để xử lý preflight request
2. Kiểm tra deployment version mới nhất
3. Thử hard refresh browser (Ctrl+Shift+R)

### Response vẫn là opaque?
- Có thể Google Apps Script chưa cập nhật
- Đợi 1-2 phút và thử lại
- Kiểm tra code có đúng không
