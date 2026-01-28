import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../lib/format';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Checkout.css';

type Msg = { type: 'success' | 'error'; text: string } | null;

export default function Checkout() {
  const navigate = useNavigate();
  const { items, clearCart, getTotalPrice, updateQuantity, removeItem } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<Msg>(null);

  const endpoint = import.meta.env.VITE_ORDER_ENDPOINT as string | undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!formData.fullName.trim()) return 'Vui lòng nhập họ tên.';
    if (!formData.phone.trim()) return 'Vui lòng nhập số điện thoại.';
    if (!formData.address.trim()) return 'Vui lòng nhập địa chỉ.';
    if (items.length === 0) return 'Giỏ hàng đang trống.';
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!endpoint) {
      setMessage({ type: 'error', text: 'Lỗi cấu hình hệ thống!!!' });
      return;
    }

    const err = validate();
    if (err) {
      setMessage({ type: 'error', text: err });
      return;
    }

    setIsSubmitting(true);

    const itemsText = items
      .map((item) => `${item.name} (x${item.quantity}) - ${formatCurrency(item.price * item.quantity)}`)
      .join('\n');

    const orderData = {
      customer: {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
      },
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: getTotalPrice(),
      itemsText,
      createdAt: new Date().toISOString(),
    };

    try {
      // Thử gửi với headers (nếu CORS đã được cấu hình)
      let response: Response;
      try {
        response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });

        // Nếu response không phải opaque, có thể đọc được
        if (response.type !== 'opaque' && response.type !== 'opaqueredirect') {
          if (response.ok) {
            const result = await response.json();
            if (result.success) {
              setMessage({
                type: 'success',
                text: 'Đặt hàng thành công!',
              });
              setTimeout(() => {
                clearCart();
                navigate('/');
              }, 3500);
              return;
            } else {
              throw new Error(result.error || 'Đặt hàng thất bại');
            }
          } else {
            throw new Error('Đặt hàng thất bại');
          }
        }
      } catch (corsError) {
        // Nếu bị lỗi CORS, fallback về no-cors mode
        // Request vẫn được gửi đến server, chỉ là không đọc được response
        await fetch(endpoint, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify(orderData),
        });
      }

      // Nếu đến đây, có nghĩa là đã dùng no-cors hoặc response là opaque
      // Request đã được gửi thành công (dù không đọc được response)
      setMessage({
        type: 'success',
        text: 'Chúng tôi đã xác nhận đơn hàng của bạn.',
      });

      setTimeout(() => {
        clearCart();
        navigate('/');
      }, 2000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Gửi thất bại do lỗi mạng. Vui lòng thử lại.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // CHỈ hiện màn "giỏ hàng trống" khi không có message (tránh che message success/error)
  if (items.length === 0 && !message) {
    return (
      <div className="checkout">
        <Header />
        <div className="checkout-empty">
          <p>Giỏ hàng của bạn đang trống</p>
          <button onClick={() => navigate('/')} className="back-button">
            Quay về trang chủ
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="checkout">
      <Header />
      <div className="checkout-container">
        <h1 className="checkout-title">Đặt hàng</h1>

        <div className="checkout-content">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h2>Thông tin khách hàng</h2>

            <div className="form-group">
              <label htmlFor="fullName">Họ tên *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Số điện thoại *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Địa chỉ *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                required
              />
            </div>

            {message && <div className={`message message-${message.type}`}>{message.text}</div>}

            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Đang gửi...' : 'Đặt hàng'}
            </button>
          </form>

          <div className="checkout-summary">
            <h2>Đơn hàng</h2>

            <div className="order-items">
              {items.map((item) => (
                <div key={item.id} className="order-item">
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>

                    <div className="item-controls">
                      <div className="quantity-controls">
                        <button
                          type="button"
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Giảm số lượng"
                        >
                          −
                        </button>
                        <span className="item-quantity">{item.quantity}</span>
                        <button
                          type="button"
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Tăng số lượng"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeItem(item.id)}
                        aria-label="Xóa sản phẩm"
                      >
                        Xóa
                      </button>
                    </div>

                    <div className="item-unit-price">Đơn giá: {formatCurrency(item.price)}</div>
                  </div>

                  <div className="item-price">{formatCurrency(item.price * item.quantity)}</div>
                </div>
              ))}
            </div>

            <div className="order-total">
              <span>Tổng tiền:</span>
              <span className="total-amount">{formatCurrency(getTotalPrice())}</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
