# VietRelic Landing Page

Landing page cho VietRelic - Di tích kể chuyện, được xây dựng với React + TypeScript + Vite.

## Tech Stack

- React 18.3.1
- TypeScript
- Vite
- React Router DOM 6.26.0
- CSS (không dùng Tailwind)

## 📋 Checklist - Các bước cần làm

### 1️⃣ Chạy Local

1. **Cài đặt dependencies:**
   ```bash
   cd vietrelic-landingPage
   npm install
   ```

   Nếu gặp lỗi cache:
   ```bash
   npm cache clean --force
   npm install
   ```

2. **Tạo file `.env`:**
   ```bash
   # Copy từ .env.example hoặc tạo mới
   # Thêm dòng sau:
   VITE_ORDER_ENDPOINT=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

3. **Chạy development server:**
   ```bash
   npm run dev
   ```

4. **Mở browser:**
   - Truy cập URL hiển thị (thường là `http://localhost:5173`)
   - Test các tính năng: thêm sản phẩm vào giỏ, checkout, đặt hàng

### 2️⃣ Set VITE_ORDER_ENDPOINT

#### Cách 1: Sử dụng Google Apps Script (KHUYẾN NGHỊ)

1. **Tạo Google Sheet:**
   - Mở [Google Sheets](https://sheets.google.com)
   - Tạo Sheet mới với các cột: Thời gian, Họ tên, Số điện thoại, Địa chỉ, Danh sách sản phẩm, Tổng tiền

2. **Tạo Google Apps Script:**
   - Trong Sheet, vào **Extensions** → **Apps Script**
   - Dán code từ file `GOOGLE_FORM_SETUP.md` (phần Cách 1)

3. **Deploy:**
   - Click **Deploy** → **New deployment**
   - Chọn **Web app**
   - **Execute as**: Me
   - **Who has access**: Anyone
   - Click **Deploy**
   - **Copy Web App URL**

4. **Cấu hình:**
   - Mở file `.env` trong `vietrelic-landingPage`
   - Thêm dòng:
     ```env
     VITE_ORDER_ENDPOINT=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
     ```
   - Thay `YOUR_SCRIPT_ID` bằng ID từ URL vừa copy

5. **Restart dev server:**
   ```bash
   # Dừng server (Ctrl+C)
   npm run dev
   ```

#### Cách 2: Sử dụng API endpoint khác

1. Tạo file `.env`:
   ```env
   VITE_ORDER_ENDPOINT=https://your-api-endpoint.com/orders
   ```

2. Đảm bảo API endpoint nhận POST request với JSON body:
   ```json
   {
     "customer": {
       "fullName": "string",
       "phone": "string",
       "address": "string"
     },
     "items": [...],
     "total": number,
     "itemsText": "string",
     "createdAt": "ISO string"
   }
   ```

### 3️⃣ Deploy lên Vercel

#### Bước 1: Chuẩn bị

1. **Build project:**
   ```bash
   npm run build
   ```

2. **Kiểm tra thư mục `dist/` đã được tạo**

#### Bước 2: Deploy qua Vercel CLI

1. **Cài đặt Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   cd vietrelic-landingPage
   vercel
   ```

4. **Thêm Environment Variable:**
   - Vào [Vercel Dashboard](https://vercel.com/dashboard)
   - Chọn project
   - **Settings** → **Environment Variables**
   - Thêm:
     - **Name**: `VITE_ORDER_ENDPOINT`
     - **Value**: URL Google Apps Script của bạn
     - **Environment**: Production, Preview, Development (chọn tất cả)
   - Click **Save**

5. **Redeploy:**
   - Vào **Deployments**
   - Click **...** → **Redeploy**

#### Bước 3: Deploy qua GitHub (Khuyến nghị)

1. **Push code lên GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/vietrelic-landing.git
   git push -u origin main
   ```

2. **Import vào Vercel:**
   - Vào [vercel.com](https://vercel.com)
   - Click **Add New...** → **Project**
   - Import repository từ GitHub
   - Vercel tự detect Vite project

3. **Cấu hình:**
   - **Framework Preset**: Vite
   - **Root Directory**: `vietrelic-landingPage` (nếu project nằm trong subfolder)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Thêm Environment Variable:**
   - Trong **Settings** → **Environment Variables**
   - Thêm `VITE_ORDER_ENDPOINT` với giá trị URL Google Apps Script

5. **Deploy:**
   - Click **Deploy**
   - Chờ build xong
   - Vercel sẽ cung cấp URL (ví dụ: `https://vietrelic-landing.vercel.app`)

## 📁 Cấu trúc Project

```
vietrelic-landingPage/
├── src/
│   ├── components/        # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── ProductList.tsx
│   │   ├── ComboGrid.tsx
│   │   └── Footer.tsx
│   ├── pages/            # Pages
│   │   ├── Home.tsx
│   │   └── Checkout.tsx
│   ├── context/          # React Context
│   │   └── CartContext.tsx
│   ├── data/             # Dữ liệu fix cứng
│   │   ├── products.ts
│   │   └── combos.ts
│   ├── lib/              # Utilities
│   │   └── format.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env                  # Environment variables (KHÔNG commit)
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## ✨ Features

- ✅ Header với logo, menu (Sản phẩm, Combo), giỏ hàng có badge
- ✅ Hero section với banner và hình phụ
- ✅ Section SẢN PHẨM: carousel ngang với ảnh, tên, giá, nút "Đặt ngay"
- ✅ Section COMBO: grid 8 cards với ảnh, tên, mô tả, giá, nút "Đặt ngay"
- ✅ Footer: 3 cột thông tin
- ✅ Giỏ hàng: Context + localStorage, badge realtime
- ✅ Checkout page: form thông tin, quản lý giỏ hàng (tăng/giảm/xóa), tổng tiền
- ✅ Đặt hàng: gửi POST đến Google Apps Script, hiển thị thông báo

## 🐛 Troubleshooting

### Lỗi "Cannot find module 'react-router-dom'"
```bash
npm install react-router-dom
```

### Lỗi "Invalid hook call"
- Đảm bảo React version 18.3.1 (không phải 19)
- Xóa `node_modules` và `package-lock.json`, chạy lại `npm install`

### Lỗi "Vui lòng cấu hình VITE_ORDER_ENDPOINT"
- Kiểm tra file `.env` có tồn tại không
- Kiểm tra URL có đúng format không
- **Restart dev server** sau khi tạo/sửa `.env`

### Lỗi CORS khi deploy
- Đảm bảo Google Apps Script được deploy với:
  - **Execute as**: Me
  - **Who has access**: Anyone

## 📚 Tài liệu tham khảo

- [Vite Documentation](https://vite.dev)
- [React Router](https://reactrouter.com)
- [Vercel Deployment](https://vercel.com/docs)
- Xem `GOOGLE_FORM_SETUP.md` để setup Google Apps Script chi tiết

## 📝 Lưu ý

- File `.env` đã được thêm vào `.gitignore`, không commit lên Git
- Mỗi lần sửa `.env`, phải restart dev server
- Khi deploy lên Vercel, nhớ thêm Environment Variable trong Dashboard
