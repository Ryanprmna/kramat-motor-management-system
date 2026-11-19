const TEMPLATE_POPUP = {
  hapus: `
    <dialog class="popup" id="popup-hapus" role="alertdialog" aria-labelledby="hapus-judul">
      <div class="popup-kotak popup-kotak-kecil popup-hapus">
        <div class="ikon-peringatan" aria-hidden="true">!</div>
        <h2 id="hapus-judul">Hapus <span data-isi="jenis">barang</span> ini?</h2>
        <p class="popup-sub">
          <strong data-isi="nama"></strong> (<span data-isi="kode"></span>)
          akan dihapus dari daftar. Tindakan ini tidak bisa dibatalkan.
        </p>
        <form method="dialog" class="form-aksi form-aksi-tengah">
          <button value="batal" class="tombol">Batal</button>
          <button value="hapus" class="tombol tombol-bahaya-penuh">Ya, Hapus</button>
        </form>
      </div>
    </dialog>`,

  barang: `
    <dialog class="popup" id="popup-barang" aria-labelledby="barang-judul">
      <div class="popup-kotak">
        <h2 id="barang-judul">
          <span data-hanya="tambah">Tambah Barang Baru</span>
          <span data-hanya="ubah">Ubah Data Barang</span>
        </h2>
        <form method="dialog" class="form-grid">
          <div class="form-field">
            <label for="barang-kode">Kode Barang</label>
            <input type="text" id="barang-kode" name="kode" data-kunci required readonly placeholder="SP-006" />
          </div>
          <div class="form-field">
            <label for="barang-nama">Nama Barang</label>
            <input type="text" id="barang-nama" name="nama" required placeholder="Contoh: Rantai motor" />
          </div>
          <div class="form-field">
            <label for="barang-kategori">Kategori</label>
            <select id="barang-kategori" name="kategori"></select>
          </div>
          <div class="form-field">
            <label for="barang-harga">Harga Jual (Rp)</label>
            <input type="number" id="barang-harga" name="harga" min="0" required placeholder="0" />
          </div>
          <div class="form-field" data-hanya="tambah">
            <label for="barang-stok">Stok Awal</label>
            <input type="number" id="barang-stok" name="stok" min="0" required placeholder="0" />
          </div>
          <div class="form-field form-field-min">
            <label for="barang-min">Stok Minimum</label>
            <input type="number" id="barang-min" name="min" min="0" required placeholder="0" />
          </div>
          <div class="form-aksi">
            <button type="button" class="tombol" data-tutup>Batal</button>
            <button type="submit" class="tombol tombol-utama">
              <span data-hanya="tambah">Simpan</span>
              <span data-hanya="ubah">Simpan Perubahan</span>
            </button>
          </div>
        </form>
      </div>
    </dialog>`,

  jasa: `
    <dialog class="popup" id="popup-jasa" aria-labelledby="jasa-judul">
      <div class="popup-kotak">
        <h2 id="jasa-judul">
          <span data-hanya="tambah">Tambah Jasa Baru</span>
          <span data-hanya="ubah">Ubah Data Jasa</span>
        </h2>
        <form method="dialog" class="form-grid">
          <div class="form-field">
            <label for="jasa-kode">ID Jasa</label>
            <input type="text" id="jasa-kode" name="kode" data-kunci required readonly placeholder="JS-006" />
          </div>
          <div class="form-field">
            <label for="jasa-harga">Harga (Rp)</label>
            <input type="number" id="jasa-harga" name="harga" min="0" required placeholder="0" />
          </div>
          <div class="form-field form-field-penuh">
            <label for="jasa-nama">Nama Jasa</label>
            <input type="text" id="jasa-nama" name="nama" required placeholder="Contoh: Servis Injeksi" />
          </div>
          <div class="form-field form-field-penuh">
            <label for="jasa-deskripsi">Deskripsi</label>
            <textarea id="jasa-deskripsi" name="deskripsi" rows="3"
                      placeholder="Jelaskan apa saja yang termasuk dalam jasa ini"></textarea>
          </div>
          <div class="form-aksi">
            <button type="button" class="tombol" data-tutup>Batal</button>
            <button type="submit" class="tombol tombol-utama">
              <span data-hanya="tambah">Simpan</span>
              <span data-hanya="ubah">Simpan Perubahan</span>
            </button>
          </div>
        </form>
      </div>
    </dialog>`,

  pegawai: `
    <dialog class="popup" id="popup-pegawai" aria-labelledby="pegawai-judul">
      <div class="popup-kotak">
        <h2 id="pegawai-judul">
          <span data-hanya="tambah">Tambah Akun Pegawai</span>
          <span data-hanya="ubah">Ubah Akun Pegawai</span>
        </h2>
        <form method="dialog" class="form-grid">
          <div class="form-field">
            <label for="pegawai-kode">ID Pegawai</label>
            <input type="text" id="pegawai-kode" name="kode" data-kunci required readonly placeholder="PG-006" />
          </div>
          <div class="form-field">
            <label for="pegawai-username">Username</label>
            <input type="text" id="pegawai-username" name="username" required
                   autocomplete="off" placeholder="Contoh: Permana" />
          </div>
          <div class="form-field form-field-penuh">
            <label for="pegawai-nama">Nama Lengkap</label>
            <input type="text" id="pegawai-nama" name="nama" required placeholder="Nama pegawai" />
          </div>
          <div class="form-field form-field-penuh">
            <label for="pegawai-hp">No. HP</label>
            <input type="tel" id="pegawai-hp" name="hp" required placeholder="08xx-xxxx-xxxx" />
          </div>
          <div class="form-field form-field-sandi">
            <label for="pegawai-sandi">Password</label>
            <input type="password" id="pegawai-sandi" name="sandi" data-wajib="tambah"
                   autocomplete="new-password" />
            <small class="form-field-hint" data-hanya="ubah">Kosongkan jika tidak ingin mengubah</small>
          </div>
          <div class="form-field" data-hanya="tambah">
            <label for="pegawai-sandi2">Konfirmasi Password</label>
            <input type="password" id="pegawai-sandi2" name="sandi2" required
                   autocomplete="new-password" />
          </div>
          <div class="form-aksi">
            <button type="button" class="tombol" data-tutup>Batal</button>
            <button type="submit" class="tombol tombol-utama">
              <span data-hanya="tambah">Simpan</span>
              <span data-hanya="ubah">Simpan Perubahan</span>
            </button>
          </div>
        </form>
      </div>
    </dialog>`,

  stok: `
    <dialog class="popup" id="popup-stok" aria-labelledby="stok-judul">
      <div class="popup-kotak popup-kotak-kecil">
        <h2 id="stok-judul">Tambah Stok</h2>
        <p class="popup-sub"><span data-isi="nama"></span> &middot; <span data-isi="kode"></span></p>
        <div class="ringkas-stok">
          <div><span>Stok saat ini</span><strong data-isi="stok"></strong></div>
          <div><span>Stok minimum</span><strong data-isi="min"></strong></div>
        </div>
        <form method="dialog" class="form-grid form-grid-satu">
          <div class="form-field">
            <label for="stok-jumlah">Jumlah stok masuk</label>
            <input type="number" id="stok-jumlah" name="jumlah" min="1" required placeholder="Contoh: 20" />
          </div>
          <div class="form-aksi">
            <button type="button" class="tombol" data-tutup>Batal</button>
            <button type="submit" class="tombol tombol-utama">Tambah Stok</button>
          </div>
        </form>
      </div>
    </dialog>`,

  "tambah-kategori": `
    <dialog class="popup" id="popup-tambah-kategori" aria-labelledby="tkategori-judul">
      <div class="popup-kotak popup-kotak-kecil">
        <h2 id="tkategori-judul">Tambah Kategori</h2>
        <p class="popup-sub">Kategori saat ini:</p>
        <ul class="daftar-kategori"></ul>
        <form method="dialog" class="form-grid form-grid-satu">
          <div class="form-field">
            <label for="kategori-nama">Nama kategori baru</label>
            <input type="text" id="kategori-nama" name="nama" required placeholder="Contoh: Ban" />
          </div>
          <div class="form-aksi">
            <button type="button" class="tombol" data-tutup>Batal</button>
            <button type="submit" class="tombol tombol-utama">Simpan Kategori</button>
          </div>
        </form>
      </div>
    </dialog>`,

  "hapus-kategori": `
    <dialog class="popup" id="popup-hapus-kategori" role="alertdialog" aria-labelledby="hkategori-judul">
      <div class="popup-kotak popup-kotak-kecil popup-hapus">
        <div class="ikon-peringatan" aria-hidden="true">!</div>
        <h2 id="hkategori-judul">Hapus Kategori</h2>
        <p class="popup-sub">Kategori yang masih dipakai barang tidak bisa dihapus.</p>
        <form method="dialog" class="form-grid form-grid-satu">
          <div class="form-field">
            <label for="kategori-hapus">Pilih kategori</label>
            <select id="kategori-hapus" name="kategori" required>
              <option value="" selected disabled>Pilih kategori...</option>
            </select>
          </div>
          <div class="form-aksi form-aksi-tengah">
            <button type="button" class="tombol" data-tutup>Batal</button>
            <button value="hapus" class="tombol tombol-bahaya-penuh">Ya, Hapus Kategori</button>
          </div>
        </form>
      </div>
    </dialog>`,

  "detail-transaksi": `
    <dialog class="popup" id="popup-detail-transaksi" aria-labelledby="detail-judul">
      <div class="popup-kotak">
        <h2 id="detail-judul">Detail Transaksi</h2>
        <p class="popup-sub">
          <span data-isi="nomor"></span> &middot;
          <span data-isi="waktu"></span> &middot;
          <span data-isi="kasir"></span>
        </p>
        <div class="halaman-tabel-wrap">
          <table class="tabel-rincian">
            <thead>
              <tr>
                <th>Item</th>
                <th class="kolom-angka">Jml</th>
                <th class="kolom-angka">Harga</th>
                <th class="kolom-angka">Subtotal</th>
              </tr>
            </thead>
            <tbody></tbody>
            <tfoot>
              <tr>
                <td colspan="3">Total</td>
                <td class="kolom-angka" data-isi="total"></td>
              </tr>
            </tfoot>
          </table>
        </div>
        <form method="dialog" class="form-aksi">
          <button type="button" class="tombol" data-tutup>Tutup</button>
        </form>
      </div>
    </dialog>`,

  berhasil: `
    <dialog class="popup" id="popup-berhasil" aria-labelledby="berhasil-judul">
      <div class="popup-kotak popup-kotak-kecil popup-berhasil">
        <div class="ikon-berhasil" aria-hidden="true">&#10003;</div>
        <h2 id="berhasil-judul">Berhasil</h2>
        <p class="popup-sub" data-isi="pesan"></p>
        <form method="dialog" class="form-aksi form-aksi-tengah">
          <button value="tutup" class="tombol tombol-utama">Oke</button>
        </form>
      </div>
    </dialog>`,

  akun: `
    <dialog class="popup" id="popup-akun" aria-labelledby="akun-judul">
      <div class="popup-kotak popup-kotak-kecil popup-akun">
        <img class="akun-foto" src="../Asset/image/avatar-default.jpg" alt="" />
        <h2 id="akun-judul" data-isi="nama"></h2>
        <p class="popup-sub" data-isi="keterangan"></p>
        <form method="dialog" class="form-aksi form-aksi-tengah">
          <button value="batal" class="tombol">Batal</button>
          <button type="button" class="tombol tombol-bahaya-penuh" data-keluar>Keluar</button>
        </form>
      </div>
    </dialog>`,
};

/* ---------- 2. PEMASANGAN ---------- */
function pasangPopup(daftar) {
  const html = daftar
    .map((nama) => {
      if (!TEMPLATE_POPUP[nama]) {
        console.warn(`Template popup "${nama}" tidak ditemukan`);
        return "";
      }
      return TEMPLATE_POPUP[nama];
    })
    .join("");
  document.body.insertAdjacentHTML("beforeend", html);
}

/* ---------- 3. HELPER ---------- */
const rupiah = (n) => "Rp " + Number(n).toLocaleString("id-ID");

const isiTeks = (dialog, kunci, nilai) =>
  dialog
    .querySelectorAll(`[data-isi="${kunci}"]`)
    .forEach((el) => (el.textContent = nilai));

const isiNilai = (dialog, kunci, nilai) =>
  dialog
    .querySelectorAll(`[name="${kunci}"]`)
    .forEach((el) => (el.value = nilai));

function tampilkanBerhasil(pesan) {
  const dialog = document.getElementById("popup-berhasil");
  if (!dialog) return;
  isiTeks(dialog, "pesan", pesan);
  if (!dialog.open) dialog.showModal();
}

/* ID OTOMATIS */
const ATURAN_ID = {
  "popup-barang": { awalan: "SP", tabel: "#kelola-data-barang tbody .pilih" },
  "popup-jasa": { awalan: "JS", tabel: "#kelola-jasa tbody .pilih" },
  "popup-pegawai": { awalan: "PG", tabel: "#kelola-akun-pegawai tbody .pilih" },
};

function idBerikutnya(awalan, selektor) {
  const nomor = [...document.querySelectorAll(selektor)].map(
    (el) => Number((el.dataset.kode || "").replace(/\D/g, "")) || 0,
  );
  const urutan = (nomor.length ? Math.max(...nomor) : 0) + 1;
  return `${awalan}-${String(urutan).padStart(3, "0")}`;
}

function isiIdOtomatis(dialog) {
  const aturan = ATURAN_ID[dialog.id];
  const kunci = dialog.querySelector("[data-kunci]");
  if (!aturan || !kunci) return;
  kunci.value = idBerikutnya(aturan.awalan, aturan.tabel);
}

/* MODE TAMBAH / UBAH*/
function aturMode(dialog, mode) {
  dialog.dataset.mode = mode;

  dialog.querySelectorAll("[data-hanya]").forEach((el) => {
    const tampil = el.dataset.hanya === mode;
    el.hidden = !tampil;
    el.querySelectorAll("input, select, textarea").forEach(
      (i) => (i.disabled = !tampil),
    );
  });

  dialog.querySelectorAll("[data-wajib]").forEach((el) => {
    el.required = el.dataset.wajib === mode;
  });

  const kunci = dialog.querySelector("[data-kunci]");
  if (kunci) kunci.readOnly = true;
}

/* ---------- 5. RINCIAN TRANSAKSI ---------- */

function isiRincianTransaksi(dialog) {
  const nomor = dialog.querySelector('[data-isi="nomor"]').textContent.trim();
  const trx = DATA_TRANSAKSI[nomor];
  if (!trx) return;
  isiTeks(dialog, "waktu", trx.waktu);
  isiTeks(dialog, "kasir", trx.kasir);
  isiTeks(
    dialog,
    "total",
    rupiah(trx.item.reduce((j, i) => j + i.jml * i.harga, 0)),
  );
  dialog.querySelector("tbody").innerHTML = trx.item
    .map(
      (i) => `
      <tr>
        <td>${i.nama} <span class="jenis-item">${i.jenis}</span></td>
        <td class="kolom-angka">${i.jml}</td>
        <td class="kolom-angka">${rupiah(i.harga)}</td>
        <td class="kolom-angka">${rupiah(i.jml * i.harga)}</td>
      </tr>`,
    )
    .join("");
}

const PENGISI = { "popup-detail-transaksi": isiRincianTransaksi };

/* ---------- 6. BUKA POPUP ---------- */
function bukaPopup(pemicu) {
  const { popup, mode, sumber, ...statis } = pemicu.dataset;
  const dialog = document.getElementById(popup);
  if (!dialog) {
    console.warn(
      `Dialog #${popup} belum dipasang. Cek pasangPopup([...]) di halaman ini.`,
    );
    return;
  }

  let data = statis;
  let terpilih = null;
  if (sumber) {
    terpilih = document.querySelector(`input[name="${sumber}"]:checked`);
    if (!terpilih) return;
    data = { ...terpilih.dataset, ...statis };
  }

  /* tombol Detail di kasir tidak punya data-nomor: ambil dari baris tabel */
  if (popup === "popup-detail-transaksi" && !data.nomor) {
    const baris = pemicu.closest("tr");
    data = { ...data, nomor: baris?.cells[0].textContent.trim() };
  }

  dialog._terpilih = terpilih;
  dialog.querySelectorAll("form").forEach((f) => f.reset());
  dialog.returnValue = "";

  for (const [kunci, nilai] of Object.entries(data)) {
    isiTeks(dialog, kunci, nilai);
    isiNilai(dialog, kunci, nilai);
  }

  if (mode) aturMode(dialog, mode);
  if (mode === "tambah") isiIdOtomatis(dialog);
  PENGISI[popup]?.(dialog, pemicu);
  dialog.showModal();
}

/* ---------- 6b. AKSI FORM (tambah, ubah, hapus, stok, kategori) ---------- */
const statusStok = (stok, min) =>
  stok === 0
    ? ["Habis", "baris-habis stok-habis", "lencana-habis"]
    : stok < min
      ? ["Menipis", "baris-menipis", "lencana-menipis"]
      : ["Aman", "baris-aman", "lencana-aman"];

function barisBarang(d, checked) {
  const stok = Number(d.stok);
  const min = Number(d.min);
  const [label, kelas, lencana] = statusStok(stok, min);
  return `<tr class="${kelas}">
    <td data-label="Pilih"><input type="radio" name="pilih-barang" class="pilih" aria-label="Pilih ${d.nama}" data-kode="${d.kode}" data-nama="${d.nama}" data-kategori="${d.kategori}" data-harga="${d.harga}" data-stok="${stok}" data-min="${min}"${checked ? " checked" : ""}></td>
    <td data-label="Kode">${d.kode}</td>
    <td data-label="Nama Barang" class="kolom-nama">${d.nama}</td>
    <td data-label="Kategori">${d.kategori}</td>
    <td data-label="Harga Jual">${rupiah(d.harga)}</td>
    <td data-label="Stok / Min." class="stok-angka"><span class="stok-sekarang">${stok}</span>/<span class="stok-minimum">${min}</span></td>
    <td data-label="Status"><span class="lencana ${lencana}">${label}</span></td>
  </tr>`;
}

function barisJasa(d, checked) {
  return `<tr>
    <td data-label="Pilih"><input type="radio" name="pilih-jasa" class="pilih" aria-label="Pilih ${d.nama}" data-kode="${d.kode}" data-nama="${d.nama}" data-harga="${d.harga}" data-deskripsi="${d.deskripsi || ""}"${checked ? " checked" : ""}></td>
    <td data-label="ID Jasa">${d.kode}</td>
    <td data-label="Nama Jasa" class="kolom-nama">${d.nama}</td>
    <td data-label="Deskripsi" class="kolom-deskripsi">${d.deskripsi || ""}</td>
    <td data-label="Harga" class="kolom-harga">${rupiah(d.harga)}</td>
  </tr>`;
}

function barisPegawai(d, checked) {
  return `<tr>
    <td data-label="Pilih"><input type="radio" name="pilih-pegawai" class="pilih" aria-label="Pilih ${d.nama}" data-kode="${d.kode}" data-username="${d.username}" data-nama="${d.nama}" data-hp="${d.hp}"${checked ? " checked" : ""}></td>
    <td data-label="ID Pegawai">${d.kode}</td>
    <td data-label="Nama" class="kolom-nama">${d.nama}</td>
    <td data-label="Username">${d.username}</td>
    <td data-label="No. HP">${d.hp}</td>
  </tr>`;
}

function gantiBaris(lama, html) {
  const wadah = document.createElement("tbody");
  wadah.innerHTML = html;
  lama.replaceWith(wadah.firstElementChild);
}

function perbaruiStokMenipis() {
  const daftar = document.getElementById("daftar-stok-menipis");
  if (!daftar) return;
  daftar.innerHTML = BARANG.filter((b) => Number(b.stok) < Number(b.min))
    .map(
      (b) => `<li class="stok-item${Number(b.stok) === 0 ? " stok-habis" : ""}">
        <span class="stok-nama">${b.nama}</span>
        <span class="stok-angka"><span class="stok-sekarang">${b.stok}</span>/<span class="stok-minimum">${b.min}</span></span>
      </li>`,
    )
    .join("");
}

function segarkanOwner() {
  simpanData();
  if (typeof muatData === "function") muatData();
  perbaruiStokMenipis();
}

function simpanBarang(dialog, data) {
  if (dialog.dataset.mode === "ubah" && dialog._terpilih) {
    const barang = BARANG.find((b) => b.kode === dialog._terpilih.dataset.kode);
    if (barang) {
      barang.nama = data.nama;
      barang.kategori = data.kategori;
      barang.harga = Number(data.harga);
      barang.min = Number(data.min);
    }
  } else {
    BARANG.push({
      kode: data.kode,
      nama: data.nama,
      kategori: data.kategori,
      harga: Number(data.harga),
      stok: Number(data.stok) || 0,
      min: Number(data.min) || 0,
    });
  }
  segarkanOwner();
}

function simpanJasa(dialog, data) {
  if (dialog.dataset.mode === "ubah" && dialog._terpilih) {
    const jasa = JASA.find((j) => j.kode === dialog._terpilih.dataset.kode);
    if (jasa) {
      jasa.nama = data.nama;
      jasa.harga = Number(data.harga);
      jasa.deskripsi = data.deskripsi || "";
    }
  } else {
    JASA.push({
      kode: data.kode,
      nama: data.nama,
      harga: Number(data.harga),
      deskripsi: data.deskripsi || "",
    });
  }
  segarkanOwner();
}

function simpanPegawai(dialog, data) {
  const usernameKecil = String(data.username || "").trim().toLowerCase();

  if (dialog.dataset.mode === "ubah" && dialog._terpilih) {
    const kode = dialog._terpilih.dataset.kode;
    const pegawai = PEGAWAI.find((p) => p.kode === kode);
    if (pegawai) {
      const usernameLamaKecil = String(pegawai.username || "").trim().toLowerCase();
      pegawai.nama = data.nama;
      pegawai.username = data.username;
      pegawai.hp = data.hp;

      /* Perbarui / buat entri AKUN */
      let akun = AKUN.find(
        (a) => String(a.username).toLowerCase() === usernameLamaKecil
      );
      if (akun) {
        akun.username = usernameKecil;
        akun.nama = data.nama;
        if (data.sandi) akun.password = data.sandi;
      } else {
        /* Belum ada akunnya — buat baru */
        AKUN.push({
          username: usernameKecil,
          password: data.sandi || usernameKecil + "123",
          role: "kasir",
          nama: data.nama,
        });
      }
    }
  } else {
    PEGAWAI.push({
      kode: data.kode,
      nama: data.nama,
      username: data.username,
      hp: data.hp,
    });

    /* Tambahkan akun baru ke AKUN */
    AKUN.push({
      username: usernameKecil,
      password: data.sandi || usernameKecil + "123",
      role: "kasir",
      nama: data.nama,
    });
  }
  segarkanOwner();
}

function tambahStok(dialog, data) {
  const p = dialog._terpilih;
  if (!p) return;
  const barang = BARANG.find((b) => b.kode === p.dataset.kode);
  if (!barang) return;
  barang.stok = Number(barang.stok) + Number(data.jumlah);
  segarkanOwner();
}

function hapus(dialog) {
  const terpilih = dialog._terpilih;
  const baris = terpilih?.closest("tr");
  if (!baris) return;

  const kode = terpilih.dataset.kode;
  const bagian = baris.closest("section")?.id;

  if (bagian === "kelola-data-barang") {
    const i = BARANG.findIndex((b) => b.kode === kode);
    if (i >= 0) BARANG.splice(i, 1);
    BARANG.forEach((b, n) => (b.kode = `SP-${String(n + 1).padStart(3, "0")}`));
  } else if (bagian === "kelola-jasa") {
    const i = JASA.findIndex((j) => j.kode === kode);
    if (i >= 0) JASA.splice(i, 1);
  } else if (bagian === "kelola-akun-pegawai") {
    const i = PEGAWAI.findIndex((p) => p.kode === kode);
    if (i >= 0) {
      /* Hapus juga dari AKUN */
      const usernameKecil = String(PEGAWAI[i].username || "").trim().toLowerCase();
      const iAkun = AKUN.findIndex(
        (a) => String(a.username).toLowerCase() === usernameKecil
      );
      if (iAkun >= 0) AKUN.splice(iAkun, 1);
      PEGAWAI.splice(i, 1);
    }
  }

  segarkanOwner();
}

function tambahKategori(nama) {
  nama = (nama || "").trim();
  if (!nama || KATEGORI.includes(nama)) return;
  KATEGORI.push(nama);
  simpanData();
  if (typeof muatKategori === "function") muatKategori();
}

function hapusKategori(nama) {
  if (!nama || BARANG.some((b) => b.kategori === nama)) return;
  const i = KATEGORI.indexOf(nama);
  if (i >= 0) KATEGORI.splice(i, 1);
  simpanData();
  if (typeof muatKategori === "function") muatKategori();
}

document.addEventListener("submit", (e) => {
  const dialog = e.target.closest("dialog.popup");
  if (!dialog || e.submitter?.value === "batal") return;
  const data = Object.fromEntries(new FormData(e.target));
  switch (dialog.id) {
    case "popup-barang":
      simpanBarang(dialog, data);
      return tampilkanBerhasil(
        dialog.dataset.mode === "ubah"
          ? "Data barang berhasil diperbarui."
          : "Barang berhasil ditambahkan.",
      );
    case "popup-jasa":
      simpanJasa(dialog, data);
      return tampilkanBerhasil(
        dialog.dataset.mode === "ubah"
          ? "Data jasa berhasil diperbarui."
          : "Jasa berhasil ditambahkan.",
      );
    case "popup-pegawai": {
      /* Validasi konfirmasi password (hanya mode tambah) */
      if (dialog.dataset.mode === "tambah" && data.sandi !== data.sandi2) {
        const inputSandi2 = dialog.querySelector("#pegawai-sandi2");
        inputSandi2?.setCustomValidity("Password tidak cocok.");
        inputSandi2?.reportValidity();
        return;
      }
      dialog.querySelector("#pegawai-sandi2")?.setCustomValidity("");
      simpanPegawai(dialog, data);
      return tampilkanBerhasil(
        dialog.dataset.mode === "ubah"
          ? "Akun pegawai berhasil diperbarui."
          : "Akun pegawai berhasil ditambahkan.",
      );
    }
    case "popup-stok":
      tambahStok(dialog, data);
      return tampilkanBerhasil("Stok barang berhasil ditambahkan.");
    case "popup-tambah-kategori":
      tambahKategori(data.nama);
      return tampilkanBerhasil("Kategori berhasil ditambahkan.");
    case "popup-hapus-kategori":
      hapusKategori(data.kategori);
      return tampilkanBerhasil("Kategori berhasil dihapus.");
    case "popup-hapus": {
      const jenis =
        dialog.querySelector('[data-isi="jenis"]')?.textContent.trim() ||
        "data";
      hapus(dialog);
      return tampilkanBerhasil(
        `${jenis[0].toUpperCase()}${jenis.slice(1)} berhasil dihapus.`,
      );
    }
  }
});

document.addEventListener("click", (e) => {
  const tutup = e.target.closest("[data-tutup]");
  if (tutup) return tutup.closest("dialog")?.close();
  const pemicu = e.target.closest("[data-popup]");
  if (pemicu) {
    e.preventDefault();
    return bukaPopup(pemicu);
  }
  if (e.target.matches("dialog.popup")) e.target.close();
});
