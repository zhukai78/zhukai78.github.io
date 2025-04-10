// Snowflake effect
function initSnowflakes() {
  const snowflakes = 50; // Number of snowflakes
  const body = document.querySelector('body');
  
  // Create snowflakes
  for (let i = 0; i < snowflakes; i++) {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = '❄';
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animationDelay = Math.random() * 10 + 's';
    snowflake.style.animationDuration = 5 + Math.random() * 10 + 's';
    body.appendChild(snowflake);
  }
}

// Cyberpunk cursor
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

// Initialize effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initSnowflakes();
  initCyberCursor();
});

// Also initialize when pjax:complete is triggered (for Butterfly theme compatibility)
document.addEventListener('pjax:complete', function() {
  initSnowflakes();
  initCyberCursor();
});

// Fallback initialization for when DOMContentLoaded already fired
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(function() {
    initSnowflakes();
    initCyberCursor();
  }, 1);
} 