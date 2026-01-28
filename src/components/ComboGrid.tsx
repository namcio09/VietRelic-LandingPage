import { useCart } from '../context/CartContext';
import { combos } from '../data/combos';
import { formatCurrency } from '../lib/format';
import './ComboGrid.css';

export default function ComboGrid() {
  const { addItem } = useCart();

  const handleAddToCart = (combo: typeof combos[0]) => {
    addItem({
      id: combo.id,
      name: combo.name,
      price: combo.price,
      type: 'combo',
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'star filled' : 'star'}>
        ★
      </span>
    ));
  };

  return (
    <section id="combos" className="combo-section">
      <div className="section-container">
        <h2 className="section-title">COMBO</h2>
        <div className="combo-grid">
          {combos.map((combo) => (
            <div key={combo.id} className="combo-card">
              <img
                src={combo.image}
                alt={combo.name}
                className="combo-image"
              />
              <h3 className="combo-name">{combo.name}</h3>
              <p className="combo-description">{combo.description}</p>
              <div className="combo-rating">{renderStars(combo.rating)}</div>
              <p className="combo-price">{formatCurrency(combo.price)}</p>
              <button
                className="combo-button"
                onClick={() => handleAddToCart(combo)}
              >
                Đặt ngay
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
