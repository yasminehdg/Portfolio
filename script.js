// Menu mobile toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animation du bouton hamburger
    menuToggle.classList.toggle('active');
});

// Fermer le menu mobile quand on clique sur un lien
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Smooth scroll pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ne pas empêcher le comportement par défaut pour le toggle du dropdown
        if (href === '#') {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animation au scroll - apparition progressive des éléments
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer tous les éléments avec animation
const animatedElements = document.querySelectorAll('.card, .note-item, .document-card, .cert-item, .resource-card, .contact-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Effet de survol sur les cartes de contact
const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, #FAF7F2 0%, #F5EFE7 100%)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.background = '#FFFFFF';
    });
});

// ========== MODAL LIVRABLES ==========
function openLivrablesModal() {
    const modal = document.getElementById('livrablesModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Empêche le scroll du body
}

function closeLivrablesModal() {
    const modal = document.getElementById('livrablesModal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Réactive le scroll
}

// Fermer la modal avec la touche Échap
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLivrablesModal();
    }
});

// Affichage du message de bienvenue dans la console
console.log('%c🌟 Portfolio de Yasmine Haddag', 'font-size: 20px; color: #C67B5C; font-weight: bold;');
console.log('%cBienvenue sur mon portfolio ! 😊', 'font-size: 14px; color: #7A7A7A;');
console.log('%c💪 Projet FitZone - Gestion de Salle de Sport', 'font-size: 16px; color: #D4A574; font-weight: bold;');

// Fonction pour forcer le téléchargement des fichiers
function downloadFile(fileUrl, fileName) {
    // Créer un élément <a> invisible
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.style.display = 'none';
    
    // Ajouter au DOM, cliquer, puis retirer
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Alternative plus robuste avec fetch (si la première ne marche pas)
async function downloadFileAdvanced(fileUrl, fileName) {
    try {
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Libérer la mémoire
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Erreur lors du téléchargement:', error);
        alert('Erreur lors du téléchargement du fichier');
    }
}