import Navbar from "../Components/Navigasi/Navbar/Navbar";
import Footer from "../Components/Navigasi/Footer/Footer";
import FloatingWhatsApp from "../Components/FloatingWhatsApp/FloatingWhatsApp"; // 👈 1. sesuaikan path ke tempat file kamu taruh
import { useLocation } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  const location = useLocation();

  // 🔥 daftar halaman yang pakai full screen (landing page)
  const fullscreenPages = ["/", "/about", "/services", "/contact"];

  const isFullscreen = fullscreenPages.includes(location.pathname);

  return (
    <div className="layout">
      <Navbar />
      <main className={`main-content ${isFullscreen ? "fullscreen" : ""}`}>
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp /> {/* 👈 2. tambahkan baris ini */}
    </div>
  );
};

export default MainLayout;
