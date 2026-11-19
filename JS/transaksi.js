(() => {
  const halaman = document.getElementById("transaksi");
  if (!halaman || typeof BARANG === "undefined" || typeof JASA === "undefined") {
    return;
  }

  const daftarEl = {
    sparepart: document.getElementById("daftar-sparepart"),
    jasa: document.getElementById("daftar-jasa"),
  };
  const kosongEl = {
    sparepart: document.getElementById("kosong-sparepart"),
    jasa: document.getElementById("kosong-jasa"),
  };
  const isiKeranjang = document.getElementById("isi-keranjang");
  const jumlahKeranjang = document.getElementById("jumlah-keranjang");
  const totalTransaksi = document.getElementById("total-transaksi");
  const formTransaksi = document.getElementById("form-transaksi");
  const metodeBayar = document.getElementById("metode-bayar");
  const jumlahBayar = document.getElementById("jumlah-bayar");
  const kembalianTransaksi = document.getElementById("kembalian-transaksi");
  const pesanTransaksi = document.getElementById("pesan-transaksi");
  const tombolBayar = document.getElementById("tombol-bayar");
  const bayarTunai = document.querySelectorAll("[data-bayar-tunai]");

  const keranjang = new Map();
  const kataTerakhir = { sparepart: "", jasa: "" };
  const halamanKatalog = { sparepart: 1, jasa: 1 };

  const normal = (teks) => String(teks).toLocaleLowerCase("id-ID").trim();
  const totalKeranjang = () =>
    [...keranjang.values()].reduce(
      (jumlah, item) => jumlah + item.jml * item.harga,
      0,
    );
  const jumlahItem = () =>
    [...keranjang.values()].reduce((jumlah, item) => jumlah + item.jml, 0);

  function kartuSparepart(barang) {
    const stok = Number(barang.stok);
    const min = Number(barang.min);
    const habis = stok === 0;
    const menipis = !habis && stok < min;
    const status = habis
      ? "Stok habis"
      : menipis
        ? `Stok menipis, sisa ${stok}`
        : `Stok ${stok}`;

    return `<article class="item-katalog" data-cari="${normal(`${barang.nama} ${barang.kategori} ${barang.kode}`)}">
      <div>
        <span class="item-label">${barang.kategori}</span>
        <h3>${barang.nama}</h3>
        <p class="item-stok${habis ? " status-habis" : menipis ? " status-menipis" : ""}">${status}</p>
      </div>
      <div class="item-katalog-kaki">
        <strong class="item-harga">${uang(barang.harga)}</strong>
        <button type="button" class="tombol tombol-utama tombol-tambah" data-tambah-kode="${barang.kode}" data-tambah-jenis="Barang"${habis ? " disabled" : ""}>${habis ? "Habis" : "Tambah"}</button>
      </div>
    </article>`;
  }

  function kartuJasa(jasa) {
    return `<article class="item-katalog" data-cari="${normal(`${jasa.nama} ${jasa.deskripsi}`)}">
      <div>
        <span class="item-label">Jasa</span>
        <h3>${jasa.nama}</h3>
        <p class="item-deskripsi">${jasa.deskripsi}</p>
      </div>
      <div class="item-katalog-kaki">
        <strong class="item-harga">${uang(jasa.harga)}</strong>
        <button type="button" class="tombol tombol-utama tombol-tambah" data-tambah-kode="${jasa.kode}" data-tambah-jenis="Jasa">Tambah</button>
      </div>
    </article>`;
  }

  function renderKatalog() {
    if (daftarEl.sparepart) {
      daftarEl.sparepart.innerHTML = BARANG.map(kartuSparepart).join("");
    }
    if (daftarEl.jasa) {
      daftarEl.jasa.innerHTML = JASA.map(kartuJasa).join("");
    }

    Object.keys(kataTerakhir).forEach((jenis) =>
      saringKatalog(jenis, kataTerakhir[jenis]),
    );
  }

  function saringKatalog(jenis, kata = null, resetHalaman = false) {
    const form = document.querySelector(`[data-cari-katalog="${jenis}"]`);
    const daftar = daftarEl[jenis];
    const kosong = kosongEl[jenis];
    if (!form || !daftar || !kosong) return;

    const kataCari = normal(
      kata === null ? form.querySelector(".pos-cari-input").value : kata,
    );
    kataTerakhir[jenis] = kataCari;
    if (resetHalaman) halamanKatalog[jenis] = 1;

    const kartu = [...daftar.querySelectorAll(".item-katalog")];
    const cocok = kartu.filter((item) => item.dataset.cari.includes(kataCari));
    const totalHalaman = Math.max(1, Math.ceil(cocok.length / PER_HALAMAN));
    halamanKatalog[jenis] = Math.min(
      Math.max(1, halamanKatalog[jenis]),
      totalHalaman,
    );

    kartu.forEach((item) => (item.hidden = true));
    cocok.forEach((item, i) => {
      item.hidden =
        Math.floor(i / PER_HALAMAN) + 1 !== halamanKatalog[jenis];
    });

    kosong.hidden = cocok.length > 0;

    buatPagination(
      `katalog-${jenis}`,
      cocok.length,
      halamanKatalog[jenis],
      (halaman) => {
        halamanKatalog[jenis] = halaman;
        saringKatalog(jenis);
      },
    );
  }

  function perbaruiTombolKatalog() {
    halaman.querySelectorAll('[data-tambah-jenis="Barang"]').forEach((tombol) => {
      const barang = BARANG.find((b) => b.kode === tombol.dataset.tambahKode);
      if (!barang) return;

      const stok = Number(barang.stok);
      const dipilih = keranjang.get(barang.kode)?.jml || 0;
      const batas = stok === 0 || dipilih >= stok;
      tombol.disabled = batas;
      tombol.textContent = stok === 0 ? "Habis" : batas ? "Maks." : "Tambah";
    });
  }

  function perbaruiKembalian() {
    const total = totalKeranjang();
    const dibayar = Number(jumlahBayar?.value) || 0;
    if (kembalianTransaksi) {
      kembalianTransaksi.textContent = uang(Math.max(0, dibayar - total));
    }
  }

  function perbaruiPembayaran() {
    const tunai = metodeBayar?.value === "Tunai";
    bayarTunai.forEach((el) => (el.hidden = !tunai));
    if (jumlahBayar) {
      jumlahBayar.required = tunai;
      if (!tunai) jumlahBayar.value = "";
    }
    perbaruiKembalian();
  }

  function renderKeranjang() {
    const daftar = [...keranjang.values()];

    if (isiKeranjang) {
      isiKeranjang.innerHTML = daftar.length
        ? daftar
            .map(
              (item) => `<div class="keranjang-item">
                <div class="keranjang-info">
                  <strong>${item.nama}</strong>
                  <span>${item.jenis} &middot; ${uang(item.harga)}</span>
                </div>
                <button type="button" class="keranjang-hapus" data-hapus-item="${item.kode}" aria-label="Hapus ${item.nama}">&times;</button>
                <div class="keranjang-kontrol">
                  <button type="button" data-aksi="kurang" data-kode="${item.kode}" aria-label="Kurangi ${item.nama}">&minus;</button>
                  <span aria-label="Jumlah ${item.nama}">${item.jml}</span>
                  <button type="button" data-aksi="tambah" data-kode="${item.kode}" aria-label="Tambah ${item.nama}">+</button>
                </div>
                <strong class="keranjang-subtotal">${uang(item.jml * item.harga)}</strong>
              </div>`,
            )
            .join("")
        : `<p class="keranjang-kosong">Keranjang masih kosong. Pilih sparepart atau jasa di sebelah kiri.</p>`;
    }

    if (jumlahKeranjang) {
      jumlahKeranjang.textContent = `${jumlahItem()} item`;
    }
    if (totalTransaksi) {
      totalTransaksi.textContent = uang(totalKeranjang());
    }
    if (tombolBayar) {
      tombolBayar.disabled = daftar.length === 0;
    }

    if (pesanTransaksi && daftar.length) pesanTransaksi.hidden = true;
    perbaruiTombolKatalog();
    perbaruiKembalian();
  }

  function tambahItem(kode, jenis) {
    const sumber =
      jenis === "Barang"
        ? BARANG.find((b) => b.kode === kode)
        : JASA.find((j) => j.kode === kode);
    if (!sumber) return;

    const stok = jenis === "Barang" ? Number(sumber.stok) : Infinity;
    const item = keranjang.get(kode);

    if (item) {
      if (item.jml >= stok) return;
      item.jml += 1;
    } else {
      if (stok === 0) return;
      keranjang.set(kode, {
        kode,
        nama: sumber.nama,
        jenis,
        harga: Number(sumber.harga),
        jml: 1,
      });
    }

    renderKeranjang();
  }

  function ubahJumlah(kode, selisih) {
    const item = keranjang.get(kode);
    if (!item) return;

    if (selisih > 0 && item.jenis === "Barang") {
      const barang = BARANG.find((b) => b.kode === kode);
      if (!barang || item.jml >= Number(barang.stok)) return;
    }

    item.jml += selisih;
    if (item.jml <= 0) keranjang.delete(kode);
    renderKeranjang();
  }

  function nomorTransaksiBaru() {
    const terakhir = Math.max(
      0,
      ...Object.keys(DATA_TRANSAKSI).map(
        (nomor) => Number(nomor.replace(/\D/g, "")) || 0,
      ),
    );
    return "TRX-" + String(terakhir + 1).padStart(4, "0");
  }

  function tampilkanPesan(pesan) {
    if (!pesanTransaksi) return;
    pesanTransaksi.textContent = pesan;
    pesanTransaksi.hidden = false;
  }

  function simpanTransaksi(daftar, total, metode) {
    const nomor = nomorTransaksiBaru();
    const sekarang = new Date();
    const jam = `${String(sekarang.getHours()).padStart(2, "0")}:${String(sekarang.getMinutes()).padStart(2, "0")}`;
    const tanggal = sekarang.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const pengguna = JSON.parse(sessionStorage.getItem("user") || "null");
    const kasir =
      namaPegawai(pengguna?.username) || pengguna?.nama || "Kasir";

    catatTransaksi({
      nomor,
      waktu: `${tanggal}, ${jam}`,
      kasir,
      metode,
      total,
      item: daftar.map(({ kode, nama, jenis, jml, harga }) => ({
        kode,
        nama,
        jenis,
        jml,
        harga,
      })),
    });

    if (typeof perbaruiKartuKasir === "function") perbaruiKartuKasir();

    const riwayat = document.getElementById("daftar-transaksi-terakhir");
    if (riwayat && typeof barisRiwayat === "function") {
      riwayat.insertAdjacentHTML(
        "afterbegin",
        barisRiwayat(nomor, DATA_TRANSAKSI[nomor], false),
      );
    }
    const tabelRiwayat = riwayat?.closest("table");
    if (tabelRiwayat && typeof perbaruiTabel === "function") {
      perbaruiTabel(tabelRiwayat, { reset: true });
    }

    keranjang.clear();
    formTransaksi.reset();
    if (pesanTransaksi) pesanTransaksi.hidden = true;
    renderKatalog();
    renderKeranjang();
    perbaruiPembayaran();

    if (typeof tampilkanBerhasil === "function") {
      tampilkanBerhasil(`Transaksi ${nomor} berhasil disimpan.`);
    }
  }

  halaman.addEventListener("click", (e) => {
    const tambah = e.target.closest("[data-tambah-kode]");
    if (tambah) {
      tambahItem(tambah.dataset.tambahKode, tambah.dataset.tambahJenis);
      return;
    }

    const hapus = e.target.closest("[data-hapus-item]");
    if (hapus) {
      keranjang.delete(hapus.dataset.hapusItem);
      renderKeranjang();
      return;
    }

    const aksi = e.target.closest("[data-aksi]");
    if (aksi) {
      ubahJumlah(aksi.dataset.kode, aksi.dataset.aksi === "tambah" ? 1 : -1);
    }
  });

  document.querySelectorAll("[data-cari-katalog]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      saringKatalog(form.dataset.cariKatalog, null, true);
    });
  });

  metodeBayar?.addEventListener("change", perbaruiPembayaran);
  jumlahBayar?.addEventListener("input", () => {
    if (pesanTransaksi) pesanTransaksi.hidden = true;
    perbaruiKembalian();
  });

  formTransaksi?.addEventListener("submit", (e) => {
    e.preventDefault();
    const daftar = [...keranjang.values()];

    if (!daftar.length) {
      tampilkanPesan("Keranjang masih kosong. Pilih item terlebih dahulu.");
      return;
    }

    const total = totalKeranjang();
    if (metodeBayar?.value === "Tunai") {
      const dibayar = Number(jumlahBayar?.value);
      if (!Number.isFinite(dibayar) || dibayar < total) {
        tampilkanPesan("Uang diterima belum cukup untuk total transaksi.");
        jumlahBayar?.focus();
        return;
      }
    }

    simpanTransaksi(daftar, total, metodeBayar?.value || "Tunai");
  });

  renderKatalog();
  renderKeranjang();
  perbaruiPembayaran();
})();
