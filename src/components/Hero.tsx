import { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import ditichA from '../assets/images/ditich-a.png';
import ditichB from '../assets/images/ditich-b.png';
import './Hero.css';

export default function Hero() {
  const slides = useMemo(
    () => [
      {
        title: 'VietRelic - Di tích kể chuyện',
        description:
          'Khám phá lịch sử và văn hóa Việt Nam qua những câu chuyện di tích đầy ý nghĩa. Mỗi trang sách là một hành trình về quá khứ, kết nối chúng ta với nguồn cội và truyền thống dân tộc.',
        mainImage: ditichA,
        mainAlt: 'Di tích A',
        sideImage: ditichA,
        sideAlt: 'Di tích A',
      },
      {
        title: 'Hành trình di sản',
        description:
          'Tìm hiểu các di sản Việt Nam qua góc nhìn mới: câu chuyện, kiến trúc, con người và dấu ấn thời gian. Nội dung được tuyển chọn để dễ đọc, dễ cảm.',
        mainImage: ditichB,
        mainAlt: 'Di tích B',
        sideImage: ditichB,
        sideAlt: 'Di tích B',
      },
      {
        title: 'Cổ vật & ký ức',
        description:
          'Những cổ vật không chỉ là hiện vật—đó là ký ức. Khám phá từng câu chuyện phía sau hiện vật, để hiểu sâu hơn về bản sắc và lịch sử dân tộc. Mỗi cổ vật đều mang trong mình một câu chuyện riêng, một phần lịch sử được lưu giữ qua thời gian. Từ những mảnh gốm cổ đến những bức tranh cổ, từ những đồng tiền cổ đến những bảo vật quốc gia, tất cả đều kể lên những câu chuyện về con người, về văn hóa, về những thăng trầm của lịch sử. Việc nghiên cứu và bảo tồn cổ vật không chỉ là nhiệm vụ của các nhà khảo cổ học mà còn là trách nhiệm của mỗi chúng ta trong việc gìn giữ và phát huy giá trị văn hóa dân tộc.',
        mainImage: ditichA,
        mainAlt: 'Di tích A',
        sideImage: ditichA,
        sideAlt: 'Di tích A',
      },
    ],
    [],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [showReadMore, setShowReadMore] = useState(false);

  // Reset expanded state khi chuyển slide
  useEffect(() => {
    setIsExpanded(false);
    // Check xem description có dài hơn 3 dòng không
    setTimeout(() => {
      if (descriptionRef.current) {
        const lineHeight = parseFloat(getComputedStyle(descriptionRef.current).lineHeight);
        const maxHeight = lineHeight * 3; // 3 dòng
        const actualHeight = descriptionRef.current.scrollHeight;
        setShowReadMore(actualHeight > maxHeight);
      }
    }, 100);
  }, [activeIndex]);

  const goTo = useCallback(
    (idx: number) => {
      const next = ((idx % slides.length) + slides.length) % slides.length;
      setActiveIndex(next);
    },
    [slides.length],
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const active = slides[activeIndex];

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 key={`title-${activeIndex}`} className="hero-title">
            {active.title}
          </h1>
          <p
            key={`desc-${activeIndex}`}
            ref={descriptionRef}
            className={`hero-description ${isExpanded ? 'expanded' : ''}`}
          >
            {active.description}
          </p>
          {showReadMore && (
            <button className="hero-button" onClick={toggleExpand}>
              {isExpanded ? 'Thu gọn' : 'Xem thêm'}
            </button>
          )}
        </div>
        <div className="hero-images">
          <div className="hero-main-image">
            <button
              type="button"
              className="hero-nav hero-nav-left"
              onClick={goPrev}
              aria-label="Ảnh trước"
            >
              ‹
            </button>
            <img
              key={`img-${activeIndex}`}
              src={active.mainImage}
              alt={active.mainAlt}
              className="hero-image"
            />
            <button
              type="button"
              className="hero-nav hero-nav-right"
              onClick={goNext}
              aria-label="Ảnh tiếp theo"
            >
              ›
            </button>
            <div className="carousel-dots">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`dot ${idx === activeIndex ? 'active' : ''}`}
                  onClick={() => goTo(idx)}
                  aria-label={`Chuyển đến ảnh ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
