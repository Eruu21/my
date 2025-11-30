document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  
  let currentPageIndex = 0;
  const totalPages = pages.length;

  function showPage(index) {
    // Sembunyikan semua halaman
    pages.forEach((page) => {
      page.classList.remove("active");
    });

    // Tampilkan halaman yang dituju
    if (pages[index]) {
      pages[index].classList.add("active");
    }
  }

  function nextPage() {
    if (currentPageIndex < totalPages - 1) {
      currentPageIndex++;
      showPage(currentPageIndex);
    }
  }

  function prevPage() {
    if (currentPageIndex > 0) {
      currentPageIndex--;
      showPage(currentPageIndex);
    }
  }

  // === FITUR SWIPE (GESER LAYAR DI HP) ===
  const book = document.querySelector('.book');
  let touchStartX = 0;
  let touchEndX = 0;

  // Catat posisi awal sentuhan
  book.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  // Catat posisi akhir sentuhan & tentukan aksi
  book.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
  }, false);

  function handleSwipe() {
      // Jarak minimal geser (50px) agar dianggap swipe
      const threshold = 50;

      // Geser ke Kiri (Next)
      if (touchStartX - touchEndX > threshold) {
          nextPage();
      } 
      // Geser ke Kanan (Prev)
      else if (touchEndX - touchStartX > threshold) {
          prevPage();
      }
  }

  // === NAVIGASI KEYBOARD (PANAH KANAN/KIRI) ===
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      nextPage();
    }
    else if (e.key === "ArrowLeft") {
      prevPage();
    }
  });

  // Tampilkan halaman pertama saat dimuat
  showPage(currentPageIndex);
});
