// 地区习俗数据
const regionCustoms = {
  '杭州': {
    icon: '👑',
    customs: '点雄黄酒',
    food: '粽子、五黄（黄鱼、黄瓜、黄鳝、鸭蛋黄、雄黄酒）',
    activity: '西湖龙舟竞渡',
    culture: '驱邪避毒，祈求平安',
    description: '杭州端午节有点雄黄酒的习俗。雄黄酒是用雄黄粉末调制的白酒，人们相信它可以驱邪避毒。此外，杭州人还会在端午节吃粽子、赛龙舟，西湖边的龙舟竞渡尤为壮观。'
  },
  '嘉兴': {
    icon: '🚣',
    customs: '赛龙舟',
    food: '嘉兴肉粽（闻名全国）',
    activity: '盛大的龙舟比赛',
    culture: '纪念屈原，团结协作',
    description: '嘉兴是龙舟竞渡的发源地之一，端午节期间会举行盛大的龙舟比赛。嘉兴粽子更是闻名全国，以肉粽最为著名，馅料丰富，味道鲜美。'
  },
  '宁波': {
    icon: '🫔',
    customs: '吃"五黄"、佩香囊',
    food: '黄鱼、黄瓜、黄鳝、鸭蛋黄、雄黄酒',
    activity: '制作香囊',
    culture: '驱邪避瘟，健康养生',
    description: '宁波端午节有吃"五黄"的习俗：黄鱼、黄瓜、黄鳝、鸭蛋黄和雄黄酒。宁波人还会制作香囊，内装艾草、菖蒲等香料，佩戴在身上以驱邪避瘟。'
  },
  '绍兴': {
    icon: '🍶',
    customs: '饮雄黄酒、挂菖蒲艾草',
    food: '粽子、黄酒',
    activity: '制作五彩绳',
    culture: '祈福纳祥，保佑平安',
    description: '绍兴作为黄酒之乡，端午节必饮雄黄酒。绍兴人还会在门前悬挂菖蒲和艾草，制作五彩绳系在儿童手腕上，祈求平安健康。'
  },
  '台州': {
    icon: '🎀',
    customs: '"跳五猖"民俗活动',
    food: '碱水粽',
    activity: '戴面具巡游',
    culture: '驱邪纳福，祈求丰收',
    description: '台州端午节有独特的"跳五猖"民俗活动，人们戴上面具，扮演五猖神，在街头巡游，驱邪纳福。台州的粽子以碱水粽最为特色。'
  },
  '温州': {
    icon: '🐯',
    customs: '"游百病"、采集艾草',
    food: '粽子、香囊',
    activity: '郊外踏青',
    culture: '强身健体，驱除病邪',
    description: '温州端午节有"游百病"的习俗，人们会到郊外踏青游玩，采集艾草和菖蒲。温州人还会制作精美的香囊，作为礼物互相赠送。'
  }
};

// 更新对比结果
function updateComparison() {
  const region1 = document.getElementById('region1').value;
  const region2 = document.getElementById('region2').value;
  const resultDiv = document.getElementById('comparison-result');
  
  // 如果没有选择两个地区，显示提示
  if (!region1 || !region2) {
    resultDiv.innerHTML = '<p class="placeholder-text">请选择两个地区进行对比</p>';
    return;
  }
  
  // 如果选择了相同的地区，显示提示
  if (region1 === region2) {
    resultDiv.innerHTML = '<p class="placeholder-text">请选择两个不同的地区进行对比</p>';
    return;
  }
  
  // 获取地区数据
  const data1 = regionCustoms[region1];
  const data2 = regionCustoms[region2];
  
  // 生成对比结果HTML
  const html = `
    <div class="result-grid">
      <div class="result-column">
        <span class="region-icon">${data1.icon}</span>
        <h3>${region1}</h3>
        <div class="result-item">
          <strong>特色习俗：</strong>
          <span>${data1.customs}</span>
        </div>
        <div class="result-item">
          <strong>传统食品：</strong>
          <span>${data1.food}</span>
        </div>
        <div class="result-item">
          <strong>民俗活动：</strong>
          <span>${data1.activity}</span>
        </div>
        <div class="result-item">
          <strong>文化内涵：</strong>
          <span>${data1.culture}</span>
        </div>
      </div>
      
      <div class="result-divider">
        <div class="divider-line"></div>
      </div>
      
      <div class="result-column">
        <span class="region-icon">${data2.icon}</span>
        <h3>${region2}</h3>
        <div class="result-item">
          <strong>特色习俗：</strong>
          <span>${data2.customs}</span>
        </div>
        <div class="result-item">
          <strong>传统食品：</strong>
          <span>${data2.food}</span>
        </div>
        <div class="result-item">
          <strong>民俗活动：</strong>
          <span>${data2.activity}</span>
        </div>
        <div class="result-item">
          <strong>文化内涵：</strong>
          <span>${data2.culture}</span>
        </div>
      </div>
    </div>
  `;
  
  resultDiv.innerHTML = html;
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', function() {
  console.log('✅ 知识拓展页面功能已加载');
  console.log('💡 提示：');
  console.log('  - 浏览各个知识区块了解端午文化');
  console.log('  - 使用习俗对比工具对比不同地区的习俗');
  console.log('  - 所有内容支持响应式布局');
});
