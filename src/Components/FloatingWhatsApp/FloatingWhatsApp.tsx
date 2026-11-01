import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import "./FloatingWhatsApp.css";

/**
 * Tombol chat WhatsApp yang mengambang (fixed) di pojok kanan bawah.
 *
 * Cara pakai nanti (belum perlu dilakukan sekarang):
 * render komponen ini SEKALI di root App.tsx, sejajar dengan <Routes>,
 * supaya muncul di semua halaman tanpa perlu ditaruh ulang di tiap
 * halaman. Untuk sekarang, file ini berdiri sendiri dulu.
 */

interface FloatingWhatsAppProps {
  /** Nomor WhatsApp tujuan, format 62xxxxxxxxxx (tanpa "+" / "0" di depan) */
  phoneNumber?: string;
  /** Pesan default yang otomatis terisi saat chat dibuka */
  message?: string;
  /** Teks label di sebelah ikon (disembunyikan otomatis di layar HP) */
  label?: string;
}

export default function FloatingWhatsApp({
  phoneNumber = "6281410920552",
  message = "Halo, saya mau tanya-tanya soal layanan sedot WC ToiletKU",
  label = "Pesan Sekarang",
}: FloatingWhatsAppProps) {
  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float-btn"
      aria-label="Chat via WhatsApp"
    >
      <WhatsAppIcon />
      <span className="wa-float-label">{label}</span>
    </a>
  );
}
