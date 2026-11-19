const menuBtn = document.querySelector("#hamburger-menu");
const menuList = document.querySelector("#navbar-nav");

if (menuBtn && menuList) {
  menuBtn.addEventListener("click", () => {
    const open = menuList.classList.toggle("active");
    menuBtn.setAttribute("aria-expanded", open);
  });
}

/* sorot menu sesuai bagian yang terlihat atau diklik */
const tautanBagian = [...document.querySelectorAll('.navbar-nav a[href^="#"]')]
  .map((tautan) => {
    const bagian = document.getElementById(tautan.hash.slice(1));
    return bagian && !bagian.matches("dialog") ? { tautan, bagian } : null;
  })
  .filter(Boolean);

if (tautanBagian.length) {
  let abaikanGulir = false;
  let timerAbaikan;

  const aturAktif = (tautanAktif) => {
    tautanBagian.forEach(({ tautan }) => {
      const aktif = tautan === tautanAktif;
      tautan.classList.toggle("aktif", aktif);
      if (aktif) tautan.setAttribute("aria-current", "location");
      else tautan.removeAttribute("aria-current");
    });
  };

  const tautanTerdekat = () => {
    const batas =
      parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) ||
      (document.querySelector(".navbar")?.offsetHeight || 0) + 32;
    let aktif = tautanBagian[0].tautan;

    tautanBagian.forEach(({ tautan, bagian }) => {
      if (bagian.getBoundingClientRect().top <= batas + 1) aktif = tautan;
    });

    if (
      document.documentElement.scrollHeight > window.innerHeight + 2 &&
      window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2
    ) {
      aktif = tautanBagian[tautanBagian.length - 1].tautan;
    }
    return aktif;
  };

  const perbaruiAktif = () => {
    if (!abaikanGulir) aturAktif(tautanTerdekat());
  };

  tautanBagian.forEach(({ tautan }) => {
    tautan.addEventListener("click", () => {
      aturAktif(tautan);
      abaikanGulir = true;
      clearTimeout(timerAbaikan);
      timerAbaikan = setTimeout(() => (abaikanGulir = false), 1500);

      if (menuList?.classList.contains("active")) {
        menuList.classList.remove("active");
        menuBtn?.setAttribute("aria-expanded", "false");
      }
    });
  });

  window.addEventListener("scroll", perbaruiAktif, { passive: true });
  window.addEventListener("scrollend", () => {
    if (!abaikanGulir) return;
    clearTimeout(timerAbaikan);
    abaikanGulir = false;
  });
  window.addEventListener("load", perbaruiAktif);
  const tautanHash = tautanBagian.find(
    ({ tautan }) => tautan.hash === location.hash,
  );
  if (tautanHash) aturAktif(tautanHash.tautan);
  else perbaruiAktif();
}

const pengguna = JSON.parse(sessionStorage.getItem("user") || "null");
const sapaan = document.querySelector(".dashboard-header h1");
if (pengguna && sapaan) sapaan.textContent = `Selamat datang, ${pengguna.nama}`;

const uang = (n) => "Rp " + Number(n).toLocaleString("id-ID");

/* pencarian tabel: input toolbar menyaring tabel setelah tombol cari ditekan */
function tabelSetelah(form) {
  let el = form.nextElementSibling;
  while (
    el &&
    !el.classList.contains("kb-tabel-wrap") &&
    !el.classList.contains("halaman-tabel-wrap")
  ) {
    el = el.nextElementSibling;
  }
  return el;
}

const normal = (teks) => String(teks).toLocaleLowerCase("id-ID").trim();

/* ---------- PAGINATION ---------- */
const PER_HALAMAN = 5;
const aksiPagination = new Map();
const stateTabel = new WeakMap();

function buatPagination(id, totalItem, halaman, pilih) {
  const wadah = document.querySelector(`.pagination[data-pagination="${id}"]`);
  if (!wadah) return;

  const totalHalaman = Math.max(1, Math.ceil(totalItem / PER_HALAMAN));
  const aktif = Math.min(Math.max(1, halaman), totalHalaman);
  aksiPagination.set(id, pilih);

  if (totalHalaman <= 1) {
    wadah.innerHTML = "";
    wadah.hidden = true;
    return;
  }

  let html = `<button type="button" class="tombol-halaman" data-halaman="${aktif - 1}" aria-label="Halaman sebelumnya"${aktif === 1 ? " disabled" : ""}>&lsaquo;</button>`;
  for (let i = 1; i <= totalHalaman; i++) {
    html += `<button type="button" class="tombol-halaman${i === aktif ? " aktif" : ""}" data-halaman="${i}"${i === aktif ? ' aria-current="page"' : ""}>${i}</button>`;
  }
  html += `<button type="button" class="tombol-halaman" data-halaman="${aktif + 1}" aria-label="Halaman berikutnya"${aktif === totalHalaman ? " disabled" : ""}>&rsaquo;</button>`;

  wadah.innerHTML = html;
  wadah.hidden = false;
}

document.addEventListener("click", (e) => {
  const tombol = e.target.closest(".pagination [data-halaman]");
  if (!tombol || tombol.disabled) return;
  const wadah = tombol.closest(".pagination");
  const aksi = aksiPagination.get(wadah?.dataset.pagination);
  if (!aksi) return;
  e.preventDefault();
  aksi(Number(tombol.dataset.halaman));
});

function stateHalaman(tabel) {
  if (!stateTabel.has(tabel)) {
    stateTabel.set(tabel, { halaman: 1, kata: "", status: "" });
  }
  return stateTabel.get(tabel);
}

function perbaruiTabel(tabel, opsi = {}) {
  const tbody = tabel.querySelector("tbody");
  if (!tbody) return;

  const info = stateHalaman(tabel);
  if (opsi.reset) info.halaman = 1;
  if (opsi.kata !== undefined) info.kata = opsi.kata;
  if (opsi.status !== undefined) info.status = opsi.status;

  tbody.querySelector(".baris-kosong")?.remove();
  const baris = [...tbody.querySelectorAll("tr")];

  const cocok = baris.filter((tr) => {
    const cocokKata = normal(tr.textContent).includes(info.kata);
    const status = normal(tr.querySelector(".lencana")?.textContent || "");
    const cocokStatus =
      !info.status || info.status.startsWith("semua") || status === info.status;
    return cocokKata && cocokStatus;
  });

  const totalHalaman = Math.max(1, Math.ceil(cocok.length / PER_HALAMAN));
  info.halaman = Math.min(Math.max(1, info.halaman), totalHalaman);

  baris.forEach((tr) => (tr.style.display = "none"));
  cocok.forEach((tr, i) => {
    if (Math.floor(i / PER_HALAMAN) + 1 === info.halaman) {
      tr.style.display = "";
    }
  });

  if (!cocok.length) {
    const kolom = tabel.querySelectorAll("thead th").length || 1;
    tbody.insertAdjacentHTML(
      "beforeend",
      `<tr class="baris-kosong"><td colspan="${kolom}">Tidak ada data ditemukan.</td></tr>`,
    );
  }

  const id = tabel.dataset.tabelHalaman;
  if (id) {
    buatPagination(id, cocok.length, info.halaman, (halaman) => {
      info.halaman = halaman;
      perbaruiTabel(tabel);
    });
  }
}

function saring(form) {
  const tabel = tabelSetelah(form)?.querySelector("table");
  if (!tabel) return;

  const kata = normal(form.querySelector(".kb-cari")?.value || "");
  const status = normal(form.querySelector(".kb-filter")?.value || "");
  perbaruiTabel(tabel, { reset: true, kata, status });
}

document.querySelectorAll(".kb-toolbar").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    saring(form);
  });
});

/* tombol cetak */
document.querySelectorAll("button").forEach((tombol) => {
  if (tombol.textContent.trim() === "Cetak") {
    tombol.addEventListener("click", () => window.print());
  }
});

/* ---------- MUAT DATA DARI data.js ---------- */
const totalTransaksi = (trx) =>
  trx.item.reduce((jumlah, item) => jumlah + item.jml * item.harga, 0);

const jamTransaksi = (waktu) => waktu.split(", ")[1] || waktu;

/* ---------- FILTER LAPORAN PENJUALAN ---------- */
const NAMA_BULAN = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const BULAN_SINGKAT = {
  jan: 0,
  januari: 0,
  feb: 1,
  februari: 1,
  mar: 2,
  maret: 2,
  apr: 3,
  april: 3,
  mei: 4,
  may: 4,
  jun: 5,
  juni: 5,
  jul: 6,
  juli: 6,
  agu: 7,
  agt: 7,
  agustus: 7,
  sep: 8,
  sept: 8,
  september: 8,
  okt: 9,
  oktober: 9,
  nov: 10,
  november: 10,
  des: 11,
  desember: 11,
};

/* "17 Nov 2026, 14:20" -> Date */
function tanggalTransaksi(waktu) {
  const cocok = String(waktu).match(
    /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})(?:,\s*(\d{1,2}):(\d{2}))?/,
  );
  if (!cocok) return null;

  const bulan = BULAN_SINGKAT[cocok[2].toLocaleLowerCase("id-ID")];
  if (bulan === undefined) return null;

  return new Date(
    Number(cocok[3]),
    bulan,
    Number(cocok[1]),
    Number(cocok[4] || 0),
    Number(cocok[5] || 0),
  );
}

function periodeLaporan(bulan, rentang) {
  const sekarang = new Date();
  const akhirHariIni = new Date(sekarang);
  akhirHariIni.setHours(23, 59, 59, 999);

  if (bulan === "all") {
    const mulai = new Date(akhirHariIni);
    mulai.setDate(mulai.getDate() - 29);
    mulai.setHours(0, 0, 0, 0);
    return { mulai, akhir: akhirHariIni, semuaBulan: true, semuaHari: true };
  }

  const nomorBulan = Number(bulan);
  const akhir =
    nomorBulan === sekarang.getMonth()
      ? akhirHariIni
      : new Date(sekarang.getFullYear(), nomorBulan + 1, 0, 23, 59, 59, 999);

  if (rentang === "all") {
    const mulai = new Date(sekarang.getFullYear(), nomorBulan, 1, 0, 0, 0, 0);
    return { mulai, akhir, semuaBulan: false, semuaHari: true };
  }

  const jumlahHari = Number(rentang) || 7;
  const mulai = new Date(akhir);
  mulai.setDate(mulai.getDate() - (jumlahHari - 1));
  mulai.setHours(0, 0, 0, 0);

  return { mulai, akhir, semuaBulan: false, semuaHari: false };
}

function terapkanFilterLaporan(resetHalaman = false) {
  const tbody = document.getElementById("riwayat-owner");
  const filterBulan = document.getElementById("filter-bulan");
  if (!tbody || !filterBulan) return;

  const filterRentang = document.getElementById("filter-rentang");
  const info = document.getElementById("info-laporan");
  const semuaBulan = filterBulan.value === "all";
  if (filterRentang) filterRentang.disabled = semuaBulan;

  const rentang = filterRentang?.value || "all";
  const {
    mulai,
    akhir,
    semuaBulan: tanpaBulan,
    semuaHari,
  } = periodeLaporan(filterBulan.value, rentang);

  const daftar = RIWAYAT_OWNER.filter((nomor) => {
    const trx = DATA_TRANSAKSI[nomor];
    if (!trx) return false;
    const tanggal = tanggalTransaksi(trx.waktu);
    return tanggal && tanggal >= mulai && tanggal <= akhir;
  });

  tbody.innerHTML = daftar
    .map((nomor) => barisRiwayat(nomor, DATA_TRANSAKSI[nomor], true))
    .join("");

  const total = daftar.reduce(
    (jumlah, nomor) => jumlah + totalTransaksi(DATA_TRANSAKSI[nomor]),
    0,
  );
  const kartu = document.querySelectorAll(
    ".panel-penjualan .ringkasan .dash-value",
  );
  if (kartu.length === 3) {
    kartu[0].textContent = uang(total);
    kartu[1].textContent = daftar.length;
    kartu[2].textContent = uang(
      daftar.length ? Math.round(total / daftar.length) : 0,
    );
  }

  if (info) {
    info.textContent = tanpaBulan
      ? `Menampilkan ${daftar.length} transaksi dalam 30 hari terakhir (semua bulan).`
      : semuaHari
        ? `Menampilkan ${daftar.length} transaksi pada ${NAMA_BULAN[Number(filterBulan.value)]} (seluruh hari).`
        : `Menampilkan ${daftar.length} transaksi pada ${NAMA_BULAN[Number(filterBulan.value)]} (${Number(rentang)} hari terakhir).`;
  }

  perbaruiTabel(tbody.closest("table"), { reset: resetHalaman });
}

function barisRiwayat(nomor, trx, lengkap) {
  return `<tr>
    <td data-label="No. Transaksi" class="kolom-nama">${nomor}</td>
    <td data-label="${lengkap ? "Tanggal" : "Waktu"}">${lengkap ? trx.waktu : jamTransaksi(trx.waktu)}</td>
    ${lengkap ? `<td data-label="Pegawai">${trx.kasir}</td>` : ""}
    <td data-label="Total" class="kolom-angka">${uang(totalTransaksi(trx))}</td>
    <td data-label="Aksi"><button type="button" class="tombol" data-popup="popup-detail-transaksi"${lengkap ? ` data-nomor="${nomor}"` : ""}>Detail</button></td>
  </tr>`;
}

function muatKategori() {
  const opsi = KATEGORI.map((k) => `<option>${k}</option>`).join("");
  document
    .querySelectorAll('select[name="kategori"]')
    .forEach((sel) => (sel.innerHTML = opsi));

  const dipakai = new Set(BARANG.map((b) => b.kategori));
  const hapus = document.getElementById("kategori-hapus");
  if (hapus) {
    hapus.innerHTML =
      '<option value="" selected disabled>Pilih kategori...</option>' +
      KATEGORI.map(
        (k) => `<option${dipakai.has(k) ? " disabled" : ""}>${k}</option>`,
      ).join("");
  }

  document.querySelectorAll(".daftar-kategori").forEach((list) => {
    list.innerHTML = KATEGORI.map(
      (k) => `<li class="chip-kategori">${k}</li>`,
    ).join("");
  });
}

function perbaruiKartuOwner() {
  const omzetEl = document.getElementById("omzet-hari-ini");
  if (!omzetEl) return;

  omzetEl.textContent = uang(DASHBOARD.owner.omzetHariIni);
  const jumlahEl = document.getElementById("jumlah-transaksi");
  if (jumlahEl) jumlahEl.textContent = DASHBOARD.owner.transaksiHariIni;
  const rataEl = document.getElementById("rata-rata-transaksi");
  if (rataEl) rataEl.textContent = uang(DASHBOARD.owner.rataRataTransaksi);
}

function perbaruiKartuKasir() {
  const jumlahEl = document.getElementById("jumlah-transaksi-saya");
  if (!jumlahEl) return;

  /* Ambil stats kasir yang sedang login berdasarkan username */
  const usernameAktif = String(pengguna?.username || "").toLowerCase();
  const statsKasir = DASHBOARD.kasir[usernameAktif] || {
    jumlahTransaksi: 0,
    pendapatan: 0,
  };

  jumlahEl.textContent = statsKasir.jumlahTransaksi;
  const pendapatanEl = document.getElementById("pendapatan-saya");
  if (pendapatanEl) pendapatanEl.textContent = uang(statsKasir.pendapatan);
}

function muatData() {
  if (typeof BARANG === "undefined") return;

  muatKategori();

  const tabelBarang = document.querySelector("#kelola-data-barang tbody");
  if (tabelBarang && typeof barisBarang === "function") {
    tabelBarang.innerHTML = BARANG.map((b) => barisBarang(b, false)).join("");
    if (typeof perbaruiStokMenipis === "function") perbaruiStokMenipis();
  }

  const tabelJasa = document.querySelector("#kelola-jasa tbody");
  if (tabelJasa && typeof barisJasa === "function") {
    tabelJasa.innerHTML = JASA.map((j) => barisJasa(j, false)).join("");
  }

  const tabelPegawai = document.querySelector("#kelola-akun-pegawai tbody");
  if (tabelPegawai && typeof barisPegawai === "function") {
    tabelPegawai.innerHTML = PEGAWAI.map((p) => barisPegawai(p, false)).join(
      "",
    );
  }

  perbaruiKartuOwner();
  perbaruiKartuKasir();

  const riwayatOwner = document.getElementById("riwayat-owner");
  if (riwayatOwner) {
    terapkanFilterLaporan();
  } else {
    const kartuLaporan = document.querySelectorAll(
      ".panel-penjualan .ringkasan .dash-value",
    );
    if (kartuLaporan.length === 3) {
      kartuLaporan[0].textContent = uang(RINGKASAN_PENJUALAN.totalOmzet);
      kartuLaporan[1].textContent = RINGKASAN_PENJUALAN.jumlahTransaksi;
      kartuLaporan[2].textContent = uang(RINGKASAN_PENJUALAN.rataRata);
    }
  }

  const riwayatKasir = document.getElementById("daftar-transaksi-terakhir");
  if (riwayatKasir) {
    riwayatKasir.innerHTML = RIWAYAT_KASIR.map((nomor) =>
      barisRiwayat(nomor, DATA_TRANSAKSI[nomor], false),
    ).join("");
  }

  document
    .querySelectorAll("table[data-tabel-halaman]")
    .forEach((tabel) => perbaruiTabel(tabel));
}

document
  .getElementById("filter-bulan")
  ?.addEventListener("change", () => terapkanFilterLaporan(true));
document
  .getElementById("filter-rentang")
  ?.addEventListener("change", () => terapkanFilterLaporan(true));

muatData();

/* foto akun = buka popup akun */
const fotoAkun = document.querySelector(".akun");
if (fotoAkun) {
  fotoAkun.addEventListener("click", (e) => {
    e.preventDefault();
    if (!pengguna) return (location.href = "../index.html");
    bukaPopup({
      dataset: {
        popup: "popup-akun",
        nama: pengguna.nama,
        keterangan: `@${pengguna.username} (${pengguna.role})`,
      },
    });
  });
}

document.addEventListener("click", (e) => {
  if (!e.target.closest("[data-keluar]")) return;
  sessionStorage.removeItem("user");
  location.href = "../index.html";
});
