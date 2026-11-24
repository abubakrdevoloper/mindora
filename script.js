/**
 * MINDORA — Aqlni Charxlovchi Interaktiv O‘yin Platformasi
 * Vanilla JS SPA Engine, 5 Age Tiers, 15 Interactive Games, LocalStorage & SVG Analytics
 */

const STORAGE_KEY = 'mindora_platform_state_v1';

// 1. AGE TIERS CONFIGURATION (Exact boundaries: 3-5, 6-9, 10-14, 15-19, 20-25)
const AGE_TIERS = [
  {
    id: '3-5',
    range: '3–5 YOSH',
    title: 'LITTLE EXPLORER',
    icon: '🌟',
    desc: 'Yorqin ranglar, yirik interaktiv elementlar, shakllar, ranglar va oddiy sanash o‘yinlari.',
    tags: ['Shakllar', 'Ranglar', 'Moslashtirish', 'Sanash'],
    difficultyLabel: 'Boshlang‘ich',
    multiplier: 1.0,
    tagline: 'Kichik kashfiyotchilar uchun quvnoq va sodda mantiqiy mashqlar.'
  },
  {
    id: '6-9',
    range: '6–9 YOSH',
    title: 'SMART THINKER',
    icon: '🧩',
    desc: 'Qiziqarli matematik jumboqlar, so‘z topish, xotira kartalari va mantiqiy ketma-ketliklar.',
    tags: ['Matematika', 'So‘z topish', 'Xotira', 'Ketma-ketlik'],
    difficultyLabel: 'O‘quvchi',
    multiplier: 1.25,
    tagline: 'Maktab yoshidagi bolalar uchun fikrlash tezligini oshiruvchi o‘yinlar.'
  },
  {
    id: '10-14',
    range: '10–14 YOSH',
    title: 'BRAIN MASTER',
    icon: '⚡',
    desc: 'Futuristik gaming dashboard: Sudoku, kodni aniqlash, fazoviy fikrlash va IQ jumboqlar.',
    tags: ['Sudoku', 'Kod aniqlash', 'Pattern', 'Fazoviy'],
    difficultyLabel: 'O‘rta',
    multiplier: 1.5,
    tagline: 'Mantiqiy zanjirlar va strategik tahlil ko‘nikmalarini charxlash.'
  },
  {
    id: '15-19',
    range: '15–19 YOSH',
    title: 'ELITE MIND',
    icon: '🔮',
    desc: 'Texnologik minimalizm: deduktiv fikrlash, shifrlarni yechish va algoritmik masalalar.',
    tags: ['Deduksiya', 'Shifrlar', 'Algoritm', 'Tezkor qaror'],
    difficultyLabel: 'Yuqori',
    multiplier: 1.8,
    tagline: 'Murakkab paradokslar va yuqori tezlikdagi kognitiv sinovlar.'
  },
  {
    id: '20-25',
    range: '20–25 YOSH',
    title: 'MASTER INTELLECT',
    icon: '👑',
    desc: 'Luxury professional UI: strategik muammolar, matematik analiz va ko‘p bosqichli challenge.',
    tags: ['Strategiya', 'Analiz', 'Ko‘p bosqichli', 'Challenge'],
    difficultyLabel: 'Ekspert',
    multiplier: 2.2,
    tagline: 'Maksimal intellektual yuklama va professional aqliy mashg‘ulotlar.'
  }
];

// 2. 15 INTERACTIVE GAMES CATALOG
const GAMES_LIST = [
  { id: 'memory-matrix', title: 'Memory Matrix', category: 'Xotira', icon: '🟦', desc: 'Yoritilgan kataklar joylashuvini eslab qoling va ularni aniq tiklang.' },
  { id: 'number-logic', title: 'Number Logic', category: 'Matematika', icon: '🔢', desc: 'Sonli ketma-ketlik qonuniyatini aniqlang va keyingi sonni toping.' },
  { id: 'pattern-master', title: 'Pattern Master', category: 'Mantiq', icon: '💠', desc: 'Shakllar va ranglar ketma-ketligidagi yetishmayotgan elementni toping.' },
  { id: 'sudoku-pro', title: 'Sudoku Pro', category: 'Mantiq', icon: '⊞', desc: 'Klassik mantiqiy raqamlar jadvalini xatosiz to‘ldiring.' },
  { id: 'code-breaker', title: 'Code Breaker', category: 'Mantiq', icon: '🔐', desc: 'Mantiqiy ishoralar yordamida maxfiy raqamli kodni oching.' },
  { id: 'quick-math', title: 'Quick Math', category: 'Matematika', icon: '⚡', desc: 'Vaqt tugashidan oldin arifmetik misollarni tezkor yeching.' },
  { id: 'word-puzzle', title: 'Word Puzzle', category: 'Mantiq', icon: '🔤', desc: 'Aralashgan harflardan to‘g‘ri mantiqiy so‘zni tuzing.' },
  { id: 'shape-rotation', title: 'Shape Rotation', category: 'Diqqat', icon: '🧭', desc: 'Shakllarning fazoviy burilish burchagini va mos proyeksiyasini toping.' },
  { id: 'logic-detective', title: 'Logic Detective', category: 'Mantiq', icon: '🕵️', desc: 'Berilgan faktlar asosida deduktiv xulosa chiqaring.' },
  { id: 'focus-challenge', title: 'Focus Challenge', category: 'Diqqat', icon: '🎯', desc: 'Stroop effekti: so‘z ma’nosiga emas, uning haqiqiy rangiga e’tibor bering.' },
  { id: 'sequence-hunter', title: 'Sequence Hunter', category: 'Xotira', icon: '🔗', desc: 'Ekranda birin-ketin paydo bo‘lgan belgilarni tartib bilan takrorlang.' },
  { id: 'brain-maze', title: 'Brain Maze', category: 'Diqqat', icon: '🌀', desc: 'To‘siqlarni aylanib o‘tib, eng qisqa yo‘l bilan marraga yeting.' },
  { id: 'odd-one-out', title: 'Odd One Out', category: 'Diqqat', icon: '👁️', desc: 'Umumiy qoidaga bo‘ysunmaydigan ortiqcha elementni tezda aniqlang.' },
  { id: 'strategic-moves', title: 'Strategic Moves', category: 'Mantiq', icon: '♟️', desc: 'Raqib yurishini oldindan hisoblab, g‘alaba strategiyasini tuzing.' },
  { id: 'iq-challenge', title: 'IQ Challenge', category: 'Mantiq', icon: '🧠', desc: 'Mantiq, matematika va fazoviy fikrlashni birlashtirgan ko‘p bosqichli sinov.' }
];

// 3. RANKS & ACHIEVEMENTS
const RANKS = [
  { name: 'Beginner', minXP: 0, icon: '🌱', desc: 'Kognitiv mashg‘ulotlar boshlanishi' },
  { name: 'Thinker', minXP: 500, icon: '💡', desc: 'Mantiqiy tahlil ko‘nikmalari shakllandi' },
  { name: 'Smart Mind', minXP: 1500, icon: '⚡', desc: 'Yuqori diqqat va tezkor fikrlash' },
  { name: 'Brain Master', minXP: 3500, icon: '🔮', desc: 'Murakkab jumboqlar ustasi' },
  { name: 'Genius Level', minXP: 7000, icon: '👑', desc: 'Eng yuqori intellektual daraja' }
];

const ACHIEVEMENTS = [
  { id: 'first_game', title: 'First Game', desc: 'Birinchi o‘yinni yakunlash', icon: '🚀' },
  { id: 'fast_thinker', title: 'Fast Thinker', desc: 'O‘yinni 25 soniyadan tez yechish', icon: '⚡' },
  { id: 'perfect_round', title: 'Perfect Round', desc: 'Birorta xatosiz bosqich', icon: '💎' },
  { id: 'memory_expert', title: 'Memory Expert', desc: 'Xotira o‘yinida 150+ ball', icon: '🧠' },
  { id: 'seven_streak', title: 'Seven Day Streak', desc: '7 kunlik uzluksiz faollik', icon: '🔥' },
  { id: 'master_player', title: 'Master Player', desc: '1500 XP dan oshish', icon: '👑' }
];

const AVATARS = ['🧠', '⚡', '🔮', '🦊', '🦉', '🚀', '♟️', '💎', '🌌', '🎯'];

const QUOTES = [
  "Aql — mushak kabi: har kuni mashq qildirsang, yanada kuchayadi.",
  "Tezkor fikrlash — murakkab muammolarni oddiy yechimlarga ajratish san’ati.",
  "Diqqatni boshqara olgan inson o‘z kelajagini ham boshqara oladi.",
  "Har bir yechilgan mantiqiy jumboq miyangizda yangi neyron yo‘llarini ochadi."
];

// 4. APPLICATION STATE
let state = {
  username: '',
  ageTier: '',
  avatar: '🧠',
  totalScore: 0,
  xp: 0,
  gamesPlayed: 0,
  correctAnswers: 0,
  totalAttempts: 0,
  bestScore: 0,
  streak: 1,
  lastActiveDate: new Date().toDateString(),
  dailyGamesCount: 0,
  history: [],
  unlockedAchievements: [],
  settings: {
    theme: 'dark',
    sound: true,
    animations: true
  }
};

// Active Game Runtime State
let activeGame = {
  id: null,
  score: 0,
  correct: 0,
  wrong: 0,
  seconds: 0,
  timerInterval: null
};

// 5. SOUND ENGINE (Web Audio API - No external files required)
const SoundFX = {
  ctx: null,
  play(type) {
    if (!state.settings.sound) return;
    try {
      if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      const now = this.ctx.currentTime;
      if (type === 'click') {
        osc.frequency.setValueAtTime(520, now);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'correct') {
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.setValueAtTime(880, now + 0.09);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'wrong') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(190, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (type === 'win') {
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.1);
        osc.frequency.setValueAtTime(783.99, now + 0.2);
        osc.frequency.setValueAtTime(1046.5, now + 0.3);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
        osc.start(now);
        osc.stop(now + 0.55);
      }
    } catch (e) {}
  }
};

// 6. STORAGE & INITIALIZATION
function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      state = { ...state, ...parsed, settings: { ...state.settings, ...(parsed.settings || {}) } };
    } catch (e) {
      console.error('LocalStorage parse error:', e);
    }
  }
  checkDailyReset();
  applySettings();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function checkDailyReset() {
  const today = new Date().toDateString();
  if (state.lastActiveDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (state.lastActiveDate === yesterday) {
      state.streak += 1;
    } else {
      state.streak = 1;
    }
    state.dailyGamesCount = 0;
    state.lastActiveDate = today;
    saveState();
  }
}

function applySettings() {
  document.documentElement.setAttribute('data-theme', state.settings.theme);
  document.body.classList.toggle('no-animations', !state.settings.animations);
  if (state.ageTier) {
    document.body.setAttribute('data-age', state.ageTier);
  }
  const themeToggle = document.getElementById('toggle-theme');
  const soundToggle = document.getElementById('toggle-sound');
  const animToggle = document.getElementById('toggle-animations');
  if (themeToggle) themeToggle.checked = state.settings.theme === 'dark';
  if (soundToggle) soundToggle.checked = state.settings.sound;
  if (animToggle) animToggle.checked = state.settings.animations;
}

function showToast(title, subtitle = '', icon = '🏆') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span style="font-size:1.5rem">${icon}</span><div><strong>${title}</strong><div class="muted-text">${subtitle}</div></div>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3800);
}

// 7. NAVIGATION & SCREENS
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('app-shell').classList.add('hidden');

  if (screenId === 'app') {
    document.getElementById('app-shell').classList.remove('hidden');
  } else {
    document.getElementById(`screen-${screenId}`).classList.add('active');
  }
}

function switchView(viewName) {
  SoundFX.play('click');
  stopGameTimer();
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(`view-${viewName}`).classList.add('active');

  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.nav === viewName);
  });
  document.getElementById('nav-links').classList.remove('open');

  if (viewName === 'dashboard') renderDashboard();
  if (viewName === 'games') renderGamesLibrary('all');
  if (viewName === 'rating') renderRatingView();
  if (viewName === 'stats') renderStatsView();
  if (viewName === 'profile') renderProfileView();
  if (viewName === 'settings') {
    document.getElementById('settings-username-input').value = state.username;
  }
}

// 8. LOGIN & AGE SELECTION SETUP
function initLoginScreen() {
  if (state.username) {
    document.getElementById('returning-user-box').classList.remove('hidden');
    document.getElementById('saved-username-label').textContent = state.username;
  } else {
    document.getElementById('returning-user-box').classList.add('hidden');
  }

  document.getElementById('btn-continue-saved').onclick = () => {
    SoundFX.play('click');
    if (state.ageTier) {
      enterDashboard();
    } else {
      openAgeSelection();
    }
  };

  document.getElementById('login-form').onsubmit = (e) => {
    e.preventDefault();
    const val = document.getElementById('username-input').value.trim();
    const err = document.getElementById('login-error');
    if (!val) {
      err.classList.remove('hidden');
      SoundFX.play('wrong');
      return;
    }
    err.classList.add('hidden');
    if (val !== state.username) {
      // Fresh profile if new username entered
      state.username = val;
      state.ageTier = '';
      state.totalScore = 0;
      state.xp = 0;
      state.gamesPlayed = 0;
      state.correctAnswers = 0;
      state.totalAttempts = 0;
      state.bestScore = 0;
      state.history = [];
      state.unlockedAchievements = [];
    }
    saveState();
    SoundFX.play('correct');
    openAgeSelection();
  };
}

function openAgeSelection() {
  document.getElementById('age-greeting-user').textContent = state.username;
  const grid = document.getElementById('age-cards-grid');
  grid.innerHTML = AGE_TIERS.map(tier => `
    <div class="glass-card age-card" onclick="selectAgeTier('${tier.id}')">
      <div>
        <div class="age-card-top">
          <span class="age-range">${tier.range}</span>
          <span class="age-icon">${tier.icon}</span>
        </div>
        <h3>${tier.title}</h3>
        <p>${tier.desc}</p>
      </div>
      <div>
        <div class="age-tags">
          ${tier.tags.map(t => `<span>${t}</span>`).join('')}
        </div>
        <button class="btn btn-secondary w-full btn-sm">Tanlash →</button>
      </div>
    </div>
  `).join('');
  showScreen('age');
}

window.selectAgeTier = function(tierId) {
  SoundFX.play('correct');
  state.ageTier = tierId;
  applySettings();
  saveState();
  enterDashboard();
};

function enterDashboard() {
  showScreen('app');
  updateNavbar();
  switchView('dashboard');
}

function updateNavbar() {
  const tier = getCurrentTier();
  document.getElementById('nav-age-badge').textContent = `${tier.range} • ${tier.title}`;
  document.getElementById('nav-xp-val').textContent = `${state.xp} XP`;
  document.getElementById('nav-username').textContent = state.username;
  document.getElementById('nav-avatar').textContent = state.avatar;
}

function getCurrentTier() {
  return AGE_TIERS.find(t => t.id === state.ageTier) || AGE_TIERS[2];
}

function getCurrentRank() {
  let current = RANKS[0];
  for (const r of RANKS) {
    if (state.xp >= r.minXP) current = r;
  }
  return current;
}

// 9. DASHBOARD RENDERING
function renderDashboard() {
  updateNavbar();
  const tier = getCurrentTier();
  const todayStr = new Date().toLocaleDateString('uz-UZ', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  document.getElementById('today-date').textContent = todayStr;
  document.getElementById('dash-username').textContent = state.username;
  document.getElementById('daily-quote').textContent = `"${QUOTES[new Date().getDate() % QUOTES.length]}"`;
  document.getElementById('tier-tagline').textContent = tier.tagline;

  const goalPct = Math.min(100, Math.round((state.dailyGamesCount / 3) * 100));
  document.getElementById('daily-goal-text').textContent = `${state.dailyGamesCount} / 3 o‘yin`;
  document.getElementById('daily-goal-bar').style.width = `${goalPct}%`;

  document.getElementById('stat-total-score').textContent = state.totalScore.toLocaleString();
  document.getElementById('stat-games-played').textContent = state.gamesPlayed;
  document.getElementById('stat-correct-answers').textContent = state.correctAnswers;
  document.getElementById('stat-best-score').textContent = state.bestScore.toLocaleString();
  document.getElementById('stat-streak').textContent = `${state.streak} kun`;

  // Game of the Day
  const gotd = GAMES_LIST[new Date().getDate() % GAMES_LIST.length];
  document.getElementById('game-of-day-card').innerHTML = `
    <div>
      <span class="diff-badge">${gotd.category} • ${tier.difficultyLabel}</span>
      <h3 style="margin: 8px 0 4px; font-size:1.3rem;">${gotd.icon} ${gotd.title}</h3>
      <p class="muted-text">${gotd.desc}</p>
    </div>
    <button class="btn btn-primary" onclick="launchGame('${gotd.id}')">O‘ynash</button>
  `;

  // Categories
  const cats = [
    { name: 'Xotira', icon: '🧠', count: GAMES_LIST.filter(g => g.category === 'Xotira').length },
    { name: 'Mantiq', icon: '🧩', count: GAMES_LIST.filter(g => g.category === 'Mantiq').length },
    { name: 'Matematika', icon: '🔢', count: GAMES_LIST.filter(g => g.category === 'Matematika').length },
    { name: 'Diqqat', icon: '🎯', count: GAMES_LIST.filter(g => g.category === 'Diqqat').length }
  ];
  document.getElementById('dash-categories').innerHTML = cats.map(c => `
    <div class="glass-card cat-card" onclick="openFilteredGames('${c.name}')">
      <div class="cat-icon">${c.icon}</div>
      <div>
        <h4>${c.name}</h4>
        <span class="muted-text">${c.count} ta o‘yin</span>
      </div>
    </div>
  `).join('');

  // Recent Results
  const recentEl = document.getElementById('dash-recent-list');
  if (state.history.length === 0) {
    recentEl.innerHTML = `<p class="muted-text">Hali o‘yinlar o‘ynalmagan. Birinchi o‘yinni boshlang!</p>`;
  } else {
    recentEl.innerHTML = state.history.slice(0, 4).map(h => `
      <div class="recent-item">
        <div>
          <strong>${h.title}</strong>
          <div class="muted-text" style="font-size:0.78rem">${h.date} • ${h.time}s</div>
        </div>
        <span class="accent-blue" style="font-weight:700">+${h.score} ball</span>
      </div>
    `).join('');
  }

  renderSVGChart('dash-svg-chart', state.history.slice(0, 7).reverse());
}

window.openFilteredGames = function(cat) {
  switchView('games');
  renderGamesLibrary(cat);
};

// 10. GAMES LIBRARY
function renderGamesLibrary(categoryFilter = 'all') {
  const tier = getCurrentTier();
  document.getElementById('games-tier-desc').textContent = `${tier.range} (${tier.title}) uchun moslashtirilgan 15 ta intellektual o‘yin.`;

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cat === categoryFilter);
  });

  const filtered = categoryFilter === 'all'
    ? GAMES_LIST
    : GAMES_LIST.filter(g => g.category === categoryFilter);

  document.getElementById('games-library-grid').innerHTML = filtered.map(game => `
    <div class="glass-card game-card">
      <div>
        <div class="game-card-top">
          <div class="game-icon-box">${game.icon}</div>
          <span class="diff-badge">${tier.difficultyLabel}</span>
        </div>
        <h4 style="margin-top:14px">${game.title}</h4>
        <p>${game.desc}</p>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
        <span class="muted-text" style="font-size:0.8rem">${game.category}</span>
        <button class="btn btn-primary btn-sm" onclick="launchGame('${game.id}')">Boshlash</button>
      </div>
    </div>
  `).join('');
}

// 11. GAME ENGINE & 15 REAL PLAYABLE MECHANICS
window.launchGame = function(gameId) {
  SoundFX.play('click');
  const gameMeta = GAMES_LIST.find(g => g.id === gameId);
  const tier = getCurrentTier();
  if (!gameMeta) return;

  activeGame = {
    id: gameId,
    title: gameMeta.title,
    category: gameMeta.category,
    score: 0,
    correct: 0,
    wrong: 0,
    seconds: 0,
    timerInterval: null
  };

  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-game-play').classList.add('active');
  document.getElementById('active-game-title').textContent = `${gameMeta.icon} ${gameMeta.title}`;
  document.getElementById('active-game-diff').textContent = `${tier.range} • ${tier.difficultyLabel}`;
  updateHUD();

  startGameTimer();
  loadGameMechanic(gameId);
};

function startGameTimer() {
  stopGameTimer();
  activeGame.timerInterval = setInterval(() => {
    activeGame.seconds++;
    const mins = String(Math.floor(activeGame.seconds / 60)).padStart(2, '0');
    const secs = String(activeGame.seconds % 60).padStart(2, '0');
    document.getElementById('hud-timer').textContent = `${mins}:${secs}`;
  }, 1000);
}

function stopGameTimer() {
  if (activeGame.timerInterval) {
    clearInterval(activeGame.timerInterval);
    activeGame.timerInterval = null;
  }
}

function updateHUD() {
  document.getElementById('hud-score').textContent = activeGame.score;
}

function finishGameSession() {
  stopGameTimer();
  SoundFX.play('win');
  const tier = getCurrentTier();
  const timeBonus = Math.max(10, 120 - activeGame.seconds);
  const finalScore = Math.max(20, Math.round((activeGame.score + timeBonus - activeGame.wrong * 10) * tier.multiplier));
  const earnedXP = Math.round(finalScore * 0.6);

  state.totalScore += finalScore;
  state.xp += earnedXP;
  state.gamesPlayed += 1;
  state.dailyGamesCount += 1;
  state.correctAnswers += activeGame.correct;
  state.totalAttempts += (activeGame.correct + activeGame.wrong);
  if (finalScore > state.bestScore) state.bestScore = finalScore;

  const accuracy = activeGame.correct + activeGame.wrong > 0
    ? Math.round((activeGame.correct / (activeGame.correct + activeGame.wrong)) * 100)
    : 100;

  state.history.unshift({
    id: activeGame.id,
    title: activeGame.title,
    category: activeGame.category,
    score: finalScore,
    accuracy: `${accuracy}%`,
    time: activeGame.seconds,
    date: new Date().toLocaleDateString('uz-UZ')
  });

  checkAchievements(finalScore);
  saveState();
  updateNavbar();

  document.getElementById('res-score').textContent = `+${finalScore}`;
  document.getElementById('res-xp').textContent = `+${earnedXP} XP`;
  document.getElementById('res-correct').textContent = `${activeGame.correct} ta`;
  document.getElementById('res-time').textContent = `${activeGame.seconds}s`;
  document.getElementById('result-modal').classList.remove('hidden');
}

function checkAchievements(lastScore) {
  const unlock = (id) => {
    if (!state.unlockedAchievements.includes(id)) {
      state.unlockedAchievements.push(id);
      const ach = ACHIEVEMENTS.find(a => a.id === id);
      if (ach) showToast(`Yangi yutuq: ${ach.title}`, ach.desc, ach.icon);
    }
  };

  if (state.gamesPlayed >= 1) unlock('first_game');
  if (activeGame.seconds <= 25 && activeGame.correct >= 3) unlock('fast_thinker');
  if (activeGame.wrong === 0 && activeGame.correct >= 3) unlock('perfect_round');
  if ((activeGame.id === 'memory-matrix' || activeGame.id === 'sequence-hunter') && lastScore >= 150) unlock('memory_expert');
  if (state.streak >= 7) unlock('seven_streak');
  if (state.xp >= 1500) unlock('master_player');
}

// Difficulty scaling helper per age tier
function getTierLevel() {
  const map = { '3-5': 1, '6-9': 2, '10-14': 3, '15-19': 4, '20-25': 5 };
  return map[state.ageTier] || 3;
}

// ALL 15 REAL GAME IMPLEMENTATIONS
function loadGameMechanic(id) {
  const stage = document.getElementById('game-stage');
  const lvl = getTierLevel();

  // 1. MEMORY MATRIX
  if (id === 'memory-matrix') {
    const size = lvl <= 1 ? 3 : lvl <= 3 ? 4 : 5;
    const targetCount = lvl + 2;
    let round = 1;
    const maxRounds = 3;

    function startMatrixRound() {
      const total = size * size;
      const targets = new Set();
      while (targets.size < targetCount) targets.add(Math.floor(Math.random() * total));
      const selected = new Set();
      let canClick = false;

      stage.innerHTML = `
        <h4>Bosqich ${round} / ${maxRounds}</h4>
        <p class="game-instruction">Yoritilgan ${targetCount} ta katakni eslab qoling!</p>
        <div class="matrix-grid" style="grid-template-columns: repeat(${size}, 64px);">
          ${Array.from({ length: total }).map((_, i) => `<div class="matrix-cell ${targets.has(i) ? 'lit' : ''}" data-idx="${i}"></div>`).join('')}
        </div>
      `;

      setTimeout(() => {
        stage.querySelectorAll('.matrix-cell').forEach(c => c.classList.remove('lit'));
        canClick = true;
      }, 1400 + lvl * 150);

      stage.querySelectorAll('.matrix-cell').forEach(cell => {
        cell.onclick = () => {
          if (!canClick) return;
          const idx = Number(cell.dataset.idx);
          if (selected.has(idx)) return;
          selected.add(idx);

          if (targets.has(idx)) {
            cell.classList.add('correct');
            SoundFX.play('correct');
            activeGame.correct++;
            activeGame.score += 30;
            updateHUD();
            if (selected.size === targets.size) {
              canClick = false;
              setTimeout(() => {
                if (round < maxRounds) { round++; startMatrixRound(); }
                else finishGameSession();
              }, 600);
            }
          } else {
            cell.classList.add('wrong');
            SoundFX.play('wrong');
            activeGame.wrong++;
            selected.delete(idx);
          }
        };
      });
    }
    startMatrixRound();
  }

  // 2. NUMBER LOGIC
  else if (id === 'number-logic') {
    let qIndex = 0;
    const totalQ = 5;
    function nextSeq() {
      const start = Math.floor(Math.random() * 10) + 2;
      const step = lvl * 2 + Math.floor(Math.random() * 4) + 1;
      const isGeometric = lvl >= 4 && Math.random() > 0.5;
      const seq = isGeometric
        ? [start, start * 2, start * 4, start * 8]
        : [start, start + step, start + step * 2, start + step * 3];
      const answer = isGeometric ? start * 16 : start + step * 4;
      const opts = new Set([answer, answer + step, answer - 1, answer + 3]);
      const shuffled = Array.from(opts).sort(() => Math.random() - 0.5);

      stage.innerHTML = `
        <h4>Savol ${qIndex + 1} / ${totalQ}</h4>
        <p class="game-instruction">Sonli ketma-ketlik qonuniyatini toping:</p>
        <div style="font-family:var(--font-mono); font-size:2rem; letter-spacing:6px; margin:18px 0;">
          ${seq.join(' , ')} , <span class="accent-blue">?</span>
        </div>
        <div class="options-row">
          ${shuffled.map(o => `<button class="option-btn" data-val="${o}">${o}</button>`).join('')}
        </div>
      `;
      stage.querySelectorAll('.option-btn').forEach(btn => {
        btn.onclick = () => {
          if (Number(btn.dataset.val) === answer) {
            SoundFX.play('correct');
            activeGame.correct++;
            activeGame.score += 40;
          } else {
            SoundFX.play('wrong');
            activeGame.wrong++;
          }
          updateHUD();
          qIndex++;
          if (qIndex < totalQ) nextSeq();
          else finishGameSession();
        };
      });
    }
    nextSeq();
  }

  // 3. PATTERN MASTER
  else if (id === 'pattern-master') {
    const sets = [
      { seq: ['▲', '■', '●', '▲', '■'], ans: '●', opts: ['●', '▲', '◆', '■'] },
      { seq: ['🔴', '🔵', '🟡', '🔴', '🔵'], ans: '🟡', opts: ['🟢', '🟡', '🔴', '🔵'] },
      { seq: ['◐', '◓', '◑', '◒', '◐'], ans: '◓', opts: ['◓', '◒', '●', '○'] },
      { seq: ['2X', '4Y', '6Z', '8X', '10Y'], ans: '12Z', opts: ['12Z', '12X', '11Z', '14Y'] },
      { seq: ['★', '★★', '★★★', '★★★★'], ans: '★★★★★', opts: ['★★★★★', '★★★', '★★', '★★★★★★'] }
    ];
    let idx = 0;
    function renderPattern() {
      const item = sets[idx];
      stage.innerHTML = `
        <h4>Bosqich ${idx + 1} / ${sets.length}</h4>
        <p class="game-instruction">Yetishmayotgan shaklni aniqlang:</p>
        <div style="font-size:2.2rem; display:flex; gap:18px; justify-content:center; margin:20px 0;">
          ${item.seq.map(s => `<span class="glass-card" style="padding:14px 20px;">${s}</span>`).join('')}
          <span class="glass-card" style="padding:14px 20px; border-color:var(--blue);">?</span>
        </div>
        <div class="options-row">
          ${item.opts.map(o => `<button class="option-btn" data-ans="${o}">${o}</button>`).join('')}
        </div>
      `;
      stage.querySelectorAll('.option-btn').forEach(b => {
        b.onclick = () => {
          if (b.dataset.ans === item.ans) {
            SoundFX.play('correct');
            activeGame.correct++;
            activeGame.score += 40;
          } else {
            SoundFX.play('wrong');
            activeGame.wrong++;
          }
          updateHUD();
          idx++;
          if (idx < sets.length) renderPattern();
          else finishGameSession();
        };
      });
    }
    renderPattern();
  }

  // 4. SUDOKU PRO (Real 9x9 Valid Puzzle)
  else if (id === 'sudoku-pro') {
    const solution = [
      5,3,4,6,7,8,9,1,2,
      6,7,2,1,9,5,3,4,8,
      1,9,8,3,4,2,5,6,7,
      8,5,9,7,6,1,4,2,3,
      4,2,6,8,5,3,7,9,1,
      7,1,3,9,2,4,8,5,6,
      9,6,1,5,3,7,2,8,4,
      2,8,7,4,1,9,6,3,5,
      3,4,5,2,8,6,1,7,9
    ];
    const blanksCount = lvl <= 2 ? 12 : lvl === 3 ? 22 : 32;
    const puzzle = [...solution];
    const hiddenIndices = new Set();
    while (hiddenIndices.size < blanksCount) {
      hiddenIndices.add(Math.floor(Math.random() * 81));
    }
    hiddenIndices.forEach(i => puzzle[i] = 0);

    stage.innerHTML = `
      <p class="game-instruction">9×9 Sudoku jadvalini 1 dan 9 gacha raqamlar bilan to‘ldiring.</p>
      <div class="sudoku-grid" id="sudoku-board">
        ${puzzle.map((val, idx) => {
          const row = Math.floor(idx / 9);
          const rowBorder = (row === 2 || row === 5) ? 'sudoku-row-border' : '';
          if (val !== 0) {
            return `<input class="sudoku-cell fixed ${rowBorder}" value="${val}" readonly />`;
          }
          return `<input class="sudoku-cell ${rowBorder}" data-idx="${idx}" maxlength="1" inputmode="numeric" />`;
        }).join('')}
      </div>
      <div style="margin-top:20px; display:flex; gap:12px;">
        <button id="btn-check-sudoku" class="btn btn-primary">Tekshirish va Yakunlash</button>
      </div>
    `;

    stage.querySelectorAll('.sudoku-cell:not(.fixed)').forEach(inp => {
      inp.oninput = () => {
        inp.value = inp.value.replace(/[^1-9]/g, '');
        const idx = Number(inp.dataset.idx);
        if (inp.value) {
          if (Number(inp.value) === solution[idx]) {
            inp.classList.remove('error');
            SoundFX.play('correct');
          } else {
            inp.classList.add('error');
            SoundFX.play('wrong');
            activeGame.wrong++;
          }
        }
      };
    });

    document.getElementById('btn-check-sudoku').onclick = () => {
      let filledCorrect = 0;
      stage.querySelectorAll('.sudoku-cell:not(.fixed)').forEach(inp => {
        const idx = Number(inp.dataset.idx);
        if (Number(inp.value) === solution[idx]) filledCorrect++;
      });
      if (filledCorrect === blanksCount) {
        activeGame.correct = blanksCount;
        activeGame.score += blanksCount * 15;
        updateHUD();
        finishGameSession();
      } else {
        showToast('Hali tugallanmagan', `${filledCorrect} / ${blanksCount} katak to‘g‘ri to‘ldirildi`, '🧩');
      }
    };
  }

  // 5. CODE BREAKER (Mastermind logic)
  else if (id === 'code-breaker') {
    const digitsLen = lvl <= 2 ? 3 : 4;
    const secret = Array.from({ length: digitsLen }, () => Math.floor(Math.random() * 9) + 1).join('');
    let attempts = [];

    function renderCodeBreaker() {
      stage.innerHTML = `
        <p class="game-instruction">${digitsLen} xonali maxfiy kodni toping (1–9 raqamlar). 🟢 — joyida, 🟡 — kodda bor.</p>
        <div class="inline-form" style="max-width:300px; margin:0 auto 16px;">
          <input type="text" id="cb-input" maxlength="${digitsLen}" placeholder="${'•'.repeat(digitsLen)}" style="text-align:center; font-family:var(--font-mono); font-size:1.3rem;" />
          <button id="cb-submit" class="btn btn-primary">Sinash</button>
        </div>
        <div style="width:100%; max-width:360px; display:flex; flex-direction:column; gap:8px;">
          ${attempts.map(a => `
            <div class="recent-item">
              <strong style="font-family:var(--font-mono); letter-spacing:4px;">${a.guess}</strong>
              <span>🟢 ${a.exact} | 🟡 ${a.partial}</span>
            </div>
          `).join('')}
        </div>
      `;
      document.getElementById('cb-submit').onclick = () => {
        const guess = document.getElementById('cb-input').value.trim();
        if (guess.length !== digitsLen || !/^\d+$/.test(guess)) return;
        let exact = 0, partial = 0;
        for (let i = 0; i < digitsLen; i++) {
          if (guess[i] === secret[i]) exact++;
          else if (secret.includes(guess[i])) partial++;
        }
        attempts.unshift({ guess, exact, partial });
        if (exact === digitsLen) {
          activeGame.correct = 1;
          activeGame.score += Math.max(80, 220 - attempts.length * 15);
          updateHUD();
          finishGameSession();
        } else {
          SoundFX.play('wrong');
          activeGame.wrong++;
          renderCodeBreaker();
        }
      };
    }
    renderCodeBreaker();
  }

  // 6. QUICK MATH
  else if (id === 'quick-math') {
    let q = 0;
    const total = 7;
    function nextMath() {
      const maxNum = lvl * 12;
      const a = Math.floor(Math.random() * maxNum) + 2;
      const b = Math.floor(Math.random() * maxNum) + 2;
      const ops = lvl === 1 ? ['+'] : lvl <= 3 ? ['+', '-', '×'] : ['+', '-', '×'];
      const op = ops[Math.floor(Math.random() * ops.length)];
      const ans = op === '+' ? a + b : op === '-' ? a - b : a * b;
      const opts = Array.from(new Set([ans, ans + 2, ans - 3, ans + 5])).sort(() => Math.random() - 0.5);

      stage.innerHTML = `
        <h4>Misol ${q + 1} / ${total}</h4>
        <div style="font-family:var(--font-mono); font-size:2.6rem; margin:20px 0;">${a} ${op} ${b} = ?</div>
        <div class="options-row">
          ${opts.map(o => `<button class="option-btn" data-val="${o}">${o}</button>`).join('')}
        </div>
      `;
      stage.querySelectorAll('.option-btn').forEach(btn => {
        btn.onclick = () => {
          if (Number(btn.dataset.val) === ans) {
            SoundFX.play('correct');
            activeGame.correct++;
            activeGame.score += 30;
          } else {
            SoundFX.play('wrong');
            activeGame.wrong++;
          }
          updateHUD();
          q++;
          if (q < total) nextMath();
          else finishGameSession();
        };
      });
    }
    nextMath();
  }

  // 7. WORD PUZZLE
  else if (id === 'word-puzzle') {
    const words = lvl <= 2
      ? [{ w: 'OLMA', hint: 'Meva nomi' }, { w: 'KITOB', hint: 'Bilim manbai' }, { w: 'QUYOSH', hint: 'Yorug‘lik yulduzi' }]
      : [{ w: 'MANTIQ', hint: 'To‘g‘ri fikrlash ilmi' }, { w: 'ALGORITM', hint: 'Ketma-ket buyruqlar rejasi' }, { w: 'STRATEGIYA', hint: 'Uzoq muddatli reja' }];
    let idx = 0;
    function nextWord() {
      const item = words[idx];
      const scrambled = item.w.split('').sort(() => Math.random() - 0.5).join(' ');
      stage.innerHTML = `
        <h4>So‘z ${idx + 1} / ${words.length}</h4>
        <p class="game-instruction">Maslahat: <strong>${item.hint}</strong></p>
        <div style="font-family:var(--font-mono); font-size:2.1rem; letter-spacing:8px; margin:18px 0; color:var(--blue);">${scrambled}</div>
        <div class="inline-form" style="max-width:340px; margin:0 auto;">
          <input type="text" id="wp-input" placeholder="So‘zni yozing..." style="text-transform:uppercase;" />
          <button id="wp-btn" class="btn btn-primary">Tekshirish</button>
        </div>
      `;
      document.getElementById('wp-btn').onclick = () => {
        const val = document.getElementById('wp-input').value.trim().toUpperCase();
        if (val === item.w) {
          SoundFX.play('correct');
          activeGame.correct++;
          activeGame.score += 50;
          updateHUD();
          idx++;
          if (idx < words.length) nextWord();
          else finishGameSession();
        } else {
          SoundFX.play('wrong');
          activeGame.wrong++;
          showToast('Noto‘g‘ri', 'Harflarni diqqat bilan qayta joylashtiring', '🔤');
        }
      };
    }
    nextWord();
  }

  // 8. SHAPE ROTATION
  else if (id === 'shape-rotation') {
    let round = 0;
    const angles = [90, 180, 270];
    function nextRot() {
      const targetAngle = angles[round];
      stage.innerHTML = `
        <h4>Fazoviy sinov ${round + 1} / 3</h4>
        <p class="game-instruction">Asl shakl soat strelkasi bo‘yicha <strong>${targetAngle}°</strong> burilganda qaysi ko‘rinishga keladi?</p>
        <div style="font-size:3.5rem; margin:16px 0;">🏹</div>
        <div class="options-row">
          ${[0, 90, 180, 270].map(deg => `
            <button class="option-btn" data-deg="${deg}" style="font-size:2rem; padding:18px 26px;">
              <span style="display:inline-block; transform:rotate(${deg}deg);">🏹</span>
            </button>
          `).join('')}
        </div>
      `;
      stage.querySelectorAll('.option-btn').forEach(b => {
        b.onclick = () => {
          if (Number(b.dataset.deg) === targetAngle) {
            SoundFX.play('correct');
            activeGame.correct++;
            activeGame.score += 50;
          } else {
            SoundFX.play('wrong');
            activeGame.wrong++;
          }
          updateHUD();
          round++;
          if (round < 3) nextRot();
          else finishGameSession();
        };
      });
    }
    nextRot();
  }

  // 9. LOGIC DETECTIVE
  else if (id === 'logic-detective') {
    const riddles = [
      {
        q: 'Ali Valida katta, Vali esa Sardordan katta. Eng kichigi kim?',
        opts: ['Ali', 'Vali', 'Sardor'],
        ans: 'Sardor'
      },
      {
        q: '3 ta mushuk 3 ta sichqonni 3 daqiqada tutsa, 100 ta mushuk 100 ta sichqonni necha daqiqada tutadi?',
        opts: ['100 daqiqa', '3 daqiqa', '1 daqiqa'],
        ans: '3 daqiqa'
      },
      {
        q: 'Yugurish musobaqasida 2-o‘rindagi ishtirokchini quvib o‘tsangiz, nechanchi o‘ringa chiqasiz?',
        opts: ['1-o‘rin', '2-o‘rin', '3-o‘rin'],
        ans: '2-o‘rin'
      }
    ];
    let idx = 0;
    function nextRiddle() {
      const r = riddles[idx];
      stage.innerHTML = `
        <h4>Deduktiv masala ${idx + 1} / ${riddles.length}</h4>
        <h3 style="max-width:560px; margin:20px 0;">${r.q}</h3>
        <div class="options-row">
          ${r.opts.map(o => `<button class="option-btn" data-ans="${o}">${o}</button>`).join('')}
        </div>
      `;
      stage.querySelectorAll('.option-btn').forEach(b => {
        b.onclick = () => {
          if (b.dataset.ans === r.ans) {
            SoundFX.play('correct');
            activeGame.correct++;
            activeGame.score += 60;
          } else {
            SoundFX.play('wrong');
            activeGame.wrong++;
          }
          updateHUD();
          idx++;
          if (idx < riddles.length) nextRiddle();
          else finishGameSession();
        };
      });
    }
    nextRiddle();
  }

  // 10. FOCUS CHALLENGE (Stroop Effect)
  else if (id === 'focus-challenge') {
    const colors = [
      { name: 'QIZIL', hex: '#EF4444' },
      { name: 'KO‘K', hex: '#38BDF8' },
      { name: 'YASHIL', hex: '#10B981' },
      { name: 'SARIQ', hex: '#F59E0B' }
    ];
    let step = 0;
    function nextStroop() {
      const textObj = colors[Math.floor(Math.random() * colors.length)];
      const colorObj = colors[Math.floor(Math.random() * colors.length)];
      stage.innerHTML = `
        <h4>Diqqat testi ${step + 1} / 6</h4>
        <p class="game-instruction">So‘zning yozilishiga emas, uning <strong>RANGIGA</strong> mos tugmani bosing!</p>
        <div style="font-size:3rem; font-weight:800; color:${colorObj.hex}; margin:22px 0;">${textObj.name}</div>
        <div class="options-row">
          ${colors.map(c => `<button class="option-btn" data-hex="${c.hex}">${c.name}</button>`).join('')}
        </div>
      `;
      stage.querySelectorAll('.option-btn').forEach(b => {
        b.onclick = () => {
          if (b.dataset.hex === colorObj.hex) {
            SoundFX.play('correct');
            activeGame.correct++;
            activeGame.score += 35;
          } else {
            SoundFX.play('wrong');
            activeGame.wrong++;
          }
          updateHUD();
          step++;
          if (step < 6) nextStroop();
          else finishGameSession();
        };
      });
    }
    nextStroop();
  }

  // 11. SEQUENCE HUNTER (Simon Says)
  else if (id === 'sequence-hunter') {
    const symbols = ['⚡', '🔮', '💎', '🚀'];
    const seqLen = lvl + 2;
    const sequence = Array.from({ length: seqLen }, () => symbols[Math.floor(Math.random() * symbols.length)]);
    let userSeq = [];
    let stepShow = 0;

    stage.innerHTML = `
      <p class="game-instruction">Ketma-ketlikni kuzating va xuddi shu tartibda bosing:</p>
      <div id="seq-display" style="font-size:3.5rem; height:80px; margin:16px 0;">⏳</div>
      <div class="options-row" id="seq-buttons" style="opacity:0.4; pointer-events:none;">
        ${symbols.map(s => `<button class="option-btn" style="font-size:1.8rem;" data-sym="${s}">${s}</button>`).join('')}
      </div>
    `;

    const interval = setInterval(() => {
      const disp = document.getElementById('seq-display');
      if (!disp) { clearInterval(interval); return; }
      if (stepShow < sequence.length) {
        disp.textContent = sequence[stepShow];
        SoundFX.play('click');
        stepShow++;
      } else {
        clearInterval(interval);
        disp.textContent = 'Endi takrorlang!';
        disp.style.fontSize = '1.3rem';
        const btns = document.getElementById('seq-buttons');
        btns.style.opacity = '1';
        btns.style.pointerEvents = 'auto';
      }
    }, 850);

    stage.querySelectorAll('.option-btn').forEach(b => {
      b.onclick = () => {
        const sym = b.dataset.sym;
        if (sym === sequence[userSeq.length]) {
          userSeq.push(sym);
          SoundFX.play('correct');
          activeGame.correct++;
          activeGame.score += 35;
          updateHUD();
          if (userSeq.length === sequence.length) finishGameSession();
        } else {
          SoundFX.play('wrong');
          activeGame.wrong++;
          userSeq = [];
          showToast('Xato tartib!', 'Qaytadan urinib ko‘ring', '🔗');
        }
      };
    });
  }

  // 12. BRAIN MAZE
  else if (id === 'brain-maze') {
    // 5x5 interactive grid maze (0: empty, 1: wall, 2: goal)
    const map = [
      0, 0, 1, 0, 0,
      1, 0, 1, 0, 1,
      0, 0, 0, 0, 0,
      0, 1, 1, 1, 0,
      0, 0, 0, 1, 2
    ];
    let pos = 0;

    function renderMaze() {
      stage.innerHTML = `
        <p class="game-instruction">Yonidagi kataklarni bosib, to‘siqlardan (⬛) o‘tib 🏁 marraga yeting!</p>
        <div class="matrix-grid" style="grid-template-columns: repeat(5, 58px);">
          ${map.map((cell, i) => {
            let content = '';
            let extra = '';
            if (i === pos) { content = '🔵'; extra = 'lit'; }
            else if (cell === 1) { content = '⬛'; }
            else if (cell === 2) { content = '🏁'; }
            return `<div class="matrix-cell ${extra}" data-idx="${i}">${content}</div>`;
          }).join('')}
        </div>
      `;
      stage.querySelectorAll('.matrix-cell').forEach(c => {
        c.onclick = () => {
          const target = Number(c.dataset.idx);
          const r1 = Math.floor(pos / 5), c1 = pos % 5;
          const r2 = Math.floor(target / 5), c2 = target % 5;
          const isAdj = Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1;
          if (!isAdj || map[target] === 1) {
            SoundFX.play('wrong');
            activeGame.wrong++;
            return;
          }
          pos = target;
          SoundFX.play('click');
          activeGame.correct++;
          activeGame.score += 15;
          updateHUD();
          if (map[pos] === 2) {
            activeGame.score += 80;
            finishGameSession();
          } else {
            renderMaze();
          }
        };
      });
    }
    renderMaze();
  }

  // 13. ODD ONE OUT
  else if (id === 'odd-one-out') {
    const rounds = [
      { items: ['2', '4', '8', '9', '16'], odd: '9', reason: '9 toq son' },
      { items: ['Mars', 'Venera', 'Oy', 'Yupiter', 'Saturn'], odd: 'Oy', reason: 'Oy — sayyora emas, yo‘ldosh' },
      { items: ['Kvadrat', 'Uchburchak', 'Doira', 'Kub', 'Romb'], odd: 'Kub', reason: 'Kub — hajmli (3D) shakl' },
      { items: ['Python', 'JavaScript', 'HTML', 'C++', 'Java'], odd: 'HTML', reason: 'HTML — belgilash tili' }
    ];
    let idx = 0;
    function nextOdd() {
      const r = rounds[idx];
      stage.innerHTML = `
        <h4>Bosqich ${idx + 1} / ${rounds.length}</h4>
        <p class="game-instruction">Mantiqiy jihatdan ortiqcha elementni toping:</p>
        <div class="options-row">
          ${r.items.map(it => `<button class="option-btn" data-it="${it}">${it}</button>`).join('')}
        </div>
      `;
      stage.querySelectorAll('.option-btn').forEach(b => {
        b.onclick = () => {
          if (b.dataset.it === r.odd) {
            SoundFX.play('correct');
            activeGame.correct++;
            activeGame.score += 45;
          } else {
            SoundFX.play('wrong');
            activeGame.wrong++;
          }
          updateHUD();
          idx++;
          if (idx < rounds.length) nextOdd();
          else finishGameSession();
        };
      });
    }
    nextOdd();
  }

  // 14. STRATEGIC MOVES (Nim / Stone Strategy Game)
  else if (id === 'strategic-moves') {
    let stones = 13;
    function renderNim(msg = 'Sizning navbatingiz: 1, 2 yoki 3 ta tosh oling. Oxirgi toshni olgan yutadi!') {
      stage.innerHTML = `
        <p class="game-instruction">${msg}</p>
        <div style="font-size:2.2rem; margin:16px 0; letter-spacing:4px;">${'💎 '.repeat(stones)}</div>
        <p style="margin-bottom:16px;">Qolgan toshlar: <strong>${stones}</strong></p>
        <div class="options-row">
          ${[1, 2, 3].filter(n => n <= stones).map(n => `<button class="option-btn" data-take="${n}">${n} ta olish</button>`).join('')}
        </div>
      `;
      stage.querySelectorAll('.option-btn').forEach(b => {
        b.onclick = () => {
          const take = Number(b.dataset.take);
          stones -= take;
          SoundFX.play('click');
          if (stones === 0) {
            activeGame.correct += 3;
            activeGame.score += 160;
            updateHUD();
            finishGameSession();
            return;
          }
          // Optimal AI counter-move
          const aiTake = stones % 4 === 0 ? 1 : stones % 4;
          stones -= aiTake;
          if (stones <= 0) {
            activeGame.wrong++;
            stones = 13;
            renderNim('AI oxirgi toshni oldi! Strategiyani qayta sinab ko‘ring (4 ga karrali son qoldiring).');
          } else {
            activeGame.correct++;
            activeGame.score += 25;
            updateHUD();
            renderNim(`AI ${aiTake} ta tosh oldi. Sizning navbatingiz!`);
          }
        };
      });
    }
    renderNim();
  }

  // 15. IQ CHALLENGE (Multi-stage mixed test)
  else if (id === 'iq-challenge') {
    const stages = [
      { q: '1, 1, 2, 3, 5, 8, ? — Fibonachchi ketma-ketligini davom ettiring:', opts: ['11', '13', '15'], ans: '13' },
      { q: 'Agar BARCHA A lar B bo‘lsa va BARCHA B lar C bo‘lsa, u holda:', opts: ['Barcha A lar C', 'Barcha C lar A', 'Hech biri'], ans: 'Barcha A lar C' },
      { q: 'Soat 3:15 bo‘lganda soat va minut strelkalari orasidagi burchak nechchi gradus?', opts: ['0°', '7.5°', '15°'], ans: '7.5°' },
      { q: 'Qaysi son 25% ga oshirilganda 100 ga teng bo‘ladi?', opts: ['75', '80', '85'], ans: '80' }
    ];
    let idx = 0;
    function nextIQ() {
      const s = stages[idx];
      stage.innerHTML = `
        <span class="badge-glow">Bosqich ${idx + 1} / ${stages.length}</span>
        <h3 style="max-width:580px; margin:18px 0;">${s.q}</h3>
        <div class="options-row">
          ${s.opts.map(o => `<button class="option-btn" data-ans="${o}">${o}</button>`).join('')}
        </div>
      `;
      stage.querySelectorAll('.option-btn').forEach(b => {
        b.onclick = () => {
          if (b.dataset.ans === s.ans) {
            SoundFX.play('correct');
            activeGame.correct++;
            activeGame.score += 55;
          } else {
            SoundFX.play('wrong');
            activeGame.wrong++;
          }
          updateHUD();
          idx++;
          if (idx < stages.length) nextIQ();
          else finishGameSession();
        };
      });
    }
    nextIQ();
  }
}

// 12. RATING, STATS & PROFILE RENDERING
function renderRatingView() {
  const currentRank = getCurrentRank();
  const nextRank = RANKS.find(r => r.minXP > state.xp);
  document.getElementById('rank-current-icon').textContent = currentRank.icon;
  document.getElementById('rank-current-name').textContent = currentRank.name;

  if (nextRank) {
    const prevXP = currentRank.minXP;
    const pct = Math.min(100, Math.round(((state.xp - prevXP) / (nextRank.minXP - prevXP)) * 100));
    document.getElementById('rank-xp-progress-text').textContent = `${state.xp} / ${nextRank.minXP} XP (${nextRank.name} darajasigacha)`;
    document.getElementById('rank-progress-bar').style.width = `${pct}%`;
  } else {
    document.getElementById('rank-xp-progress-text').textContent = `${state.xp} XP — Maksimal darajaga erishildi!`;
    document.getElementById('rank-progress-bar').style.width = '100%';
  }

  document.getElementById('ranks-list').innerHTML = RANKS.map(r => {
    const unlocked = state.xp >= r.minXP;
    return `
      <div class="glass-card rank-card ${unlocked ? 'unlocked' : ''}">
        <div style="font-size:2rem; margin-bottom:10px;">${r.icon}</div>
        <h4>${r.name}</h4>
        <div class="accent-blue" style="font-family:var(--font-mono); font-size:0.85rem; margin:4px 0 8px;">${r.minXP} XP</div>
        <p class="muted-text">${r.desc}</p>
      </div>
    `;
  }).join('');
}

function renderStatsView() {
  const today = new Date().toLocaleDateString('uz-UZ');
  const dailyScore = state.history.filter(h => h.date === today).reduce((sum, h) => sum + h.score, 0);
  const accuracy = state.totalAttempts > 0 ? Math.round((state.correctAnswers / state.totalAttempts) * 100) : 0;

  // Best & Most played game
  let bestGame = '—';
  let mostPlayed = '—';
  if (state.history.length > 0) {
    const sortedByScore = [...state.history].sort((a, b) => b.score - a.score);
    bestGame = `${sortedByScore[0].title} (${sortedByScore[0].score})`;
    const counts = {};
    state.history.forEach(h => counts[h.title] = (counts[h.title] || 0) + 1);
    mostPlayed = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  }

  document.getElementById('st-daily').textContent = `${dailyScore} ball`;
  document.getElementById('st-weekly').textContent = `${state.totalScore} ball`;
  document.getElementById('st-monthly').textContent = `${state.totalScore} ball`;
  document.getElementById('st-accuracy').textContent = `${accuracy}%`;
  document.getElementById('st-best-game').textContent = bestGame;
  document.getElementById('st-most-played').textContent = mostPlayed;

  renderSVGChart('stats-full-chart', state.history.slice(0, 12).reverse());
}

function renderProfileView() {
  const tier = getCurrentTier();
  const rank = getCurrentRank();
  document.getElementById('profile-avatar-big').textContent = state.avatar;
  document.getElementById('profile-username').textContent = state.username;
  document.getElementById('profile-age-badge').textContent = `${tier.range} • ${tier.title}`;
  document.getElementById('profile-rank-tag').textContent = `${rank.icon} ${rank.name}`;

  document.getElementById('prof-score').textContent = state.totalScore;
  document.getElementById('prof-xp').textContent = state.xp;
  document.getElementById('prof-best').textContent = state.bestScore;
  document.getElementById('prof-streak').textContent = `${state.streak} kun`;

  document.getElementById('avatar-options').innerHTML = AVATARS.map(av => `
    <button class="avatar-opt ${av === state.avatar ? 'selected' : ''}" onclick="selectAvatar('${av}')">${av}</button>
  `).join('');

  document.getElementById('achievements-grid').innerHTML = ACHIEVEMENTS.map(a => {
    const unlocked = state.unlockedAchievements.includes(a.id);
    return `
      <div class="ach-card ${unlocked ? 'unlocked' : ''}">
        <span class="ach-icon">${a.icon}</span>
        <div>
          <strong>${a.title}</strong>
          <div class="muted-text" style="font-size:0.78rem">${a.desc}</div>
        </div>
      </div>
    `;
  }).join('');

  const tbody = document.getElementById('profile-history-body');
  if (state.history.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="muted-text">O‘yinlar tarixi hozircha bo‘sh.</td></tr>`;
  } else {
    tbody.innerHTML = state.history.map(h => `
      <tr>
        <td><strong>${h.title}</strong></td>
        <td class="accent-blue">+${h.score}</td>
        <td>${h.accuracy}</td>
        <td>${h.time}s</td>
        <td class="muted-text">${h.date}</td>
      </tr>
    `).join('');
  }
}

window.selectAvatar = function(av) {
  SoundFX.play('click');
  state.avatar = av;
  saveState();
  updateNavbar();
  renderProfileView();
};

// 13. SVG ANALYTICS CHART BUILDER
function renderSVGChart(containerId, items) {
  const el = document.getElementById(containerId);
  if (!items || items.length === 0) {
    el.innerHTML = `<div style="height:100%; display:flex; align-items:center; justify-content:center; color:var(--text-muted);">Grafik ko‘rinishi uchun kamida 1 ta o‘yin o‘ynang</div>`;
    return;
  }
  const maxVal = Math.max(...items.map(i => i.score), 100);
  const w = 600;
  const h = 180;
  const pad = 24;
  const stepX = items.length > 1 ? (w - pad * 2) / (items.length - 1) : w / 2;

  const points = items.map((item, idx) => {
    const x = items.length > 1 ? pad + idx * stepX : w / 2;
    const y = h - pad - ((item.score / maxVal) * (h - pad * 2));
    return { x, y, score: item.score, title: item.title };
  });

  const polyline = points.map(p => `${p.x},${p.y}`).join(' ');
  const area = `${points[0].x},${h - pad} ${polyline} ${points[points.length - 1].x},${h - pad}`;

  el.innerHTML = `
    <svg viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.45" />
          <stop offset="100%" stop-color="#38BDF8" stop-opacity="0.0" />
        </linearGradient>
      </defs>
      <polygon points="${area}" fill="url(#chartFill)" />
      <polyline fill="none" stroke="#38BDF8" stroke-width="3" points="${polyline}" />
      ${points.map(p => `
        <circle cx="${p.x}" cy="${p.y}" r="5" fill="#8B5CF6" stroke="#F8FAFC" stroke-width="2" />
        <text x="${p.x}" y="${p.y - 10}" fill="#F8FAFC" font-size="11" text-anchor="middle" font-family="JetBrains Mono">${p.score}</text>
      `).join('')}
    </svg>
  `;
}

// 14. EVENT LISTENERS BOOTSTRAP
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  initLoginScreen();

  // Navigation clicks
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => switchView(el.dataset.nav));
  });

  document.getElementById('mobile-menu-btn').onclick = () => {
    document.getElementById('nav-links').classList.toggle('open');
  };

  // Category filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.onclick = () => renderGamesLibrary(btn.dataset.cat);
  });

  // Active Game Controls
  document.getElementById('btn-exit-game').onclick = () => switchView('dashboard');
  document.getElementById('btn-restart-game').onclick = () => launchGame(activeGame.id);

  // Result Modal Controls
  document.getElementById('btn-modal-replay').onclick = () => {
    document.getElementById('result-modal').classList.add('hidden');
    launchGame(activeGame.id);
  };
  document.getElementById('btn-modal-home').onclick = () => {
    document.getElementById('result-modal').classList.add('hidden');
    switchView('dashboard');
  };

  // Settings Listeners
  document.getElementById('toggle-theme').onchange = (e) => {
    state.settings.theme = e.target.checked ? 'dark' : 'light';
    applySettings();
    saveState();
  };

  document.getElementById('toggle-sound').onchange = (e) => {
    state.settings.sound = e.target.checked;
    saveState();
    SoundFX.play('click');
  };

  document.getElementById('toggle-animations').onchange = (e) => {
    state.settings.animations = e.target.checked;
    applySettings();
    saveState();
  };

  document.getElementById('btn-save-username').onclick = () => {
    const newName = document.getElementById('settings-username-input').value.trim();
    if (!newName) return;
    state.username = newName;
    saveState();
    updateNavbar();
    showToast('Username yangilandi', `Yangi nom: ${newName}`, '✅');
  };

  document.getElementById('btn-change-age').onclick = () => {
    openAgeSelection();
  };

  document.getElementById('btn-reset-data').onclick = () => {
    if (confirm('Barcha ballar, yutuqlar va tarix o‘chirilsinmi?')) {
      const keepUser = state.username;
      const keepAge = state.ageTier;
      localStorage.removeItem(STORAGE_KEY);
      state = {
        ...state,
        username: keepUser,
        ageTier: keepAge,
        totalScore: 0,
        xp: 0,
        gamesPlayed: 0,
        correctAnswers: 0,
        totalAttempts: 0,
        bestScore: 0,
        dailyGamesCount: 0,
        history: [],
        unlockedAchievements: []
      };
      saveState();
      renderDashboard();
      showToast('Ma’lumotlar tozalandi', 'Barcha ko‘rsatkichlar nolga tushirildi', '🗑️');
    }
  };

  document.getElementById('btn-logout').onclick = () => {
    stopGameTimer();
    initLoginScreen();
    showScreen('login');
  };
});