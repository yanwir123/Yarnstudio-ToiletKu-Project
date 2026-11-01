import React, { useState } from "react";
import "./Contact.css";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaMapMarkedAlt,
} from "react-icons/fa";

// 🔧 GANTI DI SINI kalau nomor WA / email berubah, otomatis kepakai di semua tempat
const WHATSAPP_NUMBER = "6281410920552"; // format internasional dari 0814-1092-0552
const WHATSAPP_DISPLAY = "0814-1092-0552";
const CONTACT_EMAIL = "yudhonugroho130779@gmail.com";

interface FormState {
  nama: string;
  whatsapp: string;
  alamat: string;
  layanan: string;
  jadwal: string;
  keterangan: string;
}

const initialForm: FormState = {
  nama: "",
  whatsapp: "",
  alamat: "",
  layanan: "",
  jadwal: "",
  keterangan: "",
};

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialForm);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Susun isi pesan dari data form, dipakai bareng oleh WhatsApp & Email
  const buildMessage = () => {
    return (
      `Halo ToiletKU, saya ingin memesan layanan:\n\n` +
      `Nama: ${form.nama || "-"}\n` +
      `No. WhatsApp: ${form.whatsapp || "-"}\n` +
      `Alamat Lokasi: ${form.alamat || "-"}\n` +
      `Jenis Layanan: ${form.layanan || "-"}\n` +
      `Jadwal Kunjungan: ${form.jadwal || "-"}\n` +
      `Keterangan: ${form.keterangan || "-"}`
    );
  };

  // Submit utama -> buka chat WhatsApp dengan pesan sudah terisi otomatis.
  // Catatan: WhatsApp click-to-chat tidak bisa auto-kirim tanpa user pencet
  // tombol "Send" di WhatsApp-nya sendiri (ini batasan dari WhatsApp, bukan kode).
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = buildMessage();
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  // Opsi kedua -> buka aplikasi email default user, subjek & isi sudah terisi.
  // Catatan: kirim email otomatis dari browser tanpa user pencet "Send" butuh
  // layanan backend/pihak ketiga (mis. EmailJS/Formspree), bukan sesuatu yang
  // bisa dilakukan React murni di sisi client.
  const handleEmailFallback = () => {
    const message = buildMessage();
    const subject = `Permintaan Layanan${form.nama ? " - " + form.nama : ""}`;
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section className="contact">
      {/* HERO */}
      <div className="contact-hero">
        <div className="contact-text">
          <h1>Hubungi Kami</h1>

          <p>
            Membutuhkan jasa sedot WC, saluran mampet, atau perawatan septic
            tank? Tim <strong>ToiletKU</strong> siap melayani wilayah Tangerang
            dan Serang dengan cepat, profesional, dan bergaransi.
          </p>
        </div>
      </div>

      <div className="contact-container">
        {/* LEFT */}
        <div className="contact-info">
          <h2>Informasi Kontak</h2>

          <p>
            Hubungi kami kapan saja untuk konsultasi maupun pemesanan layanan.
            Tim kami siap datang ke lokasi Anda.
          </p>

          <div className="info-item">
            <strong>
              <FaPhoneAlt /> Telepon / WhatsApp
            </strong>

            <span>{WHATSAPP_DISPLAY}</span>
          </div>

          <div className="info-item">
            <strong>
              <FaEnvelope /> Email
            </strong>

            <span>{CONTACT_EMAIL}</span>
          </div>

          <div className="info-item">
            <strong>
              <FaClock /> Jam Operasional
            </strong>

            <span>24 Jam Non Stop</span>
          </div>

          <div className="info-item">
            <strong>
              <FaMapMarkedAlt /> Kantor Operasional
            </strong>

            <span>
              Tigaraksa, Kabupaten Tangerang <br />
              Ciruas, Kabupaten Serang, Banten
            </span>
          </div>

          <div className="info-item">
            <strong>
              <FaMapMarkerAlt /> Area Layanan
            </strong>

            <span>
              Kota Tangerang <br />
              Kabupaten Tangerang <br />
              Tangerang Selatan <br />
              Kota Serang <br />
              Kabupaten Serang
            </span>
          </div>

          <div className="info-item">
            <strong>Media Sosial</strong>

            <div className="social-icons">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp />
              </a>

              <a
                href="https://instagram.com/toiletku.id"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>

              <a
                href="https://facebook.com/toiletku.id"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebook />
              </a>

              <a href={`mailto:${CONTACT_EMAIL}`}>
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="contact-form">
          <h2>Form Pemesanan</h2>

          <form className="form-grid" onSubmit={handleSubmit}>
            <div>
              <label>Nama Lengkap</label>
              <input
                type="text"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>

            <div>
              <label>No. WhatsApp</label>
              <input
                type="tel"
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                placeholder="08xxxxxxxxxx"
                required
              />
            </div>

            <div className="full-width">
              <label>Alamat Lokasi</label>

              <textarea
                name="alamat"
                rows={3}
                value={form.alamat}
                onChange={handleChange}
                placeholder="Masukkan alamat lengkap lokasi"
                required
              />
            </div>

            <div>
              <label>Jenis Layanan</label>

              <select
                name="layanan"
                value={form.layanan}
                onChange={handleChange}
                required
              >
                <option value="">Pilih Layanan</option>

                <option>Sedot WC</option>

                <option>Sedot Septic Tank</option>

                <option>Saluran Mampet</option>

                <option>Perbaikan Septic Tank</option>

                <option>Pembuatan Septic Tank</option>

                <option>Lainnya</option>
              </select>
            </div>

            <div>
              <label>Jadwal Kunjungan</label>

              <input
                type="date"
                name="jadwal"
                value={form.jadwal}
                onChange={handleChange}
              />
            </div>

            <div className="full-width">
              <label>Keterangan</label>

              <textarea
                name="keterangan"
                rows={5}
                value={form.keterangan}
                onChange={handleChange}
                placeholder="Jelaskan kebutuhan atau kendala yang dialami..."
              />
            </div>

            <div className="full-width form-actions">
              <button type="submit" className="btn-primary">
                <FaWhatsapp /> Kirim via WhatsApp
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={handleEmailFallback}
              >
                <FaEnvelope /> Kirim via Email
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
