import "./About.css";

// 🔧 FIX: foto di-import sebagai module (bukan ditulis sebagai string path di src="...").
// Kalau cuma string, bundler (Vite/CRA/Webpack) TIDAK ikut resolve path-nya, jadi browser
// nyoba fetch relatif ke URL halaman saat ini -> selalu 404 / gambar kosong.
// Dengan di-import begini, bundler yang urus resolve lokasi file & bundling asetnya.
import unitTragaImg from "../../assets/Picture/Unit Oprasional.jpeg";
import timToiletkuImg from "../../assets/Picture/Banner.png";
import reviewPhotoPenyedotanCS from "../../assets/Picture/Penyedotan Rumah CS.jpeg";
import reviewPhotoPengurasanSeptic from "../../assets/Picture/Pengurasan Septick Tank 2.jpeg";
import reviewPhotoSepticPenuh from "../../assets/Picture/Septick Tank Penuh.jpeg";
import reviewPhotoPelancaranCloset from "../../assets/Picture/Pelancaran Saluran Closet.jpeg";

interface RatingCategory {
  label: string;
  value: number;
}

interface ReviewPhoto {
  src: string;
  alt: string;
}

// 🔧 Angka rating di bawah ini CONTOH — ganti sesuai data ulasan pelanggan asli ToiletKU
const ratingCategories: RatingCategory[] = [
  { label: "Pelayanan", value: 4.9 },
  { label: "Kecepatan Unit Sampai", value: 4.8 },
  { label: "Kecepatan Pengerjaan", value: 4.8 },
  { label: "Kerapihan & Kebersihan Pengerjaan", value: 5.0 },
  { label: "Hasil Pengerjaan yang Memuaskan", value: 4.9 },
];

const overallRating: number = 4.9;

// 🔧 GANTI import di atas sesuai foto hasil pengerjaan/review kamu (maks 4 foto)
const reviewPhotos: ReviewPhoto[] = [
  { src: reviewPhotoPenyedotanCS, alt: "Hasil pengerjaan ToiletKU 1" },
  { src: reviewPhotoPengurasanSeptic, alt: "Hasil pengerjaan ToiletKU 2" },
  { src: reviewPhotoSepticPenuh, alt: "Hasil pengerjaan ToiletKU 3" },
  { src: reviewPhotoPelancaranCloset, alt: "Hasil pengerjaan ToiletKU 4" },
];

interface StarRatingProps {
  value: number;
}

// Komponen bintang rating, mendukung nilai desimal (mis. 4.8) lewat teknik fill persentase
const StarRating = ({ value }: StarRatingProps) => (
  <span className="stars" aria-label={`Rating ${value} dari 5`}>
    <span
      className="stars-fill"
      style={{ width: `${(value / 5) * 100}%` }}
    ></span>
  </span>
);

const About = () => {
  return (
    <section className="about">
      {/* HERO BACKGROUND */}
      <div className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <h1>TENTANG KAMI</h1>
          <div className="line"></div>
          <p>
            <strong>ToiletKU</strong> adalah penyedia jasa sedot WC, limbah
            pabrik, dan lemak industri yang profesional, melayani kebutuhan
            rumah tangga hingga skala industri. Selain sedot, kami juga melayani
            pembuatan septic tank baru, pembuatan area resapan, serta perbaikan
            dan pergantian pipa saluran.
          </p>
        </div>
      </div>

      {/* VISI MISI */}
      <div className="visi-misi">
        <div className="visi">
          <h2>Visi</h2>
          <div className="line-small"></div>
          <p>
            Menjadi perusahaan jasa sanitasi dan pengelolaan limbah terpercaya,
            baik untuk rumah tangga maupun industri, yang dikenal atas
            kecepatan, kebersihan, dan profesionalisme di setiap pengerjaan.
          </p>
        </div>

        <div className="misi">
          <h2>Misi</h2>
          <div className="line-small"></div>
          <ul>
            <li>
              Memberikan layanan sedot WC, limbah pabrik, dan lemak industri
              yang cepat, higienis, dan bebas bau.
            </li>

            <li>
              Menyediakan jasa pembuatan septic tank dan area resapan baru
              sesuai standar teknis dan kebutuhan lokasi.
            </li>

            <li>
              Melayani perbaikan dan pergantian pipa saluran dengan pengerjaan
              yang rapi dan tahan lama.
            </li>

            <li>
              Melayani pelanggan rumah tangga maupun industri dengan harga
              transparan dan tanpa biaya tersembunyi.
            </li>

            <li>
              Siap siaga 24 jam untuk penanganan darurat di mana pun Anda
              berada.
            </li>

            <li>
              Menjaga kebersihan lingkungan melalui proses pembuangan dan
              pengolahan limbah yang aman sesuai prosedur.
            </li>
          </ul>
        </div>
      </div>

      {/* UNIT OPERASIONAL */}
      <div className="unit-section">
        <div className="unit-text">
          <h2>Unit Operasional Kami</h2>
          <div className="line-small"></div>
          <p>
            ToiletKU mengoperasikan armada{" "}
            <strong>Mitsubishi Traga Engkel</strong> dengan kapasitas tangki{" "}
            <strong>3 m³ (3 kubik)</strong>, didukung mesin vacuum bertekanan
            tinggi dan peralatan kerja yang terawat serta profesional.
          </p>
          <ul className="unit-points">
            <li>Pengerjaan lebih cepat dan efisien</li>
            <li>Hasil kerja rapi tanpa ceceran</li>
            <li>Bersih tuntas hingga ke sumber masalah</li>
            <li>Tidak menimbulkan bekas bau setelah pengerjaan</li>
          </ul>
        </div>

        <div className="unit-photo">
          <img
            src={unitTragaImg}
            alt="Unit operasional Mitsubishi Traga Engkel ToiletKU"
          />
        </div>
      </div>

      {/* PENGELOLA — didesain ulang biar lebih estetik (foto + statistik, bukan blok teks panjang) */}
      <div className="pengelola-section">
        <div className="pengelola-text">
          <h2>Tim di Balik ToiletKU</h2>
          <div className="line-small"></div>
          <p>
            ToiletKU dikelola oleh tim profesional yang berpengalaman di bidang
            jasa sanitasi, pengelolaan limbah, dan instalasi saluran. Setiap
            anggota tim dibekali pelatihan teknis dan standar keselamatan kerja,
            sehingga setiap pengerjaan dapat ditangani dengan aman, rapi, dan
            tepat waktu.
          </p>
          <p>
            Kami percaya kepercayaan pelanggan dibangun dari konsistensi
            kualitas layanan — komunikasi yang jelas, harga transparan, dan
            hasil kerja yang bisa dipertanggungjawabkan di setiap proyek.
          </p>

          {/* 🔧 Angka di bawah ini CONTOH — sesuaikan dengan data asli ToiletKU */}
          <div className="pengelola-stats">
            <div className="stat-item">
              <span className="stat-number">5+</span>
              <span className="stat-label">Tahun Pengalaman</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Pelanggan Terlayani</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24 Jam</span>
              <span className="stat-label">Siap Siaga</span>
            </div>
          </div>
        </div>

        <div className="pengelola-photo">
          <img src={timToiletkuImg} alt="Tim profesional ToiletKU" />
        </div>
      </div>

      {/* KENAPA MEMILIH KAMI */}
      <div className="about-section info-box">
        <h2>Kenapa Memilih ToiletKU?</h2>
        <p>
          <strong>ToiletKU</strong> melayani kebutuhan sanitasi dan pengelolaan
          limbah secara menyeluruh — mulai dari sedot WC rumah tangga, sedot
          limbah pabrik, sedot lemak industri, hingga pembangunan septic tank
          dan area resapan baru. Setiap teknisi kami terlatih menangani proyek
          skala kecil maupun industri, sehingga pengerjaan tetap rapi, efisien,
          dan sesuai standar keselamatan kerja.
        </p>

        <p>
          Kami menggunakan armada mobil tangki dan mesin vacuum bertekanan
          tinggi yang terawat, sehingga proses penyedotan berlangsung cepat,
          bersih, dan tanpa ceceran. Seluruh limbah diproses dan dibuang sesuai
          prosedur yang aman bagi lingkungan.
        </p>

        <p>
          Dengan sistem pemesanan yang mudah, harga transparan, serta layanan
          customer service yang responsif, ToiletKU berkomitmen menjadi mitra
          sanitasi dan pengelolaan limbah terpercaya — untuk rumah, ruko,
          kos-kosan, hingga fasilitas pabrik di sekitar Anda.
        </p>
      </div>

      {/* RATING & ULASAN PELANGGAN */}
      <div className="review-section">
        <div className="about-section">
          <h2>Penilaian & Ulasan Pelanggan</h2>
          <div className="line-small"></div>
        </div>

        <div className="review-content">
          <div className="review-overall">
            <span className="review-overall-number">
              {overallRating.toFixed(1)}
            </span>
            <StarRating value={overallRating} />
            <span className="review-overall-caption">
              rata-rata dari ulasan pelanggan kami
            </span>
          </div>

          <div className="review-categories">
            {ratingCategories.map((item) => (
              <div className="review-category" key={item.label}>
                <span className="category-label">{item.label}</span>
                <div className="category-rating">
                  <StarRating value={item.value} />
                  <span className="category-value">
                    {item.value.toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="review-gallery">
          {reviewPhotos.map((photo) => (
            <div className="review-photo" key={photo.alt}>
              <img src={photo.src} alt={photo.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
