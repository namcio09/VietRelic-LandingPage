import { useState, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { formatCurrency } from '../lib/format';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './ProductList.css';

export default function ProductList() {
  const { addItem } = useCart();
  const [activeIndex, setActiveIndex] = useState(0);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>();

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      type: 'product',
    });

    setAddedIds((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1500);
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
    <section
      id="products"
      className={`product-section fade-in-up ${isVisible ? 'visible' : ''}`}
      ref={sectionRef}
    >
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
            {products.map((product, index) => {
              const isAdded = addedIds.has(product.id);
              return (
                <div key={product.id} className={getPositionClass(index)}>
                  <div className="product-card-inner">
                    <div className="product-image-wrapper">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                      />
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-price">{formatCurrency(product.price)}</p>
                      <button
                        className={`product-button btn-animated ${isAdded ? 'added' : ''}`}
                        onClick={() => handleAddToCart(product)}
                      >
                        {isAdded ? '✓ Đã thêm' : 'Thêm vào giỏ hàng'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
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
