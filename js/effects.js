// Inject our effects code via this file
document.write('<link rel="stylesheet" href="/css/custom.css">');
document.write('<script src="/js/custom.js"></script>');

// Immediate self-executing function for effects
(function() {
  // Create the styles directly in case the CSS file doesn't load
  const style = document.createElement('style');
  style.textContent = `
    /* Starlight effect */
    .star {
      position: fixed;
      top: -10px;
      width: 2px;
      height: 2px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.8);
      box-shadow: 0 0 5px rgba(255, 200, 100, 0.8), 0 0 10px rgba(255, 150, 50, 0.3);
      z-index: 9995;
      pointer-events: none;
      user-select: none;
      animation: starfall linear infinite;
    }
    
    .star.twinkle {
      animation: twinkle linear infinite;
    }
    
    @keyframes starfall {
      0% { transform: translateY(0) translateX(0); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { transform: translateY(100vh) translateX(20px); opacity: 0; }
    }
    
    @keyframes twinkle {
      0%, 100% { 
        opacity: 0.2;
        width: 1px;
        height: 1px;
        box-shadow: 0 0 2px rgba(255, 200, 100, 0.4), 0 0 4px rgba(255, 150, 50, 0.2);
      }
      50% { 
        opacity: 1;
        width: 2px;
        height: 2px;
        box-shadow: 0 0 5px rgba(255, 200, 100, 0.8), 0 0 10px rgba(255, 150, 50, 0.3);
      }
    }
    
    /* Cyberpunk cursor with warm colors */
    .cyber-cursor {
      position: fixed;
      width: 20px;
      height: 20px;
      border: 2px solid #e67e22;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 9999;
      box-shadow: 0 0 15px #e67e22, 0 0 10px #ff7800, 0 0 20px #e67e22;
      mix-blend-mode: screen;
      transition: width 0.2s, height 0.2s;
    }
    
    html, body { cursor: none !important; }
    a, button, input { cursor: none !important; }
    
    /* Dark theme overrides */
    body {
      background-image: linear-gradient(to bottom, #0a0a0a, #121212);
      color: #e0e0e0;
    }
    
    .card-widget {
      background: rgba(30, 30, 30, 0.8) !important;
      box-shadow: 0 0 10px rgba(230, 126, 34, 0.1) !important;
    }
  `;
  document.head.appendChild(style);

  // Function to initialize everything
  function initAll() {
    // Create starlight effect
    const stars = 100;
    const body = document.querySelector('body');
    
    for (let i = 0; i < stars; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      
      // Randomize star properties
      const size = Math.random() * 2 + 1;
      const isTwinkle = Math.random() > 0.7; // 30% stars will twinkle
      
      if (isTwinkle) {
        star.classList.add('twinkle');
      }
      
      star.style.left = Math.random() * 100 + 'vw';
      star.style.width = star.style.height = size + 'px';
      star.style.opacity = Math.random() * 0.5 + 0.5;
      
      // Different animation speeds
      if (isTwinkle) {
        star.style.animationDuration = 1 + Math.random() * 3 + 's';
      } else {
        star.style.animationDuration = 50 + Math.random() * 100 + 's';
        star.style.animationDelay = Math.random() * 50 + 's';
      }
      
      // Add warm glow for some stars
      if (Math.random() > 0.5) {
        const hue = Math.floor(Math.random() * 50) + 20; // Warm hues
        star.style.boxShadow = `0 0 ${3 + Math.random() * 3}px rgba(255, ${hue + 150}, ${hue}, 0.8)`;
      }
      
      body.appendChild(star);
    }
    
    // Create cyber cursor
    if (!document.querySelector('.cyber-cursor')) {
      const cursor = document.createElement('div');
      cursor.classList.add('cyber-cursor');
      document.body.appendChild(cursor);
      
      document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
      });
      
      document.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.classList.add('cyber-ripple');
        ripple.style.left = e.pageX + 'px';
        ripple.style.top = e.pageY + 'px';
        document.body.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 1000);
      });
      
      // Add hover glow to navigation links
      const navLinks = document.querySelectorAll('a, button, input[type="button"], .pagination *, .card *');
      navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
          cursor.classList.add('hover');
        });
        
        link.addEventListener('mouseleave', function() {
          cursor.classList.remove('hover');
        });
      });
    }
  }

  // Try to initialize on multiple events to ensure it works
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
  
  window.addEventListener('load', initAll);
})(); 