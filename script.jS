// script.js

document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById("start-screen");
    const gameUI = document.getElementById("game-ui");
    const startBtn = document.getElementById("start-btn");

    // Optional: Add a retro blip sound logic (Web Audio API)
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    function playBeep(frequency, duration) {
        if(audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
        
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + duration);
    }

    // Start Button Logic
    startBtn.addEventListener("click", () => {
        playBeep(440, 0.5); // Initial Beep
        
        setTimeout(() => {
            playBeep(880, 0.5); // Success Beep
            startScreen.classList.add("hidden");
            gameUI.classList.remove("hidden");
            
            // Scroll to top
            window.scrollTo(0, 0);
        }, 300);
    });

    // Hover sound effects for buttons and links
    const interactables = document.querySelectorAll("a, button, .quest-card");
    
    interactables.forEach(el => {
        el.addEventListener("mouseenter", () => {
            playBeep(330, 0.1); // Short low blip
        });
    });

    // Form submission mock
    const form = document.querySelector(".pixel-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const btn = form.querySelector(".send-btn");
        
        playBeep(660, 0.2);
        setTimeout(() => playBeep(880, 0.4), 200);
        
        const originalText = btn.innerHTML;
        btn.innerHTML = "[PACKET_SENT_SUCCESS]";
        btn.style.color = "var(--bg-color)";
        btn.style.backgroundColor = "var(--text-color)";
        
        form.reset();
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.color = "var(--text-color)";
            btn.style.backgroundColor = "var(--bg-color)";
        }, 3000);
    });

    // Smooth scrolling for pixel nav
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});