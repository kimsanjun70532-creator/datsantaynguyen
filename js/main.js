// Đặc Sản Tây Nguyên — main.js
// Xử lý menu di động và phản hồi form liên hệ (giao diện tĩnh, không gửi server).

document.addEventListener("DOMContentLoaded", function () {
  // --- Menu di động (mobile nav toggle) ---
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Đóng menu khi chọn một liên kết (trên màn hình nhỏ)
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth < 800) {
          mainNav.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // --- Form liên hệ: phản hồi khi gửi (demo tĩnh) ---
  var contactForm = document.getElementById("contactForm");
  var formStatus = document.getElementById("formStatus");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      formStatus.classList.add("is-visible");
      contactForm.reset();
      formStatus.setAttribute("tabindex", "-1");
      formStatus.focus();
    });
  }

  // --- Nút "Thêm vào giỏ hàng" trên trang chi tiết sản phẩm (demo tĩnh) ---
  document.querySelectorAll(".btn-primary").forEach(function (btn) {
    if (btn.textContent.trim() === "Thêm vào giỏ hàng") {
      btn.addEventListener("click", function () {
        var original = btn.textContent;
        btn.textContent = "Đã thêm vào giỏ ✓";
        setTimeout(function () {
          btn.textContent = original;
        }, 1800);
      });
    }
  });
});
