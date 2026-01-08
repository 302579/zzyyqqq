// 地区信息数据
const regionData = {
  '杭州': {
    title: '杭州端午习俗',
    content: '杭州端午节有点雄黄酒的习俗。雄黄酒是用雄黄粉末调制的白酒，人们相信它可以驱邪避毒。此外，杭州人还会在端午节吃粽子、赛龙舟，西湖边的龙舟竞渡尤为壮观。'
  },
  '嘉兴': {
    title: '嘉兴端午习俗',
    content: '嘉兴是龙舟竞渡的发源地之一，端午节期间会举行盛大的龙舟比赛。嘉兴粽子更是闻名全国，以肉粽最为著名，馅料丰富，味道鲜美。'
  },
  '宁波': {
    title: '宁波端午习俗',
    content: '宁波端午节有吃"五黄"的习俗：黄鱼、黄瓜、黄鳝、鸭蛋黄和雄黄酒。宁波人还会制作香囊，内装艾草、菖蒲等香料，佩戴在身上以驱邪避瘟。'
  },
  '绍兴': {
    title: '绍兴端午习俗',
    content: '绍兴作为黄酒之乡，端午节必饮雄黄酒。绍兴人还会在门前悬挂菖蒲和艾草，制作五彩绳系在儿童手腕上，祈求平安健康。'
  },
  '台州': {
    title: '台州端午习俗',
    content: '台州端午节有独特的"跳五猖"民俗活动，人们戴上面具，扮演五猖神，在街头巡游，驱邪纳福。台州的粽子以碱水粽最为特色。'
  },
  '温州': {
    title: '温州端午习俗',
    content: '温州端午节有"游百病"的习俗，人们会到郊外踏青游玩，采集艾草和菖蒲。温州人还会制作精美的香囊，作为礼物互相赠送。'
  }
};

// 地区列表（用于轮播）
const regions = ['杭州', '嘉兴', '宁波', '绍兴', '台州', '温州'];
let currentIndex = -1; // 当前显示的地区索引
let autoplayTimer = null; // 自动播放定时器
let isAutoPlaying = false; // 是否正在自动播放
let isAnimating = false; // 是否正在执行动画

// ==================== 弹窗拖动功能 ====================

let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let boxStartX = 0;
let boxStartY = 0;

// 初始化拖动功能
function initDrag() {
  const infoBox = document.getElementById('info-box');
  const header = document.getElementById('info-box-header');
  
  header.addEventListener('mousedown', function(e) {
    isDragging = true;
    
    // 记录鼠标起始位置
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    
    // 获取弹窗当前位置
    const rect = infoBox.getBoundingClientRect();
    boxStartX = rect.left;
    boxStartY = rect.top;
    
    // 改变光标样式
    header.style.cursor = 'grabbing';
    
    // 阻止文本选择
    e.preventDefault();
  });
  
  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    
    // 计算鼠标移动距离
    const deltaX = e.clientX - dragStartX;
    const deltaY = e.clientY - dragStartY;
    
    // 计算新位置
    const newX = boxStartX + deltaX;
    const newY = boxStartY + deltaY;
    
    // 更新弹窗位置
    infoBox.style.left = newX + 'px';
    infoBox.style.top = newY + 'px';
    infoBox.style.transform = 'none'; // 取消居中定位
  });
  
  document.addEventListener('mouseup', function() {
    if (isDragging) {
      isDragging = false;
      header.style.cursor = 'move';
    }
  });
}

// ==================== 显示/关闭弹窗 ====================

// 显示地区信息
function showRegionInfo(regionName) {
  // 如果正在执行动画，忽略点击
  if (isAnimating) return;
  
  const data = regionData[regionName];
  if (data) {
    // 设置动画标志
    isAnimating = true;
    
    // 获取新的索引
    const newIndex = regions.indexOf(regionName);
    const oldIndex = currentIndex;
    
    // 添加地区卡片点击动画
    addRegionClickAnimation(regionName);
    
    // 更新地区卡片选中状态
    updateRegionSelection(newIndex);
    
    // 更新当前索引
    currentIndex = newIndex;
    updateCurrentRegion();
    updateIndicators();
    
    const infoBox = document.getElementById('info-box');
    const infoTitle = document.getElementById('info-title');
    const infoText = document.getElementById('info-text');
    
    // 如果弹窗已经显示，执行内容切换动画
    if (infoBox.classList.contains('show')) {
      // 内容淡出
      infoTitle.style.animation = 'contentFadeOut 0.3s ease-out forwards';
      infoText.style.animation = 'contentFadeOut 0.3s ease-out forwards';
      
      setTimeout(() => {
        // 更新内容
        infoTitle.textContent = data.title;
        infoText.textContent = data.content;
        
        // 内容淡入
        infoTitle.style.animation = 'contentFadeIn 0.3s ease-out forwards';
        infoText.style.animation = 'contentFadeIn 0.3s ease-out forwards';
        
        // 动画完成
        setTimeout(() => {
          infoTitle.style.animation = '';
          infoText.style.animation = '';
          isAnimating = false;
        }, 300);
      }, 300);
    } else {
      // 首次显示弹窗
      infoTitle.textContent = data.title;
      infoText.textContent = data.content;
      
      // 显示弹窗
      infoBox.classList.add('show');
      
      // 重置弹窗位置为居中
      infoBox.style.left = '50%';
      infoBox.style.top = '50%';
      infoBox.style.transform = 'translate(-50%, -50%)';
      
      // 动画完成
      setTimeout(() => {
        isAnimating = false;
      }, 500);
    }
  }
}

// 添加地区卡片点击动画
function addRegionClickAnimation(regionName) {
  const regionItems = document.querySelectorAll('.region-item');
  regionItems.forEach(item => {
    const nameEl = item.querySelector('.region-name');
    if (nameEl && nameEl.textContent === regionName) {
      // 添加点击动画类
      item.classList.add('region-clicked');
      
      // 动画结束后移除类
      setTimeout(() => {
        item.classList.remove('region-clicked');
      }, 600);
    }
  });
}

// 更新地区卡片选中状态
function updateRegionSelection(newIndex) {
  const regionItems = document.querySelectorAll('.region-item');
  regionItems.forEach((item, index) => {
    if (index === newIndex) {
      item.classList.add('region-selected');
    } else {
      item.classList.remove('region-selected');
    }
  });
}

// 关闭信息弹窗
function closeInfo() {
  document.getElementById('info-box').classList.remove('show');
}

// 点击弹窗外部关闭
document.addEventListener('click', function(event) {
  const infoBox = document.getElementById('info-box');
  if (event.target === infoBox) {
    closeInfo();
  }
});

// ==================== 轮播功能 ====================

// 上一个地区
function prevRegion() {
  if (currentIndex === -1) {
    currentIndex = 0;
  } else {
    currentIndex = (currentIndex - 1 + regions.length) % regions.length;
  }
  showRegionInfo(regions[currentIndex]);
}

// 下一个地区
function nextRegion() {
  if (currentIndex === -1) {
    currentIndex = 0;
  } else {
    currentIndex = (currentIndex + 1) % regions.length;
  }
  showRegionInfo(regions[currentIndex]);
}

// 跳转到指定地区
function goToRegion(index) {
  currentIndex = index;
  showRegionInfo(regions[currentIndex]);
}

// 更新当前地区显示
function updateCurrentRegion() {
  const currentRegionEl = document.getElementById('current-region');
  if (currentIndex === -1) {
    currentRegionEl.textContent = '当前：未选择';
  } else {
    currentRegionEl.textContent = `当前：${regions[currentIndex]} (${currentIndex + 1}/${regions.length})`;
  }
}

// ==================== 自动播放功能 ====================

// 切换自动播放
function toggleAutoplay() {
  if (isAutoPlaying) {
    stopAutoplay();
  } else {
    startAutoplay();
  }
}

// 开始自动播放
function startAutoplay() {
  isAutoPlaying = true;
  const btn = document.getElementById('autoplay-btn');
  btn.textContent = '⏸ 暂停播放';
  btn.classList.add('playing');
  
  // 如果还没有选择地区，从第一个开始
  if (currentIndex === -1) {
    currentIndex = 0;
    showRegionInfo(regions[currentIndex]);
  }
  
  // 设置定时器，每3秒切换一次
  autoplayTimer = setInterval(function() {
    nextRegion();
  }, 3000);
}

// 停止自动播放
function stopAutoplay() {
  isAutoPlaying = false;
  const btn = document.getElementById('autoplay-btn');
  btn.textContent = '▶ 开始自动播放';
  btn.classList.remove('playing');
  
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
}

// ==================== 轮播指示器 ====================

// 更新指示器状态
function updateIndicators() {
  const dots = document.querySelectorAll('.indicator-dot');
  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// ==================== 键盘快捷键 ====================

// 添加键盘快捷键支持
document.addEventListener('keydown', function(e) {
  // 左箭头：上一个
  if (e.key === 'ArrowLeft') {
    prevRegion();
    // 如果正在自动播放，重置定时器
    if (isAutoPlaying) {
      stopAutoplay();
      startAutoplay();
    }
  }
  // 右箭头：下一个
  else if (e.key === 'ArrowRight') {
    nextRegion();
    // 如果正在自动播放，重置定时器
    if (isAutoPlaying) {
      stopAutoplay();
      startAutoplay();
    }
  }
  // 空格键：切换自动播放
  else if (e.key === ' ' && e.target.tagName !== 'BUTTON') {
    e.preventDefault();
    toggleAutoplay();
  }
  // ESC键：关闭弹窗
  else if (e.key === 'Escape') {
    closeInfo();
    stopAutoplay();
  }
});

// ==================== 页面加载完成后初始化 ====================

window.addEventListener('DOMContentLoaded', function() {
  // 初始化拖动功能
  initDrag();
  
  // 更新当前地区显示
  updateCurrentRegion();
  
  console.log('✅ 地图页面功能已加载');
  console.log('💡 提示：');
  console.log('  - 点击地区卡片查看习俗详情');
  console.log('  - 使用左右箭头键切换地区');
  console.log('  - 按空格键开始/暂停自动播放');
  console.log('  - 按ESC键关闭弹窗');
  console.log('  - 拖动弹窗标题栏可移动弹窗位置');
});
