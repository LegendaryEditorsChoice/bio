// Particle System
class Particle {
    constructor(container) {
        this.container = container;
        this.element = document.createElement('div');
        this.reset();
        this.element.style.position = 'absolute';
        this.element.style.pointerEvents = 'none';
        this.element.style.borderRadius = '50%';
        this.container.appendChild(this.element);
    }

    reset() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        
        const colors = ['#667eea', '#764ba2', '#f39c12', '#e67e22', '#f5576c'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        this.updateStyle();
    }

    updateStyle() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
        this.element.style.width = this.size + 'px';
        this.element.style.height = this.size + 'px';
        this.element.style.background = this.color;
        this.element.style.opacity = this.opacity;
        this.element.style.boxShadow = `0 0 ${this.size * 2}px ${this.color}`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x < 0) this.x = window.innerWidth;
        if (this.x > window.innerWidth) this.x = 0;
        if (this.y < 0) this.y = window.innerHeight;
        if (this.y > window.innerHeight) this.y = 0;

        this.updateStyle();
    }
}

// Initialize particles
const particlesContainer = document.getElementById('particles');
const particles = [];
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(particlesContainer));
}

function animateParticles() {
    particles.forEach(particle => particle.update());
    requestAnimationFrame(animateParticles);
}

animateParticles();

// Mouse movement effect
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const circles = document.querySelectorAll('.circle');
    circles.forEach((circle, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        circle.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Social button hover effects with sound simulation
const socialButtons = document.querySelectorAll('.social-btn');

socialButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        const platform = this.getAttribute('data-platform');
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });

    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        
        // Show notification with platform name
        const platform = this.getAttribute('data-platform');
        showNotification(`Opening ${platform}...`);
    });
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.background = 'linear-gradient(135deg, #f39c12, #e67e22)';
    notification.style.color = 'white';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '50px';
    notification.style.boxShadow = '0 10px 30px rgba(243, 156, 18, 0.3)';
    notification.style.zIndex = '10000';
    notification.style.fontWeight = '600';
    notification.style.animation = 'slideInRight 0.5s ease-out, slideOutRight 0.5s ease-in 2.5s';
    notification.style.fontSize = '14px';
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// Logo animation on click
const logo = document.querySelector('.logo-circle');
logo.addEventListener('click', () => {
    logo.style.animation = 'none';
    setTimeout(() => {
        logo.style.animation = 'pulse 3s ease-in-out infinite, spin 1s ease-in-out';
    }, 10);
});

// Add spin animation
const spinStyle = document.createElement('style');
spinStyle.textContent = `
    @keyframes spin {
        from {
            transform: rotate(0deg) scale(1);
        }
        50% {
            transform: rotate(180deg) scale(1.1);
        }
        to {
            transform: rotate(360deg) scale(1);
        }
    }
`;
document.head.appendChild(spinStyle);

// Email icon animation
const emailIcon = document.querySelector('.email-icon');
emailIcon.addEventListener('click', () => {
    emailIcon.style.animation = 'none';
    setTimeout(() => {
        emailIcon.style.animation = 'bounce 2s ease-in-out infinite, wiggle 0.5s ease-in-out';
    }, 10);
    
    showNotification('Email: sohel59494@gmail.com');
});

// Add wiggle animation
const wiggleStyle = document.createElement('style');
wiggleStyle.textContent = `
    @keyframes wiggle {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-10deg); }
        75% { transform: rotate(10deg); }
    }
`;
document.head.appendChild(wiggleStyle);

// Smooth scroll behavior (parallax removed for better performance)

// Random color change for particles on interval
setInterval(() => {
    const randomParticle = particles[Math.floor(Math.random() * particles.length)];
    const colors = ['#667eea', '#764ba2', '#f39c12', '#e67e22', '#f5576c', '#00f2ea', '#1da1f2'];
    randomParticle.color = colors[Math.floor(Math.random() * colors.length)];
}, 2000);

// Loading animation
window.addEventListener('load', () => {
    const content = document.querySelector('.content');
    content.style.opacity = '0';
    setTimeout(() => {
        content.style.transition = 'opacity 1s ease-in-out';
        content.style.opacity = '1';
    }, 100);
});

// Responsive particle count
function updateParticleCount() {
    const width = window.innerWidth;
    let targetCount = particleCount;
    
    if (width < 768) {
        targetCount = 30;
    } else if (width < 480) {
        targetCount = 20;
    }
    
    while (particles.length > targetCount) {
        const particle = particles.pop();
        particle.element.remove();
    }
    
    while (particles.length < targetCount) {
        particles.push(new Particle(particlesContainer));
    }
}

window.addEventListener('resize', updateParticleCount);
updateParticleCount();

// Dynamic year update
function updateYear() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Update year on load
updateYear();

// Update year at midnight
setInterval(() => {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0) {
        updateYear();
    }
}, 1000);

// Console message
console.log('%c🎨 Legendary Editor\'s Choice Portfolio', 'font-size: 20px; font-weight: bold; color: #f39c12;');
console.log('%cDesigned with ❤️ using HTML, CSS & JavaScript', 'font-size: 12px; color: #667eea;');
console.log('%cMade by Saikat Bangladesh', 'font-size: 12px; color: #f39c12;');
