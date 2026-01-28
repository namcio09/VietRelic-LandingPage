import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>VietRelic</h3>
        </div>
        <div className="footer-content">
          <div className="footer-column">
            <h4>VỀ CHÚNG TÔI</h4>
            <ul>
              <li>
                <a href="#contact">Liên hệ</a>
              </li>
              <li>
                <a href="#recruitment">Tuyển dụng</a>
              </li>
              <li>
                <a href="#policy">Chính sách</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>ĐỐI TÁC & HỖ TRỢ</h4>
            <ul>
              <li>
                <a href="#returns">Đổi trả hàng</a>
              </li>
              <li>
                <a href="#terms">Điều khoản sử dụng</a>
              </li>
              <li>
                <a href="#privacy">Chính sách bảo mật</a>
              </li>
              <li>
                <a href="#promotion">Điều khoản khuyến mãi</a>
              </li>
              <li>
                <a href="#faq">Hỏi đáp</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>THÔNG TIN LIÊN HỆ</h4>
            <p>7 Nguyễn Khắc Cần</p>
            <p>+7 341 629 8 0</p>
            <p>support@vietrelic.com</p>
            <div className="payment-support">
              <h5>HỖ TRỢ THANH TOÁN</h5>
              <div className="payment-logos">
                <div className="payment-logo">VISA</div>
                <div className="payment-logo">MASTER</div>
                <div className="payment-logo">MOMO</div>
                <div className="payment-logo">ZALO</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
