import { useState, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { formatCurrency } from '../lib/format';
import './ProductList.css';

export default function ProductList() {
  const { addItem } = useCart();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      type: 'product',
    });
  };

  const goTo = useCallback(
    (index: number) => {
      const total = products.length;
      const next = ((index % total) + total) % total;
      setActiveIndex(next);
    },
    [],
  );

  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

  const getPositionClass = (index: number) => {
    const diff = index - activeIndex;
    if (diff === 0) return 'product-card center';
    if (diff === -1) return 'product-card left';
    if (diff === 1) return 'product-card right';
    if (diff === -2) return 'product-card far-left';
    if (diff === 2) return 'product-card far-right';
    return 'product-card hidden';
  };

  return (
    <section id="products" className="product-section">
      <div className="section-container">
        <h2 className="section-title">SẢN PHẨM</h2>
        <div className="product-carousel">
          <button
            type="button"
            className="product-nav product-nav-left"
            onClick={goPrev}
            aria-label="Sản phẩm trước"
          >
            ‹
          </button>

          <div className="product-stage">
            {products.map((product, index) => (
              <div key={product.id} className={getPositionClass(index)}>
                <div className="product-card-inner">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">{formatCurrency(product.price)}</p>
                  <button
                    className="product-button"
                    onClick={() => handleAddToCart(product)}
                  >
                    Đặt ngay
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="product-nav product-nav-right"
            onClick={goNext}
            aria-label="Sản phẩm tiếp theo"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
