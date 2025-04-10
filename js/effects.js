// Inject our effects code via this file
document.write('<link rel="stylesheet" href="/css/custom.css">');
document.write('<script src="/js/custom.js"></script>');

/**
 * 网页特效组件 
 * Web page special effects
 */

// Stars effect
function initStars() {
  const starContainer = document.createElement('div');
  starContainer.className = 'star-container';
  document.body.appendChild(starContainer);
  
  // 创建更多星星 (Create more stars)
  const starCount = 220; // 增加星星数量
  
  // 使用文档片段提高性能
  const fragment = document.createDocumentFragment();
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // 随机位置 (Random position)
    const left = Math.random() * window.innerWidth;
    
    // 随机星星大小 (Random star size) - 增加范围，最小2px，最大5px
    const size = Math.random() * 3 + 2;
    
    // 随机动画持续时间 (Random animation duration)
    const duration = Math.random() * 40 + 25;
    
    // 随机透明度 (Random opacity) - 增加最小透明度，使星星更明亮
    const opacity = Math.random() * 0.3 + 0.7;
    
    // 应用样式 (Apply styles)
    star.style.left = left + 'px';
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.opacity = opacity;
    star.style.animationDuration = duration + 's';
    
    // 部分星星使用闪烁效果 (Some stars use twinkling effect)
    if (Math.random() < 0.7) { // 增加闪烁效果的星星比例
      star.classList.add('twinkle');
      star.style.animationDuration = Math.random() * 6 + 2 + 's';
    }
    
    // 给更多星星添加暖色调 (Add warm color to more stars)
    if (Math.random() < 0.6) { // 增加彩色星星比例
      const useWarmColor = Math.random() < 0.75; // 大部分使用暖色
      
      if (useWarmColor) {
        // 暖色系星星 - 黄色到橙红色范围
        const hue = Math.floor(Math.random() * 40) + 30; // 30-70范围的色相
        const saturation = 85 + Math.random() * 15; // 85-100%饱和度
        const lightness = 75 + Math.random() * 15; // 75-90%亮度
        
        star.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        star.style.boxShadow = `0 0 ${size * 3}px rgba(255, ${150 + Math.random() * 50}, 50, 0.9),
                               0 0 ${size * 6}px rgba(255, ${100 + Math.random() * 50}, 0, 0.7)`;
      } else {
        // 少量其他颜色星星 - 蓝色或紫色系
        const hue = Math.random() < 0.7 ? 
                    Math.floor(Math.random() * 40) + 200 : // 蓝色系 (200-240)
                    Math.floor(Math.random() * 30) + 270; // 紫色系 (270-300)
        const saturation = 70 + Math.random() * 30;
        const lightness = 70 + Math.random() * 20;
        
        star.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        star.style.boxShadow = `0 0 ${size * 3}px rgba(100, 150, 255, 0.9),
                               0 0 ${size * 6}px rgba(50, 100, 255, 0.7)`;
      }
    } else {
      // 普通白色星星，但增强发光效果
      star.style.boxShadow = `0 0 ${size * 2}px rgba(255, 255, 255, 0.9),
                             0 0 ${size * 4}px rgba(255, 220, 180, 0.7)`;
    }
    
    // 添加到文档片段而不是直接添加到DOM
    fragment.appendChild(star);
  }
  
  // 一次性将所有星星添加到容器
  starContainer.appendChild(fragment);
}

// Custom cursor effect
function initCustomCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'cyber-cursor';
  document.body.appendChild(cursor);
  
  // 添加自定义光标CSS类到HTML
  document.documentElement.classList.add('cursor-custom');
  
  // 使用节流函数优化鼠标移动事件
  let lastExecution = 0;
  
  document.addEventListener('mousemove', (e) => {
    const now = performance.now();
    // 每16ms更新一次光标位置(约60fps)
    if (now - lastExecution > 16) {
      cursor.style.top = e.clientY + 'px';
      cursor.style.left = e.clientX + 'px';
      lastExecution = now;
    }
  });
  
  // 鼠标悬停效果 (Mouse hover effect)
  const hoverElements = document.querySelectorAll('a, button, input[type="submit"], .hover-effect');
  
  hoverElements.forEach((element) => {
    element.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });
  
  // 优化点击效果 (Click effect)
  document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'cyber-ripple';
    ripple.style.top = e.clientY + 'px';
    ripple.style.left = e.clientX + 'px';
    document.body.appendChild(ripple);
    
    // 动画结束后自动移除元素
    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  });
}

// 初始化所有效果 (Initialize all effects)
function initAll() {
  // 初始化星星效果 (Initialize star effect)
  initStars();
  
  // 初始化自定义光标 (Initialize custom cursor)
  if (window.innerWidth > 768 && !navigator.userAgent.match(/(Android|iPhone|iPad|iPod|Mobile)/i)) {
    initCustomCursor();
  }
  
  // 监听窗口大小变化，优化星星位置
  window.addEventListener('resize', () => {
    // 清除现有星星并重新初始化
    const starContainer = document.querySelector('.star-container');
    if (starContainer) {
      starContainer.remove();
      initStars();
    }
  });
}

// 页面加载完成后初始化 (Initialize after page loads)
window.addEventListener('DOMContentLoaded', initAll); 