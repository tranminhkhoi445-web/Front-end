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
  