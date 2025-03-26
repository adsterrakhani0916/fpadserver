
document.addEventListener('DOMContentLoaded', function() {
  // Initialize variables
  let activeTab = 0;
  const hasLoaded = true;
  
  // Create animated background
  createAnimatedBackground();
  
  // Setup navigation
  setupNavigation();
  
  // Setup features grid
  setupFeaturesGrid();
  
  // Setup scroll animations
  setupScrollAnimations();
  
  // Setup toast notifications
  setupToastNotifications();
  
  // Initialize all buttons with event listeners
  initializeButtons();
  
  // ==================
  // Function Definitions
  // ==================
  
  // Create animated background with logo elements
  function createAnimatedBackground() {
    const backgroundEl = document.querySelector('.animated-background');
    
    // Create multiple logos
    for (let i = 0; i < 30; i++) {
      // Random positions and sizes
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const size = Math.random() * 2 + 0.5; // Between 0.5 and 2.5
      
      const logoEl = document.createElement('div');
      logoEl.className = 'background-logo';
      logoEl.style.top = `${top}%`;
      logoEl.style.left = `${left}%`;
      logoEl.style.transform = `scale(${size})`;
      logoEl.innerHTML = `
        <span class="logo-text">
          <span class="text-irbo-blue">IR</span>
          <span class="text-irbo-purple">.</span>
          <span class="text-irbo-red">BO</span>
        </span>
      `;
      
      backgroundEl.appendChild(logoEl);
    }
    
    // Horizontal scrolling logos
    const scrollRow1 = document.createElement('div');
    scrollRow1.style.position = 'absolute';
    scrollRow1.style.top = '25%';
    scrollRow1.style.right = '0';
    scrollRow1.style.whiteSpace = 'nowrap';
    scrollRow1.style.animation = 'logo-scroll 20s linear infinite';
    scrollRow1.innerHTML = `
      <div style="display: inline-block; opacity: 0.05;">
        <span class="logo-text" style="margin: 0 5rem; font-size: 3rem;">
          <span class="text-irbo-blue">IR</span>
          <span class="text-irbo-purple">.</span>
          <span class="text-irbo-red">BO</span>
        </span>
        <span class="logo-text" style="margin: 0 5rem; font-size: 3rem;">
          <span class="text-irbo-blue">IR</span>
          <span class="text-irbo-purple">.</span>
          <span class="text-irbo-red">BO</span>
        </span>
        <span class="logo-text" style="margin: 0 5rem; font-size: 3rem;">
          <span class="text-irbo-blue">IR</span>
          <span class="text-irbo-purple">.</span>
          <span class="text-irbo-red">BO</span>
        </span>
        <span class="logo-text" style="margin: 0 5rem; font-size: 3rem;">
          <span class="text-irbo-blue">IR</span>
          <span class="text-irbo-purple">.</span>
          <span class="text-irbo-red">BO</span>
        </span>
        <span class="logo-text" style="margin: 0 5rem; font-size: 3rem;">
          <span class="text-irbo-blue">IR</span>
          <span class="text-irbo-purple">.</span>
          <span class="text-irbo-red">BO</span>
        </span>
      </div>
    `;
    
    const scrollRow2 = document.createElement('div');
    scrollRow2.style.position = 'absolute';
    scrollRow2.style.top = '66%';
    scrollRow2.style.left = '0';
    scrollRow2.style.whiteSpace = 'nowrap';
    scrollRow2.style.animation = 'logo-scroll 20s linear infinite reverse';
    scrollRow2.innerHTML = scrollRow1.innerHTML;
    
    backgroundEl.appendChild(scrollRow1);
    backgroundEl.appendChild(scrollRow2);
    
    // Show the background after a small delay
    setTimeout(() => {
      backgroundEl.classList.add('loaded');
    }, 500);
  }
  
  // Setup bottom navigation bar
  function setupNavigation() {
    const navItems = [
      { 
        icon: ICONS.home, 
        label: 'خانه', 
        color: 'bg-irbo-blue' 
      },
      { 
        icon: ICONS.mail, 
        label: 'ارتباط با ما', 
        color: 'bg-irbo-green' 
      },
      { 
        icon: ICONS.phone, 
        label: 'پشتیبانی', 
        color: 'bg-irbo-orange' 
      },
      { 
        icon: ICONS.barChart3, 
        label: 'سیگنال‌دهی', 
        color: 'bg-irbo-purple' 
      },
      { 
        icon: ICONS.bot, 
        label: 'ربات‌باینری‌آپشن', 
        color: 'bg-irbo-gray' 
      },
    ];
    
    const navItemsContainer = document.getElementById('nav-items');
    
    navItems.forEach((item, index) => {
      const navItem = document.createElement('div');
      navItem.className = 'nav-item';
      navItem.dataset.index = index;
      
      const iconClass = `nav-icon ${item.color} ${index === activeTab ? 'scale-115' : 'opacity-80'}`;
      const labelClass = `nav-label ${index === activeTab ? 'opacity-100' : 'opacity-0'}`;
      
      navItem.innerHTML = `
        <div class="${iconClass}" style="animation-delay: ${index * 0.1}s">
          ${item.icon}
        </div>
        <span class="${labelClass}">
          ${item.label}
        </span>
      `;
      
      navItem.addEventListener('click', function() {
        setActiveTab(index);
      });
      
      navItemsContainer.appendChild(navItem);
    });
    
    // Set the active tab
    function setActiveTab(index) {
      activeTab = index;
      
      // Update all nav items
      const allNavItems = document.querySelectorAll('.nav-item');
      allNavItems.forEach((item, idx) => {
        const iconEl = item.querySelector('.nav-icon');
        const labelEl = item.querySelector('.nav-label');
        
        if (idx === activeTab) {
          iconEl.classList.add('scale-115');
          iconEl.classList.remove('opacity-80');
          labelEl.classList.add('opacity-100');
          labelEl.classList.remove('opacity-0');
        } else {
          iconEl.classList.remove('scale-115');
          iconEl.classList.add('opacity-80');
          labelEl.classList.remove('opacity-100');
          labelEl.classList.add('opacity-0');
        }
      });
    }
  }
  
  // Setup features grid
  function setupFeaturesGrid() {
    const features = [
      {
        title: 'سیگنال‌های دقیق',
        description: 'سیگنال‌های با دقت بالا و نرخ موفقیت ۹۵٪',
        icon: ICONS.barChart3,
        color: 'bg-irbo-blue',
        span: 1,
      },
      {
        title: 'اعلان‌های لحظه‌ای',
        description: 'دریافت سیگنال‌ها به محض صدور در تلگرام',
        icon: ICONS.clock,
        color: 'bg-irbo-orange',
        span: 1,
      },
      {
        title: 'سرعت عمل بالا',
        description: 'واکنش سریع و به موقع به تغییرات بازار',
        icon: ICONS.zap,
        color: 'bg-irbo-yellow',
        span: 1,
      },
      {
        title: 'امنیت بالا',
        description: 'حفاظت از اطلاعات و سرمایه شما با بالاترین استانداردها',
        icon: ICONS.check,
        color: 'bg-irbo-green',
        span: 2,
      },
      {
        title: 'پشتیبانی ۲۴ ساعته',
        description: 'پشتیبانی در تمام ساعات هفته با تیم متخصص',
        icon: ICONS.clock,
        color: 'bg-irbo-purple',
        span: 1,
      },
      {
        title: 'کیفیت تضمین شده',
        description: 'با گارانتی بازگشت وجه در صورت عدم رضایت',
        icon: ICONS.check,
        color: 'bg-irbo-blue',
        span: 1,
      },
      {
        title: 'سیگنال‌های پرسود',
        description: 'استراتژی‌های معاملاتی حرفه‌ای برای حداکثر سودآوری',
        icon: ICONS.zap,
        color: 'bg-irbo-red',
        span: 1,
      },
      {
        title: 'پلن‌های ویژه VIP',
        description: 'دسترسی به سیگنال‌های اختصاصی و خدمات ویژه برای کاربران VIP',
        icon: ICONS.badge,
        color: 'bg-irbo-gray',
        span: 2,
      },
    ];
    
    const featuresGrid = document.getElementById('features-grid');
    
    features.forEach((feature, index) => {
      const featureEl = document.createElement('div');
      featureEl.className = `bento-card animate-on-scroll ${feature.span === 2 ? 'md:col-span-2' : ''}`;
      featureEl.style.transitionDelay = `${index * 0.1}s`;
      
      featureEl.innerHTML = `
        <div class="flex flex-col h-full">
          <div class="${feature.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4">
            ${feature.icon}
          </div>
          <h3 class="text-xl font-bold mb-2">${feature.title}</h3>
          <p class="text-gray-600 flex-grow">${feature.description}</p>
        </div>
      `;
      
      featuresGrid.appendChild(featureEl);
    });
  }
  
  // Setup scroll animations
  function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkInView() {
      animatedElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        if (isVisible) {
          element.classList.add('visible');
        }
      });
    }
    
    // Initial check
    checkInView();
    
    // Check on scroll
    window.addEventListener('scroll', checkInView);
  }
  
  // Setup toast notifications
  function setupToastNotifications() {
    window.showToast = function(title, message, duration = 3000) {
      const toastContainer = document.getElementById('toast-container');
      
      const toast = document.createElement('div');
      toast.className = 'toast animate-slide-up';
      toast.innerHTML = `
        <div class="flex-grow">
          <div class="toast-title">${title}</div>
          <div class="toast-description">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
      `;
      
      toastContainer.appendChild(toast);
      
      // Auto-remove after duration
      setTimeout(() => {
        toast.classList.add('animate-slide-up');
        setTimeout(() => {
          toast.remove();
        }, 300);
      }, duration);
    };
  }
  
  // Initialize all buttons with event listeners
  function initializeButtons() {
    // Signal info buttons
    const signalInfoButtons = document.querySelectorAll('.show-signal-info');
    signalInfoButtons.forEach(button => {
      button.addEventListener('click', function() {
        window.showToast('آماده‌باش!', 'سیگنال جدید EUR/USD تا ساعت ۳:۳۰ بامداد ارسال خواهد شد! آماده باشید...');
      });
    });
    
    // Guarantee info button
    const guaranteeInfoButton = document.querySelector('.show-guarantee-info');
    if (guaranteeInfoButton) {
      guaranteeInfoButton.addEventListener('click', function() {
        window.showToast('ضمانت IR.BO', 'ما به کیفیت سیگنال‌های خود اطمینان داریم!');
      });
    }
  }
});

// Add keyframes for logo-scroll animation
(function addKeyframes() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes logo-scroll {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }
  `;
  document.head.appendChild(style);
})();
