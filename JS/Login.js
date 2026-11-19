const passwordInput = document.getElementById("password");
const toggleButton = document.getElementById("togglePassword");
const toggleIcon = document.getElementById("toggleIcon");

toggleButton.addEventListener("click", function () {
  const sedangTersembunyi = passwordInput.type === "password";

  passwordInput.type = sedangTersembunyi ? "text" : "password";

  toggleIcon.classList.toggle("bi-eye", !sedangTersembunyi);
  toggleIcon.classList.toggle("bi-eye-slash", sedangTersembunyi);

  toggleButton.setAttribute(
    "aria-label",
    sedangTersembunyi ? "Sembunyikan password" : "Tampilkan password",
  );
});

const form = document.getElementById("loginForm");
const pesanError = document.getElementById("pesanError");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document
    .getElementById("username")
    .value.trim()
    .toLowerCase();
  const password = document.getElementById("password").value;

  const akun = AKUN.find(function (a) {
    return a.username === username && a.password === password;
  });

  if (!akun) {
    pesanError.classList.remove("d-none");
    return;
  }

  sessionStorage.setItem(
    "user",
    JSON.stringify({
      username: akun.username,
      role: akun.role,
      nama: akun.nama,
    }),
  );

  window.location.href = HALAMAN_AWAL[akun.role];
});
