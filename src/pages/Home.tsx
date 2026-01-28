import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';
import ComboGrid from '../components/ComboGrid';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import './Home.css';

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="home">
      <Header />
      <Hero />
      <ProductList />
      <ComboGrid />
      <Footer />
      <Sidebar />
    </div>
  );
}
