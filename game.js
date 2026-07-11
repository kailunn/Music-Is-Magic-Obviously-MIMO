const TOTAL_ROUNDS = 20;

const LEVELS = [
  {
    id: 1,
    name: "Single Notes",
    points: 10,
    role: "Bright single tones",
    monsters: [
      { id: "butterfly", name: "Butterfly", emoji: "🦋" },
      { id: "frog", name: "Frog", emoji: "🐸" }
    ],
    patterns: [
      { label: "C", notes: [261.63], mode: "single" },
      { label: "D", notes: [293.66], mode: "single" },
      { label: "E", notes: [329.63], mode: "single" },
      { label: "F", notes: [349.23], mode: "single" },
      { label: "G", notes: [392.0], mode: "single" },
      { label: "A", notes: [440.0], mode: "single" },
      { label: "B", notes: [493.88], mode: "single" }
    ]
  },
  {
    id: 2,
    name: "Intervals",
    points: 20,
    role: "Two-note steps",
    monsters: [
      { id: "lion", name: "Lion", emoji: "🦁" },
      { id: "chick", name: "Chick", emoji: "🐤" }
    ],
    patterns: [
      { label: "Major 2 (D-E)", notes: [293.66, 329.63], mode: "sequence" },
      { label: "Major 3 (C-E)", notes: [261.63, 329.63], mode: "sequence" },
      { label: "Perfect 5 (C-G)", notes: [261.63, 392.0], mode: "sequence" },
      { label: "Minor 3 (D-F)", notes: [293.66, 349.23], mode: "sequence" }
    ]
  },
  {
    id: 3,
    name: "Harmony Chords",
    points: 30,
    role: "Warm triads",
    monsters: [
      { id: "swan", name: "Swan", emoji: "🦢" },
      { id: "dog", name: "Dog", emoji: "🐕" }
    ],
    patterns: [
      { label: "C Major (C-E-G)", notes: [261.63, 329.63, 392.0], mode: "chord" },
      { label: "A Minor (A-C-E)", notes: [220.0, 261.63, 329.63], mode: "chord" },
      { label: "F Major (F-A-C)", notes: [174.61, 220.0, 261.63], mode: "chord" },
      { label: "G Major (G-B-D)", notes: [196.0, 246.94, 293.66], mode: "chord" }
    ]
  },
  {
    id: 4,
    name: "Octave Leaps",
    points: 40,
    role: "Wide melodic jumps",
    monsters: [
      { id: "eagle", name: "Eagle", emoji: "🦅" },
      { id: "deer", name: "Deer", emoji: "🦌" }
    ],
    patterns: [
      { label: "Octave Up (A-A)", notes: [220.0, 440.0], mode: "sequence" },
      { label: "Major 9 (B-C)", notes: [246.94, 523.25], mode: "sequence" },
      { label: "Octave Down (C-C)", notes: [523.25, 261.63], mode: "sequence" },
      { label: "Major 10 (G-B)", notes: [196.0, 493.88], mode: "sequence" }
    ]
  },
  {
    id: 5,
    name: "Dissonant Chords",
    points: 50,
    role: "Unstable clusters",
    monsters: [
      { id: "ogre", name: "Mischief", emoji: "👹" },
      { id: "twister", name: "Twister", emoji: "🌀" }
    ],
    patterns: [
      { label: "Tritone (C-F#)", notes: [261.63, 369.99], mode: "chord" },
      { label: "Cluster (C-C#-D)", notes: [261.63, 277.18, 293.66], mode: "chord" },
      { label: "Sharp Clash (E-F-G#)", notes: [329.63, 349.23, 415.3], mode: "chord" },
      { label: "Low Rumble (C-C#-G)", notes: [130.81, 138.59, 196.0], mode: "chord" }
    ]
  }
];

const els = {
  startScreen: document.querySelector("#startScreen"),
  gameScreen: document.querySelector("#gameScreen"),
  endScreen: document.querySelector("#endScreen"),
  playerName: document.querySelector("#playerName"),
  startButton: document.querySelector("#startButton"),
  soundToggle: document.querySelector("#soundToggle"),
  levelTitle: document.querySelector("#levelTitle"),
  roundStat: document.querySelector("#roundStat"),
  scoreStat: document.querySelector("#scoreStat"),
  streakStat: document.querySelector("#streakStat"),
  accuracyStat: document.querySelector("#accuracyStat"),
  promptTitle: document.querySelector("#promptTitle"),
  promptText: document.querySelector("#promptText"),
  replayButton: document.querySelector("#replayButton"),
  choices: document.querySelector("#choices"),
  teamList: document.querySelector("#teamList"),
  pulse: document.querySelector("#pulse"),
  animalWalker: document.querySelector("#animalWalker"),
  animalSprite: document.querySelector("#animalSprite"),
  finalScore: document.querySelector("#finalScore"),
  bestLevel: document.querySelector("#bestLevel"),
  finalAccuracy: document.querySelector("#finalAccuracy"),
  capturedCount: document.querySelector("#capturedCount"),
  resultTitle: document.querySelector("#resultTitle"),
  collection: document.querySelector("#collection"),
  againButton: document.querySelector("#againButton"),
  leaderboardButton: document.querySelector("#leaderboardButton"),
  leaderboardDialog: document.querySelector("#leaderboardDialog"),
  closeLeaderboard: document.querySelector("#closeLeaderboard"),
  leaderboardList: document.querySelector("#leaderboardList")
};

let audioContext;
let soundOn = true;
let answering = false;
let backgroundTimer = null;

let state = {
  player: "Hunter",
  round: 1,
  level: 1,
  score: 0,
  streak: 0,
  correct: 0,
  bestLevel: 1,
  captured: [],
  patternBags: {},
  lastPatternByLevel: {},
  question: null
};

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function splitAnswerLabel(label) {
  const match = label.match(/^(.+?)\s*(\(.+\))$/);
  if (!match) {
    return { main: label, notes: "" };
  }
  return { main: match[1], notes: match[2] };
}

function getLevel(id = state.level) {
  return LEVELS[id - 1];
}

function createPatternBags() {
  return LEVELS.reduce((bags, level) => {
    bags[level.id] = shuffle(level.patterns);
    return bags;
  }, {});
}

function drawPatternForLevel(level) {
  if (!state.patternBags[level.id] || state.patternBags[level.id].length === 0) {
    state.patternBags[level.id] = shuffle(level.patterns);
    const lastLabel = state.lastPatternByLevel[level.id];
    if (lastLabel && state.patternBags[level.id].length > 1) {
      const repeatedIndex = state.patternBags[level.id].findIndex((pattern) => pattern.label === lastLabel);
      if (repeatedIndex === state.patternBags[level.id].length - 1) {
        const swapIndex = Math.floor(Math.random() * (state.patternBags[level.id].length - 1));
        [state.patternBags[level.id][repeatedIndex], state.patternBags[level.id][swapIndex]] =
          [state.patternBags[level.id][swapIndex], state.patternBags[level.id][repeatedIndex]];
      }
    }
  }
  const pattern = state.patternBags[level.id].pop();
  state.lastPatternByLevel[level.id] = pattern.label;
  return pattern;
}

function ensureAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  return audioContext;
}

function playTone(freq, start, duration, type = "sine", gainValue = 0.13) {
  if (!soundOn) return;
  const ctx = ensureAudio();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.04);
}

function playKick(start) {
  if (!soundOn) return;
  const ctx = ensureAudio();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(86, start);
  osc.frequency.exponentialRampToValueAtTime(38, start + 0.16);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(0.12, start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.22);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + 0.24);
}

function playNoiseHit(start, duration, gainValue, filterFreq) {
  if (!soundOn) return;
  const ctx = ensureAudio();
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * duration), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }
  const source = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  source.buffer = buffer;
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(filterFreq, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(start);
  source.stop(start + duration + 0.02);
}

function playBackgroundBar() {
  if (!soundOn) return;
  const ctx = ensureAudio();
  const now = ctx.currentTime + 0.03;
  [0, 0.74, 1.12, 1.5].forEach((beat) => playKick(now + beat));
  [0.38, 1.12].forEach((beat) => playNoiseHit(now + beat, 0.12, 0.032, 950));
  [0.18, 0.56, 0.94, 1.31, 1.69].forEach((beat) => playNoiseHit(now + beat, 0.045, 0.014, 3600));
}

function startBackgroundMusic() {
  if (backgroundTimer || !soundOn) return;
  playBackgroundBar();
  backgroundTimer = window.setInterval(playBackgroundBar, 1900);
}

function stopBackgroundMusic() {
  if (!backgroundTimer) return;
  window.clearInterval(backgroundTimer);
  backgroundTimer = null;
}

function playPattern(pattern) {
  if (!soundOn) return;
  const ctx = ensureAudio();
  const now = ctx.currentTime + 0.02;
  els.pulse.classList.add("playing");
  window.setTimeout(() => els.pulse.classList.remove("playing"), 900);

  if (pattern.mode === "single") {
    playTone(pattern.notes[0], now, 0.85, "sine", 0.16);
  } else if (pattern.mode === "sequence") {
    pattern.notes.forEach((note, index) => playTone(note, now + index * 0.38, 0.34, "triangle", 0.14));
  } else {
    pattern.notes.forEach((note) => playTone(note, now, 0.9, pattern.notes.length > 2 ? "sawtooth" : "triangle", 0.07));
  }
}

function playFeedback(ok) {
  if (!soundOn) return;
  const ctx = ensureAudio();
  const now = ctx.currentTime + 0.02;
  if (ok) {
    [523.25, 659.25, 783.99].forEach((freq, index) => playTone(freq, now + index * 0.09, 0.16, "triangle", 0.09));
  } else {
    playTone(196, now, 0.38, "sawtooth", 0.08);
    playTone(146.83, now + 0.18, 0.32, "sawtooth", 0.07);
  }
}

function buildQuestion() {
  const level = getLevel();
  const answerPattern = drawPatternForLevel(level);
  const optionCount = level.id === 1 ? 7 : Math.min(4, level.patterns.length);
  const decoys = shuffle(level.patterns.filter((pattern) => pattern.label !== answerPattern.label)).slice(0, optionCount - 1);
  const options = shuffle([answerPattern, ...decoys]).map((pattern) => ({
    pattern,
    isCorrect: pattern.label === answerPattern.label
  }));
  const monster = randomItem(level.monsters);

  state.question = { level, answerPattern, options, monster };
}

function render() {
  const level = getLevel();
  els.levelTitle.textContent = `Level ${level.id}: ${level.name}`;
  els.roundStat.textContent = `${state.round} / ${TOTAL_ROUNDS}`;
  els.scoreStat.textContent = state.score;
  els.streakStat.textContent = state.streak;
  els.accuracyStat.textContent = `${Math.round((state.correct / Math.max(1, state.round - 1)) * 100)}%`;
  els.promptTitle.textContent = "Listen closely";
  els.promptText.textContent = level.id === 1
    ? `This Level 1 challenge is worth ${level.points} points. Choose C, D, E, F, G, A, or B.`
    : `This Level ${level.id} challenge is worth ${level.points} points. Choose the matching English label.`;
  els.animalSprite.className = `pixel-animal ${state.question.monster.id}`;
  els.animalWalker.classList.remove("caught", "escaped");

  els.choices.innerHTML = "";
  state.question.options.forEach((option, index) => {
    const card = document.createElement("button");
    card.className = "answer-card";
    card.type = "button";
    card.dataset.index = index;
    const labelParts = splitAnswerLabel(option.pattern.label);
    const labelClass = labelParts.notes ? "answer-label split-label" : "answer-label";
    card.innerHTML = `
      <div class="answer-card-inner">
        <span class="${labelClass}">
          <span class="answer-main">${escapeHtml(labelParts.main)}</span>
          ${labelParts.notes ? `<span class="answer-notes">${escapeHtml(labelParts.notes)}</span>` : ""}
        </span>
        <span class="answer-hint">${level.role}</span>
      </div>
    `;
    card.addEventListener("click", () => chooseOption(index));
    els.choices.appendChild(card);
  });

  renderTeam();
  renderMeter();
}

function renderTeam() {
  if (state.captured.length === 0) {
    els.teamList.textContent = "No monsters yet";
    return;
  }
  const counts = state.captured.reduce((acc, monster) => {
    acc[monster.id] = acc[monster.id] || { ...monster, count: 0 };
    acc[monster.id].count += 1;
    return acc;
  }, {});
  els.teamList.innerHTML = Object.values(counts)
    .map((monster) => `<span class="team-chip">${monster.emoji} ${monster.name} ×${monster.count}</span>`)
    .join("");
}

function renderMeter() {
  document.querySelectorAll(".level-meter span").forEach((dot, index) => {
    dot.classList.toggle("active", index < state.level);
  });
}

function chooseOption(index) {
  if (answering) return;
  answering = true;

  const selected = state.question.options[index];
  const buttons = [...document.querySelectorAll(".answer-card")];
  playFeedback(selected.isCorrect);

  if (selected.isCorrect) {
    const monster = state.question.monster;
    buttons[index].classList.add("correct");
    els.animalWalker.classList.add("caught");
    state.score += state.question.level.points;
    state.streak += 1;
    state.correct += 1;
    state.captured.push(monster);
    els.promptTitle.textContent = "Captured!";
    els.promptText.textContent = `${monster.name} joined your team. +${state.question.level.points} points`;
  } else {
    buttons[index].classList.add("wrong");
    const correctIndex = state.question.options.findIndex((option) => option.isCorrect);
    if (correctIndex >= 0) {
      buttons[correctIndex].classList.add("correct-answer");
    }
    els.animalWalker.classList.add("escaped");
    state.streak = 0;
    els.gameScreen.classList.add("shake");
    els.promptTitle.innerHTML = `Correct answer: <span class="big-answer">${escapeHtml(state.question.answerPattern.label)}</span>`;
    els.promptText.textContent = "The animal exploded. Listen for the match next time.";
  }

  buttons.forEach((button) => {
    button.disabled = true;
  });
  window.setTimeout(() => {
    advance(selected.isCorrect);
  }, 1150);
}

function advance(wasCorrect) {
  if (wasCorrect && state.streak >= 2) {
    state.level = Math.min(5, state.level + 1);
    state.streak = 0;
  } else if (!wasCorrect) {
    state.level = Math.max(1, state.level - 1);
  }

  state.bestLevel = Math.max(state.bestLevel, state.level);
  state.round += 1;
  els.gameScreen.classList.remove("shake");
  answering = false;

  if (state.round > TOTAL_ROUNDS) {
    finishGame();
    return;
  }

  buildQuestion();
  render();
  window.setTimeout(() => playPattern(state.question.answerPattern), 260);
}

function startGame() {
  state = {
    player: els.playerName.value.trim() || "Hunter",
    round: 1,
    level: 1,
    score: 0,
    streak: 0,
    correct: 0,
    bestLevel: 1,
    captured: [],
    patternBags: createPatternBags(),
    lastPatternByLevel: {},
    question: null
  };
  ensureAudio();
  startBackgroundMusic();
  buildQuestion();
  showScreen("game");
  render();
  window.setTimeout(() => playPattern(state.question.answerPattern), 350);
}

function finishGame() {
  stopBackgroundMusic();
  showScreen("end");
  const accuracy = Math.round((state.correct / TOTAL_ROUNDS) * 100);
  els.finalScore.textContent = state.score;
  els.bestLevel.textContent = `Level ${state.bestLevel}`;
  els.finalAccuracy.textContent = `${accuracy}%`;
  els.capturedCount.textContent = state.captured.length;
  els.resultTitle.textContent = state.score >= 500 ? "Elite ears" : state.score >= 260 ? "Sharp hunter" : "Training run";
  els.collection.innerHTML = state.captured.length
    ? state.captured.map((monster) => `<span class="team-chip">${monster.emoji} ${monster.name}</span>`).join("")
    : `<span class="team-chip">No captures this time</span>`;
  saveScore({ player: state.player, score: state.score, bestLevel: state.bestLevel, accuracy });
}

function showScreen(name) {
  els.startScreen.classList.toggle("hidden", name !== "start");
  els.gameScreen.classList.toggle("hidden", name !== "game");
  els.endScreen.classList.toggle("hidden", name !== "end");
}

function saveScore(entry) {
  const scores = getScores();
  scores.push({ ...entry, date: new Date().toISOString() });
  scores.sort((a, b) => b.score - a.score || b.accuracy - a.accuracy);
  localStorage.setItem("melodyHuntersScores", JSON.stringify(scores.slice(0, 10)));
}

function getScores() {
  try {
    return JSON.parse(localStorage.getItem("melodyHuntersScores") || "[]");
  } catch {
    return [];
  }
}

function showLeaderboard() {
  const scores = getScores();
  els.leaderboardList.innerHTML = scores.length
    ? scores.map((entry) => `<li>${escapeHtml(entry.player)}<span>${entry.score} pts · L${entry.bestLevel}</span></li>`).join("")
    : "<li>No scores yet<span>Play a run</span></li>";
  els.leaderboardDialog.showModal();
}

els.startButton.addEventListener("click", startGame);
els.againButton.addEventListener("click", startGame);
els.replayButton.addEventListener("click", () => {
  if (state.question) playPattern(state.question.answerPattern);
});
els.soundToggle.addEventListener("click", () => {
  soundOn = !soundOn;
  els.soundToggle.textContent = soundOn ? "🔊" : "🔇";
  if (soundOn && !els.gameScreen.classList.contains("hidden")) {
    startBackgroundMusic();
  } else {
    stopBackgroundMusic();
  }
});
els.leaderboardButton.addEventListener("click", showLeaderboard);
els.closeLeaderboard.addEventListener("click", () => els.leaderboardDialog.close());
els.playerName.addEventListener("keydown", (event) => {
  if (event.key === "Enter") startGame();
});
