export interface District {
  name: string;
}

export interface Province {
  name: string;
  districts: District[];
}

export const provinces: Province[] = [
  {
    name: 'Hà Nội',
    districts: [
      { name: 'Ba Đình' },
      { name: 'Hoàn Kiếm' },
      { name: 'Tây Hồ' },
      { name: 'Long Biên' },
      { name: 'Cầu Giấy' },
      { name: 'Đống Đa' },
      { name: 'Hai Bà Trưng' },
      { name: 'Hoàng Mai' },
      { name: 'Thanh Xuân' },
      { name: 'Nam Từ Liêm' },
      { name: 'Bắc Từ Liêm' },
      { name: 'Hà Đông' },
    ],
  },
  {
    name: 'TP. Hồ Chí Minh',
    districts: [
      { name: 'Quận 1' },
      { name: 'Quận 3' },
      { name: 'Quận 4' },
      { name: 'Quận 5' },
      { name: 'Quận 6' },
      { name: 'Quận 7' },
      { name: 'Quận 8' },
      { name: 'Quận 10' },
      { name: 'Quận 11' },
      { name: 'Quận 12' },
      { name: 'Bình Thạnh' },
      { name: 'Gò Vấp' },
      { name: 'Phú Nhuận' },
      { name: 'Tân Bình' },
      { name: 'Tân Phú' },
      { name: 'Thủ Đức' },
    ],
  },
  {
    name: 'Đà Nẵng',
    districts: [
      { name: 'Hải Châu' },
      { name: 'Thanh Khê' },
      { name: 'Sơn Trà' },
      { name: 'Ngũ Hành Sơn' },
      { name: 'Liên Chiểu' },
      { name: 'Cẩm Lệ' },
    ],
  },
  {
    name: 'Hải Phòng',
    districts: [
      { name: 'Hồng Bàng' },
      { name: 'Ngô Quyền' },
      { name: 'Lê Chân' },
      { name: 'Kiến An' },
      { name: 'Hải An' },
      { name: 'Đồ Sơn' },
    ],
  },
  {
    name: 'Cần Thơ',
    districts: [
      { name: 'Ninh Kiều' },
      { name: 'Bình Thủy' },
      { name: 'Cái Răng' },
      { name: 'Ô Môn' },
      { name: 'Thốt Nốt' },
    ],
  },
  {
    name: 'Bắc Ninh',
    districts: [
      { name: 'TP. Bắc Ninh' },
      { name: 'Từ Sơn' },
      { name: 'Yên Phong' },
      { name: 'Tiên Du' },
    ],
  },
  {
    name: 'Bắc Giang',
    districts: [
      { name: 'TP. Bắc Giang' },
      { name: 'Việt Yên' },
      { name: 'Yên Dũng' },
    ],
  },
  {
    name: 'Quảng Ninh',
    districts: [
      { name: 'Hạ Long' },
      { name: 'Cẩm Phả' },
      { name: 'Uông Bí' },
      { name: 'Móng Cái' },
    ],
  },
  {
    name: 'Thanh Hóa',
    districts: [
      { name: 'TP. Thanh Hóa' },
      { name: 'Sầm Sơn' },
      { name: 'Bỉm Sơn' },
    ],
  },
  {
    name: 'Nghệ An',
    districts: [
      { name: 'TP. Vinh' },
      { name: 'Cửa Lò' },
      { name: 'Thái Hòa' },
    ],
  },
  {
    name: 'Huế',
    districts: [
      { name: 'TP. Huế' },
      { name: 'Hương Thủy' },
      { name: 'Hương Trà' },
    ],
  },
  {
    name: 'Khánh Hòa',
    districts: [
      { name: 'Nha Trang' },
      { name: 'Cam Ranh' },
      { name: 'Ninh Hòa' },
    ],
  },
  {
    name: 'Bình Dương',
    districts: [
      { name: 'Thủ Dầu Một' },
      { name: 'Dĩ An' },
      { name: 'Thuận An' },
      { name: 'Tân Uyên' },
    ],
  },
  {
    name: 'Đồng Nai',
    districts: [
      { name: 'Biên Hòa' },
      { name: 'Long Khánh' },
      { name: 'Nhơn Trạch' },
    ],
  },
  {
    name: 'Bà Rịa - Vũng Tàu',
    districts: [
      { name: 'Vũng Tàu' },
      { name: 'Bà Rịa' },
      { name: 'Long Điền' },
    ],
  },
  {
    name: 'Long An',
    districts: [
      { name: 'Tân An' },
      { name: 'Kiến Tường' },
      { name: 'Bến Lức' },
    ],
  },
  {
    name: 'An Giang',
    districts: [
      { name: 'Long Xuyên' },
      { name: 'Châu Đốc' },
      { name: 'Tân Châu' },
    ],
  },
  {
    name: 'Lâm Đồng',
    districts: [
      { name: 'Đà Lạt' },
      { name: 'Bảo Lộc' },
    ],
  },
  {
    name: 'Bình Thuận',
    districts: [
      { name: 'Phan Thiết' },
      { name: 'La Gi' },
    ],
  },
  {
    name: 'Quảng Nam',
    districts: [
      { name: 'Tam Kỳ' },
      { name: 'Hội An' },
      { name: 'Điện Bàn' },
    ],
  },
];

// Tạo danh sách gợi ý địa chỉ
export function getAddressSuggestions(query: string): string[] {
  if (!query || query.length < 2) return [];

  const normalizedQuery = query.toLowerCase();
  const suggestions: string[] = [];

  for (const province of provinces) {
    // Gợi ý tỉnh/thành phố
    if (province.name.toLowerCase().includes(normalizedQuery)) {
      suggestions.push(province.name);
    }

    // Gợi ý quận/huyện + tỉnh/thành phố
    for (const district of province.districts) {
      const fullAddress = `${district.name}, ${province.name}`;
      if (
        district.name.toLowerCase().includes(normalizedQuery) ||
        fullAddress.toLowerCase().includes(normalizedQuery)
      ) {
        suggestions.push(fullAddress);
      }
    }
  }

  return suggestions.slice(0, 8); // Giới hạn 8 gợi ý
}
