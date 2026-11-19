const AKUN = [
  {
    username: "coswara",
    password: "coswara123",
    role: "kasir",
    nama: "Coswara",
  },
  { username: "yeyen", password: "yeyen123", role: "kasir", nama: "Yeyen" },
  { username: "owner", password: "owner123", role: "owner", nama: "Owner" },
];

const HALAMAN_AWAL = {
  kasir: "Kasir/kasir.html",
  owner: "Owner/owner.html",
};

const KATEGORI = ["Oli", "Sparepart", "Aksesoris"];

const BARANG = [
  {
    kode: "SP-001",
    nama: "Oli MPX 2",
    kategori: "Oli",
    harga: 55000,
    stok: 3,
    min: 10,
  },
  {
    kode: "SP-002",
    nama: "Yamalube",
    kategori: "Oli",
    harga: 48000,
    stok: 0,
    min: 10,
  },
  {
    kode: "SP-003",
    nama: "Kampas rem",
    kategori: "Sparepart",
    harga: 65000,
    stok: 2,
    min: 10,
  },
  {
    kode: "SP-004",
    nama: "Busi NGK",
    kategori: "Sparepart",
    harga: 25000,
    stok: 25,
    min: 10,
  },
  {
    kode: "SP-005",
    nama: "Filter udara",
    kategori: "Sparepart",
    harga: 40000,
    stok: 14,
    min: 5,
  },
];

/* ---------- JASA ---------- */
const JASA = [
  {
    kode: "JS-001",
    nama: "Ganti Oli",
    harga: 20000,
    deskripsi: "Penggantian oli mesin beserta pengecekan kebocoran.",
  },
  {
    kode: "JS-002",
    nama: "Servis Ringan",
    harga: 75000,
    deskripsi: "Pembersihan filter udara, setel rantai, dan pengecekan rem.",
  },
  {
    kode: "JS-003",
    nama: "Ganti Kampas Rem",
    harga: 30000,
    deskripsi:
      "Pemasangan kampas rem depan atau belakang, tidak termasuk harga barang.",
  },
  {
    kode: "JS-004",
    nama: "Servis CVT",
    harga: 120000,
    deskripsi: "Pembersihan dan pelumasan sistem CVT untuk motor matic.",
  },
  {
    kode: "JS-005",
    nama: "Tune Up Lengkap",
    harga: 150000,
    deskripsi: "Pemeriksaan dan penyetelan mesin secara menyeluruh.",
  },
];

/* ---------- PEGAWAI ---------- */
const PEGAWAI = [
  {
    kode: "PG-001",
    username: "Coswara",
    nama: "Coswara",
    hp: "0812-3456-7801",
  },
  {
    kode: "PG-002",
    username: "Yeyen",
    nama: "Yeyen",
    hp: "0813-2200-4412",
  },
];

/* nama lengkap pegawai berdasarkan username akun */
function namaPegawai(username) {
  const kunci = String(username || "").toLowerCase();
  if (!kunci) return "";

  const pegawai = PEGAWAI.find(
    (p) => String(p.username).toLowerCase() === kunci,
  );
  return pegawai ? pegawai.nama : "";
}

/* ---------- TRANSAKSI ---------- */
/* total tiap transaksi cocok dengan kolom Total di tabel owner dan kasir */
const DATA_TRANSAKSI = {
  "TRX-0001": {
    waktu: "17 Nov 2026, 11:40",
    kasir: "Coswara",
    item: [{ nama: "Tune Up Lengkap", jenis: "Jasa", jml: 1, harga: 150000 }],
  },
  "TRX-0002": {
    waktu: "17 Nov 2026, 13:05",
    kasir: "Yeyen",
    item: [{ nama: "Filter udara", jenis: "Barang", jml: 1, harga: 40000 }],
  },
  "TRX-0003": {
    waktu: "17 Nov 2026, 14:20",
    kasir: "Coswara",
    item: [
      { nama: "Ganti Oli", jenis: "Jasa", jml: 1, harga: 20000 },
      { nama: "Oli MPX 2", jenis: "Barang", jml: 1, harga: 55000 },
      { nama: "Busi NGK", jenis: "Barang", jml: 1, harga: 25000 },
    ],
  },
};

/* urutan nomor transaksi yang tampil di tiap halaman */
const RIWAYAT_OWNER = ["TRX-0003", "TRX-0002", "TRX-0001"];

const RIWAYAT_KASIR = ["TRX-0003", "TRX-0002", "TRX-0001"];

/* ---------- RINGKASAN LAPORAN PENJUALAN ---------- */
const RINGKASAN_PENJUALAN = {
  totalOmzet: 290000,
  jumlahTransaksi: 3,
  rataRata: 96667,
};

/* ---------- RINGKASAN DASHBOARD ---------- */
/*
 * DASHBOARD.kasir adalah dictionary per username kasir:
 *   { "coswara": { jumlahTransaksi: 2, pendapatan: 200000 },
 *     "yeyen":   { jumlahTransaksi: 1, pendapatan: 40000  }, ... }
 * Owner melihat akumulasi semua kasir.
 */
const DASHBOARD = {
  owner: {
    omzetHariIni: 290000,
    transaksiHariIni: 3,
    rataRataTransaksi: 96667,
  },
  kasir: {
    coswara: { jumlahTransaksi: 2, pendapatan: 250000 },
    yeyen:   { jumlahTransaksi: 1, pendapatan: 40000  },
  },
  tanggal: "",
};

/* ---------- PENYIMPANAN LOKAL (dipakai kasir & owner) ---------- */
const KUNCI_PENYIMPANAN = "kramatmotor-v1";

function tanggalHariIni() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function gantiIsiArray(target, sumber) {
  if (!Array.isArray(sumber)) return;
  target.length = 0;
  sumber.forEach((item) => target.push(item));
}

function muatPenyimpanan() {
  let tersimpan = null;
  try {
    tersimpan = JSON.parse(localStorage.getItem(KUNCI_PENYIMPANAN) || "null");
  } catch {
    tersimpan = null;
  }
  if (!tersimpan || tersimpan.versi !== 3) return;

  gantiIsiArray(BARANG, tersimpan.barang);
  gantiIsiArray(JASA, tersimpan.jasa);
  gantiIsiArray(PEGAWAI, tersimpan.pegawai);

  /* Muat akun yang tersimpan */
  if (Array.isArray(tersimpan.akun)) {
    gantiIsiArray(AKUN, tersimpan.akun);
  }

  /* Fallback: pastikan setiap pegawai punya akun (migrasi data lama) */
  PEGAWAI.forEach((p) => {
    const usernameKecil = String(p.username || "").trim().toLowerCase();
    if (!usernameKecil) return;
    const sudahAda = AKUN.some(
      (a) => String(a.username).toLowerCase() === usernameKecil
    );
    if (!sudahAda) {
      AKUN.push({
        username: usernameKecil,
        password: usernameKecil + "123",
        role: "kasir",
        nama: p.nama,
      });
    }
  });
  if (Array.isArray(tersimpan.kategori)) {
    KATEGORI.length = 0;
    tersimpan.kategori.forEach((k) => KATEGORI.push(k));
  }

  Object.keys(DATA_TRANSAKSI).forEach((kunci) => delete DATA_TRANSAKSI[kunci]);
  Object.assign(DATA_TRANSAKSI, tersimpan.transaksi || {});

  gantiIsiArray(RIWAYAT_OWNER, tersimpan.riwayatOwner);
  gantiIsiArray(RIWAYAT_KASIR, tersimpan.riwayatKasir);

  Object.assign(RINGKASAN_PENJUALAN, tersimpan.ringkasan || {});

  if (tersimpan.dashboard) {
    Object.assign(DASHBOARD.owner, tersimpan.dashboard.owner || {});
    DASHBOARD.tanggal = tersimpan.dashboard.tanggal || "";

    /* Muat kasir per-username (format baru).
     * Jika tersimpan dalam format lama ({ jumlahTransaksi, pendapatan }),
     * abaikan agar tidak tercampur dengan format dictionary. */
    const kasirTersimpan = tersimpan.dashboard.kasir || {};
    const formatBaru =
      typeof kasirTersimpan === "object" &&
      !Array.isArray(kasirTersimpan) &&
      !("jumlahTransaksi" in kasirTersimpan);
    if (formatBaru) {
      /* Hapus semua key lama lalu isi ulang */
      Object.keys(DASHBOARD.kasir).forEach(
        (k) => delete DASHBOARD.kasir[k]
      );
      Object.assign(DASHBOARD.kasir, kasirTersimpan);
    }
  }
}

function simpanData() {
  try {
    localStorage.setItem(
      KUNCI_PENYIMPANAN,
      JSON.stringify({
        versi: 3,
        akun: AKUN,
        barang: BARANG,
        jasa: JASA,
        pegawai: PEGAWAI,
        kategori: KATEGORI,
        transaksi: DATA_TRANSAKSI,
        riwayatOwner: RIWAYAT_OWNER,
        riwayatKasir: RIWAYAT_KASIR,
        ringkasan: RINGKASAN_PENJUALAN,
        dashboard: DASHBOARD,
      }),
    );
  } catch {
    /* penyimpanan tidak tersedia */
  }
}

function periksaHariBaru() {
  const hariIni = tanggalHariIni();
  if (DASHBOARD.tanggal === hariIni) return;

  if (DASHBOARD.tanggal) {
    DASHBOARD.owner.omzetHariIni = 0;
    DASHBOARD.owner.transaksiHariIni = 0;
    DASHBOARD.owner.rataRataTransaksi = 0;
    /* Reset stats harian semua kasir */
    Object.keys(DASHBOARD.kasir).forEach((username) => {
      DASHBOARD.kasir[username].jumlahTransaksi = 0;
      DASHBOARD.kasir[username].pendapatan = 0;
    });
  }

  DASHBOARD.tanggal = hariIni;
}

function perbaruiRataRata() {
  const owner = DASHBOARD.owner;
  owner.rataRataTransaksi = owner.transaksiHariIni
    ? Math.round(owner.omzetHariIni / owner.transaksiHariIni)
    : 0;

  RINGKASAN_PENJUALAN.rataRata = RINGKASAN_PENJUALAN.jumlahTransaksi
    ? Math.round(
        RINGKASAN_PENJUALAN.totalOmzet / RINGKASAN_PENJUALAN.jumlahTransaksi,
      )
    : 0;
}

function catatTransaksi({ nomor, waktu, kasir, metode, item, total }) {
  DATA_TRANSAKSI[nomor] = { waktu, kasir, metode, item };
  RIWAYAT_OWNER.unshift(nomor);
  RIWAYAT_KASIR.unshift(nomor);

  item.forEach((i) => {
    if (i.jenis !== "Barang") return;
    const barang =
      BARANG.find((b) => b.kode === i.kode) ||
      BARANG.find((b) => b.nama === i.nama);
    if (barang) barang.stok = Math.max(0, Number(barang.stok) - i.jml);
  });

  DASHBOARD.owner.omzetHariIni += total;
  DASHBOARD.owner.transaksiHariIni += 1;

  /* Update stats per kasir berdasarkan username yang sedang login */
  const penggunaAktif = (() => {
    try {
      return JSON.parse(sessionStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();
  const usernameKasir = String(
    penggunaAktif?.username || kasir || "kasir"
  ).toLowerCase();
  if (!DASHBOARD.kasir[usernameKasir]) {
    DASHBOARD.kasir[usernameKasir] = { jumlahTransaksi: 0, pendapatan: 0 };
  }
  DASHBOARD.kasir[usernameKasir].jumlahTransaksi += 1;
  DASHBOARD.kasir[usernameKasir].pendapatan += total;

  RINGKASAN_PENJUALAN.totalOmzet += total;
  RINGKASAN_PENJUALAN.jumlahTransaksi += 1;

  perbaruiRataRata();
  simpanData();

  return DATA_TRANSAKSI[nomor];
}

/* samakan nama kasir pada transaksi dengan data pegawai */
function rapikanNamaKasir() {
  const cadangan = PEGAWAI[0]?.nama || "Kasir";
  const petaLama = {
    "budi santoso": "Coswara",
    "rina marlina": "Yeyen",
    kasir: cadangan,
    owner: cadangan,
  };

  Object.values(DATA_TRANSAKSI).forEach((trx) => {
    const kunci = String(trx.kasir || "")
      .trim()
      .toLowerCase();
    const adaPegawai = PEGAWAI.some(
      (p) =>
        String(p.nama).toLowerCase() === kunci ||
        String(p.username).toLowerCase() === kunci,
    );
    if (!adaPegawai) trx.kasir = petaLama[kunci] || cadangan;
  });
}

muatPenyimpanan();
rapikanNamaKasir();
periksaHariBaru();
perbaruiRataRata();
simpanData();
