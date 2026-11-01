import "./Footer.css";
import { FaInstagram, FaTiktok, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import logo from "../../../assets/Picture/logo fiks no bg.png";

const Footer = () => {
  return (
    <footer className="footer-yarn">
      <div className="footer-contact">
        {/* LOGO */}
        <div className="footer-logo">
          <span className="footer-logo-mark">
            <img src={logo} alt="ToiletKU Logo" className="footer-logo-img" />
          </span>
          <span className="footer-logo-text">
            Toilet<span>KU</span>
          </span>
        </div>

        <h2>Have other questions? Contact Us</h2>

        {/* SOCIAL ICON CLEAN */}
        <div className="social-icons">
          <a href="#" className="icon ig" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#" className="icon tt" aria-label="TikTok">
            <FaTiktok />
          </a>
          <a
            href="https://wa.me/6281410920552"
            target="_blank"
            rel="noopener noreferrer"
            className="icon wa"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>
          <a
            href="mailto:toiletku@gmail.com"
            className="icon gm"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        </div>

        <p className="footer-desc">
          ToiletKU - Jasa Sedot WC Profesional dan Terpercaya. Kami menyediakan
          layanan sedot WC, saluran pembuangan, dan septic tank dengan harga
          terjangkau. Hubungi kami untuk layanan cepat dan ramah.
        </p>

        {/* WHATSAPP */}
        <div className="whatsapp-box">
          <div className="wa-icon">
            <FaWhatsapp />
          </div>
          <div>
            <p className="wa-title">WHATSAPP</p>
            <p className="wa-number">081410920552</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">© 2026 ToiletKU. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
