// Đặc Sản Tây Nguyên — main.js
// Xử lý menu di động và phản hồi form liên hệ (giao diện tĩnh, không gửi server).

document.addEventListener("DOMContentLoaded", function () {
  function updateCartCount() {
    var cartCount = document.getElementById("cartCount");
    if (!cartCount) return;

    var cart = JSON.parse(localStorage.getItem("dacsan-cart") || "{}");
    cartCount.textContent = Object.values(cart).reduce(function (
      total,
      amount,
    ) {
      return total + amount;
    }, 0);
  }

  updateCartCount();

  var products = {
    "ca-phe": {
      name: "Cà phê Buôn Ma Thuột",
      price: "89.000₫",
      priceValue: 89000,
      image: "images/caphetaynguyen.jpg",
      alt: "Cà phê Robusta Buôn Ma Thuột rang mộc",
      description: "Robusta rang mộc, vị đậm, hậu ngọt đặc trưng đất bazan.",
      origin: "Buôn Ma Thuột, Đắk Lắk",
      feature: "Rang mộc, hạt nguyên chất",
      package: "500g/túi",
      story:
        "Cà phê được chọn từ những hạt Robusta chín đều trên vùng đất bazan Buôn Ma Thuột, rang mộc để giữ trọn hương thơm tự nhiên.",
    },
    "mat-ong": {
      name: "Mật ong rừng Tây Nguyên",
      price: "185.000₫",
      priceValue: 185000,
      image: "images/mật ong tây nguyên.jpg",
      alt: "Mật ong rừng nguyên chất Tây Nguyên",
      description: "Khai thác từ rừng khộp tự nhiên, vị ngọt thanh, thơm dịu.",
      origin: "Đắk Lắk, Tây Nguyên",
      feature: "Nguyên chất, không pha đường",
      package: "500ml/chai",
      story:
        "Mật ong được thu hoạch theo mùa từ những đàn ong tự nhiên trong rừng khộp, lọc sạch và đóng chai tại vùng nguyên liệu.",
    },
    "mac-ca": {
      name: "Mắc ca Tây Nguyên",
      price: "145.000₫",
      priceValue: 145000,
      image: "images/mac-ca-tay-nguyen.jpg",
      alt: "Hạt mắc ca sấy Tây Nguyên",
      description:
        "Hạt to đều, béo bùi, sấy chín tới bằng công nghệ nhiệt thấp.",
      origin: "Đắk Nông, Tây Nguyên",
      feature: "Sấy nhiệt thấp, giòn bùi",
      package: "300g/túi",
      story:
        "Hạt mắc ca được tuyển chọn từ vụ thu hoạch mới, sấy ở nhiệt độ thấp để giữ độ béo, vị bùi và dưỡng chất tự nhiên.",
    },
  };

  var detailName = document.getElementById("detailName");
  if (detailName) {
    var productParameter = new URLSearchParams(window.location.search).get(
      "product",
    );
    var cartSection = document.getElementById("cartSection");
    var detailSection = document.getElementById("chi-tiet-san-pham");
    var cart = JSON.parse(localStorage.getItem("dacsan-cart") || "{}");

    function formatPrice(value) {
      return value.toLocaleString("vi-VN") + "₫";
    }

    function renderCart() {
      var cartList = document.getElementById("cartList");
      var cartSummary = document.getElementById("cartSummary");
      var emptyCartMessage = document.getElementById("emptyCartMessage");
      var cartTotal = 0;
      cartList.replaceChildren();

      Object.keys(cart).forEach(function (key) {
        var item = products[key];
        var amount = Number(cart[key]);
        if (!item || !Number.isFinite(amount) || amount < 1) return;

        var row = document.createElement("article");
        row.className = "cart-item";
        row.innerHTML =
          '<img src="' +
          item.image +
          '" alt="' +
          item.alt +
          '">' +
          '<div class="cart-item-info"><h2>' +
          item.name +
          "</h2>" +
          "<p>" +
          formatPrice(item.priceValue) +
          "</p></div>" +
          '<div class="cart-item-actions"><div class="quantity-control" aria-label="Số lượng ' +
          item.name +
          '">' +
          '<button class="quantity-button decrease-cart" type="button" aria-label="Bớt một sản phẩm">−</button>' +
          '<output class="quantity-value">' +
          amount +
          "</output>" +
          '<button class="quantity-button increase-cart" type="button" aria-label="Thêm một sản phẩm">+</button></div>' +
          "<strong>" +
          formatPrice(item.priceValue * amount) +
          "</strong>" +
          '<button class="remove-cart-item" type="button">Xóa</button></div>';
        row
          .querySelector(".decrease-cart")
          .addEventListener("click", function () {
            cart[key] = amount - 1;
            if (cart[key] < 1) delete cart[key];
            saveAndRenderCart();
          });
        row
          .querySelector(".increase-cart")
          .addEventListener("click", function () {
            cart[key] = amount + 1;
            saveAndRenderCart();
          });
        row
          .querySelector(".remove-cart-item")
          .addEventListener("click", function () {
            delete cart[key];
            saveAndRenderCart();
          });
        cartList.appendChild(row);
        cartTotal += item.priceValue * amount;
      });

      var hasItems = cartList.children.length > 0;
      emptyCartMessage.hidden = hasItems;
      cartSummary.hidden = !hasItems;
      document.getElementById("cartTotal").textContent = formatPrice(cartTotal);
    }

    function saveAndRenderCart() {
      localStorage.setItem("dacsan-cart", JSON.stringify(cart));
      updateCartCount();
      renderCart();
    }

    if (!productParameter) {
      detailSection.hidden = true;
      cartSection.hidden = false;
      renderCart();
    }

    var product = products[productParameter] || products["ca-phe"];
    var productKey = productParameter || "ca-phe";
    document.title = product.name + " — Đặc Sản Tây Nguyên";
    document.getElementById("detailImage").src = product.image;
    document.getElementById("detailImage").alt = product.alt;
    detailName.textContent = product.name;
    document.getElementById("detailPrice").textContent = product.price;
    document.getElementById("detailDescription").textContent =
      product.description;
    document.getElementById("detailOrigin").textContent = product.origin;
    document.getElementById("detailFeature").textContent = product.feature;
    document.getElementById("detailPackage").textContent = product.package;
    document.getElementById("detailStory").textContent = product.story;

    var quantity = 1;
    var quantityValue = document.getElementById("quantityValue");
    var cartStatus = document.getElementById("cartStatus");
    function updateQuantity(nextQuantity) {
      quantity = Math.max(1, Math.min(99, nextQuantity));
      quantityValue.textContent = quantity;
    }

    document
      .getElementById("decreaseQuantity")
      .addEventListener("click", function () {
        updateQuantity(quantity - 1);
      });
    document
      .getElementById("increaseQuantity")
      .addEventListener("click", function () {
        updateQuantity(quantity + 1);
      });
    document.getElementById("addToCart").addEventListener("click", function () {
      cart[productKey] = (cart[productKey] || 0) + quantity;
      localStorage.setItem("dacsan-cart", JSON.stringify(cart));
      var totalItems = Object.values(cart).reduce(function (total, amount) {
        return total + amount;
      }, 0);
      cartStatus.textContent =
        "Đã thêm " +
        quantity +
        " sản phẩm. Giỏ hàng hiện có " +
        totalItems +
        " sản phẩm.";
      updateCartCount();
      updateQuantity(1);
    });
  }

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
