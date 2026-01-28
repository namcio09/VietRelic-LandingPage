import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { combos } from '../data/combos';
import { formatCurrency } from '../lib/format';
import './ComboGrid.css';

export default function ComboGrid() {
  const { addItem } = useCart();
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const handleAddToCart = (combo: typeof combos[0]) => {
    addItem({
      id: combo.id,
      name: combo.name,
      price: combo.price,
      image: combo.image,
      type: 'combo',
    });

    setAddedIds((prev) => new Set(prev).add(combo.id));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(combo.id);
        return next;
      });
    }, 1500);
  };

  return (
    <section id="combos" className="combo-section">
      <div className="section-container">
        <h2 className="section-title">COMBO</h2>
        <div className="combo-grid">
          {combos.map((combo) => {
            const isAdded = addedIds.has(combo.id);
            return (
              <div key={combo.id} className="combo-card">
                <img
                  src={combo.image}
                  alt={combo.name}
                  className="combo-image"
                />
                <div className="combo-content">
                  <h3 className="combo-name">{combo.name}</h3>
                  <p className="combo-description">{combo.description}</p>
                </div>
                <div className="combo-footer">
                  <p className="combo-price">{formatCurrency(combo.price)}</p>
                  <button
                    className={`combo-button ${isAdded ? 'added' : ''}`}
                    onClick={() => handleAddToCart(combo)}
                  >
                    {isAdded ? '✓ Đã thêm' : 'Thêm vào giỏ hàng'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
