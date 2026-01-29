import cardHoalo from '../assets/images/card-hoalo.png';
import cardMaychem from '../assets/images/card-maychem.png';
import cardCaybang from '../assets/images/card-caybang.png';
import cardCongngam from '../assets/images/card-congngam.png';
import cardXiengxich from '../assets/images/card-xiengxich.png';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Thẻ bài Cổng Chính Nhà Tù Hoả Lò',
    price: 150000,
    image: cardHoalo
  },
  {
    id: '2',
    name: 'Thẻ bài Máy Chém',
    price: 150000,
    image: cardMaychem
  },
  {
    id: '3',
    name: 'Thẻ bài Cây Bàng Cổ Thụ',
    price: 150000,
    image: cardCaybang
  },
  {
    id: '4',
    name: 'Thẻ bài Đường Cống Ngầm',
    price: 150000,
    image: cardCongngam
  },
  {
    id: '5',
    name: 'Thẻ bài Xiềng Xích',
    price: 150000,
    image: cardXiengxich
  }
];
