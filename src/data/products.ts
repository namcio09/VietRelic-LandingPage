import singleCardImage from '../assets/images/single-card.png';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'THU GỬI CON',
    price: 150000,
    image: singleCardImage
  },
  {
    id: '2',
    name: 'EINSTEIN - Walter Isaacson',
    price: 280000,
    image: singleCardImage
  },
  {
    id: '3',
    name: 'Tìm lại căn cước',
    price: 120000,
    image: singleCardImage
  },
  {
    id: '4',
    name: 'Lịch sử Việt Nam',
    price: 200000,
    image: singleCardImage
  },
  {
    id: '5',
    name: 'Di tích văn hóa',
    price: 180000,
    image: singleCardImage
  },
  {
    id: '6',
    name: 'Cổ vật kể chuyện',
    price: 250000,
    image: singleCardImage
  }
];
