// Starlight effect (replacing snowflake)
function initStarlight() {
  const stars = 100; // Number of stars
  const body = document.querySelector('body');
  
  // Create stars
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
}

// Cyberpunk cursor with warm colors
function initCyberCursor() {
  // Check if cursor already exists
  if (document.querySelector('.cyber-cursor')) return;
  
  const cursor = document.createElement('div');
  cursor.classList.add('cyber-cursor');
  document.body.appendChild(cursor);
  
  document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
  });
  
  // Add click effect
  document.addEventListener('click', function(e) {
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.classList.add('cyber-ripple');
    ripple.style.left = e.pageX + 'px';
    ripple.style.top = e.pageY + 'px';
    document.body.appendChild(ripple);
    
    // Remove after animation completes
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

// Add warm glow to headings on hover
function initTextEffects() {
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  
  headings.forEach(heading => {
    heading.addEventListener('mouseenter', function() {
      this.style.textShadow = '0 0 10px rgba(230, 126, 34, 0.8)';
      this.style.transition = 'text-shadow 0.3s ease';
    });
    
    heading.addEventListener('mouseleave', function() {
      this.style.textShadow = '0 0 3px rgba(230, 126, 34, 0.3)';
    });
  });
}

// Initialize effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initStarlight();
  initCyberCursor();
  initTextEffects();
});

// Also initialize when pjax:complete is triggered (for Butterfly theme compatibility)
document.addEventListener('pjax:complete', function() {
  initStarlight();
  initCyberCursor();
  initTextEffects();
});

// Fallback initialization for when DOMContentLoaded already fired
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(function() {
    initStarlight();
    initCyberCursor();
    initTextEffects();
  }, 1);
} 