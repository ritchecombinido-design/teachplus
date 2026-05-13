
/* ============================================================
   1. DEXIE DATABASE SETUP
   ============================================================ */
const db = new Dexie('TeachPlusDB');
db.version(2).stores({
  settings:     '&key, value',
  quotes:       '++id, quoteIndex, shownAt',
  activityLogs: '++id, message, icon, color, ts',
  cacheData:    '&cacheKey, data, updatedAt',
  schoolMeta:   '&key, value',
  sections:     '++id, gradeLevel, sectionName',
  learners:     '++id, lrn, fullname, sex, gradeLevel, section',
  attendance:   '++id, learnerId, date, section, status, month',
  interventions:'++id, learnerId, section, message, createdAt, updatedAt',
  themeState:   '&key, value'
});


/* ============================================================
   2. TEACHER QUOTES (50)
   ============================================================ */
const QUOTES = [
  { text: "Teaching is the greatest act of optimism.", author: "Colleen Wilcox" },
  { text: "Education is not preparation for life; education is life itself.", author: "John Dewey" },
  { text: "The art of teaching is the art of assisting discovery.", author: "Mark van Doren" },
  { text: "A good teacher can inspire hope, ignite the imagination, and instill a love of learning.", author: "Brad Henry" },
  { text: "Teaching is a work of heart.", author: "Unknown" },
  { text: "One child, one teacher, one book, one pen can change the world.", author: "Malala Yousafzai" },
  { text: "In learning you will teach, and in teaching you will learn.", author: "Phil Collins" },
  { text: "Teachers can change lives with just the right mix of chalk and challenges.", author: "Joyce Meyer" },
  { text: "The influence of a good teacher can never be erased.", author: "Unknown" },
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "A teacher who loves learning earns the right and the ability to help others learn.", author: "Ruth Beechick" },
  { text: "Don't try to fix the students, fix ourselves first. The good teacher makes the poor student good and the good student superior.", author: "Marva Collins" },
  { text: "Students don't care how much you know until they know how much you care.", author: "Unknown" },
  { text: "The mediocre teacher tells. The good teacher explains. The superior teacher demonstrates. The great teacher inspires.", author: "William Arthur Ward" },
  { text: "Teaching is not a lost art, but the regard for it is a lost tradition.", author: "Jacques Barzun" },
  { text: "It is the supreme art of the teacher to awaken joy in creative expression and knowledge.", author: "Albert Einstein" },
  { text: "What the teacher is, is more important than what they teach.", author: "Karl Menninger" },
  { text: "To teach is to learn twice.", author: "Joseph Joubert" },
  { text: "Education is not the filling of a pail, but the lighting of a fire.", author: "W.B. Yeats" },
  { text: "You can teach a student a lesson for a day; but if you can teach him to learn by creating curiosity, he will continue the learning process as long as he lives.", author: "Clay P. Bedford" },
  { text: "Every child deserves a champion — an adult who will never give up on them.", author: "Rita F. Pierson" },
  { text: "Teaching is the profession that teaches all other professions.", author: "Unknown" },
  { text: "Rest when you're tired. You can only pour from a full cup.", author: "Unknown" },
  { text: "Self-care is not self-indulgence. Self-care is self-preservation.", author: "Audre Lorde" },
  { text: "You cannot pour from an empty vessel. Take care of yourself first.", author: "Eleanor Brown" },
  { text: "A teacher's job is to take a bunch of live wires and see that they are well-grounded.", author: "D. Martin" },
  { text: "Your energy and enthusiasm are contagious. Your students are lucky to have you.", author: "Unknown" },
  { text: "The best teachers are those who show you where to look but don't tell you what to see.", author: "Alexandra K. Trenfor" },
  { text: "You don't have to be perfect. You just have to be present.", author: "Unknown" },
  { text: "Great teachers empathize with kids, respect them, and believe that each one has something special.", author: "Ann Lieberman" },
  { text: "No one rises to low expectations.", author: "Les Brown" },
  { text: "Make each day your masterpiece.", author: "John Wooden" },
  { text: "The task of the modern educator is not to cut down jungles but to irrigate deserts.", author: "C.S. Lewis" },
  { text: "Teach from the heart, not from the book.", author: "Unknown" },
  { text: "Every student can learn, just not on the same day or in the same way.", author: "George Evans" },
  { text: "Children must be taught how to think, not what to think.", author: "Margaret Mead" },
  { text: "The more that you read, the more things you will know.", author: "Dr. Seuss" },
  { text: "Progress is impossible without change, and those who cannot change their minds cannot change anything.", author: "George Bernard Shaw" },
  { text: "It takes a big heart to help shape little minds.", author: "Unknown" },
  { text: "Small progress is still progress.", author: "Unknown" },
  { text: "Teaching kids to count is fine, but teaching them what counts is best.", author: "Bob Talbert" },
  { text: "Kindness is more important than wisdom, and the recognition of this is the beginning of wisdom.", author: "Theodore Rubin" },
  { text: "Wonder is the beginning of wisdom.", author: "Socrates" },
  { text: "You are making a difference one student at a time.", author: "Unknown" },
  { text: "Breathe. You've got this.", author: "Unknown" },
  { text: "Be the teacher you needed when you were a student.", author: "Unknown" },
  { text: "Patience is not simply the ability to wait — it's how we behave while we're waiting.", author: "Joyce Meyer" },
  { text: "Your dedication plants seeds that will grow for generations.", author: "Unknown" },
  { text: "Learning is a treasure that will follow its owner everywhere.", author: "Chinese Proverb" },
  { text: "Every day may not be good, but there is something good in every day.", author: "Unknown" }
];

/* ============================================================
   3. BUNDLE TOOL DEFINITIONS
   ============================================================ */

const BUNDLE_TOOLS = {
  teaching: [
    { icon:'fas fa-check-square', color:'blue',   name:'Attendance',          desc:'Daily class attendance tracker', onClick: 'attendance.html' },
    { icon:'fas fa-pen-nib',      color:'purple', name:'Assessment Recorder', desc:'Record student assessments' },
    { icon:'fas fa-star-half-alt',color:'amber',  name:'Grading System',      desc:'Grade computation & records' },
    { icon:'fas fa-th',           color:'green',  name:'Seating Arrangement', desc:'Visual classroom seating map' },
    { icon:'fas fa-broadcast-tower',color:'rose', name:'Live Session Tools',  desc:'Interactive class tools' },
    { icon:'fas fa-sticky-note',  color:'amber',  name:'Lesson Notes',        desc:'Digital lesson planning' },
    { icon:'fas fa-hand-pointer', color:'blue',   name:'Participation Tracker',desc:'Track student participation' },
    { icon:'fas fa-keyboard',     color:'purple', name:'Score Encoding',      desc:'Fast score data entry' },
  ],
  forms: [
    { icon:'fas fa-table',        color:'blue',   name:'SF1 – Enrolment',     desc:'School Form 1 management' },
    { icon:'fas fa-list-ol',      color:'green',  name:'SF2 – Daily Attendance',desc:'School Form 2 records',
onClick: 'sf2.html' },
    { icon:'fas fa-id-card',      color:'purple', name:'SF9 – Report Card',   desc:'School Form 9 generator' },
    { icon:'fas fa-users',        color:'amber',  name:'Masterlist',          desc:'Class masterlist generator' },
    { icon:'fas fa-file-chart-line',color:'blue', name:'Report Generator',    desc:'Automated report generation' },
    { icon:'fas fa-file-export',  color:'green',  name:'Grade Export',        desc:'Export grades to file' },
    { icon:'fas fa-exchange-alt', color:'rose',   name:'Transmutation Table', desc:'Grade transmutation tool' },
    { icon:'fas fa-address-book', color:'purple', name:'Learner Profiles',    desc:'Individual learner records' },
  ],
  admin: [
    { icon:'fas fa-calendar-week',color:'blue',   name:'Class Scheduling',    desc:'Timetable management' },
    { icon:'fas fa-stopwatch',    color:'green',  name:'Time Tracking',       desc:'Teaching hours log' },
    { icon:'fas fa-plane-departure',color:'amber',name:'Leave Planner',       desc:'Leave of absence planner' },
    { icon:'fas fa-id-badge',     color:'purple', name:'Personnel Records',   desc:'Staff information system' },
    { icon:'fas fa-comments',     color:'blue',   name:'Meeting Logs',        desc:'Faculty meeting records' },
    { icon:'fas fa-award',        color:'rose',   name:'IPCRF Tracker',       desc:'Performance rating tool' },
    { icon:'fas fa-calendar-alt', color:'green',  name:'School Calendar',     desc:'Academic events calendar' },
    { icon:'fas fa-tasks',        color:'amber',  name:'Task Management',     desc:'Teacher to-do system' },
  ],
  engagement: [
    { icon:'fas fa-random',       color:'blue',   name:'Name Picker',         desc:'Random student selector' },
    { icon:'fas fa-gamepad',      color:'green',  name:'Quiz Games',          desc:'Gamified class quizzes' },
    { icon:'fas fa-trophy',       color:'amber',  name:'Rewards System',      desc:'Student points & badges' },
    { icon:'fas fa-smile-beam',   color:'purple', name:'Mood Meter',          desc:'Class mood check-in' },
    { icon:'fas fa-hourglass-half',color:'rose',  name:'Timer',               desc:'Countdown & stopwatch' },
    { icon:'fas fa-object-group', color:'blue',   name:'Group Generator',     desc:'Random group maker' },
    { icon:'fas fa-circle-notch', color:'amber',  name:'Wheel Spinner',       desc:'Decision spinner wheel' },
    { icon:'fas fa-clone',        color:'green',  name:'Flashcards',          desc:'Study card creator' },
  ]
};

const COLOR_MAP = {
  blue:   { bg:'rgba(37,99,235,.1)',  color:'var(--accent)' },
  green:  { bg:'rgba(13,148,136,.1)', color:'var(--green)'  },
  amber:  { bg:'rgba(217,119,6,.1)',  color:'var(--amber)'  },
  purple: { bg:'rgba(124,58,237,.1)', color:'var(--purple)' },
  rose:   { bg:'rgba(225,29,72,.1)',  color:'var(--rose)'   },
};

/* ============================================================
   4. RENDER TOOL GRIDS
   ============================================================ */
function renderToolGrid(viewId, toolKey) {
  const grid = document.querySelector(`#view-${viewId} .tool-grid`);
  if (!grid) return;

  const tools = BUNDLE_TOOLS[toolKey] || [];

  grid.innerHTML = tools.map(t => {
    const c = COLOR_MAP[t.color] || COLOR_MAP.blue;

    return `
      <div class="tool-card" 
           onclick="window.location.href='${t.onClick || '#'}'">

        <div class="tool-card-icon" style="background:${c.bg};color:${c.color}">
          <i class="${t.icon}"></i>
        </div>

        <div class="tool-card-name">${t.name}</div>
        <div class="tool-card-desc">${t.desc}</div>

      </div>`;
  }).join('');
}
/* ============================================================
   5. VIEW NAVIGATION
  ============================================================ */
function navigate(name) {
  showView(name);
}

const VIEW_TITLES = {
  dashboard:  'Dashboard',
  teaching:   'Teaching & Classes',
  forms:      'Forms & Reports',
  admin:      'Administration',
  engagement: 'Engagement',
  settings:   'Settings'
};

function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.bottom-nav-item').forEach(b => b.classList.remove('active'));

  const view = document.getElementById(`view-${name}`);
  if (view) view.classList.add('active');

  // matches both navigate() and showView() onclick patterns
  const navBtn = document.querySelector(`.nav-item[onclick="navigate('${name}')"], .nav-item[onclick="showView('${name}')"]`);
  if (navBtn) navBtn.classList.add('active');

  const bnavBtn = document.getElementById(`bnav-${name}`);
  if (bnavBtn) bnavBtn.classList.add('active');

  document.getElementById('topbarTitle').textContent = VIEW_TITLES[name] || name;

  const toolMap = { teaching:'teaching', forms:'forms', admin:'admin', engagement:'engagement' };
  if (toolMap[name]) {
    const grid = document.querySelector(`#view-${name} .tool-grid`);
    if (grid && !grid.dataset.rendered) {
      renderToolGrid(name, toolMap[name]);
      grid.dataset.rendered = '1';
    }
  }

  closeSidebar();
}

/* ============================================================
   6. SIDEBAR TOGGLE
   ============================================================ */
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('sidebarOverlay');
  sb.classList.toggle('open');
  ov.classList.toggle('open');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
}

/* ============================================================
   7. THEME TOGGLE
   ============================================================ */
function toggleTheme() {
  const isDark = document.documentElement.dataset.theme === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  document.documentElement.dataset.theme = newTheme;
  updateThemeUI(newTheme);
  db.settings.put({ key: 'theme', value: newTheme });
}

function updateThemeUI(theme) {
  const dark = theme === 'dark';
  const icon1 = document.getElementById('themeIcon');
  const label1 = document.getElementById('themeLabel');
  const icon2 = document.getElementById('themeToggleIcon');
  const text2 = document.getElementById('themeToggleText');
  if (icon1) { icon1.className = dark ? 'fas fa-sun' : 'fas fa-moon'; }
  if (label1) label1.textContent = dark ? 'Light Mode' : 'Dark Mode';
  if (icon2) { icon2.className = dark ? 'fas fa-sun' : 'fas fa-moon'; }
  if (text2) text2.textContent = dark ? 'Change Theme' : 'Change Theme';
}


function setTheme(theme) {
  localStorage.setItem('tp_theme', theme); // sync bridge for other pages
  document.documentElement.setAttribute("data-theme", theme);
  applyThemeIcons(theme);
  db.settings.put({ key: 'theme', value: theme }).catch(() => {});
  // also write to themeState so attendance reads it
  db.themeState.put({ key: 'active', value: theme }).catch(() => {});
}

function openThemeSelector() {
  document.getElementById("themePanel").classList.toggle("hidden");
}

// LOAD SAVED THEME FROM DEXIE
(async () => {
  try {
    await db.open();
    const row = await db.settings.get('theme');
    const saved = (row && row.value) ? row.value : 'light';
    document.documentElement.setAttribute("data-theme", saved);
    // applyThemeIcons needs DOM — defer until DOMContentLoaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => applyThemeIcons(saved));
    } else {
      applyThemeIcons(saved);
    }
  } catch(e) {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();


/* ============================================================
   8. NICKNAME
   ============================================================ */
async function loadTeacherProfile() {

  try {

    const fields = [
      'surname',
      'firstname',
      'middlename',
      'designation',
	  'principal',
      'motto',
      'description'
    ];

    for (const key of fields) {

      const row = await db.settings.get(key);

      const input =
        document.getElementById(`${key}Input`);

      if (input) {
        input.value = row?.value || '';
      }
    }

    applyTeacherProfile();

  } catch(e) {
    console.error(e);
  }
}


function applyTeacherProfile() {

  const surname =
    document.getElementById('surnameInput')?.value.trim() || '';

  const firstname =
    document.getElementById('firstnameInput')?.value.trim() || '';

  const middlename =
    document.getElementById('middlenameInput')?.value.trim() || '';

  const fullname =
    `${firstname} ${middlename} ${surname}`
      .replace(/\s+/g,' ')
      .trim();

  // Welcome Greeting
  const greeting =
    document.getElementById('welcomeGreeting');

  if (greeting) {

    greeting.textContent =
      fullname
        ? `Mabuhay, Teacher ${firstname}!`
        : 'Mabuhay, Teacher!';
  }

  // Avatar Letter
  const avatar =
    document.getElementById('avatarBtn');

  if (avatar && firstname) {
    avatar.textContent =
      firstname.charAt(0).toUpperCase();
  }
}


async function saveTeacherProfile() {

  try {

    const fields = [
      'surname',
      'firstname',
      'middlename',
      'designation',
	  'principal',
      'motto',
      'description'
    ];

    for (const key of fields) {

      const input =
        document.getElementById(`${key}Input`);

      await db.settings.put({
        key,
        value: input?.value.trim() || ''
      });
    }

    applyTeacherProfile();

    await logActivity(
      'Teacher profile updated',
      'fas fa-user-tie',
      'blue'
    );

    showToast(
      'Profile saved!',
      'fas fa-check-circle'
    );

  } catch(e) {

    console.error(e);

    showToast(
      'Unable to save profile.',
      'fas fa-circle-exclamation'
    );
  }
}
/* ============================================================
   9. QUOTES SYSTEM
   ============================================================ */
let quotePool = [];

async function initQuotes() {
  try {
    const shown = await db.quotes.toArray();
    const shownIndexes = new Set(shown.map(r => r.quoteIndex));
    quotePool = QUOTES.map((q, i) => i).filter(i => !shownIndexes.has(i));
    if (quotePool.length === 0) {
      await db.quotes.clear();
      quotePool = QUOTES.map((_, i) => i);
    }
  } catch(e) {
    quotePool = QUOTES.map((_, i) => i);
  }
  showCurrentQuote();
}

async function nextQuote() {
  if (quotePool.length === 0) {
    try { await db.quotes.clear(); } catch(e){}
    quotePool = QUOTES.map((_, i) => i);
  }
  const ri = Math.floor(Math.random() * quotePool.length);
  const idx = quotePool.splice(ri, 1)[0];
  const quote = QUOTES[idx];
  const textEl = document.getElementById('quoteText');
  const authEl = document.getElementById('quoteAuthor');
  if (textEl) {
    textEl.classList.add('fading');
    setTimeout(() => {
      textEl.textContent = `"${quote.text}"`;
      if (authEl) authEl.textContent = `— ${quote.author}`;
      textEl.classList.remove('fading');
    }, 400);
  }
  try { await db.quotes.add({ quoteIndex: idx, shownAt: Date.now() }); } catch(e){}
}

function showCurrentQuote() {
  // show a random quote from pool without depleting it
  if (!quotePool.length) return;
  const idx = quotePool[Math.floor(Math.random() * quotePool.length)];
  const q = QUOTES[idx];
  const textEl = document.getElementById('quoteText');
  const authEl = document.getElementById('quoteAuthor');
  if (textEl) textEl.textContent = `"${q.text}"`;
  if (authEl) authEl.textContent = `— ${q.author}`;
}

/* ============================================================
   10. ACTIVITY LOG
   ============================================================ */
const DEMO_ACTIVITIES = [
  { message: 'Marked attendance for Grade 7-Rizal', icon: 'fas fa-check-square', color: 'blue',   ts: Date.now() - 600000  },
  { message: 'Updated SF9 for learner records',     icon: 'fas fa-file-alt',     color: 'green',  ts: Date.now() - 1800000 },
  { message: 'Created new lesson note: "Algebra Intro"', icon: 'fas fa-sticky-note', color: 'amber', ts: Date.now() - 3600000 },
  { message: 'Session started: Grade 8-Science',   icon: 'fas fa-broadcast-tower', color: 'purple', ts: Date.now() - 7200000 },
];

async function loadActivityFeed() {
  let logs = [];
  try {
    logs = await db.activityLogs.orderBy('ts').reverse().limit(6).toArray();
    if (!logs.length) logs = DEMO_ACTIVITIES;
  } catch(e) {
    logs = DEMO_ACTIVITIES;
  }
  renderActivityFeed(logs);
}

function renderActivityFeed(logs) {
  const list = document.getElementById('activityList');
  if (!list) return;
  list.innerHTML = logs.map(l => {
    const c = COLOR_MAP[l.color] || COLOR_MAP.blue;
    const time = formatRelTime(l.ts);
    return `
      <div class="activity-item">
        <div style="width:32px;height:32px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:${c.bg};color:${c.color};flex-shrink:0;font-size:13px;">
          <i class="${l.icon}" aria-hidden="true"></i>
        </div>
        <div style="flex:1;min-width:0;">
          <div style="font-weight:500;color:var(--text)">${l.message}</div>
          <div class="activity-time"><i class="fas fa-clock" aria-hidden="true"></i> ${time}</div>
        </div>
      </div>`;
  }).join('');
}

async function logActivity(message, icon = 'fas fa-circle', color = 'blue') {
  const entry = { message, icon, color, ts: Date.now() };
  try {
    await db.activityLogs.add(entry);
    await loadActivityFeed();
  } catch(e) {}
}

function formatRelTime(ts) {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60)   return 'Just now';
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
  return new Date(ts).toLocaleDateString();
}

/* ============================================================
   11. MINI CALENDAR
   ============================================================ */
let calDate = new Date();

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS   = ['Su','Mo','Tu','We','Th','Fr','Sa'];

function renderCalendar() {
  const grid = document.getElementById('calGrid');
  const label = document.getElementById('calMonthLabel');
  if (!grid || !label) return;
  label.textContent = `${MONTHS[calDate.getMonth()]} ${calDate.getFullYear()}`;
  const today = new Date();
  const firstDay = new Date(calDate.getFullYear(), calDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(calDate.getFullYear(), calDate.getMonth()+1, 0).getDate();

  let html = DAYS.map(d => `<div class="cal-day-name" aria-hidden="true">${d}</div>`).join('');

  for (let i = 0; i < firstDay; i++) html += `<div class="cal-day empty" aria-hidden="true"></div>`;

  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === today.getDate() && calDate.getMonth() === today.getMonth() && calDate.getFullYear() === today.getFullYear();
    html += `<div class="cal-day ${isToday ? 'today' : ''}" role="gridcell" aria-label="${MONTHS[calDate.getMonth()]} ${d}, ${calDate.getFullYear()}${isToday ? ' (today)' : ''}">${d}</div>`;
  }
  grid.innerHTML = html;
}

function changeCalMonth(dir) {
  calDate = new Date(calDate.getFullYear(), calDate.getMonth() + dir, 1);
  renderCalendar();
}

/* ============================================================
   12. CLOCK
   ============================================================ */
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' });
  const date = now.toLocaleDateString('en-PH', { weekday:'short', month:'short', day:'numeric' });
  const el = document.getElementById('clockText');
  if (el) el.textContent = `${date} · ${time}`;
}

/* ============================================================
   13. TOAST
   ============================================================ */
function showToast(msg, iconClass = 'fas fa-info-circle') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.innerHTML = `<i class="${iconClass}" aria-hidden="true"></i> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('out');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ============================================================
   14. MODAL
   ============================================================ */
function showModal(title, body) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').textContent = body;
  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

document.getElementById('modalOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

/* ============================================================
   15. PWA — SERVICE WORKER REGISTRATION
   ============================================================ */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // SW is stored inline — in production use separate sw.js
    const swBlob = new Blob([`
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('teachplus-v1').then(c =>
      c.addAll(['/', '/index.html'])
    )
  );
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
    `], { type: 'application/javascript' });
    const swUrl = URL.createObjectURL(swBlob);
    navigator.serviceWorker.register(swUrl).catch(()=>{});
  });
}

/* ============================================================
   THEME ICON REGISTRY
   ============================================================ */
const THEMES = {
  light: null,
  dark:  null,

  pink: {
    bundleIcons:    ['fa-heart', 'fa-star', 'fa-ribbon', 'fa-heart-pulse'],
    sidebarIcons:   ['fa-heart', 'fa-star', 'fa-ribbon', 'fa-heart', 'fa-star', 'fa-ribbon', 'fa-heart', 'fa-star'],
    statIcons:      ['fa-heart', 'fa-ribbon', 'fa-star', 'fa-heart-pulse'],
    backgroundIcons:['fa-heart', 'fa-ribbon', 'fa-star', 'fa-heart'],
    colors:         { corner: '#ff6fae', fill: '#ff6fae', stat: '#ff6fae', nav: '#ff85c1', bg: '#ff6fae' }
  },

  blue: {
    bundleIcons:    ['fa-snowflake', 'fa-water', 'fa-cloud', 'fa-fish'],
    sidebarIcons:   ['fa-snowflake', 'fa-water', 'fa-cloud', 'fa-fish', 'fa-snowflake', 'fa-water', 'fa-cloud', 'fa-fish'],
    statIcons:      ['fa-snowflake', 'fa-water', 'fa-cloud', 'fa-fish'],
    backgroundIcons:['fa-snowflake', 'fa-water', 'fa-cloud', 'fa-snowflake'],
    colors:         { corner: '#4a90e2', fill: '#4a90e2', stat: '#4a90e2', nav: '#6fb1ff', bg: '#4a90e2' }
  },

  green: {
    bundleIcons:    ['fa-seedling', 'fa-leaf', 'fa-tree', 'fa-spa'],
    sidebarIcons:   ['fa-seedling', 'fa-leaf', 'fa-tree', 'fa-spa', 'fa-seedling', 'fa-leaf', 'fa-tree', 'fa-spa'],
    statIcons:      ['fa-leaf', 'fa-seedling', 'fa-spa', 'fa-tree'],
    backgroundIcons:['fa-tree', 'fa-seedling', 'fa-leaf', 'fa-spa'],
    colors:         { corner: '#2ecc71', fill: '#2ecc71', stat: '#2ecc71', nav: '#58d68d', bg: '#2ecc71' }
  },

  yellow: {
    bundleIcons:    ['fa-sun', 'fa-star', 'fa-bolt', 'fa-lemon'],
    sidebarIcons:   ['fa-sun', 'fa-star', 'fa-bolt', 'fa-lemon', 'fa-sun', 'fa-star', 'fa-bolt', 'fa-lemon'],
    statIcons:      ['fa-sun', 'fa-star', 'fa-bolt', 'fa-lemon'],
    backgroundIcons:['fa-sun', 'fa-star', 'fa-lemon', 'fa-bolt'],
    colors:         { corner: '#f1c40f', fill: '#f1c40f', stat: '#f1c40f', nav: '#f7dc6f', bg: '#f1c40f' }
  },

  teal: {
    bundleIcons:    ['fa-water', 'fa-fish', 'fa-anchor', 'fa-wave-square'],
    sidebarIcons:   ['fa-water', 'fa-fish', 'fa-anchor', 'fa-wave-square', 'fa-water', 'fa-fish', 'fa-anchor', 'fa-wave-square'],
    statIcons:      ['fa-water', 'fa-fish', 'fa-anchor', 'fa-wave-square'],
    backgroundIcons:['fa-water', 'fa-fish', 'fa-anchor', 'fa-water'],
    colors:         { corner: '#1abc9c', fill: '#1abc9c', stat: '#1abc9c', nav: '#48c9b0', bg: '#1abc9c' }
  },

  purple: {
    bundleIcons:    ['fa-wand-magic-sparkles', 'fa-gem', 'fa-moon', 'fa-star'],
    sidebarIcons:   ['fa-wand-magic-sparkles', 'fa-gem', 'fa-moon', 'fa-star', 'fa-wand-magic-sparkles', 'fa-gem', 'fa-moon', 'fa-star'],
    statIcons:      ['fa-gem', 'fa-moon', 'fa-star', 'fa-wand-magic-sparkles'],
    backgroundIcons:['fa-gem', 'fa-wand-magic-sparkles', 'fa-moon', 'fa-star'],
    colors:         { corner: '#8e44ad', fill: '#8e44ad', stat: '#8e44ad', nav: '#a569bd', bg: '#8e44ad' }
  }
};

function applyThemeIcons(themeName) {
  const def = THEMES[themeName];

  // Clear all slots first
  document.querySelectorAll('.theme-corner-icon i, .theme-fill-icon i, .stat-theme-icon i, .nav-theme-icon i').forEach(i => i.className = '');
  document.querySelectorAll('.theme-corner-icon, .theme-fill-icon, .stat-theme-icon, .nav-theme-icon').forEach(el => {
    el.style.opacity = '0';
    el.style.color = '';
  });
  document.querySelectorAll('.bg-icon i').forEach(i => i.className = '');
  document.getElementById('themeBackground').style.color = '';

  if (!def) return; // light/dark: no decorative icons

  // Bundle corner & fill icons
  const cornerIcons = document.querySelectorAll('.theme-corner-icon');
  const fillIcons   = document.querySelectorAll('.theme-fill-icon');
  cornerIcons.forEach((el, idx) => {
    const icon = def.bundleIcons[idx % def.bundleIcons.length];
    el.querySelector('i').className = `fas ${icon}`;
    el.style.opacity = '1';
    el.style.color   = def.colors.corner;
  });
  fillIcons.forEach((el, idx) => {
    const icon = def.bundleIcons[(idx + 2) % def.bundleIcons.length];
    el.querySelector('i').className = `fas ${icon}`;
    el.style.opacity = '.06';
    el.style.color   = def.colors.fill;
  });

  // Stat card theme icons
  const statIcons = document.querySelectorAll('.stat-theme-icon');
  statIcons.forEach((el, idx) => {
    const icon = def.statIcons[idx % def.statIcons.length];
    el.querySelector('i').className = `fas ${icon}`;
    el.style.opacity = '0.25';
    el.style.color   = def.colors.stat;
  });

  // Sidebar nav theme icons
  const navIcons = document.querySelectorAll('.nav-theme-icon');
  navIcons.forEach((el, idx) => {
    const icon = def.sidebarIcons[idx % def.sidebarIcons.length];
    el.querySelector('i').className = `fas ${icon}`;
    el.style.opacity = '0.35';
    el.style.color   = def.colors.nav;
  });

  // Background layer icons
  const bgOrder = document.querySelectorAll('#themeBackground .bg-icon');
  const bgIcons = def.backgroundIcons;
  bgOrder.forEach((el, idx) => {
    el.querySelector('i').className = `fas ${bgIcons[idx % bgIcons.length]}`;
  });
  document.getElementById('themeBackground').style.color = def.colors.bg;
}

/* ============================================================
   16. INIT
   ============================================================ */
async function init() {
  // load theme
  try {
  const themeRow = await db.settings.get('theme');
  if (themeRow) updateThemeUI(themeRow.value);
} catch(e) {}


	await loadTeacherProfile();
  await initQuotes();
  await loadActivityFeed();
  renderCalendar();
  updateClock();
  setInterval(updateClock, 30000);

  // log app start
  await logActivity('TeachPlus opened — workspace ready', 'fas fa-door-open', 'blue');

  // show welcome toast
  setTimeout(() => showToast('Welcome to TeachPlus!', 'fas fa-chalkboard-teacher'), 600);
}

// Start
document.addEventListener('DOMContentLoaded', init);

