// 导航栏滚动效果
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('backToTop');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('py-2', 'shadow-md');
      navbar.classList.remove('py-4');
      
      backToTopBtn.classList.remove('opacity-0', 'invisible');
      backToTopBtn.classList.add('opacity-100', 'visible');
    } else {
      navbar.classList.add('py-4');
      navbar.classList.remove('py-2', 'shadow-md');
      
      backToTopBtn.classList.add('opacity-0', 'invisible');
      backToTopBtn.classList.remove('opacity-100', 'visible');
    }
  });
}

// 移动端菜单
function initMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      
      const icon = menuBtn.querySelector('i');
      if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }
}

// 返回顶部
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// 导入页面组件
function importComponents() {
  // 导入页头
  fetch('/components/header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-placeholder').innerHTML = data;
      initMobileMenu(); // 在页头加载后初始化移动端菜单
    });
  
  // 导入页脚
  fetch('/components/footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer-placeholder').innerHTML = data;
    });
}

// 懒加载图片
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }
}

// 分享功能
function initShare() {
  const shareButtons = document.querySelectorAll('[data-share]');
  
  shareButtons.forEach(button => {
    button.addEventListener('click', () => {
      const type = button.dataset.share;
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.title);
      
      let shareUrl = '';
      switch (type) {
        case 'weibo':
          shareUrl = `http://service.weibo.com/share/share.php?url=${url}&title=${title}`;
          break;
        case 'wechat':
          // 实现微信分享二维码显示逻辑
          break;
        case 'copy':
          navigator.clipboard.writeText(window.location.href)
            .then(() => alert('链接已复制到剪贴板'));
          break;
      }
      
      if (shareUrl) {
        window.open(shareUrl, '_blank');
      }
    });
  });
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
  importComponents();
  initNavbar();
  initBackToTop();
  initLazyLoading();
  initShare();
  
  // 添加页面载入动画
  document.body.classList.add('animate-fade-in');
});
