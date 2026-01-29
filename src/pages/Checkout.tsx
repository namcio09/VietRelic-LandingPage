import { useState, FormEvent, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../lib/format';
import { getAddressSuggestions } from '../data/vietnamLocations';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Checkout.css';

type Msg = { type: 'success' | 'error'; text: string } | null;

interface FieldErrors {
  fullName?: string;
  phone?: string;
  address?: string;
}

// Validate họ tên: ít nhất 2 từ, chỉ chứa chữ cái và khoảng trắng
const validateFullName = (name: string): string | null => {
  const trimmed = name.trim();
  if (!trimmed) return 'Vui lòng nhập họ tên.';

  // Kiểm tra chỉ chứa chữ cái (bao gồm tiếng Việt) và khoảng trắng
  const nameRegex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ\s]+$/;
  if (!nameRegex.test(trimmed)) {
    return 'Họ tên chỉ được chứa chữ cái và khoảng trắng.';
  }

  // Kiểm tra ít nhất 2 từ
  const words = trimmed.split(/\s+/).filter(w => w.length > 0);
  if (words.length < 2) {
    return 'Vui lòng nhập đầy đủ họ và tên (ít nhất 2 từ).';
  }

  // Kiểm tra độ dài tối thiểu mỗi từ
  if (words.some(w => w.length < 2)) {
    return 'Mỗi từ trong họ tên phải có ít nhất 2 ký tự.';
  }

  return null;
};

// Validate số điện thoại Việt Nam
const validatePhone = (phone: string): string | null => {
  const trimmed = phone.trim().replace(/\s+/g, '');
  if (!trimmed) return 'Vui lòng nhập số điện thoại.';

  // Số điện thoại Việt Nam: bắt đầu bằng 0, 10 số
  // Các đầu số hợp lệ: 03, 05, 07, 08, 09
  const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;

  if (!phoneRegex.test(trimmed)) {
    return 'Số điện thoại không hợp lệ.';
  }

  return null;
};

// Validate địa chỉ
const validateAddress = (address: string): string | null => {
  const trimmed = address.trim();
  if (!trimmed) return 'Vui lòng nhập địa chỉ.';

  if (trimmed.length < 10) {
    return 'Địa chỉ quá ngắn. Vui lòng nhập địa chỉ chi tiết hơn.';
  }

  return null;
};

export default function Checkout() {
  const navigate = useNavigate();
  const { items, clearCart, getTotalPrice, updateQuantity, removeItem } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<Msg>(null);

  // Address autocomplete
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const addressInputRef = useRef<HTMLTextAreaElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const endpoint = import.meta.env.VITE_ORDER_ENDPOINT as string | undefined;

  // Xử lý click outside để đóng suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        addressInputRef.current &&
        !addressInputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation khi đã touched
    if (touched[name]) {
      validateField(name, value);
    }

    // Gợi ý địa chỉ
    if (name === 'address') {
      const suggestions = getAddressSuggestions(value);
      setAddressSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    }
  };

  const validateField = (name: string, value: string) => {
    let error: string | null = null;

    switch (name) {
      case 'fullName':
        error = validateFullName(value);
        break;
      case 'phone':
        error = validatePhone(value);
        break;
      case 'address':
        error = validateAddress(value);
        break;
    }

    setFieldErrors((prev) => ({
      ...prev,
      [name]: error || undefined,
    }));

    return error;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    // Thêm suggestion vào cuối địa chỉ hiện tại hoặc thay thế
    const currentAddress = formData.address.trim();
    const newAddress = currentAddress ? `${currentAddress}, ${suggestion}` : suggestion;

    setFormData((prev) => ({ ...prev, address: newAddress }));
    setShowSuggestions(false);
    setAddressSuggestions([]);

    // Validate lại
    if (touched.address) {
      validateField('address', newAddress);
    }
  };

  const validate = () => {
    const nameError = validateFullName(formData.fullName);
    const phoneError = validatePhone(formData.phone);
    const addressError = validateAddress(formData.address);

    setFieldErrors({
      fullName: nameError || undefined,
      phone: phoneError || undefined,
      address: addressError || undefined,
    });

    setTouched({ fullName: true, phone: true, address: true });

    if (nameError) return nameError;
    if (phoneError) return phoneError;
    if (addressError) return addressError;
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

            <div className={`form-group ${fieldErrors.fullName && touched.fullName ? 'has-error' : ''}`}>
              <label htmlFor="fullName">Họ tên *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="VD: Nguyễn Văn A"
                required
              />
              {fieldErrors.fullName && touched.fullName && (
                <span className="field-error">{fieldErrors.fullName}</span>
              )}
            </div>

            <div className={`form-group ${fieldErrors.phone && touched.phone ? 'has-error' : ''}`}>
              <label htmlFor="phone">Số điện thoại *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="VD: 0912345678"
                required
              />
              {fieldErrors.phone && touched.phone && (
                <span className="field-error">{fieldErrors.phone}</span>
              )}
            </div>

            <div className={`form-group ${fieldErrors.address && touched.address ? 'has-error' : ''}`}>
              <label htmlFor="address">Địa chỉ *</label>
              <div className="address-input-wrapper">
                <textarea
                  ref={addressInputRef}
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={() => {
                    if (addressSuggestions.length > 0) setShowSuggestions(true);
                  }}
                  rows={3}
                  placeholder="VD: 123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh"
                  required
                />
                {showSuggestions && addressSuggestions.length > 0 && (
                  <div className="address-suggestions" ref={suggestionsRef}>
                    {addressSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="suggestion-item"
                        onClick={() => handleSelectSuggestion(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {fieldErrors.address && touched.address && (
                <span className="field-error">{fieldErrors.address}</span>
              )}
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
                  <img
                    src={item.image}
                    alt={item.name}
                    className="item-image"
                  />
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
