import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardHeader,
  CardActions,
  Avatar,
  IconButton,
} from "@mui/material";

// MUI Icons
import StarIcon from "@mui/icons-material/Star";
import GroupsIcon from "@mui/icons-material/Groups";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import EngineeringIcon from "@mui/icons-material/Engineering";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SavingsIcon from "@mui/icons-material/Savings";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PhoneIcon from "@mui/icons-material/Phone";

// Components
import LogoLoop from "../../Components/Logo/LogoLoop";
import BeamsBackground from "../../Components/BeamsBackground/BeamsBackground";

/* =========================================================
   FOTO ASET
   PENTING — INI PENYEBAB FOTO TIDAK MUNCUL SEBELUMNYA:
   String path seperti "../../assets/Picture/nama.jpeg" TIDAK akan
   pernah ter-resolve oleh bundler (Vite/CRA). File di dalam folder
   `src/` WAJIB diambil lewat `import`, bukan ditulis sebagai string
   biasa di object data.

   ATURAN PENTING LAIN (permintaan terbaru): SETIAP foto di bawah ini
   HANYA dipakai di SATU tempat saja di seluruh halaman — tidak boleh
   dipakai ulang di section lain. Makanya jumlah foto yang tersedia
   (7 foto) langsung menentukan berapa kartu Layanan yang bisa punya
   foto asli; sisanya yang tidak kebagian foto memakai video (lihat
   bagian VIDEO ASET) atau placeholder "Dokumentasi Segera Hadir".
========================================================= */
import imgPelancaranSaluranCloset from "../../assets/Picture/Pelancaran Saluran Closet.jpeg";
import imgPenyedotanRumahCustomer from "../../assets/Picture/Penyedotan Rumah Customer.jpeg";
import imgSepticTankPenuh from "../../assets/Picture/Septick Tank Penuh.jpeg";
import imgPengurasanSepticTank from "../../assets/Picture/Pengurasan Septick Tank.jpeg";
import imgPengolahanLimbahTinja from "../../assets/Picture/Pengolahan Limbah Tinja.jpeg";
import imgPenyedotanLimbahIndustri from "../../assets/Picture/Penyedotan Limbah Industri.jpeg";
import imgSedotLimbahProduksi from "../../assets/Picture/Sedot Limbah Produksi.jpeg";
import imgBanner from "../../assets/Picture/Banner.png";

/* =========================================================
   VIDEO ASET
   ---------------------------------------------------------
   File video ini sekarang ditaruh di `src/assets/Videos/`, jadi
   SAMA seperti foto di atas — WAJIB lewat `import`, bukan string
   path biasa ("../../assets/Videos/vid-1.mp4" saja TIDAK akan
   ter-resolve). Itu penyebab video sebelumnya tidak muncul.

   Catatan: menaruh video di `src/` membuatnya ikut ter-bundle oleh
   Vite (build jadi lebih berat dibanding taruh di `public/videos/`
   dan pakai path string "/videos/nama.mp4"). Untuk sekarang tetap
   dipakai lewat import supaya konsisten dengan lokasi file yang
   sudah ada; kalau nanti ukuran video besar dan build terasa lambat,
   pertimbangkan pindah ke `public/videos/`.

   PENTING soal nama file: "vid-1.mp4" s/d "vid-4.mp4" tidak
   menjelaskan isinya. Saya urutkan vid-1 → vid-4 sesuai urutan yang
   ada, dan menempatkannya sesuai urutan data di bawah. TOLONG DICEK
   ULANG apakah isi tiap video sudah sesuai dengan layanan/testimoni
   yang dituju — kalau tertukar, tinggal tukar variabel di
   `servicesData` / `workResults` di bawah, tidak perlu ubah bagian
   lain.

   Setiap video di sini, sama seperti foto, HANYA dipakai di SATU
   tempat: 1 video dipakai di kartu Layanan "Pembuatan Septic Tank
   Baru" (karena kartu itu tidak kebagian foto), 3 video sisanya
   dipakai di 3 dari 4 kartu "Rating & Hasil Kerja".
========================================================= */
import videoVid1 from "../../assets/Videos/vid-1.mp4";
import videoVid2 from "../../assets/Videos/vid-2.mp4";
import videoVid3 from "../../assets/Videos/vid-3.mp4";
import videoVid4 from "../../assets/Videos/vid-4.mp4";
import videoVid5 from "../../assets/Videos/vid-5.mp4";

/* =========================================================
   KONTAK — WHATSAPP & TELEPON
   ---------------------------------------------------------
   Ganti nomor di bawah ini kalau nomor WA/telepon berubah.
   Format WAJIB: kode negara tanpa tanda "+", tanpa spasi/strip.
========================================================= */
const WHATSAPP_NUMBER = "6281410920552"; // Nomor asli ToiletKu: 0814-1092-0552

// Pesan default yang otomatis terisi begitu customer membuka chat
// WhatsApp dari tombol "Pesan Sekarang" / "Hubungi via WhatsApp" di
// LUAR kartu layanan (hero, CTA section, dsb). Kartu layanan punya
// pesan sendiri yang lebih singkat — lihat `serviceWaMessage` di
// dalam `ServicesCard` di bawah.
const WHATSAPP_DEFAULT_MESSAGE =
  "Apakah saya bisa menggunakan layanan sedot wc ToiletKu ini?";

// Helper untuk generate link wa.me dengan pesan custom. Dipakai juga
// oleh tiap ServicesCard supaya pesan otomatis menyebutkan nama
// layanan spesifik yang diklik customer, bukan cuma pesan generik.
const buildWhatsAppLink = (message: string = WHATSAPP_DEFAULT_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const WHATSAPP_LINK = buildWhatsAppLink();

/* =========================================================
   TELEPON LANGSUNG
   ---------------------------------------------------------
   PENTING — batasan yang perlu diketahui: WhatsApp tidak
   menyediakan link resmi untuk langsung memulai PANGGILAN SUARA
   di dalam aplikasi WhatsApp dari browser/website. Link "wa.me"
   yang resmi hanya bisa dipakai untuk membuka CHAT, bukan call.

   Karena itu, tombol "Telepon" di bawah memakai link "tel:" yang
   membuka aplikasi telepon/dialer bawaan HP customer untuk
   menelepon LANGSUNG ke nomor yang sama — lewat jalur telepon
   seluler biasa, bukan voice call di dalam aplikasi WhatsApp.
========================================================= */
const PHONE_LINK = `tel:+${WHATSAPP_NUMBER}`;

/* =========================================================
   SERVICES CARD COMPONENT
   ---------------------------------------------------------
   Media kartu sekarang punya 3 tingkat fallback:
   1. Kalau `video` diisi (dan berhasil dimuat) → tampilkan video
      preview (autoplay, muted, loop).
   2. Kalau tidak ada video (atau videonya gagal dimuat) tapi
      `image` diisi → tampilkan foto seperti biasa.
   3. Kalau dua-duanya tidak ada → tampilkan placeholder rapi
      "Dokumentasi Segera Hadir" (tidak pernah pinjam foto/video
      milik kartu lain).
========================================================= */
interface ServicesCardProps {
  id: number;
  title: string;
  image?: string;
  video?: string;
  desc: string;
  detail: string;
  rating: number;
  customers: number;
}

const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(0) + "K";
  return num;
};

const ServicesCard = ({
  id,
  title,
  image,
  video,
  desc,
  rating,
  customers,
}: ServicesCardProps) => {
  const navigate = useNavigate();
  const [cardVideoFailed, setCardVideoFailed] = useState(false);

  // Klik judul / media kartu tetap mengarah ke halaman detail layanan,
  // TERPISAH dari tombol "Pesan Sekarang" & "Telepon" yang khusus order.
  const goToServiceDetail = () => {
    navigate(`/services/${id}`);
  };

  // 🔧 DIUBAH: pesan WA di tombol "Pesan Sekarang" pada kartu layanan
  // sekarang cuma 1 kalimat pendek dan SAMA untuk semua kartu (tidak
  // lagi menyebut nama layanan). Dibangun dari WHATSAPP_DEFAULT_MESSAGE
  // supaya teksnya tidak dobel ditulis di banyak tempat — kalau mau
  // ganti kata-katanya, cukup ubah WHATSAPP_DEFAULT_MESSAGE di atas.
  const serviceWaMessage = `Halo ToiletKu, ${WHATSAPP_DEFAULT_MESSAGE}`;
  const serviceWaLink = buildWhatsAppLink(serviceWaMessage);

  return (
    <Card className="service-card">
      <CardHeader
        avatar={<Avatar>{title.charAt(0)}</Avatar>}
        title={title}
        onClick={goToServiceDetail}
        style={{ cursor: "pointer" }}
      />

      {video && !cardVideoFailed ? (
        <video
          src={video}
          muted
          autoPlay
          loop
          playsInline
          onClick={goToServiceDetail}
          onError={() => setCardVideoFailed(true)}
          style={{
            width: "100%",
            height: 180,
            objectFit: "cover",
            cursor: "pointer",
            display: "block",
          }}
        />
      ) : image ? (
        <CardMedia
          component="img"
          height="180"
          image={image}
          alt={title}
          onClick={goToServiceDetail}
          style={{ cursor: "pointer" }}
        />
      ) : (
        <div
          onClick={goToServiceDetail}
          style={{
            height: 180,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            background: "#f2f2f2",
            color: "#8a8a8a",
            cursor: "pointer",
          }}
        >
          <PhotoCameraOutlinedIcon />
          <span style={{ fontSize: 12 }}>Dokumentasi Segera Hadir</span>
        </div>
      )}

      <CardContent>
        <Typography variant="body2">{desc}</Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="rating" disableRipple>
          <StarIcon />
          <span className="icon-text">{rating.toFixed(1)}</span>
        </IconButton>

        <IconButton aria-label="pelanggan terlayani" disableRipple>
          <GroupsIcon />
          <span className="icon-text">{formatNumber(customers)}+</span>
        </IconButton>

        {/* Order masuk ke WhatsApp chat, dengan pesan default singkat
            yang menyebut nama layanan ini. */}
        <a
          href={serviceWaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="service-card-review-btn"
        >
          Pesan Sekarang
        </a>

        {/* Order lewat telepon langsung (tel:) ke nomor yang sama. */}
        <IconButton
          aria-label={`Telepon untuk layanan ${title}`}
          href={PHONE_LINK}
          disableRipple
        >
          <PhoneIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

/* =========================================================
   IMAGE WITH FALLBACK — dipakai sebagai poster/fallback video
   di kartu "Rating & Hasil Kerja".

   `src` sekarang OPSIONAL: kalau memang belum ada foto sama sekali
   untuk item ini (supaya tidak pinjam foto section lain), komponen
   ini langsung menampilkan placeholder rapi tanpa perlu mencoba
   me-load gambar apa pun.
========================================================= */
interface WorkPhotoProps {
  src?: string;
  alt: string;
}

const WorkPhoto = ({ src, alt }: WorkPhotoProps) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="card-photo-fallback">
        <div className="card-photo-fallback-icon">
          <PhotoCameraOutlinedIcon />
        </div>
        <div className="card-photo-fallback-text">
          <span className="card-photo-fallback-title">Foto Segera Hadir</span>
          <span className="card-photo-fallback-sub">
            Dokumentasi lapangan menyusul
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="card-photo-img"
      onError={() => setFailed(true)}
    />
  );
};

/* =========================================================
   WORK VIDEO CARD
   ---------------------------------------------------------
   Menampilkan video dokumentasi hasil kerja dengan aturan:
   - Autoplay begitu kartu ini menjadi kartu aktif (`isActive`).
   - Setelah 10 detik berjalan, video otomatis di-pause dan
     ditampilkan overlay dengan tombol "Lanjut Tonton".
   - Klik tombol akan melanjutkan video dari titik terakhir.
   - Kalau video selesai (onEnded), otomatis pindah ke item
     berikutnya lewat `onVideoEnded`.
   - Kalau file video gagal dimuat, ATAU memang belum ada video sama
     sekali untuk item ini (`video` undefined — supaya tidak pinjam
     video section lain), otomatis jatuh ke foto/placeholder lewat
     `WorkPhoto`.

   CATATAN PERBAIKAN WARNING "setState in effect":
   Reset `showContinueBtn` dilakukan saat RENDER (dibandingkan dengan
   `prevIsActive`), bukan dipanggil langsung di badan `useEffect` —
   supaya tidak memicu cascading render. Effect di bawah cuma dipakai
   untuk efek samping asli: memutar video & memasang timer.
   `setShowContinueBtn(true)` yang tersisa ada di dalam callback
   `setTimeout`, yang justru pola yang dianjurkan React.
========================================================= */
interface WorkVideoCardProps {
  video?: string;
  poster?: string;
  alt: string;
  isActive: boolean;
  onVideoEnded: () => void;
}

const WorkVideoCard = ({
  video,
  poster,
  alt,
  isActive,
  onVideoEnded,
}: WorkVideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showContinueBtn, setShowContinueBtn] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  // Lacak nilai `isActive` sebelumnya supaya reset tombol "Lanjut
  // Tonton" bisa dilakukan SAAT RENDER, bukan di dalam effect.
  const [prevIsActive, setPrevIsActive] = useState(isActive);
  if (isActive !== prevIsActive) {
    setPrevIsActive(isActive);
    if (isActive) {
      setShowContinueBtn(false);
    }
  }

  useEffect(() => {
    if (!isActive || !video || videoFailed) return;

    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.currentTime = 0;
      videoEl.play().catch(() => {
        // autoplay bisa ditolak browser kalau video belum siap / policy;
        // aman diabaikan, tombol "Lanjut Tonton" tetap bisa dipakai manual.
      });
    }

    const pauseTimer = setTimeout(() => {
      videoEl?.pause();
      setShowContinueBtn(true);
    }, 10000);

    return () => clearTimeout(pauseTimer);
  }, [isActive, video, videoFailed]);

  const handleContinue = () => {
    setShowContinueBtn(false);
    videoRef.current?.play().catch(() => {});
  };

  // Tidak ada video sama sekali untuk item ini, atau videonya gagal
  // dimuat → langsung ke foto/placeholder, tidak pernah pinjam aset
  // dari section lain.
  if (!video || videoFailed) {
    return <WorkPhoto src={poster} alt={alt} />;
  }

  return (
    <div className="work-video-wrap">
      <video
        ref={videoRef}
        src={video}
        poster={poster}
        muted
        playsInline
        className="work-video-el"
        onEnded={onVideoEnded}
        onError={() => setVideoFailed(true)}
      />
      {showContinueBtn && (
        <div className="work-video-overlay">
          <button
            type="button"
            className="work-video-continue-btn"
            onClick={handleContinue}
          >
            <PlayArrowIcon fontSize="small" />
            Lanjut Tonton
          </button>
        </div>
      )}
    </div>
  );
};

/* =========================================================
   DATA
========================================================= */
const heroTexts = [
  "Solusi Cepat Atasi WC Penuh & Mampet",
  "Sedot WC Higienis, Tuntas Tanpa Bau",
  "Teknisi Berpengalaman, Siap Datang Kapan Saja",
];

/* =========================================================
   LAYANAN (8 kartu)
   ---------------------------------------------------------
   Alokasi media — SETIAP foto/video di sini cuma dipakai SEKALI
   di seluruh halaman ini (tidak dipakai lagi di workResults):
   - 7 kartu → 7 foto asli yang tersedia, masing-masing unik.
   - 1 kartu ("Pembuatan Septic Tank Baru") → tidak kebagian foto,
     jadi dipakaikan VIDEO (videoVid1) sebagai medianya.
========================================================= */
const servicesData = [
  {
    id: 1,
    title: "Sedot WC Rumah Tangga",
    image: imgPelancaranSaluranCloset,
    desc: "Layanan sedot WC untuk rumah tinggal, cepat, bersih, dan bebas bau.",
    detail:
      "Kami menangani WC penuh dan mampet di rumah Anda menggunakan armada dan mesin sedot bertekanan tinggi, dikerjakan oleh teknisi berpengalaman agar hasil tuntas dan higienis.",
    rating: 4.9,
    customers: 12450,
  },
  {
    id: 2,
    title: "Sedot WC Kantor & Ruko",
    image: imgPenyedotanRumahCustomer,
    desc: "Layanan sedot WC untuk kantor, ruko, dan bangunan komersial.",
    detail:
      "Kami memahami kebutuhan operasional bisnis Anda, sehingga pengerjaan dilakukan cepat dan rapi tanpa mengganggu aktivitas kantor atau toko.",
    rating: 4.8,
    customers: 6870,
  },
  {
    id: 3,
    title: "Sedot Septic Tank",
    image: imgSepticTankPenuh,
    desc: "Pengurasan septic tank tuntas hingga ke dasar tangki.",
    detail:
      "Menggunakan mesin sedot bertekanan tinggi, lumpur dan limbah pada septic tank diangkat tuntas sehingga tangki kembali berfungsi optimal.",
    rating: 4.9,
    customers: 9320,
  },
  {
    id: 4,
    title: "Perbaikan Saluran Mampet",
    image: imgPengurasanSepticTank,
    desc: "Mengatasi saluran pembuangan dan pipa yang tersumbat.",
    detail:
      "Kami mendeteksi sumber penyumbatan dan membersihkan saluran pembuangan agar air kembali mengalir lancar tanpa merusak instalasi pipa.",
    rating: 4.7,
    customers: 5430,
  },
  {
    id: 5,
    title: "Pembuatan Septic Tank Baru",
    // Belum ada foto dokumentasi khusus milik layanan ini, dan supaya
    // TIDAK pinjam foto layanan lain, kartu ini pakai VIDEO sebagai
    // medianya. Cek lagi apakah isi vid-1.mp4 memang tentang
    // pembuatan septic tank baru — kalau salah, tinggal tukar dengan
    // videoVid2/3/4 (dan sesuaikan juga assignment di workResults).
    video: videoVid1,
    desc: "Pembuatan septic tank baru sesuai standar dan kebutuhan lahan.",
    detail:
      "Tim kami membantu merancang dan membangun septic tank baru yang sesuai dengan luas lahan dan jumlah pengguna, lengkap dengan konsultasi gratis.",
    rating: 4.8,
    customers: 3120,
  },
  {
    id: 6,
    title: "Penyedotan Limbah Cair & Got",
    image: imgPengolahanLimbahTinja,
    desc: "Penyedotan limbah cair, got, dan saluran air kotor.",
    detail:
      "Kami membantu membersihkan got dan saluran limbah cair di lingkungan rumah maupun industri agar tetap higienis dan bebas genangan.",
    rating: 4.7,
    customers: 4210,
  },
  {
    id: 7,
    title: "Pengurasan Kolam & Bak Air",
    image: imgPenyedotanLimbahIndustri,
    desc: "Pengurasan dan pembersihan kolam serta bak penampungan air.",
    detail:
      "Layanan pengurasan kolam dan bak air untuk menjaga kebersihan dan kualitas air di rumah maupun fasilitas umum.",
    rating: 4.8,
    customers: 2980,
  },
  {
    id: 8,
    title: "Maintenance & Perawatan Berkala",
    image: imgSedotLimbahProduksi,
    desc: "Paket perawatan rutin agar WC dan septic tank tetap prima.",
    detail:
      "Kami menyediakan jadwal perawatan berkala sehingga WC dan septic tank Anda terhindar dari penyumbatan mendadak di kemudian hari.",
    rating: 4.9,
    customers: 3760,
  },
];

const trustBadges = [
  { node: <AccessTimeFilledIcon />, title: "Siap 24 Jam" },
  { node: <EngineeringIcon />, title: "Teknisi Berpengalaman" },
  { node: <VerifiedUserIcon />, title: "Terpercaya" },
  { node: <SavingsIcon />, title: "Harga Terjangkau" },
  { node: <EnergySavingsLeafIcon />, title: "Ramah Lingkungan" },
  { node: <LocalShippingIcon />, title: "Armada Siap Datang" },
  { node: <ThumbUpIcon />, title: "Bebas Bau" },
  { node: <SupportAgentIcon />, title: "Respon Cepat" },
];

/* =========================================================
   RATING & HASIL KERJA (4 kartu)
   ---------------------------------------------------------
   Alokasi media — lanjutan dari penjelasan di servicesData:
   - 3 dari 4 kartu → videoVid2, videoVid3, videoVid4 (unik, TIDAK
     dipakai di section Layanan maupun di kartu lain di sini).
   - 1 kartu terakhir ("Sedot WC Kantor & Ruko") belum kebagian
     video/foto sama sekali (semua foto sudah "diambil" oleh section
     Layanan, dan video cuma tersisa 3). Daripada pinjam foto/video
     yang sudah dipakai di tempat lain, kartu ini sengaja dibiarkan
     tanpa `image`/`video` — otomatis akan menampilkan placeholder
     "Foto Segera Hadir". Tinggal isi `image`/`video` di sini begitu
     ada materi dokumentasi baru.
========================================================= */
interface WorkResult {
  image?: string;
  video?: string;
  title: string;
  location: string;
  rating: number;
  description: string;
  checklist: string[];
}

const workResults: WorkResult[] = [
  {
    video: videoVid2,
    title: "Sedot WC Rumah Tangga",
    location: "Ciledug, Tangerang",
    rating: 4.9,
    description:
      "Tim kami menangani sedot WC dan septic tank rumah tangga dari awal sampai selesai, mulai dari pengecekan kondisi tangki, penyedotan lumpur dengan mobil vacuum bertekanan tinggi, sampai memastikan saluran pembuangan lancar. Rata-rata pengerjaan selesai dalam 1 sampai 2 jam, tergantung ukuran dan kondisi tangki.",
    checklist: [
      "Pengecekan kondisi dan kapasitas tangki septik",
      "Penyedotan lumpur dengan mobil vacuum bertekanan tinggi",
      "Pemeriksaan kelancaran saluran pembuangan",
      "Pembersihan area kerja setelah pengerjaan selesai",
    ],
  },
  {
    video: videoVid3,
    title: "Sedot Septic Tank",
    location: "Bintaro, Tangerang Selatan",
    rating: 5.0,
    description:
      "Septic tank dikuras tuntas hingga ke dasar tangki memakai mesin bertekanan tinggi, sehingga daya tampung kembali optimal dan bebas bau.",
    checklist: [
      "Pengurasan lumpur tuntas hingga ke dasar tangki",
      "Penggunaan mesin sedot bertekanan tinggi",
      "Pengecekan ulang daya tampung dan fungsi tangki",
      "Pemastian area kerja bersih dan bebas bau",
    ],
  },
  {
    video: videoVid4,
    title: "Perbaikan Saluran Mampet",
    location: "Serpong, Tangerang Selatan",
    rating: 4.8,
    description:
      "Sumber penyumbatan pada saluran pembuangan berhasil dideteksi dan dibersihkan tanpa perlu membongkar instalasi pipa yang sudah ada.",
    checklist: [
      "Deteksi titik sumber penyumbatan saluran",
      "Pembersihan saluran tanpa membongkar instalasi pipa",
      "Pengujian aliran air setelah pengerjaan",
      "Pembersihan sisa kotoran di area kerja",
    ],
  },
  {
    // Sengaja tanpa image/video — lihat catatan alokasi media di atas.
    video: videoVid5,
    title: "Sedot WC Kantor & Ruko",
    location: "Cikokol, Tangerang",
    rating: 4.9,
    description:
      "Pengerjaan tetap rapi dan cepat meski di jam operasional, sehingga aktivitas kantor dan toko tidak terganggu selama proses berlangsung.",
    checklist: [
      "Koordinasi jadwal agar tidak mengganggu operasional",
      "Penyedotan WC dan septic tank secara cepat dan rapi",
      "Pengecekan akhir kebersihan area kerja",
      "Pemastian saluran berfungsi normal sebelum selesai",
    ],
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */
const Home = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeWork, setActiveWork] = useState(0);

  // Pindah ke item berikutnya. Dipakai baik oleh dot navigasi
  // maupun otomatis saat video selesai diputar (onEnded).
  const goToNextWork = () => {
    setActiveWork((prev) => (prev + 1) % workResults.length);
  };

  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(servicesData.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  /* HERO AUTO SLIDER */
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroTexts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const activeResult = workResults[activeWork];

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-header">
            <h1 className="hero-title">
              Jasa Sedot WC Profesional & Terpercaya
            </h1>
          </div>
          <p className="hero-subtitle">
            Solusi cepat dan efisien untuk masalah septic tank penuh serta
            saluran pembuangan tersumbat. Kami berkomitmen memberikan pelayanan
            yang bersih, rapi, dan tepat waktu. Teknisi kami siap datang cepat,
            bersih, dan bebas bau.
          </p>
          <div className="text-slider">
            {heroTexts.map((text, i) => (
              <p
                key={i}
                className={`slide-text ${i === heroIndex ? "active" : ""}`}
              >
                {text}
              </p>
            ))}
          </div>
          <div className="hero-buttons">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Pesan Sekarang
            </a>
            <a href="#services" className="btn-secondary">
              Lihat Layanan
            </a>
          </div>
        </div>
      </section>

      {/* TRUST BADGES SECTION */}
      <section className="logo-section">
        <div className="container">
          <LogoLoop logos={trustBadges} />
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta">
        <div className="beams-bg">
          <BeamsBackground />
        </div>
        <div className="cta-container">
          <h2 className="cta-title">
            WC Penuh atau Mampet? <br /> Kami Siap Membantu Sekarang
          </h2>
          <p className="cta-subtitle">
            Hubungi Jasa Sedot WC untuk layanan cepat, higienis, dan bergaransi.{" "}
            <br />
            Tim kami siap datang ke lokasi Anda kapan saja dibutuhkan.
          </p>
          <div className="cta-buttons">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn primary"
            >
              Hubungi via WhatsApp
            </a>
            {/* Order via telepon langsung — lihat catatan PHONE_LINK di
                atas soal kenapa ini pakai "tel:", bukan link WA. */}
            <a href={PHONE_LINK} className="cta-btn secondary">
              Telepon Sekarang
            </a>
            <a href="#services" className="cta-btn secondary">
              Lihat Layanan
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="services-combined" id="services">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Layanan Unggulan Kami</h2>
          </div>

          <div className="services-slider">
            <div
              className="services-grid"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {servicesData.map((item) => (
                <ServicesCard key={item.id} {...item} />
              ))}
            </div>

            {/* NAVIGATION */}
            <div className="slider-navigation">
              <button onClick={prevSlide} className="slider-btn">
                ‹
              </button>
              <div className="slider-dots">
                {Array.from({ length: totalSlides }).map((_, i) => (
                  <span
                    key={i}
                    className={`dot ${i === currentSlide ? "active" : ""}`}
                    onClick={() => setCurrentSlide(i)}
                  />
                ))}
              </div>
              <button onClick={nextSlide} className="slider-btn">
                ›
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW SECTION */}
      <section className="workflow">
        <div className="workflow-container">
          <h2 className="workflow-title">Proses Kerja Kami</h2>
          <p className="workflow-subtitle">
            Pesan layanan sedot WC dengan mudah melalui alur kerja yang jelas
            dan profesional, dari telepon pertama hingga selesai.
          </p>
          <div className="workflow-steps">
            {[
              {
                num: "01",
                title: "Konsultasi Kepada Kami",
                desc: "Telepon atau chat WhatsApp untuk menyampaikan keluhan dan lokasi Anda.",
              },
              {
                num: "02",
                title: "Survey & Estimasi",
                desc: "Tim kami mengecek kondisi WC atau septic tank dan memberikan estimasi biaya.",
              },
              {
                num: "03",
                title: "Konfirmasi Kepada Customer",
                desc: "Tim kami datang ke lokasi Anda untuk melakukan survey dan memastikan kebutuhan WC atau septic tank Anda.",
              },
              {
                num: "04",
                title: "Proses Pengejaan",
                desc: "Proses sedot WC dikerjakan menggunakan mesin bertekanan tinggi secara cepat dan higienis.",
              },
              {
                num: "05",
                title: "Pengecekan Hasil Kerja",
                desc: "Kami memastikan WC dan saluran berfungsi normal sebelum pekerjaan dinyatakan selesai.",
              },
            ].map((step) => (
              <div className="workflow-step" key={step.num}>
                <div className="workflow-number">{step.num}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER SECTION */}
      <section className="divider">
        <div className="divider-container">
          <div className="divider-content">
            <h2 className="divider-title">Mengapa Memilih ToiletKU?</h2>
            <p className="divider-subtitle">
              Solusi sedot WC dan septic tank yang cepat, bersih, dan bisa
              diandalkan untuk rumah maupun bisnis Anda.
            </p>
            <div className="divider-list">
              {[
                {
                  title: "Profesional & Berpengalaman",
                  desc: "Tim kami berpengalaman menangani WC penuh, septic tank, dan saluran mampet untuk berbagai jenis bangunan.",
                },
                {
                  title: "Peralatan Modern & Higienis",
                  desc: "Menggunakan mesin sedot bertekanan tinggi sehingga pengerjaan lebih cepat, tuntas, dan minim bau.",
                },
                {
                  title: "Harga Terjangkau & Transparan",
                  desc: "Estimasi biaya disampaikan di awal tanpa biaya tersembunyi, sesuai kondisi di lokasi Anda.",
                },
                {
                  title: "Respon Cepat & Bergaransi",
                  desc: "Siap datang dalam waktu singkat, dengan garansi layanan untuk memastikan hasil kerja memuaskan.",
                },
              ].map((item, i) => (
                <div className="divider-item" key={i}>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="divider-visual">
            {/* Banner.png ada di folder `src/assets/Picture/`, jadi lewat
                `import` (imgBanner) — ini aset terpisah, khusus dipakai
                di section ini saja, tidak overlap dengan foto layanan. */}
            <img
              src={imgBanner}
              alt="Armada dan Peralatan Bona Jaya Sedot WC"
            />
          </div>
        </div>
      </section>

      {/* RATING & HASIL KERJA */}
      <section className="cardswap-section">
        <div className="container">
          <div className="cardswap-layout">
            {/* Teks di kiri — ikut berganti sesuai kartu yang aktif.
                `activeResult` dipakai di sini supaya jelas terlihat
                bahwa description, location, dan checklist SELALU
                ikut dirender bersama title dan rating dari item yang
                sama. */}
            <div className="cardswap-header">
              {/* Label eyebrow statis, tidak ikut animasi swap */}
              <span className="cardswap-eyebrow">Rating & Hasil Kerja</span>

              <div className="cardswap-header-content" key={activeWork}>
                <h2>{activeResult.title}</h2>

                <div className="cardswap-rating-row">
                  <div className="cardswap-stars" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={
                          i < Math.round(activeResult.rating)
                            ? "star-filled"
                            : "star-empty"
                        }
                      />
                    ))}
                  </div>
                  <span className="cardswap-rating-value">
                    {activeResult.rating.toFixed(1)} / 5.0
                  </span>
                </div>

                <p className="cardswap-location">
                  <LocationOnIcon fontSize="small" />
                  {activeResult.location}
                </p>

                {activeResult.description && (
                  <p className="cardswap-description">
                    {activeResult.description}
                  </p>
                )}

                {/* Checklist tahapan kerja */}
                <p className="cardswap-checklist-title">
                  Yang dikerjakan tim kami
                </p>
                <ul className="cardswap-checklist">
                  {activeResult.checklist.map((step, i) => (
                    <li key={i} className="cardswap-checklist-item">
                      <span className="cardswap-checklist-icon">
                        <CheckCircleOutlineIcon />
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card video di kanan — besar, mengisi tinggi area heading.
                Video autoplay 10 detik lalu pause dengan tombol
                "Lanjut Tonton"; ketika video selesai diputar, otomatis
                pindah ke item berikutnya. Counter & dot tetap jadi
                caption di bawah untuk navigasi manual. */}
            <div className="cardswap-wrapper">
              <div className="work-photo-card">
                {workResults.map((item, i) => (
                  <div
                    key={i}
                    className={`work-photo-slide ${
                      i === activeWork ? "active" : ""
                    }`}
                  >
                    <WorkVideoCard
                      video={item.video}
                      poster={item.image}
                      alt={`Hasil kerja: ${item.title} - ${item.location}`}
                      isActive={i === activeWork}
                      onVideoEnded={goToNextWork}
                    />
                    <div className="card-photo-overlay">
                      <div className="card-photo-rating">
                        <StarIcon fontSize="small" />
                        <span>{item.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Caption di bawah foto: nomor urut + dot navigasi */}
              <div className="work-photo-meta">
                <span className="work-photo-counter">
                  {String(activeWork + 1).padStart(2, "0")} /{" "}
                  {String(workResults.length).padStart(2, "0")}
                </span>
                <div className="work-photo-dots">
                  {workResults.map((_, i) => (
                    <span
                      key={i}
                      className={`work-photo-dot ${
                        i === activeWork ? "active" : ""
                      }`}
                      onClick={() => setActiveWork(i)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
