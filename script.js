// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Mencegah scrolling di belakang modal
    }
}

// Close modal when clicking close button or outside modal
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function () {
        this.closest('.modal').style.display = 'none';
        document.body.style.overflow = 'auto'; // Mengaktifkan kembali scrolling
    });
});

document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function (e) {
        if (e.target === this) { // Hanya tutup jika klik di area gelap di luar modal-content
            this.style.display = 'none';
            document.body.style.overflow = 'auto'; // Mengaktifkan kembali scrolling
        }
    });
});

// Search functionality
document.querySelector('.search-button').addEventListener('click', function () {
    const searchTerm = document.querySelector('.search-input').value.toLowerCase();
    const recipeCards = document.querySelectorAll('.recipe-card');

    recipeCards.forEach(card => {
        const title = card.querySelector('.recipe-title').textContent.toLowerCase();
        const description = card.querySelector('.recipe-description').textContent.toLowerCase();

        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease'; // Aplikasikan animasi saat ditampilkan
        } else {
            card.style.display = searchTerm === '' ? 'block' : 'none'; // Tampilkan semua jika pencarian kosong
        }
    });
});

// Search on Enter key
document.querySelector('.search-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.querySelector('.search-button').click();
    }
});

// Header scroll effect
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Gallery item animation on scroll (diterapkan juga ke elemen lain)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Mulai animasi sedikit lebih awal
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            // opsional: observer.unobserve(entry.target); jika Anda hanya ingin animasi berjalan sekali
        }
    });
}, observerOptions);

// Observe gallery items, recipe cards, and about cards
document.querySelectorAll('.gallery-item, .recipe-card, .about-card, .team-member, .stat-item').forEach(item => {
    observer.observe(item);
});

// Active navigation highlighting
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Offset untuk penyesuaian header
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Recipe card hover effect enhancement
document.querySelectorAll('.recipe-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});