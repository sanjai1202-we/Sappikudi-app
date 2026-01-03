/**
 * Sappikudi - Kids Water Bottle Brand
 * Main JavaScript File
 */

// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initProductFeatures();
    initWaterTracker();
    initAnimations();
    loadUserData();
});

// ===== Navigation =====
function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) navLinks.classList.remove('active');
            if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
        });
    });
}

// ===== Product Features =====
function initProductFeatures() {
    // Favorite buttons
    document.querySelectorAll('.product-favorite').forEach(btn => {
        btn.addEventListener('click', function () {
            const isFavorite = this.classList.toggle('active');
            this.textContent = isFavorite ? '❤️' : '🤍';
            if (isFavorite) {
                this.style.animation = 'pulse 0.3s ease';
                setTimeout(() => this.style.animation = '', 300);
            }
        });
    });

    // Color filter
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;
            const products = document.querySelectorAll('.product-card');

            products.forEach(product => {
                if (filter === 'all' || product.dataset.color === filter) {
                    product.style.display = 'block';
                    product.style.animation = 'pop 0.3s ease';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });

    // Color dots
    document.querySelectorAll('.color-dot').forEach(dot => {
        dot.addEventListener('click', function () {
            const parent = this.closest('.product-colors');
            parent.querySelectorAll('.color-dot').forEach(d => d.style.transform = 'scale(1)');
            this.style.transform = 'scale(1.3)';
        });
    });
}

// ===== Water Tracker =====
let trackerData = {
    currentGlasses: 0,
    goalGlasses: 8,
    streak: 0,
    stars: 0,
    badges: [],
    lastDate: null
};

function initWaterTracker() {
    const glassesContainer = document.getElementById('glassesContainer');
    const addWaterBtn = document.getElementById('addWaterBtn');
    const resetBtn = document.getElementById('resetBtn');

    if (glassesContainer) {
        glassesContainer.querySelectorAll('.water-glass').forEach(glass => {
            glass.addEventListener('click', () => {
                const glassNum = parseInt(glass.dataset.glass);
                toggleGlass(glassNum);
            });
        });
    }

    if (addWaterBtn) {
        addWaterBtn.addEventListener('click', () => {
            if (trackerData.currentGlasses < trackerData.goalGlasses) {
                trackerData.currentGlasses++;
                updateTrackerUI();
                checkBadges();
                saveUserData();
            }
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            trackerData.currentGlasses = 0;
            updateTrackerUI();
            saveUserData();
        });
    }
}

function toggleGlass(glassNum) {
    if (glassNum <= trackerData.currentGlasses) {
        trackerData.currentGlasses = glassNum - 1;
    } else {
        trackerData.currentGlasses = glassNum;
    }
    updateTrackerUI();
    checkBadges();
    saveUserData();
}

function updateTrackerUI() {
    const currentDisplay = document.getElementById('currentGlasses');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const mascotEmoji = document.getElementById('mascotEmoji');
    const mascotMessage = document.getElementById('mascotMessage');

    if (currentDisplay) {
        currentDisplay.textContent = trackerData.currentGlasses;
    }

    if (progressBar) {
        const percent = (trackerData.currentGlasses / trackerData.goalGlasses) * 100;
        progressBar.style.width = percent + '%';
    }

    // Update glasses visual
    document.querySelectorAll('.water-glass').forEach(glass => {
        const glassNum = parseInt(glass.dataset.glass);
        if (glassNum <= trackerData.currentGlasses) {
            glass.classList.add('filled');
        } else {
            glass.classList.remove('filled');
        }
    });

    // Update progress text and mascot
    const messages = [
        { min: 0, max: 0, emoji: '💧', msg: "Let's start drinking water! 💪" },
        { min: 1, max: 2, emoji: '😊', msg: "Great start! Keep going! 🌟" },
        { min: 3, max: 4, emoji: '🌈', msg: "You're doing amazing! 🎉" },
        { min: 5, max: 6, emoji: '⭐', msg: "Almost there! So proud! 💖" },
        { min: 7, max: 7, emoji: '🌟', msg: "One more glass! You can do it! 🏆" },
        { min: 8, max: 8, emoji: '🎉', msg: "GOAL COMPLETE! You're a superstar! 👑" }
    ];

    const current = trackerData.currentGlasses;
    const message = messages.find(m => current >= m.min && current <= m.max) || messages[0];

    if (mascotEmoji) mascotEmoji.textContent = message.emoji;
    if (mascotMessage) mascotMessage.textContent = message.msg;
    if (progressText) {
        if (current === 0) progressText.textContent = "Click the glasses to track your water!";
        else if (current < trackerData.goalGlasses) progressText.textContent = `${trackerData.goalGlasses - current} more glasses to go!`;
        else progressText.textContent = "🎉 You did it! Goal complete! 🎉";
    }

    // Update stats
    const streakCount = document.getElementById('streakCount');
    const starsCount = document.getElementById('starsCount');
    const badgesCount = document.getElementById('badgesCount');

    if (streakCount) streakCount.textContent = trackerData.streak;
    if (starsCount) starsCount.textContent = trackerData.stars;
    if (badgesCount) badgesCount.textContent = trackerData.badges.length;

    // Update badge visuals
    updateBadgeVisuals();
}

function checkBadges() {
    const newBadges = [];

    // First glass
    if (trackerData.currentGlasses >= 1 && !trackerData.badges.includes('first-glass')) {
        trackerData.badges.push('first-glass');
        trackerData.stars += 1;
        newBadges.push({ emoji: '🥛', title: 'First Sip!', msg: 'You drank your first glass!' });
    }

    // Half way
    if (trackerData.currentGlasses >= 4 && !trackerData.badges.includes('half-way')) {
        trackerData.badges.push('half-way');
        trackerData.stars += 2;
        newBadges.push({ emoji: '🌟', title: 'Half Way!', msg: "You're half way to your goal!" });
    }

    // Goal complete
    if (trackerData.currentGlasses >= 8 && !trackerData.badges.includes('goal-complete')) {
        trackerData.badges.push('goal-complete');
        trackerData.stars += 5;
        trackerData.streak++;
        newBadges.push({ emoji: '🏆', title: 'Goal Complete!', msg: 'You finished your daily goal!' });

        // Check streak badges
        if (trackerData.streak >= 3 && !trackerData.badges.includes('streak-3')) {
            trackerData.badges.push('streak-3');
            trackerData.stars += 10;
            newBadges.push({ emoji: '🔥', title: '3 Day Streak!', msg: 'Wow! 3 days in a row!' });
        }
        if (trackerData.streak >= 7 && !trackerData.badges.includes('streak-7')) {
            trackerData.badges.push('streak-7');
            trackerData.stars += 20;
            newBadges.push({ emoji: '⭐', title: 'Week Hero!', msg: 'A whole week! Amazing!' });
        }
    }

    // Super star
    if (trackerData.stars >= 30 && !trackerData.badges.includes('super-star')) {
        trackerData.badges.push('super-star');
        newBadges.push({ emoji: '👑', title: 'Super Star!', msg: 'You collected 30 stars!' });
    }

    // Show celebration for new badges
    if (newBadges.length > 0) {
        showCelebration(newBadges[0]);
    }
}

function updateBadgeVisuals() {
    document.querySelectorAll('.reward-card').forEach(card => {
        const badgeId = card.dataset.badge;
        if (trackerData.badges.includes(badgeId)) {
            card.classList.add('earned');
            card.classList.remove('locked');
        } else {
            card.classList.remove('earned');
            card.classList.add('locked');
        }
    });
}

function showCelebration(badge) {
    const modal = document.getElementById('celebrationModal');
    const emoji = document.getElementById('celebrationEmoji');
    const title = document.getElementById('celebrationTitle');
    const message = document.getElementById('celebrationMessage');

    if (modal && emoji && title && message) {
        emoji.textContent = badge.emoji;
        title.textContent = badge.title;
        message.textContent = badge.msg;
        modal.style.display = 'flex';
    }
}

function closeCelebration() {
    const modal = document.getElementById('celebrationModal');
    if (modal) modal.style.display = 'none';
}

// Make closeCelebration available globally
window.closeCelebration = closeCelebration;

// ===== Data Persistence =====
function saveUserData() {
    trackerData.lastDate = new Date().toDateString();
    localStorage.setItem('sappikudiData', JSON.stringify(trackerData));
}

function loadUserData() {
    const saved = localStorage.getItem('sappikudiData');
    if (saved) {
        const data = JSON.parse(saved);
        const today = new Date().toDateString();

        if (data.lastDate !== today) {
            // New day - reset glasses but keep streak if goal was met
            if (data.currentGlasses >= data.goalGlasses) {
                // Keep streak
            } else {
                data.streak = 0; // Reset streak if goal wasn't met
            }
            data.currentGlasses = 0;
            // Remove daily badges for new earning
            data.badges = data.badges.filter(b => !['first-glass', 'half-way', 'goal-complete'].includes(b));
        }

        trackerData = { ...trackerData, ...data };
    }
    updateTrackerUI();
}

// ===== Animations =====
function initAnimations() {
    // Hero mascot speech rotation
    const speeches = [
        "Drink water, be awesome! 💪",
        "Splash splash! 🌊",
        "Water is yummy! 😋",
        "Stay cool, drink water! 🧊",
        "You're doing great! ⭐"
    ];

    const mascotSpeech = document.getElementById('mascotSpeech');
    if (mascotSpeech) {
        let speechIndex = 0;
        setInterval(() => {
            speechIndex = (speechIndex + 1) % speeches.length;
            mascotSpeech.style.opacity = '0';
            setTimeout(() => {
                mascotSpeech.textContent = speeches[speechIndex];
                mascotSpeech.style.opacity = '1';
            }, 300);
        }, 4000);
    }

    // Add hover effects to cards
    document.querySelectorAll('.card, .product-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Floating bubbles animation
    createFloatingBubbles();
}

function createFloatingBubbles() {
    const container = document.querySelector('.floating-bubbles');
    if (!container) return;

    // Add more bubbles dynamically
    for (let i = 0; i < 5; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble bubble-small';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.top = Math.random() * 100 + '%';
        bubble.style.animationDelay = Math.random() * 3 + 's';
        bubble.style.animationDuration = (4 + Math.random() * 4) + 's';
        container.appendChild(bubble);
    }
}

// ===== Utility Functions =====
function playSound(type) {
    // Could add sound effects here
    // For now, just visual feedback
}

// Add filter button styles dynamically
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .filter-btn {
        padding: 10px 20px;
        border-radius: 50px;
        border: 3px solid #7DD3FC;
        background: white;
        font-family: 'Fredoka', sans-serif;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    .filter-btn:hover {
        transform: scale(1.05);
    }
    .filter-btn.active {
        background: #7DD3FC;
        color: white;
    }
    .reminders-container {
        display: grid;
        gap: 15px;
    }
    .mascots-showcase {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
    }
    .mascot-card {
        text-align: center;
        padding: 30px;
    }
    .mascot-avatar {
        font-size: 4rem;
        margin-bottom: 15px;
    }
    .cta-section {
        padding: 60px 0;
    }
    .cta-card {
        padding: 40px;
    }
    @keyframes celebrate {
        0% { transform: scale(1) rotate(0); }
        25% { transform: scale(1.2) rotate(-10deg); }
        50% { transform: scale(1.2) rotate(10deg); }
        75% { transform: scale(1.1) rotate(-5deg); }
        100% { transform: scale(1) rotate(0); }
    }
    .animate-celebrate {
        animation: celebrate 0.5s ease-out;
    }
`;
document.head.appendChild(styleSheet);
