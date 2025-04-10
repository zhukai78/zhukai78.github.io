// Inject our effects code via this file
document.write('<link rel="stylesheet" href="/css/custom.css">');
document.write('<script src="/js/custom.js"></script>');

// Immediate self-executing function for effects
(function() {
  // Create the styles directly in case the CSS file doesn't load
  const style = document.createElement('style');
  style.textContent = `
    /* Snowflake effect */
    .snowflake {
      position: fixed;
      top: -10px;
      color: #fff;
      font-size: 1.5em;
      text-shadow: 0 0 5px rgba(0, 195, 255, 0.7);
      z-index: 9999;
      pointer-events: none;
      user-select: none;
      animation: snowfall linear infinite;
    }
    
    @keyframes snowfall {
      0% { transform: translateY(0) rotate(0deg); }
      100% { transform: translateY(100vh) rotate(360deg); }
    }
    
    /* Cyberpunk cursor */
    .cyber-cursor {
      position: fixed;
      width: 20px;
      height: 20px;
      border: 2px solid #0ff;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 9999;
      box-shadow: 0 0 15px #0ff, 0 0 10px #f0f, 0 0 20px #0ff;
      mix-blend-mode: screen;
      transition: width 0.2s, height 0.2s;
    }
    
    html, body { cursor: none !important; }
    a, button, input { cursor: none !important; }
    
    /* Cyberpunk ripple effect */
    .cyber-ripple {
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0, 255, 255, 0.8) 0%, rgba(255, 0, 255, 0.5) 40%, rgba(0, 0, 0, 0) 70%);
      width: 10px;
      height: 10px;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 9999;
      animation: cyber-ripple 1s ease-out;
    }
    
    @keyframes cyber-ripple {
      0% { width: 0px; height: 0px; opacity: 1; }
      100% { width: 200px; height: 200px; opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // Function to initialize everything
  function initAll() {
    // Create snowflakes
    const snowflakes = 50;
    const body = document.querySelector('body');
    
    for (let i = 0; i < snowflakes; i++) {
      const snowflake = document.createElement('div');
      snowflake.classList.add('snowflake');
      snowflake.textContent = '❄';
      snowflake.style.left = Math.random() * 100 + 'vw';
      snowflake.style.animationDelay = Math.random() * 10 + 's';
      snowflake.style.animationDuration = 5 + Math.random() * 10 + 's';
      body.appendChild(snowflake);
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