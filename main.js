    function setActive(link) {
      // Xóa active ở tất cả các link
      document.querySelectorAll('.navbar-nav .nav-link')
        .forEach(item => item.classList.remove('active'));
      // Thêm active vào link được bấm
      link.classList.add('active');
    }
      function showPage(pageId, link) {
    // Ẩn tất cả section
    document.querySelectorAll("section").forEach(sec => {
      sec.classList.add("hidden");
      sec.classList.remove("active");
    });

    // Hiện section được chọn
    const current = document.getElementById(pageId);
    if (current) {
      current.classList.remove("hidden");
      current.classList.add("active");
    }

    // Đặt lại trạng thái cho menu
    document.querySelectorAll(".navbar-nav .nav-link").forEach(item => {
      item.classList.remove("active");
    });

    if (link) {
      link.classList.add("active");
    }

    // Cuộn lên đầu
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Khi tải trang lần đầu → hiển thị trang Home
  document.addEventListener("DOMContentLoaded", () => {
    const homeLink = document.querySelector('.nav-link[href="#home"]');
    showPage("home", homeLink);
  });
  // --- Giỏ hàng ---
let cart = [];

// Hàm cập nhật số lượng hiển thị trên icon giỏ hàng
function updateCartBadge() {
  const badge = document.querySelector('.bi-cart3').parentElement.querySelector('.badge');
  badge.textContent = cart.length;
}

// Hàm thêm sản phẩm vào giỏ
function addToCart(name, price, img) {
  // Kiểm tra sản phẩm đã có chưa
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, img, quantity: 1 });
  }

  updateCartBadge();
  renderCart();
  alert("Đã thêm sản phẩm vào giỏ hàng!");
}

// Hiển thị danh sách sản phẩm trong giỏ
// Xóa 1 sản phẩm khỏi giỏ
function removeItem(name) {
  cart = cart.filter(item => item.name !== name);
  updateCartBadge();
  renderCart();
}

// Xóa toàn bộ giỏ hàng
function clearCart() {
  if (confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng không?")) {
    cart = [];
    updateCartBadge();
    renderCart();
  }
}

// Hiển thị giỏ hàng
function renderCart() {
  const cartSection = document.querySelector('#cart .container');
  if (cart.length === 0) {
    cartSection.innerHTML = `
      <h2 class="mb-4">Giỏ hàng của bạn</h2>
      <p>Hiện chưa có sản phẩm nào trong giỏ hàng.</p>
      <button class="btn btn-outline-success" onclick="showPage('home', this)">Tiếp tục mua sắm</button>
    `;
    return;
  }

  // Tính tổng tiền
  let total = 0;
  cart.forEach(item => {
    const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    total += priceNum * item.quantity;
  });

  // Tạo HTML hiển thị giỏ hàng
  let html = `
    <h2 class="mb-4">Giỏ hàng của bạn</h2>
    <div class="row justify-content-center">
      <div class="col-md-10">
        <table class="table table-bordered table-striped align-middle">
          <thead class="table-dark">
            <tr>
              <th>Hình</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
  `;

  cart.forEach(item => {
    const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    const itemTotal = priceNum * item.quantity;
    html += `
      <tr>
        <td><img src="${item.img}" width="60"></td>
        <td>${item.name}</td>
        <td>${priceNum.toLocaleString()}$</td>
        <td>${item.quantity}</td>
        <td>${itemTotal.toLocaleString()}$</td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="removeItem('${item.name}')">
            <i class="bi bi-trash"></i> Xóa
          </button>
        </td>
      </tr>
    `;
  });

  html += `
          </tbody>
        </table>
        <h4 class="text-end text-danger">Tổng cộng: <b>${total.toLocaleString()}$</b></h4>
        <div class="text-center mt-3">
          <button class="btn btn-outline-success me-2" onclick="showPage('home', this)">Tiếp tục mua sắm</button>
          <button class="btn btn-warning me-2" onclick="clearCart()">Xóa toàn bộ</button>
          <button class="btn btn-primary">Thanh toán</button>
        </div>
      </div>
    </div>
  `;

  cartSection.innerHTML = html;
}


// Gán sự kiện cho các nút "Buy Now"
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.sanpham').forEach(item => {
    const name = item.querySelector('p').textContent;
    const price = item.querySelector('h6').textContent;
    const img = item.querySelector('img').src;
    const btn = item.querySelector('input[type="button"]');
    btn.addEventListener('click', () => addToCart(name, price, img));
  });
});
