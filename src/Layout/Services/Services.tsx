import { Link } from "react-router-dom";
import "./Services.css";

// IMPORT GAMBAR LAYANAN (1 - 5)
import service1 from "../../assets/Picture/Penyedotan Septick Tank.jpeg";
import service2 from "../../assets/Picture/Penyedotan Limbah Industri.jpeg";
import service3 from "../../assets/Picture/Pengurasan Septick Tank.jpeg";
import service4 from "../../assets/Picture/Penyedotan Limbah Ternak.jpeg";
import service5 from "../../assets/Picture/Pengolahan Limbah Tinja.jpeg"; // 🔧 siapkan file ini, lalu ganti placeholder di bawah

// IMPORT VIDEO LAYANAN (6 - 10)
// 🔧 siapkan file-file video ini di folder assets/Video, lalu sesuaikan nama filenya
import service6 from "../../assets/Videos/vid-6.mp4";
import service7 from "../../assets/Videos/vid-7.mp4";
import service8 from "../../assets/Videos/vid-8.mp4";
import service9 from "../../assets/Videos/vid-9.mp4";
import service10 from "../../assets/Videos/vid-10.mp4";

import heroImage from "../../assets/Picture/logo fiks no bg.png"; // ganti sesuai file banner armada ToiletKU

interface ServiceItem {
  title: string;
  description: string;
  points: string[];
  image?: string; // dipakai untuk layanan 1 - 5
  video?: string; // dipakai untuk layanan 6 - 10
  poster?: string; // opsional: gambar cover sebelum video diputar
}

const servicesData: ServiceItem[] = [
  {
    title: "Penyedotan WC & Kelancaran Saluran",
    description:
      "Layanan sedot WC dan penanganan saluran mampet agar sistem sanitasi rumah maupun tempat usaha Anda kembali lancar dengan cepat.",
    points: [
      "Sedot WC cepat, bersih, dan bebas bau",
      "Mengatasi saluran mampet & tersumbat",
      "Untuk rumah, ruko, hingga kos-kosan",
    ],
    image: service1,
  },
  {
    title: "Penyedotan Limbah Industri & Pabrik",
    description:
      "Penanganan limbah cair dari kegiatan industri dan pabrik, dikerjakan sesuai prosedur keselamatan kerja dan ramah lingkungan.",
    points: [
      "Ditangani teknisi berpengalaman",
      "Sesuai standar keselamatan industri",
      "Proses pembuangan limbah aman & legal",
    ],
    image: service2,
  },
  {
    title: "Pengurasan Lumpur Septic Tank",
    description:
      "Pengurasan lumpur dan endapan septic tank secara menyeluruh untuk menjaga daya tampung dan mencegah septic tank penuh mendadak.",
    points: [
      "Pengurasan tuntas sampai dasar tangki",
      "Mesin vacuum bertekanan tinggi",
      "Mencegah septic tank cepat penuh",
    ],
    image: service3,
  },
  {
    title: "Perngejaan Limbah Ternak",
    description:
      "Pengerjaan Pembersihan Kotoran Ternak, Pembuangan Limbah Ternak, dan Pembuatan Saluran Limbah Ternak agar lingkungan peternakan tetap bersih dan sehat.",
    points: [
      "Limbah Diolah dengan benar & aman",
      "Menggunakan Alat moderen & efisien",
      "Pengerjaan Rapih dan Bersih Maksimal",
    ],
    image: service4,
  },
  {
    title: "Pengeolahan Limbah Secara Profesional dan Ramah Lingkungan",
    description:
      "Pembuangan Limbah Rumah Tangga, Pembuangan Limbah Industri, dan Pembuangan Limbah Ternak dengan prosedur yang aman, efisien, dan ramah lingkungan.",
    points: [
      "Limbah diolah dipengolahan limbah resmi",
      "pengolahan limbah sesuai standar lingkungan",
      "tidak asal dibuang sembarangan ke sungai atau tanah",
    ],
    image: service5,
  },
  {
    title: "Penyedotan Limbah Non Kimia Produksi Pabrik",
    description:
      "Jasa penyedotan limbah non kimia dari produksi pabrik dengan prosedur yang aman dan efisien.",
    points: [
      "Penyedotan limbah non kimia secara profesional",
      "Pengolahan limbah sesuai standar lingkungan",
      "Tim teknisi berpengalaman dan terlatih",
    ],
    video: service6,
  },
  {
    title: "Perbaikan & Instalasi Pipa Saluran",
    description:
      "Layanan perbaikan pipa bocor, mampet, atau rusak, serta instalasi jalur pipa saluran baru agar sistem pembuangan rumah Anda berfungsi optimal.",
    points: [
      "Deteksi kebocoran & sumbatan akurat",
      "Instalasi pipa baru rapi & presisi",
      "Material pipa berkualitas & tahan lama",
    ],
    video: service7,
  },
  {
    title: "Layanan Darurat 24 Jam",
    description:
      "Siap siaga menangani kondisi darurat sanitasi seperti septic tank meluap atau saluran tersumbat mendadak, kapan pun Anda membutuhkan.",
    points: [
      "Respon cepat siang maupun malam",
      "Tim teknisi standby setiap hari",
      "Penanganan cepat & tidak ribet",
    ],
    video: service8,
  },
  {
    title: "Pembersihan Grease Trap / Perangkap Lemak",
    description:
      "Pembersihan dan pengurasan grease trap untuk restoran, kantin, dan usaha kuliner agar saluran pembuangan bebas dari sumbatan lemak.",
    points: [
      "Mencegah bau tak sedap di dapur",
      "Menjaga saluran tetap lancar",
      "Cocok untuk restoran, kafe & kantin",
    ],
    video: service9,
  },
  {
    title: "Penyedotan Lemak Restoran",
    description:
      "Layanan penyedotan lemak dari saluran pembuangan restoran, kafe, dan usaha kuliner agar sistem pembuangan tetap bersih dan bebas sumbatan.",
    points: [
      "Melakukan Pelancaran Saluran Pembuangan Lemak",
      "Pembersihan Lemak Menumpuk di Saluran Pembuangan",
      "Pengurasan Lemak di Saluran Pembuangan Restoran, Kafe, dan Usaha Kuliner",
    ],
    video: service10,
  },
];

const Services = () => {
  return (
    <section className="services">
      {/* HERO */}
      <div className="services-hero">
        <div className="hero-image">
          <img src={heroImage} alt="Layanan ToiletKU" />
        </div>
        <div className="hero-text">
          <h1>Layanan Kami</h1>
          <p>
            <strong>ToiletKU</strong> menghadirkan solusi sanitasi dan
            pengelolaan limbah menyeluruh — mulai dari sedot WC rumah tangga,
            penanganan limbah pabrik, pengurasan septic tank, hingga pembuatan
            septic tank dan perbaikan pipa saluran, dikerjakan oleh tim
            profesional dan berpengalaman.
          </p>
          <Link to="/contact" className="hero-cta">
            Hubungi Kami
          </Link>
        </div>
      </div>

      {/* SERVICES LIST */}
      <div className="services-list">
        {servicesData.map((service, index) => (
          <div
            key={service.title}
            className={`service-row ${index % 2 !== 0 ? "reverse" : ""}`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className="service-text">
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <ul>
                {service.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="service-image">
              {service.video ? (
                <video
                  src={service.video}
                  poster={service.poster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                />
              ) : (
                <img src={service.image} alt={service.title} />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
