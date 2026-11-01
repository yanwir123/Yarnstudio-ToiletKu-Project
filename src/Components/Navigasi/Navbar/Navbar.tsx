import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../../../assets/Picture/logo fiks no bg.png";

const Navbar = () => {
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // HOME saja yang transparan
  const isHome = location.pathname === "/";

  // Navbar menjadi solid jika:
  // - bukan Home
  // - atau Home tetapi sudah discroll
  const isSolid = !isHome || scrolled;

  const linkColor = isSolid ? "#1f2937" : "#ffffff";

  return (
    <nav className={`navbar ${isSolid ? "solid" : "transparent"}`}>
      {/* LOGO */}
      <div className="logo-wrapper">
        <img src={logo} alt="ToiletKU" className="logo-img" />

        <h1
          className="logo"
          style={{
            color: isSolid ? "#009245" : "#ffffff",
          }}
        >
          ToiletKU
        </h1>
      </div>

      {/* MENU */}
      <ul className={`nav-links ${open ? "open" : ""}`}>
        <li>
          <Link
            to="/"
            className={location.pathname === "/" ? "active" : ""}
            style={{ color: linkColor }}
            onClick={() => setOpen(false)}
          >
            BERANDA
          </Link>
        </li>

        <li>
          <Link
            to="/about"
            className={location.pathname === "/about" ? "active" : ""}
            style={{ color: linkColor }}
            onClick={() => setOpen(false)}
          >
            TENTANG KAMI
          </Link>
        </li>

        <li>
          <Link
            to="/services"
            className={location.pathname === "/services" ? "active" : ""}
            style={{ color: linkColor }}
            onClick={() => setOpen(false)}
          >
            LAYANAN
          </Link>
        </li>

        <li>
          <Link
            to="/contact"
            className={location.pathname === "/contact" ? "active" : ""}
            style={{ color: linkColor }}
            onClick={() => setOpen(false)}
          >
            HUBUNGI KAMI
          </Link>
        </li>
      </ul>

      {/* HAMBURGER */}
      <div className="menu-toggle" onClick={() => setOpen(!open)}>
        <span style={{ background: linkColor }}></span>
        <span style={{ background: linkColor }}></span>
        <span style={{ background: linkColor }}></span>
      </div>
    </nav>
  );
};

export default Navbar;
