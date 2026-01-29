import { useState } from 'react';
import './Footer.css';
import logo from '../assets/images/logo.png';
import Modal from './Modal';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

type ModalType = 'order-guide' | 'return-policy' | 'privacy-policy' | null;

export default function Footer() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const { ref: footerRef, isVisible } = useScrollAnimation<HTMLElement>();

  const closeModal = () => setActiveModal(null);

  return (
    <footer className={`footer fade-in-up ${isVisible ? 'visible' : ''}`} ref={footerRef}>
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <img src={logo} alt="VietRelic" className="footer-logo" />
            <h3 className="footer-title">VIETRELIC</h3>
            <p className="footer-tagline">Thẻ bài di tích Việt Nam - kết nối<br />lịch sử bằng trải nghiệm hiện đại</p>
          </div>
          <div className="footer-content">
            <div className="footer-column">
              <h4>Liên hệ</h4>
              <ul>
                <li>
                  <span className="footer-icon">✉</span> Email: haeanhxoxo15@gmail.com
                </li>
                <li>
                  <span className="footer-icon">☎</span> Hotline: 0868880006
                </li>
                <li>
                  <span className="footer-icon">f</span> Facebook: fb.com/vietrelic
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Hỗ trợ</h4>
              <ul>
                <li>
                  <button className="footer-link" onClick={() => setActiveModal('order-guide')}>
                    Hướng dẫn đặt hàng
                  </button>
                </li>
                <li>
                  <button className="footer-link" onClick={() => setActiveModal('return-policy')}>
                    Chính sách đổi trả
                  </button>
                </li>
                <li>
                  <button className="footer-link" onClick={() => setActiveModal('privacy-policy')}>
                    Chính sách bảo mật
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 VietRelic. All rights reserved.</p>
        </div>
      </div>

      {/* Modal Hướng dẫn đặt hàng */}
      <Modal
        isOpen={activeModal === 'order-guide'}
        onClose={closeModal}
        title="Hướng dẫn đặt hàng"
      >
        <h3>Bước 1: Chọn sản phẩm</h3>
        <p>Tại trang chủ, bạn có thể xem các sản phẩm thẻ bài di tích. Nhấn nút "Thêm vào giỏ hàng" để thêm sản phẩm bạn muốn mua.</p>

        <h3>Bước 2: Kiểm tra giỏ hàng</h3>
        <p>Nhấn vào biểu tượng giỏ hàng ở góc phải màn hình để xem các sản phẩm đã chọn. Bạn có thể điều chỉnh số lượng hoặc xóa sản phẩm.</p>

        <h3>Bước 3: Điền thông tin</h3>
        <p>Nhấn "Đặt hàng" và điền đầy đủ thông tin:</p>
        <ul>
          <li>Họ tên người nhận</li>
          <li>Số điện thoại liên hệ</li>
          <li>Địa chỉ giao hàng chi tiết</li>
        </ul>

        <h3>Bước 4: Xác nhận đơn hàng</h3>
        <p>Kiểm tra lại thông tin và nhấn "Đặt hàng". Chúng tôi sẽ liên hệ xác nhận đơn hàng trong vòng 24 giờ.</p>
      </Modal>

      {/* Modal Chính sách đổi trả */}
      <Modal
        isOpen={activeModal === 'return-policy'}
        onClose={closeModal}
        title="Chính sách đổi trả"
      >
        <h3>Điều kiện đổi trả</h3>
        <p>VietRelic chấp nhận đổi trả sản phẩm trong các trường hợp sau:</p>
        <ul>
          <li>Sản phẩm bị lỗi do nhà sản xuất</li>
          <li>Sản phẩm không đúng mô tả hoặc hình ảnh</li>
          <li>Sản phẩm bị hư hỏng trong quá trình vận chuyển</li>
        </ul>

        <h3>Thời gian đổi trả</h3>
        <p>Bạn có thể yêu cầu đổi trả trong vòng 7 ngày kể từ ngày nhận hàng.</p>

        <h3>Quy trình đổi trả</h3>
        <ul>
          <li>Liên hệ hotline hoặc email để thông báo yêu cầu đổi trả</li>
          <li>Cung cấp hình ảnh sản phẩm lỗi (nếu có)</li>
          <li>Gửi sản phẩm về địa chỉ chúng tôi cung cấp</li>
          <li>Nhận sản phẩm mới hoặc hoàn tiền trong 3-5 ngày làm việc</li>
        </ul>

        <h3>Lưu ý</h3>
        <p>Sản phẩm đổi trả phải còn nguyên tem, nhãn và chưa qua sử dụng.</p>
      </Modal>

      {/* Modal Chính sách bảo mật */}
      <Modal
        isOpen={activeModal === 'privacy-policy'}
        onClose={closeModal}
        title="Chính sách bảo mật"
      >
        <h3>Thu thập thông tin</h3>
        <p>Chúng tôi thu thập các thông tin cần thiết để xử lý đơn hàng:</p>
        <ul>
          <li>Họ tên, số điện thoại, địa chỉ giao hàng</li>
          <li>Thông tin đơn hàng và lịch sử mua hàng</li>
        </ul>

        <h3>Sử dụng thông tin</h3>
        <p>Thông tin của bạn được sử dụng để:</p>
        <ul>
          <li>Xử lý và giao đơn hàng</li>
          <li>Liên hệ xác nhận đơn hàng</li>
          <li>Hỗ trợ khách hàng khi cần thiết</li>
          <li>Gửi thông tin khuyến mãi (nếu bạn đồng ý)</li>
        </ul>

        <h3>Bảo vệ thông tin</h3>
        <p>VietRelic cam kết:</p>
        <ul>
          <li>Không chia sẻ thông tin cá nhân cho bên thứ ba</li>
          <li>Bảo mật thông tin bằng các biện pháp kỹ thuật phù hợp</li>
          <li>Chỉ nhân viên được ủy quyền mới có quyền truy cập thông tin</li>
        </ul>

        <h3>Quyền của khách hàng</h3>
        <p>Bạn có quyền yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân bằng cách liên hệ với chúng tôi qua email hoặc hotline.</p>
      </Modal>
    </footer>
  );
}
