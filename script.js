// Scroll-triggered animation
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in-section').forEach(el => {
    observer.observe(el);
  });
});

// === Hamburger Menu Toggle ===
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Tutup menu saat klik di luar
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });

    // Tutup saat klik link (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // ✅ Pastikan ini dijalankan setelah DOM siap
  console.log('DOM Loaded');

  // 🔌 Load EmailJS (pastikan CDN benar)
  if (typeof emailjs === 'undefined') {
    console.error('❌ EmailJS tidak dimuat! Tambahkan script CDN di <head>.');
    return;
  }

  try {
    emailjs.init("B-mLNXPhmj2m0fjje"); // ← Public Key kamu
    console.log('✅ EmailJS diinisialisasi');
  } catch (e) {
    console.error('❌ Gagal init EmailJS:', e);
    return;
  }

  const form = document.getElementById('contactForm');
  if (!form) {
    console.error('❌ Form dengan id "contactForm" tidak ditemukan.');
    return;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('🔥 Form dikirim...');

    emailjs.send(
      "service_9mq90o2",   // Service ID — dari dashboard EmailJS
      "template_37cpacb",    // Template ID — dari halaman template
      this
    )
    .then((response) => {
      console.log('✅ Sukses:', response);
      alert('✅ Pesan berhasil dikirim! Terima kasih.');
      form.reset();
    })
    .catch((error) => {
      console.error('❌ Gagal:', error);
      alert('❌ Gagal mengirim. Coba lagi nanti.');
    });
  });
});