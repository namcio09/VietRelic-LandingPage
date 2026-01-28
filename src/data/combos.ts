import comboImage from '../assets/images/combo.png';

export interface Combo {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
}

export const combos: Combo[] = [
  {
    id: 'combo1',
    name: 'Cổ sử trường thành mà không vạn vỡ',
    description: 'Bộ sưu tập sách về lịch sử cổ đại và di tích văn hóa',
    price: 100000,
    image: comboImage,
    rating: 5
  },
  {
    id: 'combo2',
    name: 'Di tích kể chuyện',
    description: 'Tuyển tập sách về các di tích lịch sử Việt Nam',
    price: 150000,
    image: comboImage,
    rating: 5
  },
  {
    id: 'combo3',
    name: 'Văn hóa dân tộc',
    description: 'Bộ sách về văn hóa và truyền thống dân tộc',
    price: 180000,
    image: comboImage,
    rating: 4
  },
  {
    id: 'combo4',
    name: 'Lịch sử thế giới',
    description: 'Tuyển tập sách về lịch sử các nền văn minh',
    price: 200000,
    image: comboImage,
    rating: 5
  },
  {
    id: 'combo5',
    name: 'Khảo cổ học',
    description: 'Bộ sách về khảo cổ và phát hiện lịch sử',
    price: 220000,
    image: comboImage,
    rating: 4
  },
  {
    id: 'combo6',
    name: 'Di sản UNESCO',
    description: 'Sách về các di sản văn hóa thế giới',
    price: 250000,
    image: comboImage,
    rating: 5
  },
  {
    id: 'combo7',
    name: 'Cổ vật Việt Nam',
    description: 'Tuyển tập về cổ vật và bảo tàng Việt Nam',
    price: 190000,
    image: comboImage,
    rating: 4
  },
  {
    id: 'combo8',
    name: 'Lịch sử địa phương',
    description: 'Bộ sách về lịch sử các địa phương Việt Nam',
    price: 170000,
    image: comboImage,
    rating: 5
  }
];
