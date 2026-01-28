# Hướng dẫn tích hợp Google Form

Có 2 cách để lưu đơn hàng vào Google Form/Sheet:

## Cách 1: Sử dụng Google Apps Script (KHUYẾN NGHỊ)

### Bước 1: Tạo Google Sheet
1. Mở [Google Sheets](https://sheets.google.com)
2. Tạo một Sheet mới
3. Đặt tên Sheet (ví dụ: "Đơn hàng VietRelic")
4. Tạo các cột header ở dòng 1:
   - A1: `Thời gian`
   - B1: `Họ tên`
   - C1: `Số điện thoại`
   - D1: `Địa chỉ`
   - E1: `Danh sách sản phẩm`
   - F1: `Tổng tiền`

### Bước 2: Tạo Google Apps Script
1. Trong Google Sheet, vào menu **Extensions** → **Apps Script**
2. Xóa code mặc định và dán code sau:

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
    
    // Trả về response với CORS headers để tránh lỗi CORS
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

### Bước 3: Deploy Apps Script
1. Click **Deploy** → **New deployment**
2. Chọn type: **Web app**
3. Settings:
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. **Copy Web App URL** (sẽ có dạng: `https://script.google.com/macros/s/.../exec`)

### Bước 4: Cấu hình trong project
1. Tạo file `.env` trong thư mục `vietrelic-landingPage`:
```env
VITE_ORDER_ENDPOINT=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

2. Thay `YOUR_SCRIPT_ID` bằng ID từ URL bạn vừa copy

3. Restart dev server:
```bash
npm run dev
```

---

## Cách 2: Sử dụng Google Form (Đơn giản hơn nhưng ít linh hoạt)

### Bước 1: Tạo Google Form
1. Mở [Google Forms](https://forms.google.com)
2. Tạo form mới
3. Thêm các câu hỏi:
   - **Câu hỏi ngắn**: "Họ tên"
   - **Câu hỏi ngắn**: "Số điện thoại"
   - **Đoạn văn**: "Địa chỉ"
   - **Đoạn văn**: "Danh sách sản phẩm"
   - **Câu hỏi ngắn**: "Tổng tiền"

### Bước 2: Lấy Form URL và Field IDs
1. Click **Send** (Gửi) ở góc trên bên phải
2. Click icon **</>** (Embed HTML)
3. Copy URL có dạng: `https://docs.google.com/forms/d/e/FORM_ID/viewform`
4. Lấy **Form ID** từ URL (phần giữa `/d/e/` và `/viewform`)
5. Submission URL sẽ là: `https://docs.google.com/forms/d/e/FORM_ID/formResponse`

### Bước 3: Lấy Field IDs
1. Mở form ở chế độ chỉnh sửa
2. Click chuột phải vào từng câu hỏi → **Inspect** (hoặc F12)
3. Tìm `name` attribute trong input/textarea, sẽ có dạng `entry.123456789`
4. Ghi lại các entry IDs:
   - entry.XXXXX → Họ tên
   - entry.YYYYY → Số điện thoại
   - entry.ZZZZZ → Địa chỉ
   - entry.AAAAA → Danh sách sản phẩm
   - entry.BBBBB → Tổng tiền

### Bước 4: Cấu hình trong project
1. Tạo file `.env`:
```env
VITE_ORDER_ENDPOINT=https://docs.google.com/forms/d/e/FORM_ID/formResponse
```

2. Cập nhật code trong `Checkout.tsx` để map dữ liệu với field IDs (cần chỉnh sửa thêm)

**Lưu ý:** Cách 1 (Google Apps Script) được khuyến nghị vì:
- Dễ cấu hình hơn
- Linh hoạt hơn trong việc format dữ liệu
- Không cần field IDs
- Có thể xử lý lỗi tốt hơn

---

## Kiểm tra

Sau khi cấu hình xong:
1. Chạy `npm run dev`
2. Thêm sản phẩm vào giỏ hàng
3. Điền form và click "Đặt hàng"
4. Kiểm tra Google Sheet/Form xem có dữ liệu mới không
