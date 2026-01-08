// 游戏数据
const cardIcons = [
  '🐉', // 龙舟
  '🥟', // 粽子
  '🌿', // 艾草
  '💐', // 香囊
  '🍶', // 雄黄酒
  '🎋', // 竹叶
  '🏮', // 灯笼
  '🎊'  // 彩带
];

// 游戏状态
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = 0;
let timerInterval = null;
let isProcessing = false;

// DOM元素
const cardsGrid = document.getElementById('cardsGrid');
const timerDisplay = document.getElementById('timer');
const movesDisplay = document.getElementById('moves');
const matchesDisplay = document.getElementById('matches');
const restartBtn = document.getElementById('restartBtn');
const victoryModal = document.getElementById('victoryModal');
const playAgainBtn = document.getElementById('playAgainBtn');
const finalTimeDisplay = document.getElementById('finalTime');
const finalMovesDisplay = document.getElementById('finalMoves');
const ratingDisplay = document.getElementById('rating');
const victoryMessage = document.getElementById('victoryMessage');
const fireworksContainer = document.getElementById('fireworksContainer');

// 初始化游戏
function initGame() {
  // 重置游戏状态
  cards = [];
  flippedCards = [];
  matchedPairs = 0;
  moves = 0;
  timer = 0;
  isProcessing = false;

  // 停止计时器
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  // 更新显示
  updateDisplay();

  // 创建卡片数组（每个图标两张）
  const cardPairs = [...cardIcons, ...cardIcons];
  
  // 洗牌
  shuffleArray(cardPairs);

  // 清空网格
  cardsGrid.innerHTML = '';

  // 创建卡片元素
  cardPairs.forEach((icon, index) => {
    const card = createCard(icon, index);
    cards.push(card);
    cardsGrid.appendChild(card.element);
  });

  // 隐藏胜利弹窗
  victoryModal.classList.remove('show');
}

// 创建卡片元素
function createCard(icon, index) {
  const cardElement = document.createElement('div');
  cardElement.className = 'card';
  cardElement.dataset.index = index;
  cardElement.dataset.icon = icon;

  cardElement.innerHTML = `
    <div class="card-face card-back"></div>
    <div class="card-face card-front">${icon}</div>
  `;

  cardElement.addEventListener('click', () => handleCardClick(index));

  return {
    element: cardElement,
    icon: icon,
    isFlipped: false,
    isMatched: false
  };
}

// 处理卡片点击
function handleCardClick(index) {
  // 如果正在处理或卡片已翻转或已匹配，则忽略点击
  if (isProcessing || cards[index].isFlipped || cards[index].isMatched) {
    return;
  }

  // 启动计时器（第一次点击时）
  if (!timerInterval) {
    startTimer();
  }

  // 翻转卡片
  flipCard(index);

  // 添加到已翻转卡片数组
  flippedCards.push(index);

  // 如果翻转了两张卡片，检查是否匹配
  if (flippedCards.length === 2) {
    moves++;
    updateDisplay();
    checkMatch();
  }
}

// 翻转卡片
function flipCard(index) {
  cards[index].isFlipped = true;
  cards[index].element.classList.add('flipped');
}

// 翻回卡片
function unflipCard(index) {
  cards[index].isFlipped = false;
  cards[index].element.classList.remove('flipped');
}

// 检查匹配
function checkMatch() {
  isProcessing = true;

  const [index1, index2] = flippedCards;
  const card1 = cards[index1];
  const card2 = cards[index2];

  if (card1.icon === card2.icon) {
    // 匹配成功
    setTimeout(() => {
      matchSuccess(index1, index2);
    }, 500);
  } else {
    // 匹配失败
    setTimeout(() => {
      matchFail(index1, index2);
    }, 1000);
  }
}

// 匹配成功
function matchSuccess(index1, index2) {
  cards[index1].isMatched = true;
  cards[index2].isMatched = true;

  cards[index1].element.classList.add('matched');
  cards[index2].element.classList.add('matched');

  matchedPairs++;
  updateDisplay();

  flippedCards = [];
  isProcessing = false;

  // 检查是否完成游戏
  if (matchedPairs === cardIcons.length) {
    setTimeout(() => {
      gameComplete();
    }, 800);
  }
}

// 匹配失败
function matchFail(index1, index2) {
  cards[index1].element.classList.add('mismatch');
  cards[index2].element.classList.add('mismatch');

  setTimeout(() => {
    cards[index1].element.classList.remove('mismatch');
    cards[index2].element.classList.remove('mismatch');

    unflipCard(index1);
    unflipCard(index2);

    flippedCards = [];
    isProcessing = false;
  }, 500);
}

// 游戏完成
function gameComplete() {
  // 停止计时器
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  // 显示最终统计
  finalTimeDisplay.textContent = formatTime(timer);
  finalMovesDisplay.textContent = moves;

  // 计算评分
  const rating = calculateRating();
  ratingDisplay.textContent = rating.stars;
  victoryMessage.textContent = rating.message;

  // 显示烟花效果
  createFireworks();

  // 延迟显示胜利弹窗
  setTimeout(() => {
    victoryModal.classList.add('show');
  }, 500);
}

// 计算评分
function calculateRating() {
  let stars = '★★★★★';
  let message = '完美！你是端午习俗大师！';

  if (moves > 30) {
    stars = '★★★';
    message = '不错！继续加油！';
  } else if (moves > 20) {
    stars = '★★★★';
    message = '很好！你对端午习俗很了解！';
  }

  if (timer > 120) {
    stars = stars.slice(0, -1);
    message = '加油！多练习会更快！';
  }

  return { stars, message };
}

// 创建烟花效果
function createFireworks() {
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
  
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight * 0.7;
      
      for (let j = 0; j < 12; j++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = x + 'px';
        firework.style.top = y + 'px';
        firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        const angle = (j * 30) * Math.PI / 180;
        const distance = 100 + Math.random() * 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        firework.style.setProperty('--tx', tx + 'px');
        firework.style.setProperty('--ty', ty + 'px');
        
        fireworksContainer.appendChild(firework);
        
        setTimeout(() => {
          firework.remove();
        }, 1000);
      }
    }, i * 100);
  }
}

// 启动计时器
function startTimer() {
  timerInterval = setInterval(() => {
    timer++;
    updateDisplay();
  }, 1000);
}

// 更新显示
function updateDisplay() {
  timerDisplay.textContent = formatTime(timer);
  movesDisplay.textContent = moves;
  matchesDisplay.textContent = `${matchedPairs}/${cardIcons.length}`;
}

// 格式化时间
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// 洗牌算法（Fisher-Yates）
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 重新开始按钮
restartBtn.addEventListener('click', () => {
  initGame();
});

// 再玩一次按钮
playAgainBtn.addEventListener('click', () => {
  initGame();
});

// 页面加载时初始化游戏
window.addEventListener('DOMContentLoaded', () => {
  initGame();
});
