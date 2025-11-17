document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

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

    // Update status tombol
    updateNavButtons();
  }

  function updateNavButtons() {
    // Tombol 'Prev' non-aktif di halaman pertama
    if (currentPageIndex === 0) {
      prevBtn.disabled = true;
    } else {
      prevBtn.disabled = false;
    }

    // Tombol 'Next' non-aktif di halaman terakhir
    if (currentPageIndex === totalPages - 1) {
      nextBtn.disabled = true;
    } else {
      nextBtn.disabled = false;
    }
  }

  // Event Listener untuk tombol 'Next'
  nextBtn.addEventListener("click", () => {
    if (currentPageIndex < totalPages - 1) {
      currentPageIndex++;
      showPage(currentPageIndex);
    }
  });

  // Event Listener untuk tombol 'Prev'
  prevBtn.addEventListener("click", () => {
    if (currentPageIndex > 0) {
      currentPageIndex--;
      showPage(currentPageIndex);
    }
  });

  // Tampilkan halaman pertama saat dimuat
  showPage(currentPageIndex);

  const book = document.querySelector('.book');
    let touchStartX = 0;
    let touchEndX = 0;

    // Catat posisi awal sentuhan
    book.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true }); // 'passive' untuk performa lebih baik

    // Catat posisi akhir sentuhan & tentukan aksi
    book.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        // Jarak minimal geser (50px)
        const threshold = 50;

        // Geser ke Kiri (Next)
        if (touchStartX - touchEndX > threshold) {
            nextBtn.click(); // Panggil fungsi klik tombol Next
        } 
        // Geser ke Kanan (Prev)
        else if (touchEndX - touchStartX > threshold) {
            prevBtn.click(); // Panggil fungsi klik tombol Prev
        }
    }

  const revealBtn = document.getElementById("reveal-btn");
  const hiddenMessage = document.getElementById("hidden-message");

  if (revealBtn && hiddenMessage) {
    revealBtn.addEventListener("click", () => {
      // Tampilkan pesan
      hiddenMessage.style.display = "block";
      // Sembunyikan tombol "amplop"
      revealBtn.style.display = "none";
    });
  }
  document.addEventListener("keydown", (e) => {
    // Jika menekan panah kanan
    if (e.key === "ArrowRight") {
      // Memicu klik pada tombol 'next'
      nextBtn.click();
    }
    // Jika menekan panah kiri
    else if (e.key === "ArrowLeft") {
      // Memicu klik pada tombol 'prev'
      prevBtn.click();
    }
  });
});
