const app = document.getElementById("app");
let currentLang = "de";
let currentScreen = "intro"; // intro | question | result | tips
let scores = { humor: 0, resignation: 0, rebellion: 0, hope: 0 };
let currentQuestion = 0;
let history = [];

const translations = {
  
  de: {
    feedbackPlaceholder: "💬 Schreiben Sie Ihren Kommentar...",
    namePlaceholder: "👤 Ihr Name",
    sendBtn: "📨 Senden",
    thankYou: "🙏 Danke für Ihr Feedback!",
    enterName: "Bitte geben Sie Ihren Namen ein.",
    enterComment: "Bitte geben Sie einen Kommentar ein.",
    introTitle: "Meme Coping Test",
    introText: "Finde heraus, wie du mit Stress umgehst – mithilfe von Memes! Wähle jedes Mal das Meme, das dich am besten beschreibt.",
    startBtn: "Test starten",
    backBtn: "Zurück",
    skipBtn: "Überspringen",
    againBtn: "Noch einmal machen",
    tipsBtn: "Tipps für Selbsthilfe",
    tipsTitle: "Hier sind einige Aktivitäten, die Sie ausprobieren können, wenn Sie sich überfordert fühlen:",
    tipsList: [
      "• Führen Sie ein Tagebuch.",
      "• Laden Sie eine App herunter, die Entspannungsübungen (wie tiefes Atmen oder Visualisierung) oder Tipps zur Achtsamkeit anbietet.",
      "• Treiben Sie regelmäßig Sport und achten Sie auf eine gesunde, ausgewogene Ernährung.",
      "• Halten Sie sich an einen festen Schlafrhythmus und sorgen Sie dafür, dass Sie ausreichend schlafen.",
      "• Vermeiden Sie übermäßigen Koffeinkonsum, zum Beispiel durch Softdrinks oder Kaffee.",
      "• Erkennen und hinterfragen Sie negative oder hinderliche Gedanken.",
      "• Wenden Sie sich an Freunde oder Familienmitglieder, die Ihnen auf positive Weise helfen, mit schwierigen Situationen umzugehen."
    ],
    backToResultBtn: "Zurück zum Ergebnis",
    resultTitle: "Dein Meme Coping Profil 🎯",
    questions: [
      "Wenn alles schiefläuft, aber Sie trotzdem weitermachen mussen:",
      "Sie hören schlechte Nachrichten in den Medien:",
      "Konflikt mit Vorgesetzten oder Lehrern:",
      "Keine Energie mehr für Arbeit/Uni:",
      "Große Veränderung (Umzug, Jobwechsel):",
      "Sie fühlen sich unvorbereitet für eine Prüfung:",
    ],
    labels: {
      top: "Positiv",
      bottom: "Negativ",
      left: "Passiv",
      right: "Aktiv",
      q1: "Humor / Ironie",
      q2: "Resignation / Ablenkung",
      q3: "Rebellion / Aktionismus",
      q4: "Hoffnung / Motivation",
    },
    statsBtn: "📊 Statistik",
  },
  en: {
    feedbackPlaceholder: "💬 Write your comment...",
    namePlaceholder: "👤 Your name",
    sendBtn: "📨 Send",
    thankYou: "🙏 Thank you for your feedback!",
    enterName: "Please enter your name.",
    enterComment: "Please enter a comment.",
    introTitle: "Meme Coping Test",
    introText: "Find out how you deal with stress – through memes! Choose the meme that best describes you each time.",
    startBtn: "Start Test",
    backBtn: "Back",
    skipBtn: "Skip",
    againBtn: "Try Again",
    tipsBtn: "Self-help tips",
    tipsTitle: "Here are some activities you can try when you feel overwhelmed:",
    tipsList: [
      "• Keep a journal.",
      "• Download an app that offers relaxation exercises (like deep breathing or visualization) or mindfulness tips.",
      "• Exercise regularly and maintain a balanced, healthy diet.",
      "• Stick to a regular sleep schedule and make sure you get enough rest.",
      "• Avoid excessive caffeine intake, for example from soft drinks or coffee.",
      "• Recognize and challenge negative or limiting thoughts.",
      "• Reach out to friends or family members who can help you deal with difficult situations in a positive way."
    ],
    backToResultBtn: "Back to result",
    resultTitle: "Your Meme Coping Profile 🎯",
    questions: [
      "When everything goes wrong but you still have to keep going:",
      "You hear bad news in the media:",
      "Conflict with your boss or teacher:",
      "No energy left for work/university:",
      "A big life change (moving, new job):",
      "You feel unprepared for an exam:",
    ],
    labels: {
      top: "Positive",
      bottom: "Negative",
      left: "Passive",
      right: "Active",
      q1: "Humor / Irony",
      q2: "Resignation / Distraction",
      q3: "Rebellion / Activism",
      q4: "Hope / Motivation",
    },
    statsBtn: "📊 Statistics",

  },
};

// === Основные функции ===

function renderIntro() {
  const t = translations[currentLang];
  currentScreen = "intro";
  app.innerHTML = `
    <div class="intro">
      <h1>${t.introTitle}</h1>
      <p>${t.introText}</p>
      <button onclick="startTest()">${t.startBtn}</button>
    </div>
  `;
}

function startTest() {
  currentQuestion = 0;
  history = [];
  scores = { humor: 0, resignation: 0, rebellion: 0, hope: 0 };
  renderQuestion();
}

function renderQuestion() {
  const t = translations[currentLang];
  currentScreen = "question";

  if (currentQuestion >= t.questions.length) {
    renderEndScreen();
    return;
  }

  const q = t.questions[currentQuestion];
  const questionIndex = currentQuestion + 1;

  const optionsHtml = [1, 2, 3, 4]
    .map(
      (num) => `
      <div class="option" onclick="selectOption(${num})">
        <img src="мемы/${questionIndex}вопрос/${num}.jpg" alt="Meme ${num}">
      </div>`
    )
    .join("");

  app.innerHTML = `
    <div class="progress-container">
      <div class="progress-bar" style="width:${(currentQuestion / t.questions.length) * 100}%"></div>
    </div>
    <div class="question">${q}</div>
    <div class="options">${optionsHtml}</div>
    <div class="button-group">
      <button onclick="goBack()" ${currentQuestion === 0 ? "disabled" : ""}>${t.backBtn}</button>
      <button onclick="skipQuestion()">${t.skipBtn}</button>
    </div>
  `;
}

function selectOption(optionNum) {
  history.push(optionNum);
  switch (optionNum) {
    case 1: scores.humor++; break;
    case 2: scores.resignation++; break;
    case 3: scores.rebellion++; break;
    case 4: scores.hope++; break;
  }
  currentQuestion++;
  renderQuestion();
}

function skipQuestion() {
  history.push(null);
  currentQuestion++;
  renderQuestion();
}

function goBack() {
  if (currentQuestion === 0) return;
  const last = history.pop();
  if (last) {
    switch (last) {
      case 1: scores.humor--; break;
      case 2: scores.resignation--; break;
      case 3: scores.rebellion--; break;
      case 4: scores.hope--; break;
    }
  }
  currentQuestion--;
  renderQuestion();
}

function renderEndScreen() {
  const t = translations[currentLang];
  currentScreen = "result";

  const total = scores.humor + scores.resignation + scores.rebellion + scores.hope;
  if (total === 0) {
    renderIntro();
    return;
  }

  const x = scores.hope + scores.rebellion - (scores.humor + scores.resignation);
  const y = scores.hope + scores.humor - (scores.rebellion + scores.resignation);
  const maxVal = Math.max(Math.abs(x), Math.abs(y), 1);
  const normX = (x / maxVal) * 80;
  const normY = (y / maxVal) * 80;

  app.innerHTML = `
    <div class="result-screen">
      <h2 class="result-title">${t.resultTitle}</h2>
      <div class="axis-wrapper">
        <div class="axis fancy-axis">
          <div class="axis-label top">${t.labels.top}</div>
          <div class="axis-label bottom">${t.labels.bottom}</div>
          <div class="axis-label left">${t.labels.left}</div>
          <div class="axis-label right">${t.labels.right}</div>

          <div class="quadrant top-left">${t.labels.q1}</div>
          <div class="quadrant bottom-left">${t.labels.q2}</div>
          <div class="quadrant bottom-right">${t.labels.q3}</div>
          <div class="quadrant top-right">${t.labels.q4}</div>

          <div class="axis-lines"></div>
          <div class="point-glow" style="left:50%; top:50%;"></div>
        </div>
      </div>

      <div class="summary">
  <div class="tooltip-container">
    <button class="result-btn">Humor / Ironie: ${scores.humor}</button>
    <div class="tooltip-text">
      Memes dienen als Werkzeug, um die Stimmung zu heben und sich besser zu fühlen. Sie liefern einen kurzen positiven Impuls und können helfen, eine optimistische Haltung gegenüber Problemen zu entwickeln.
    </div>
  </div>

  <div class="tooltip-container">
    <button class="result-btn">Resignation / Ablenkung: ${scores.resignation}</button>
    <div class="tooltip-text">
      Memes dienen als Möglichkeit, der Realität zu entfliehen oder Probleme kurzfristig zu vergessen. Sie bieten die Gelegenheit, Stress abzubauen und negative Gefühle zu verarbeiten ohne dass direkt aktiv gehandelt werden muss. Dies kann eine Reaktion auf Müdigkeit, Angst oder das Gefühl der Ohnmacht sein.
    </div>
  </div>

  <div class="tooltip-container">
    <button class="result-btn">Rebellion / Aktionismus: ${scores.rebellion}</button>
    <div class="tooltip-text">
      Memes dienen der Ausdrucksform von Unzufriedenheit oder Protest. Humor wird als Katalysator für Kritik oder aktive Handlungen genutzt, teilweise auch aggressiv (z. B. Online-Diskussionen). Negative Memes helfen, Frustration auszudrücken und Solidarität mit Gleichgesinnten zu zeigen.
    </div>
  </div>

  <div class="tooltip-container">
    <button class="result-btn">Hoffnung / Motivation: ${scores.hope}</button>
    <div class="tooltip-text">
      Memes werden als Werkzeug zur Selbstentwicklung oder Problemlösung genutzt. Sie vermitteln das Gefühl, dass Probleme überwindbar sind und motivieren zum Handeln.
    </div>
  </div>
</div>



      <div class="button-group">
        <button class="restart-btn" onclick="renderIntro()">${t.againBtn}</button>
        <button class="tips-btn" onclick="renderTips()">${t.tipsBtn}</button>
        <button class="stats-btn" onclick="openStats()">${t.statsBtn}</button>
      </div>
    </div>
  `;

  setTimeout(() => {
    const point = document.querySelector(".point-glow");
    point.style.left = `${50 + normX / 2}%`;
    point.style.top = `${50 - normY / 2}%`;
  }, 200);
}

function renderTips() {
  const t = translations[currentLang];
  currentScreen = "tips";

  const tipsList = t.tipsList.map(item => `<p>${item}</p>`).join("");

  app.innerHTML = `
    <div class="tips-screen">
      <h2 class="result-title">${t.tipsTitle}</h2>
      <div class="tips-content">${tipsList}</div>
      <button class="restart-btn" onclick="renderEndScreen()">${t.backToResultBtn}</button>
    </div>
  `;
}

// === Переключатель языка ===
function toggleLanguage() {
  currentLang = currentLang === "de" ? "en" : "de";
  const btn = document.getElementById("lang-btn");
  btn.innerText = currentLang === "de" ? "🇩🇪 Deutsch" : "🇬🇧 English";

  switch (currentScreen) {
    case "intro": renderIntro(); break;
    case "question": renderQuestion(); break;
    case "result": renderEndScreen(); break;
    case "tips": renderTips(); break;
  }
}
function openStats() {
  const modal = document.getElementById("statsModal");
  const statsData = document.getElementById("statsData");
  const feedbackList = document.getElementById("feedbackList");
  const oldForm = document.querySelector(".feedback-form");
if (oldForm) oldForm.remove();

  // Фейковая "общая статистика"
const fakeStats = [
  { label: "Humor / Ironie", percent: 34 },
  { label: "Resignation / Ablenkung", percent: 27 },
  { label: "Rebellion / Aktionismus", percent: 18 },
  { label: "Hoffnung / Motivation", percent: 21 }
];

// Отображение "результатов опроса"
statsData.innerHTML = fakeStats
  .map(s => `
    <div style="margin-bottom: 12px;">
      <p><strong>${s.label}</strong> — ${s.percent}% der Nutzer</p>
      <div style="
        background: rgba(0,0,0,0.1);
        height: 10px;
        border-radius: 6px;
        overflow: hidden;
        margin-top: 5px;">
        <div style="
          width: ${s.percent}%;
          height: 100%;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 6px;"></div>
      </div>
    </div>
  `)
  .join("");


  // Рандомные отзывы
  const feedbacks = [
    "„Ich erkenne mich total wieder 😂“",
    "„Das Ergebnis passt erstaunlich gut!“",
    "„Ich wusste gar nicht, dass ich so hoffnungsvoll bin 😅“",
    "„Ziemlich akkurat, aber ich will ein Re-Match!“",
    "„Humor rettet mich jedes Mal.“"
  ];

  feedbackList.innerHTML = feedbacks
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map(f => `<p>💬 ${f}</p>`)
    .join("");

  modal.classList.remove("hidden");
  // === Форма для обратной связи ===
const t = translations[currentLang];
const formHtml = `
  <div class="feedback-form">
    <input id="feedbackName" type="text" placeholder="${t.namePlaceholder}" />
    <textarea id="feedbackInput" placeholder="${t.feedbackPlaceholder}"></textarea>
    <button id="sendFeedbackBtn" class="hidden" onclick="sendFeedback()">${t.sendBtn}</button>
  </div>
`;
feedbackList.insertAdjacentHTML("afterend", formHtml);

// Следим за вводом, чтобы кнопка появлялась
const nameInput = document.getElementById("feedbackName");
const commentInput = document.getElementById("feedbackInput");
const sendBtn = document.getElementById("sendFeedbackBtn");

function toggleSendBtn() {
  if (nameInput.value.trim() && commentInput.value.trim()) {
    sendBtn.classList.remove("hidden");
  } else {
    sendBtn.classList.add("hidden");
  }
}

[nameInput, commentInput].forEach(inp => {
  inp.addEventListener("input", toggleSendBtn);
  inp.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey && !sendBtn.classList.contains("hidden")) {
      e.preventDefault();
      sendFeedback();
    }
  });
});

}

function closeStats() {
  document.getElementById("statsModal").classList.add("hidden");
}

renderIntro();
// Закрытие окна кликом вне контента
document.getElementById("statsModal").addEventListener("click", function (e) {
  const modalContent = document.querySelector(".modal-content");
  // Проверяем, что клик был именно по подложке, а не по содержимому
  if (!modalContent.contains(e.target)) {
    closeStats();
  }
});
function sendFeedback() {
  const t = translations[currentLang];
  const nameInput = document.getElementById("feedbackName");
  const commentInput = document.getElementById("feedbackInput");

  const name = nameInput.value.trim();
  const comment = commentInput.value.trim();

  if (!name) {
    alert(t.enterName);
    nameInput.focus();
    return;
  }

  if (!comment) {
    alert(t.enterComment);
    commentInput.focus();
    return;
  }

  // имитация "отправки"
  alert(t.thankYou);

  // очистка полей
  nameInput.value = "";
  commentInput.value = "";

  // скрываем кнопку
  document.getElementById("sendFeedbackBtn").classList.add("hidden");
}
