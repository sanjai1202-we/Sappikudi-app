/**
 * Sappikudi Chatbot - Product Recommendation & Support
 * A RAG-like chatbot with product knowledge base
 */

// ===== Product Knowledge Base =====
const productKnowledge = {
    products: [
        {
            id: 'ocean-buddy',
            name: 'Ocean Buddy',
            color: 'blue',
            size: '500ml',
            price: 499,
            age: '5-8',
            features: ['BPA Free', 'Spill-Proof', 'Easy Grip'],
            theme: 'sky, ocean, water, flow, rainfall, calm, peaceful',
            description: 'Be as free as the sky! Stay hydrated and flow like gentle rainfall!',
            bestFor: ['school', 'everyday', 'boys', 'calm kids', 'water lovers']
        },
        {
            id: 'pinky-pop',
            name: 'Pinky Pop',
            color: 'pink',
            size: '500ml',
            price: 549,
            age: '5-8',
            features: ['Glitter Cap', 'Easy Grip', 'BPA Free'],
            theme: 'love, princess, heart, care, happiness, cute',
            description: 'Drink with love! Every sip fills your heart with happiness!',
            bestFor: ['girls', 'princess lovers', 'cute style', 'school']
        },
        {
            id: 'minty-fresh',
            name: 'Minty Fresh',
            color: 'green',
            size: '500ml',
            price: 499,
            age: '5-8',
            features: ['Eco-Friendly', 'Recycled Material', 'BPA Free'],
            theme: 'nature, tree, garden, environment, eco, green',
            description: 'Grow strong like a tree! Water helps you bloom like a garden!',
            bestFor: ['eco-conscious', 'nature lovers', 'outdoor activities', 'environment']
        },
        {
            id: 'magic-grape',
            name: 'Magic Grape',
            color: 'purple',
            size: '500ml',
            price: 649,
            age: '5-8',
            features: ['Color Changing', 'Special Edition', 'Magic Effect'],
            theme: 'magic, dreams, unicorn, fantasy, wizard, spell',
            description: 'Believe in magic! Every drop is a spell for health and happy dreams!',
            bestFor: ['magic lovers', 'imaginative kids', 'special occasions', 'gifts']
        },
        {
            id: 'sunny-sip',
            name: 'Sunny Sip',
            color: 'yellow',
            size: '500ml',
            price: 599,
            age: '5-8',
            features: ['Glow in Dark', 'Super Fun', 'BPA Free'],
            theme: 'sun, sunshine, energy, bright, happy, glow',
            description: 'Shine bright like the sun! Water gives you energy to play all day!',
            bestFor: ['active kids', 'sports', 'sleepovers', 'energetic', 'outdoor']
        },
        {
            id: 'deep-sea-diver',
            name: 'Deep Sea Diver',
            color: 'blue',
            size: '400ml',
            price: 399,
            age: '3-5',
            features: ['With Straw', 'Kids Size', 'Easy Hold'],
            theme: 'ocean, fish, sea, diving, water, small',
            description: 'Dive into hydration! Be cool like the ocean!',
            bestFor: ['toddlers', 'small kids', 'beginners', 'straw preference']
        }
    ],

    sizes: {
        small: { ml: 400, age: '3-5', label: 'Tiny Explorers' },
        medium: { ml: 500, age: '5-8', label: 'School Champions' },
        large: { ml: 600, age: '8+', label: 'Super Stars' }
    },

    contact: {
        email: 'hello@sappikudi.com',
        supportEmail: 'support@sappikudi.com',
        phone: '+91 98765 43210',
        whatsapp: '+91 98765 43210',
        emergencyPhone: '+91 98765 00000',
        hours: 'Monday-Saturday, 9 AM - 6 PM IST',
        address: 'Sappikudi Kids HQ, Bangalore, India'
    },

    faqs: [
        { q: 'safe', a: 'All our bottles are 100% BPA-free and made with food-grade materials safe for children! 🛡️' },
        { q: 'clean', a: 'Yes! All Sappikudi bottles are dishwasher safe. You can also hand wash with warm soapy water. 🧼' },
        { q: 'leak', a: 'Our bottles are leak-proof! The special seal design keeps bags dry and mess-free. 💧' },
        { q: 'warranty', a: 'We offer a 6-month warranty on all bottles. Contact support for any issues! ✨' },
        { q: 'return', a: 'Easy 7-day returns! If you\'re not happy, we\'ll refund or exchange. 📦' },
        { q: 'delivery', a: 'We deliver across India in 3-5 business days. Free shipping on orders above ₹999! 🚚' }
    ]
};

// ===== Chatbot Class =====
class SappikudiChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.createChatbotUI();
        this.bindEvents();
        this.addWelcomeMessage();
    }

    createChatbotUI() {
        const chatbotHTML = `
            <div class="chatbot-container" id="chatbotContainer">
                <!-- Floating Button -->
                <button class="chatbot-toggle" id="chatbotToggle" aria-label="Open Chat">
                    <span class="chatbot-icon">💬</span>
                    <span class="chatbot-close-icon">✕</span>
                    <span class="chatbot-badge" id="chatBadge">1</span>
                </button>
                
                <!-- Chat Window -->
                <div class="chatbot-window" id="chatbotWindow">
                    <div class="chatbot-header">
                        <div class="chatbot-header-info">
                            <div class="chatbot-avatar">💧</div>
                            <div>
                                <h4>Drippy Assistant</h4>
                                <span class="chatbot-status">Online • Ready to help!</span>
                            </div>
                        </div>
                        <button class="chatbot-minimize" id="chatbotMinimize">−</button>
                    </div>
                    
                    <div class="chatbot-messages" id="chatbotMessages">
                        <!-- Messages will be added here -->
                    </div>
                    
                    <div class="chatbot-quick-actions" id="quickActions">
                        <button class="quick-btn" data-action="recommend">🍼 Recommend a Bottle</button>
                        <button class="quick-btn" data-action="sizes">📏 Size Guide</button>
                        <button class="quick-btn" data-action="contact">📞 Contact Us</button>
                        <button class="quick-btn" data-action="help">❓ Help</button>
                    </div>
                    
                    <div class="chatbot-input-area">
                        <input type="text" class="chatbot-input" id="chatbotInput" placeholder="Ask me anything... 💭" autocomplete="off">
                        <button class="chatbot-send" id="chatbotSend">
                            <span>➤</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
        this.injectStyles();
    }

    injectStyles() {
        const styles = `
            .chatbot-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 9999;
                font-family: 'Nunito', sans-serif;
            }
            
            .chatbot-toggle {
                width: 65px;
                height: 65px;
                border-radius: 50%;
                border: none;
                background: linear-gradient(135deg, #7DD3FC, #38BDF8);
                box-shadow: 0 4px 20px rgba(125, 211, 252, 0.4);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                position: relative;
            }
            
            .chatbot-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 25px rgba(125, 211, 252, 0.5);
            }
            
            .chatbot-icon {
                font-size: 1.8rem;
                transition: all 0.3s ease;
            }
            
            .chatbot-close-icon {
                font-size: 1.5rem;
                color: white;
                display: none;
            }
            
            .chatbot-container.open .chatbot-icon { display: none; }
            .chatbot-container.open .chatbot-close-icon { display: block; }
            
            .chatbot-badge {
                position: absolute;
                top: -5px;
                right: -5px;
                background: #FB7185;
                color: white;
                width: 22px;
                height: 22px;
                border-radius: 50%;
                font-size: 0.75rem;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: pulse 2s infinite;
            }
            
            .chatbot-container.open .chatbot-badge { display: none; }
            
            .chatbot-window {
                position: absolute;
                bottom: 80px;
                right: 0;
                width: 380px;
                max-width: calc(100vw - 40px);
                height: 520px;
                max-height: calc(100vh - 120px);
                background: white;
                border-radius: 24px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                display: none;
                flex-direction: column;
                overflow: hidden;
                animation: slideUp 0.3s ease;
            }
            
            .chatbot-container.open .chatbot-window {
                display: flex;
            }
            
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .chatbot-header {
                background: linear-gradient(135deg, #7DD3FC, #38BDF8);
                padding: 15px 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: white;
            }
            
            .chatbot-header-info {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .chatbot-avatar {
                width: 45px;
                height: 45px;
                background: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
            }
            
            .chatbot-header h4 {
                margin: 0;
                font-family: 'Fredoka', sans-serif;
                font-size: 1.1rem;
            }
            
            .chatbot-status {
                font-size: 0.8rem;
                opacity: 0.9;
            }
            
            .chatbot-minimize {
                background: rgba(255,255,255,0.2);
                border: none;
                color: white;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 1.2rem;
            }
            
            .chatbot-messages {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                background: #F8FAFC;
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            
            .chat-message {
                max-width: 85%;
                padding: 12px 16px;
                border-radius: 18px;
                font-size: 0.95rem;
                line-height: 1.4;
                animation: fadeIn 0.3s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .chat-message.bot {
                background: white;
                border: 2px solid #E2E8F0;
                align-self: flex-start;
                border-bottom-left-radius: 4px;
            }
            
            .chat-message.user {
                background: linear-gradient(135deg, #7DD3FC, #38BDF8);
                color: white;
                align-self: flex-end;
                border-bottom-right-radius: 4px;
            }
            
            .chat-message.bot .message-avatar {
                display: inline-block;
                margin-right: 5px;
            }
            
            .product-card-mini {
                background: linear-gradient(135deg, #F0F9FF, white);
                border: 2px solid #BAE6FD;
                border-radius: 12px;
                padding: 12px;
                margin-top: 10px;
            }
            
            .product-card-mini h5 {
                margin: 0 0 5px 0;
                font-family: 'Fredoka', sans-serif;
                color: #0369A1;
            }
            
            .product-card-mini p {
                margin: 3px 0;
                font-size: 0.85rem;
                color: #64748B;
            }
            
            .product-card-mini .price {
                color: #0EA5E9;
                font-weight: bold;
                font-size: 1.1rem;
            }
            
            .contact-card {
                background: linear-gradient(135deg, #FEF3C7, #FDE68A);
                border: 2px solid #FCD34D;
                border-radius: 12px;
                padding: 12px;
                margin-top: 10px;
            }
            
            .contact-card h5 {
                margin: 0 0 8px 0;
                font-family: 'Fredoka', sans-serif;
                color: #92400E;
            }
            
            .contact-card p {
                margin: 4px 0;
                font-size: 0.85rem;
                color: #78350F;
            }
            
            .contact-card a {
                color: #0369A1;
                text-decoration: none;
                font-weight: 600;
            }
            
            .emergency-card {
                background: linear-gradient(135deg, #FEE2E2, #FECACA);
                border: 2px solid #F87171;
                border-radius: 12px;
                padding: 12px;
                margin-top: 10px;
            }
            
            .emergency-card h5 {
                margin: 0 0 8px 0;
                font-family: 'Fredoka', sans-serif;
                color: #B91C1C;
            }
            
            .chatbot-quick-actions {
                padding: 10px 15px;
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                background: white;
                border-top: 1px solid #E2E8F0;
            }
            
            .quick-btn {
                padding: 8px 12px;
                border: 2px solid #BAE6FD;
                background: #F0F9FF;
                border-radius: 20px;
                font-size: 0.8rem;
                cursor: pointer;
                transition: all 0.2s ease;
                font-family: 'Nunito', sans-serif;
            }
            
            .quick-btn:hover {
                background: #7DD3FC;
                color: white;
                border-color: #7DD3FC;
            }
            
            .chatbot-input-area {
                padding: 12px 15px;
                background: white;
                display: flex;
                gap: 10px;
                border-top: 1px solid #E2E8F0;
            }
            
            .chatbot-input {
                flex: 1;
                padding: 12px 16px;
                border: 2px solid #E2E8F0;
                border-radius: 25px;
                font-size: 0.95rem;
                outline: none;
                transition: border-color 0.2s ease;
                font-family: 'Nunito', sans-serif;
            }
            
            .chatbot-input:focus {
                border-color: #7DD3FC;
            }
            
            .chatbot-send {
                width: 45px;
                height: 45px;
                border: none;
                background: linear-gradient(135deg, #7DD3FC, #38BDF8);
                border-radius: 50%;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .chatbot-send:hover {
                transform: scale(1.1);
            }
            
            .typing-indicator {
                display: flex;
                gap: 4px;
                padding: 12px 16px;
                background: white;
                border: 2px solid #E2E8F0;
                border-radius: 18px;
                align-self: flex-start;
                border-bottom-left-radius: 4px;
            }
            
            .typing-dot {
                width: 8px;
                height: 8px;
                background: #94A3B8;
                border-radius: 50%;
                animation: typingBounce 1.4s infinite ease-in-out;
            }
            
            .typing-dot:nth-child(1) { animation-delay: 0s; }
            .typing-dot:nth-child(2) { animation-delay: 0.2s; }
            .typing-dot:nth-child(3) { animation-delay: 0.4s; }
            
            @keyframes typingBounce {
                0%, 60%, 100% { transform: translateY(0); }
                30% { transform: translateY(-8px); }
            }
            
            @media (max-width: 480px) {
                .chatbot-window {
                    width: calc(100vw - 20px);
                    height: calc(100vh - 100px);
                    right: -10px;
                    bottom: 75px;
                    border-radius: 20px;
                }
                
                .chatbot-toggle {
                    width: 55px;
                    height: 55px;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    bindEvents() {
        const toggle = document.getElementById('chatbotToggle');
        const minimize = document.getElementById('chatbotMinimize');
        const input = document.getElementById('chatbotInput');
        const send = document.getElementById('chatbotSend');
        const container = document.getElementById('chatbotContainer');
        const quickBtns = document.querySelectorAll('.quick-btn');

        toggle.addEventListener('click', () => this.toggleChat());
        minimize.addEventListener('click', () => this.toggleChat());

        send.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        quickBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.handleQuickAction(btn.dataset.action);
            });
        });
    }

    toggleChat() {
        const container = document.getElementById('chatbotContainer');
        const badge = document.getElementById('chatBadge');
        this.isOpen = !this.isOpen;
        container.classList.toggle('open', this.isOpen);
        if (this.isOpen) badge.style.display = 'none';
    }

    addWelcomeMessage() {
        const welcomeMsg = `
            <span class="message-avatar">💧</span>
            <strong>Hi there! I'm Drippy!</strong> 👋<br><br>
            I can help you find the perfect water bottle for your little one! Ask me about:
            <br>• 🍼 Bottle recommendations
            <br>• 📏 Size guide
            <br>• 🎨 Colors & themes
            <br>• 📞 Contact & support
        `;
        this.addBotMessage(welcomeMsg);
    }

    addBotMessage(content, isHTML = true) {
        const messagesDiv = document.getElementById('chatbotMessages');
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message bot';
        if (isHTML) {
            msgDiv.innerHTML = content;
        } else {
            msgDiv.textContent = content;
        }
        messagesDiv.appendChild(msgDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    addUserMessage(content) {
        const messagesDiv = document.getElementById('chatbotMessages');
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message user';
        msgDiv.textContent = content;
        messagesDiv.appendChild(msgDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    showTyping() {
        const messagesDiv = document.getElementById('chatbotMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
        messagesDiv.appendChild(typingDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    hideTyping() {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
    }

    sendMessage() {
        const input = document.getElementById('chatbotInput');
        const message = input.value.trim();
        if (!message) return;

        this.addUserMessage(message);
        input.value = '';

        this.showTyping();
        setTimeout(() => {
            this.hideTyping();
            this.processMessage(message);
        }, 800 + Math.random() * 500);
    }

    processMessage(message) {
        const lowerMsg = message.toLowerCase();

        // Check for greetings
        if (this.matchesAny(lowerMsg, ['hi', 'hello', 'hey', 'hii', 'helo'])) {
            this.addBotMessage("Hello! 👋 How can I help you today? Looking for a bottle for your child?");
            return;
        }

        // Check for emergency/urgent
        if (this.matchesAny(lowerMsg, ['emergency', 'urgent', 'help', 'problem', 'issue', 'broken', 'damaged'])) {
            this.showEmergencyContact();
            return;
        }

        // Check for contact info
        if (this.matchesAny(lowerMsg, ['contact', 'phone', 'email', 'call', 'reach', 'support', 'customer care'])) {
            this.showContactInfo();
            return;
        }

        // Check for size queries
        if (this.matchesAny(lowerMsg, ['size', 'age', 'how old', 'years', 'toddler', 'small', 'big', 'ml'])) {
            this.showSizeGuide();
            return;
        }

        // Check for color preferences
        const colorMatch = this.findColorPreference(lowerMsg);
        if (colorMatch) {
            this.recommendByColor(colorMatch);
            return;
        }

        // Check for specific needs/activities
        if (this.matchesAny(lowerMsg, ['school', 'class', 'study'])) {
            this.recommendForActivity('school');
            return;
        }
        if (this.matchesAny(lowerMsg, ['sport', 'play', 'active', 'running', 'outdoor'])) {
            this.recommendForActivity('sports');
            return;
        }
        if (this.matchesAny(lowerMsg, ['gift', 'birthday', 'special', 'present'])) {
            this.recommendForActivity('gift');
            return;
        }
        if (this.matchesAny(lowerMsg, ['girl', 'daughter', 'princess'])) {
            this.recommendForGender('girl');
            return;
        }
        if (this.matchesAny(lowerMsg, ['boy', 'son'])) {
            this.recommendForGender('boy');
            return;
        }

        // Check for price queries
        if (this.matchesAny(lowerMsg, ['price', 'cost', 'cheap', 'budget', 'affordable', 'expensive'])) {
            this.showPriceInfo();
            return;
        }

        // Check for FAQs
        for (const faq of productKnowledge.faqs) {
            if (lowerMsg.includes(faq.q)) {
                this.addBotMessage(`<span class="message-avatar">💧</span> ${faq.a}`);
                return;
            }
        }

        // Check for product recommendations request
        if (this.matchesAny(lowerMsg, ['recommend', 'suggest', 'which', 'best', 'bottle'])) {
            this.askForPreferences();
            return;
        }

        // Default response
        this.addBotMessage(`
            <span class="message-avatar">💧</span>
            I'd love to help! 😊 Could you tell me more about:
            <br>• Your child's age?
            <br>• Favorite color?
            <br>• What they'll use it for (school, sports, etc.)?
            <br><br>Or tap one of the quick buttons below! 👇
        `);
    }

    matchesAny(text, keywords) {
        return keywords.some(kw => text.includes(kw));
    }

    findColorPreference(text) {
        const colors = ['blue', 'pink', 'green', 'purple', 'yellow', 'red', 'orange'];
        return colors.find(c => text.includes(c));
    }

    handleQuickAction(action) {
        switch (action) {
            case 'recommend':
                this.addUserMessage('Recommend a bottle');
                this.askForPreferences();
                break;
            case 'sizes':
                this.addUserMessage('Show size guide');
                this.showSizeGuide();
                break;
            case 'contact':
                this.addUserMessage('Contact information');
                this.showContactInfo();
                break;
            case 'help':
                this.addUserMessage('Help');
                this.showHelp();
                break;
        }
    }

    askForPreferences() {
        this.addBotMessage(`
            <span class="message-avatar">💧</span>
            I'd love to find the perfect bottle! 🍼<br><br>
            Tell me about your child:
            <br>• How old are they? (3-5, 5-8, or 8+)
            <br>• Favorite color?
            <br>• Any special needs? (sports, school, eco-friendly)
            <br><br>Or just tell me what they like! 💜
        `);
    }

    recommendByColor(color) {
        const products = productKnowledge.products.filter(p => p.color === color);
        if (products.length > 0) {
            const product = products[0];
            this.addBotMessage(`
                <span class="message-avatar">💧</span>
                Great choice! ${color.charAt(0).toUpperCase() + color.slice(1)} is awesome! 🎨
                <br><br>I recommend:
                <div class="product-card-mini">
                    <h5>${product.name}</h5>
                    <p>"${product.description}"</p>
                    <p>📦 ${product.size} • Ages ${product.age}</p>
                    <p>✨ ${product.features.join(', ')}</p>
                    <p class="price">₹${product.price}</p>
                </div>
                <br>Perfect for ${product.bestFor.slice(0, 3).join(', ')}! 
                <br><br>Want to see more options or have questions?
            `);
        }
    }

    recommendForActivity(activity) {
        let product, message;
        switch (activity) {
            case 'school':
                product = productKnowledge.products.find(p => p.name === 'Ocean Buddy');
                message = 'For school, I recommend something practical and fun!';
                break;
            case 'sports':
                product = productKnowledge.products.find(p => p.name === 'Sunny Sip');
                message = 'For active kids, you need energy and fun!';
                break;
            case 'gift':
                product = productKnowledge.products.find(p => p.name === 'Magic Grape');
                message = 'For a special gift, something magical!';
                break;
        }

        this.addBotMessage(`
            <span class="message-avatar">💧</span>
            ${message} 🌟
            <div class="product-card-mini">
                <h5>${product.name}</h5>
                <p>"${product.description}"</p>
                <p>📦 ${product.size} • Ages ${product.age}</p>
                <p>✨ ${product.features.join(', ')}</p>
                <p class="price">₹${product.price}</p>
            </div>
            <br>Would you like to see other options too?
        `);
    }

    recommendForGender(gender) {
        let products;
        if (gender === 'girl') {
            products = productKnowledge.products.filter(p => ['pink', 'purple'].includes(p.color));
        } else {
            products = productKnowledge.products.filter(p => ['blue', 'green'].includes(p.color));
        }

        const product = products[0];
        this.addBotMessage(`
            <span class="message-avatar">💧</span>
            I have some great options! 🌈
            <div class="product-card-mini">
                <h5>${product.name}</h5>
                <p>"${product.description}"</p>
                <p>📦 ${product.size} • Ages ${product.age}</p>
                <p class="price">₹${product.price}</p>
            </div>
            <br>Want to see more colors?
        `);
    }

    showSizeGuide() {
        this.addBotMessage(`
            <span class="message-avatar">💧</span>
            Here's our size guide! 📏
            <div class="product-card-mini">
                <h5>🍼 Small - 400ml</h5>
                <p>Ages 3-5 • "Tiny Explorers"</p>
                <p>Perfect for toddlers with easy-grip handles</p>
            </div>
            <div class="product-card-mini">
                <h5>🥤 Medium - 500ml</h5>
                <p>Ages 5-8 • "School Champions"</p>
                <p>Great for school days - most popular!</p>
            </div>
            <div class="product-card-mini">
                <h5>🧴 Large - 600ml</h5>
                <p>Ages 8+ • "Super Stars"</p>
                <p>For active bigger kids</p>
            </div>
            <br>Which size sounds right for your child?
        `);
    }

    showContactInfo() {
        const contact = productKnowledge.contact;
        this.addBotMessage(`
            <span class="message-avatar">💧</span>
            Here's how to reach us! 📞
            <div class="contact-card">
                <h5>📧 Email Us</h5>
                <p>General: <a href="mailto:${contact.email}">${contact.email}</a></p>
                <p>Support: <a href="mailto:${contact.supportEmail}">${contact.supportEmail}</a></p>
            </div>
            <div class="contact-card">
                <h5>📱 Call/WhatsApp</h5>
                <p>Phone: <a href="tel:${contact.phone}">${contact.phone}</a></p>
                <p>WhatsApp: <a href="https://wa.me/${contact.whatsapp.replace(/\D/g, '')}">${contact.whatsapp}</a></p>
            </div>
            <div class="contact-card">
                <h5>⏰ Working Hours</h5>
                <p>${contact.hours}</p>
                <p>📍 ${contact.address}</p>
            </div>
            <br>Is there anything specific I can help with?
        `);
    }

    showEmergencyContact() {
        const contact = productKnowledge.contact;
        this.addBotMessage(`
            <span class="message-avatar">💧</span>
            I'm sorry you're having trouble! Let me help right away! 🆘
            <div class="emergency-card">
                <h5>🚨 Urgent Support</h5>
                <p><strong>Emergency Line:</strong> <a href="tel:${contact.emergencyPhone}">${contact.emergencyPhone}</a></p>
                <p><strong>Quick Support:</strong> <a href="mailto:${contact.supportEmail}">${contact.supportEmail}</a></p>
                <p><strong>WhatsApp:</strong> <a href="https://wa.me/${contact.whatsapp.replace(/\D/g, '')}">${contact.whatsapp}</a></p>
            </div>
            <div class="contact-card">
                <h5>💡 Quick Solutions</h5>
                <p>• Damaged bottle? We offer free replacement!</p>
                <p>• Missing parts? Contact us with order ID</p>
                <p>• Returns within 7 days - no questions!</p>
            </div>
            <br>Describe your issue and I'll try to help, or call us directly!
        `);
    }

    showPriceInfo() {
        this.addBotMessage(`
            <span class="message-avatar">💧</span>
            Great news - we're affordable! 💰
            <div class="product-card-mini">
                <h5>Our Price Range</h5>
                <p>🍼 Small bottles: Starting at <strong>₹399</strong></p>
                <p>🥤 Regular bottles: <strong>₹499 - ₹549</strong></p>
                <p>✨ Special editions: <strong>₹599 - ₹749</strong></p>
                <p>🚚 Free shipping above ₹999!</p>
            </div>
            <br>Want me to recommend something in your budget?
        `);
    }

    showHelp() {
        this.addBotMessage(`
            <span class="message-avatar">💧</span>
            I'm here to help! Here's what I can do: 🤗
            <br><br>
            <strong>🍼 Product Help</strong>
            <br>• Recommend bottles based on age, color, or needs
            <br>• Explain features and sizes
            <br>• Compare options
            <br><br>
            <strong>📦 Order Support</strong>
            <br>• Delivery info
            <br>• Returns & warranty
            <br>• Payment options
            <br><br>
            <strong>📞 Contact</strong>
            <br>• Get our contact details
            <br>• Emergency support
            <br><br>
            Just type your question or use the quick buttons! 💬
        `);
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.sappikudiChatbot = new SappikudiChatbot();
});
