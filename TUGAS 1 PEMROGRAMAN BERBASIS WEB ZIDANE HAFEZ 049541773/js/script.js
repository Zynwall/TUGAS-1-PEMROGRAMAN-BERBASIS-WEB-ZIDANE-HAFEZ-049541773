// Common functions for the demo app

function findUserByEmail(email) {
  return dataPengguna.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

// LOGIN
document.addEventListener("DOMContentLoaded", function () {
  var btnLogin = document.getElementById("btnLogin");
  if (btnLogin) {
    btnLogin.addEventListener("click", function () {
      var email = document.getElementById("email").value.trim();
      var pass = document.getElementById("password").value.trim();
      var user = findUserByEmail(email);
      if (!user || user.password !== pass) {
        alert("email/password yang anda masukkan salah");
        return;
      }
      // simpan session sederhana
      localStorage.setItem("sitta_user", JSON.stringify(user));
      window.location.href = "dashboard.html";
    });
  }

  var btnDemo = document.getElementById("btnDemo");
  if (btnDemo) {
    btnDemo.addEventListener("click", function () {
      // ambil user pertama sebagai demo
      localStorage.setItem("sitta_user", JSON.stringify(dataPengguna[0]));
      window.location.href = "dashboard.html";
    });
  }

  // forgot send
  var sendForgot = document.getElementById("sendForgot");
  if (sendForgot) {
    sendForgot.addEventListener("click", function () {
      var e = document.getElementById("forgotEmail").value.trim();
      if (!e) {
        alert("Masukkan email untuk reset (simulasi).");
        return;
      }
      alert("Instruksi reset password telah dikirim ke " + e + " (simulasi).");
      var modal = bootstrap.Modal.getInstance(document.getElementById("forgotModal"));
      modal.hide();
    });
  }

  // register (simulasi)
  var btnReg = document.getElementById("btnRegister");
  if (btnReg) {
    btnReg.addEventListener("click", function () {
      var n = document.getElementById("regName").value.trim();
      var e = document.getElementById("regEmail").value.trim();
      var p = document.getElementById("regPassword").value.trim();
      if (!n || !e || !p) {
        alert("Lengkapi data pendaftaran.");
        return;
      }
      alert("Pendaftaran berhasil (simulasi). Anda dapat masuk menggunakan akun tersebut (tidak tersimpan).");
      var modal = bootstrap.Modal.getInstance(document.getElementById("registerModal"));
      modal.hide();
    });
  }

  // Logout if button present
  var btnLogout = document.getElementById("btnLogout");
  if (btnLogout) {
    btnLogout.addEventListener("click", function () {
      localStorage.removeItem("sitta_user");
      window.location.href = "index.html";
    });
  }

  // Greeting logic
  var greetingEls = document.querySelectorAll("#greeting");
  if (greetingEls.length > 0) {
    var user = JSON.parse(localStorage.getItem("sitta_user") || "null");
    var now = new Date();
    var h = now.getHours();
    var part = h < 11 ? "pagi" : h < 15 ? "siang" : "sore";
    if (user) greetingEls.forEach((el) => (el.innerText = "Selamat " + part + ", " + user.nama));
    else greetingEls.forEach((el) => (el.innerText = "Selamat " + part));
  }

  // Greeting on tracking page
  var greetingTrack = document.getElementById("greetingTrack");
  if (greetingTrack) {
    var user = JSON.parse(localStorage.getItem("sitta_user") || "null");
    var now = new Date();
    var h = now.getHours();
    var part = h < 11 ? "pagi" : h < 15 ? "siang" : "sore";
    if (user) greetingTrack.innerText = "Selamat " + part + ", " + user.nama + " — Masukkan nomor DO untuk melacak";
  }

  // Dashboard: cari DO
  var btnCari = document.getElementById("btnCariDO");
  if (btnCari) {
    btnCari.addEventListener("click", function () {
      var no = document.getElementById("doInput").value.trim();
      if (!no) {
        alert("Masukkan nomor DO.");
        return;
      }
      var obj = dataTracking[no];
      if (!obj) {
        alert("Nomor DO tidak ditemukan (simulasi).");
        return;
      }
      document.getElementById("doResult").style.display = "block";
      document.getElementById("resNama").innerText = obj.nama;
      document.getElementById("resStatus").innerText = obj.status;
      document.getElementById("resEkspedisi").innerText = obj.ekspedisi;
      document.getElementById("resTanggal").innerText = obj.tanggalKirim;
      document.getElementById("resPaket").innerText = obj.paket;
      document.getElementById("resTotal").innerText = obj.total;
      var html = "<h6>Riwayat Perjalanan</h6><ul>";
      obj.perjalanan.forEach(function (p) {
        html += "<li><small>" + p.waktu + " - " + p.keterangan + "</small></li>";
      });
      html += "</ul>";
      document.getElementById("resPerjalanan").innerHTML = html;
    });
  }

  // Tracking page search
  var btnSearchDo = document.getElementById("btnSearchDo");
  if (btnSearchDo) {
    btnSearchDo.addEventListener("click", function () {
      var no = document.getElementById("doSearch").value.trim();
      if (!no) {
        alert("Masukkan nomor DO.");
        return;
      }
      var obj = dataTracking[no];
      if (!obj) {
        alert("Nomor DO tidak ditemukan (simulasi).");
        return;
      }
      document.getElementById("trackResult").style.display = "block";
      document.getElementById("tNama").innerText = obj.nama;
      document.getElementById("tStatus").innerText = obj.status;
      document.getElementById("tEkspedisi").innerText = obj.ekspedisi;
      document.getElementById("tTanggal").innerText = obj.tanggalKirim;
      document.getElementById("tTotal").innerText = obj.total;
      var html = "<h6>Riwayat Perjalanan</h6><ol>";
      obj.perjalanan.forEach(function (p) {
        html += "<li><small>" + p.waktu + " - " + p.keterangan + "</small></li>";
      });
      html += "</ol>";
      document.getElementById("tPerjalanan").innerHTML = html;
    });
  }

  // Stok page: render table
  var stokTableBody = document.querySelector("#stokTable tbody");
  function renderStok() {
    if (!stokTableBody) return;
    stokTableBody.innerHTML = "";
    dataBahanAjar.forEach(function (it, idx) {
      var tr = document.createElement("tr");
      tr.innerHTML =
        "<td><img class='table-img' src='" +
        it.cover +
        "' onerror=\"this.src='assets/logo-ut.png'\"/></td>" +
        "<td>" +
        it.kodeLokasi +
        "</td>" +
        "<td>" +
        it.kodeBarang +
        "</td>" +
        "<td>" +
        it.namaBarang +
        "</td>" +
        "<td>" +
        it.jenisBarang +
        "</td>" +
        "<td>" +
        it.edisi +
        "</td>" +
        "<td>" +
        it.stok +
        "</td>";
      stokTableBody.appendChild(tr);
    });
  }
  renderStok();

  var addBtn = document.getElementById("addStokBtn");
  if (addBtn) {
    addBtn.addEventListener("click", function () {
      var kLok = document.getElementById("newKodeLokasi").value.trim();
      var kBar = document.getElementById("newKodeBarang").value.trim();
      var nBar = document.getElementById("newNamaBarang").value.trim();
      var s = parseInt(document.getElementById("newStok").value) || 0;
      if (!kLok || !kBar || !nBar) {
        alert("Lengkapi kode lokasi, kode barang, dan nama barang.");
        return;
      }
      var newItem = { kodeLokasi: kLok, kodeBarang: kBar, namaBarang: nBar, jenisBarang: "BMP", edisi: "-", stok: s, cover: "assets/logo-ut.png" };
      dataBahanAjar.push(newItem);
      renderStok();
      // clear
      document.getElementById("newKodeLokasi").value = "";
      document.getElementById("newKodeBarang").value = "";
      document.getElementById("newNamaBarang").value = "";
      document.getElementById("newStok").value = "";
      alert("Stok berhasil ditambahkan (simulasi).");
    });
  }
  // === Monitoring Progress DO otomatis tampil ===
  function hitungProgressDO() {
    var hasil = { "Selesai Antar": 0, "Dalam Perjalanan": 0, Dikirim: 0 };
    Object.values(dataTracking).forEach(function (doItem) {
      if (doItem.status.toLowerCase().includes("selesai")) hasil["Selesai Antar"]++;
      else if (doItem.status.toLowerCase().includes("perjalanan")) hasil["Dalam Perjalanan"]++;
      else if (doItem.status.toLowerCase().includes("dikirim")) hasil["Dikirim"]++;
    });
    return hasil;
  }

  // Fungsi untuk menampilkan grafik saat halaman terbuka
  function tampilkanGrafikDO() {
    var ctx = document.getElementById("chartProgress").getContext("2d");
    var data = hitungProgressDO();

    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            data: Object.values(data),
            backgroundColor: ["#28a745", "#ffc107", "#0055cc"],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1.5,
        plugins: {
          legend: {
            position: "bottom",
            labels: { color: "#333", font: { size: 14 } },
          },
        },
      },
    });
  }

  // Jalankan otomatis saat halaman dimuat
  if (document.getElementById("chartProgress")) {
    tampilkanGrafikDO();
  }
});
